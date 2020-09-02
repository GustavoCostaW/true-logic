import { AddressesStoreService } from './addresses-store.service';
import { createServiceFactory, SpectatorService } from '@ngneat/spectator';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ADDRESS_MOCK } from '../model/address.model';
import { of } from 'rxjs';

describe('AuthService', () => {
  let spectator: SpectatorService<AddressesStoreService>;
  const createService = createServiceFactory({
    service: AddressesStoreService,
    imports: [HttpClientTestingModule],
  });

  beforeEach(() => {
    spectator = createService();

    spectator.service['updateState']({
      loading: false,
      loaded: true,
      error: undefined,
      data: [
        {
          ...ADDRESS_MOCK,
        },
      ],
    });

    spyOn(
      spectator.service['addressesService'],
      'updateAddress'
    ).and.returnValue(
      of({
        ...ADDRESS_MOCK,
      })
    );
  });

  it('should test the addresses$ selector', () => {
    spectator.service.addresses$.subscribe((addresses) => {
      expect(addresses.length).toBe(1);
      expect(addresses[0].state).toBe('AL');
    });
  });

  it('should test the loading$ selector', () => {
    spectator.service.loading$.subscribe((addresses) => {
      expect(addresses).toBeFalsy();
    });
  });

  it('should get the addresses from txt and update the state', () => {
    const messageBus: any = {
      data: [{ ...ADDRESS_MOCK }],
    };

    spyOn(
      spectator.service['addressesService'],
      'getAddresses'
    ).and.returnValue(of('test'));
    const updateStateSpy = spyOn<any>(spectator.service, 'updateState');

    spectator.service.loadAddresses();
    spectator.service['worker'].onmessage(messageBus);

    expect(updateStateSpy).toHaveBeenCalled();
  });

  it('should update the address and call the updateState method', () => {
    const updateStateSpy = spyOn<any>(spectator.service, 'updateState');

    spectator.service.updateAddress(
      {
        ...ADDRESS_MOCK,
        street: 'New street name!',
      },
      0
    );

    spectator.service.addresses$.subscribe((addresses) => {
      expect(updateStateSpy).toHaveBeenCalled();
    });
  });

  it('should update the address and update the state', () => {
    spectator.service.updateAddress(
      {
        ...ADDRESS_MOCK,
        street: 'New street name!',
      },
      0
    );

    spectator.service.addresses$.subscribe((addresses) => {
      expect(addresses[0].street).toBe('New street name!');
    });
  });
});
