import { Spectator, createComponentFactory } from '@ngneat/spectator';
import { AddressCellComponent } from './address-cell.component';
import { ADDRESS_MOCK } from '../../model/address.model';

describe('AddressCellComponent', () => {
  let spectator: Spectator<AddressCellComponent>;
  const createComponent = createComponentFactory(AddressCellComponent);

  beforeEach(
    () =>
      (spectator = createComponent({
        props: {
          row: ADDRESS_MOCK,
        },
      }))
  );

  it('should have apply a property in the row object', () => {
    spectator.setInput('prop', 'street_number');

    const address = spectator.component.updateValue(421, 0);

    expect(address.street_number).toBe(421);
  });

  it('should dispatch updateRow.next() method ', () => {
    const nextSpy = spyOn(spectator.component['updateRow'], 'next');

    spectator.setInput('prop', 'street_number');

    spectator.component.updateValue(987, 0);

    expect(nextSpy).toHaveBeenCalled();
  });

  it('should dispatch editModeDeactivated.next() desactiving the edit mode', () => {
    const nextSpy = spyOn(spectator.component['editModeDeactivated'], 'next');

    spectator.setInput('prop', 'street_number');

    spectator.component.updateValue(112, 0);

    expect(nextSpy).toHaveBeenCalled();
  });
});
