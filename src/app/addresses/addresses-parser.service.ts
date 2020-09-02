import { Address } from './model/address.model';

export class AddressesParserService {
  static parseAddresses(data: string): string[] {
    return data.match(/\b\d+(?:\s+[\w,]+)+?\s+[a-zA-Z]{2}\s+\d{5}\b/gm);
  }

  static explodeAddresses(singleLineAddress): Address {
    let states;
    function looksLikeState(str) {
      if (!states) {
        const map = {
          Alabama: 'AL',
          Alaska: 'AK',
          Arizona: 'AZ',
          Arkansas: 'AR',
          California: 'CA',
          Colorado: 'CO',
          Connecticut: 'CT',
          Delaware: 'DE',
          Florida: 'FL',
          Georgia: 'GA',
          Hawaii: 'HI',
          Idaho: 'ID',
          Illinois: 'IL',
          Indiana: 'IN',
          Iowa: 'IA',
          Kansas: 'KS',
          Kentucky: 'KY',
          Louisiana: 'LA',
          Maine: 'ME',
          Maryland: 'MD',
          Massachusetts: 'MA',
          Michigan: 'MI',
          Minnesota: 'MN',
          Mississippi: 'MS',
          Missouri: 'MO',
          Montana: 'MT',
          Nebraska: 'NE',
          Nevada: 'NV',
          'New Hampshire': 'NH',
          'New Jersey': 'NJ',
          'New Mexico': 'NM',
          'New York': 'NY',
          'North Carolina': 'NC',
          'North Dakota': 'ND',
          Ohio: 'OH',
          Oklahoma: 'OK',
          Oregon: 'OR',
          Pennsylvania: 'PA',
          'Rhode Island': 'RI',
          'South Carolina': 'SC',
          'South Dakota': 'SD',
          Tennessee: 'TN',
          Texas: 'TX',
          Utah: 'UT',
          Vermont: 'VT',
          Virginia: 'VA',
          Washington: 'WA',
          'West Virginia': 'WV',
          Wisconsin: 'WI',
          Wyoming: 'WY',
          'District of Columbia': 'DC',

          'American Samoa': 'AS',
          Guam: 'GU',
          'Northern Mariana Islands': 'MP',
          'Puerto Rico': 'PR',
          'Virgin Islands': 'VI',

          Alberta: 'AB',
          'British Columbia': 'BC',
          Manitoba: 'MB',
          'New Brunswick': 'NB',
          Newfoundland: 'NL',
          'Nova Scotia': 'NS',
          'Northwest Territories': 'NT',
          Nunavut: 'NU',
          Ontario: 'ON',
          'Prince Edward Island': 'PE',
          Quebec: 'QC',
          Saskatchewan: 'SK',
          Yukon: 'YT',
        };
        states = {};
        for (let k in map) {
          if (map.hasOwnProperty(k)) {
            states[k.toLowerCase()] = true;
            states[map[k].toLowerCase()] = true;
          }
        }
      }
      str = str.trim().toLowerCase();
      return !!states[str];
    }

    let addressObj: Address = {
      city: null,
      state: null,
      zip_code: null,
      street: null,
      street_number: null,
      full_street_address: null,
    };
    if (typeof singleLineAddress != 'string') {
      //return cb(new Error('Input must be a String'))
      return addressObj;
    }
    singleLineAddress = singleLineAddress.trim();

    let postalCode = singleLineAddress.match(
        /([0-9]{5})|([a-z][0-9][a-z] ?[0-9][a-z][0-9])/gi
      ),
      indexOfPostalCode = -1;
    if (postalCode) {
      postalCode = postalCode.pop(); // pick match closest to end
      indexOfPostalCode = singleLineAddress.lastIndexOf(postalCode);
      if (indexOfPostalCode == 0 && singleLineAddress.length > 10) {
        // postal code is probably part of street address
        postalCode = null;
        indexOfPostalCode = -1;
      }
      if (postalCode) {
        addressObj.zip_code = parseInt(postalCode);
        const everythingAfterPostalCode = singleLineAddress.substr(
          indexOfPostalCode + postalCode.length
        );
        singleLineAddress =
          singleLineAddress.substr(0, indexOfPostalCode) +
          everythingAfterPostalCode;
        const possibleCountry = everythingAfterPostalCode
          .replace(/\s*,/, '')
          .split(',')
          .shift()
          .trim();
      }
    }

    const addySplit = singleLineAddress.split(',');

    // Handle special cases...
    // Neighborhood, City, State
    if (addySplit.length == 3 && looksLikeState(addySplit[2])) {
      addressObj.full_street_address = addySplit[0].trim();
      addressObj.street = addressObj.full_street_address.replace(/[0-9]/g, '');
      addressObj.street_number = parseInt(
        addressObj.full_street_address.match(/\d+/)[0]
      );
      addressObj.city = addySplit[1].trim();
      addressObj.state = addySplit[2].trim();
      return addressObj;
    }

    return addressObj;
  }
}
