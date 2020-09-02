/// <reference lib="webworker" />
import { AddressesParserService } from './addresses-parser.service';

addEventListener('message', ({ data }) => {
  const addresses = AddressesParserService.parseAddresses(data);
  const formattedAddresses = addresses.map((address) => {
    return AddressesParserService.explodeAddresses(address);
  });

  postMessage(formattedAddresses);
});
