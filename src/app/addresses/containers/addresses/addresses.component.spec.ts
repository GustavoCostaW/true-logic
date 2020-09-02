import { SharedModule } from './../../../shared/shared.module';
import { AddressesComponent } from './addresses.component';
import { Spectator, createComponentFactory } from '@ngneat/spectator';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('AddressesComponent', () => {
  let spectator: Spectator<AddressesComponent>;
  const createComponent = createComponentFactory({
    component: AddressesComponent,
    imports: [HttpClientTestingModule, SharedModule],
  });

  beforeEach(() => (spectator = createComponent()));

  it('should have a table configuration defined', () => {
    spectator.component.ngOnInit();

    expect(spectator.component.addressesTableConfig).toBeDefined();
    expect(spectator.component.addressesTableConfig.columns.length).toBe(5);
  });

  it('should set the editing mode in a cell to false', () => {
    spectator.component.updateEditModeState(0, 'zip_code', false);

    expect(
      spectator.component.addressesTableConfig.editing['0zip_code']
    ).toBeFalse();
  });

  it('should set the editing mode in a cell to true', () => {
    spectator.component.updateEditModeState(0, 'city', true);

    expect(
      spectator.component.addressesTableConfig.editing['0city']
    ).toBeTrue();
  });
});
