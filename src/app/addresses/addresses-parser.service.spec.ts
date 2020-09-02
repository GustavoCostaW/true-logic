import { AddressesParserService } from './addresses-parser.service';
describe('AddressesParserService', () => {
  it('should return an array collection from an address string', () => {
    expect(
      AddressesParserService.parseAddresses(
        `1 Jesse Hill Jr Street, Atlanta, TN 30309
        23 Peachtree Street, Atlanta, TN 30301
        32 Glen Iris Drive NE, Brookhaven, FL 30309
        66 Hank Aaron Drive, Decatur, GA 30317
        12357 Glen Iris Drive NE, Sandy Sprints, FL 30327
        2857 Jesse Hill Jr Street, Decatur, GA 30354
        44 Poplar Street, Brookhaven, TN 30305`
      ).length
    ).toBe(7);
  });

  it('should return an address object from an address string', () => {
    const address = AddressesParserService.explodeAddresses(
      `1 Jesse Hill Jr Street, Atlanta, TN 30309`
    );

    expect(address.city).toBe('Atlanta');
    expect(address.full_street_address).toBe('1 Jesse Hill Jr Street');
    expect(address.state).toBe('TN');
    expect(address.street).toBe(' Jesse Hill Jr Street');
    expect(address.zip_code).toBe(30309);
    expect(address.street_number).toBe(1);
  });
});
