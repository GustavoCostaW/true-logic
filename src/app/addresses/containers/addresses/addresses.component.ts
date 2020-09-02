import { Address } from './../../model/address.model';
import { AddressesStoreService } from './../../store/addresses-store.service';
import {
  Component,
  ViewChild,
  TemplateRef,
  ChangeDetectionStrategy,
} from '@angular/core';
import { ColumnMode } from '@swimlane/ngx-datatable';

@Component({
  selector: 'app-addresses',
  templateUrl: './addresses.component.html',
  styleUrls: ['./addresses.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})

/*

  I've implemented a push architecture here, thefore I've created
  the AddressesStoreState to be our store, the same concept as redux is using but,
   in a very simple way.


   here we just dispatched 'actions' and consume from a unique source of truth
*/
export class AddressesComponent {
  @ViewChild('cell', { static: true }) cell: TemplateRef<any>;
  public addressesTableConfig;

  constructor(public addressesStore: AddressesStoreService) {}

  ngOnInit() {
    this.createTable();
    this.addressesStore.loadAddresses();

    /* THERE IS NO NEED FOR UNSUBSCRIBE FROM IT RIGHT NOW BECAUSE THERE IS NO
    ROUTE CHANGE, BUT IT COULD BE A GHOST OBSERVABLE IN THE FUTURE. */

    this.addressesStore.addresses$.subscribe((data) => {
      // disabling all edit mode
      this.addressesTableConfig.editing = {};

      console.log('ADDRESSES LIST UPDATED!');
    });
  }

  private createTable(): void {
    /* may it could go to a external table configuration service in the future...  */

    this.addressesTableConfig = {
      mode: ColumnMode.force,
      editing: {},
      columns: [
        {
          name: 'Street Number',
          prop: 'street_number',
          cellTemplate: this.cell,
        },
        {
          name: 'Street',
          prop: 'street',
          cellTemplate: this.cell,
        },
        {
          name: 'City',
          prop: 'city',
          cellTemplate: this.cell,
        },
        {
          name: 'Zip code',
          prop: 'zip_code',
          cellTemplate: this.cell,
        },
        {
          name: 'State',
          prop: 'state',
          cellTemplate: this.cell,
        },
      ],
    };
  }

  public updateValue(row: Address, rowIndex: number): void {
    this.addressesStore.updateAddress(row, rowIndex);
  }

  /* The editing state is only for view propurses to active the edit mode,
   this is why I'm handling it here.  */

  public updateEditModeState(
    index: number,
    prop: string,
    value: boolean
  ): void {
    this.addressesTableConfig.editing = this.addressesTableConfig.editing = {
      ...this.addressesTableConfig.editing,
    };
    this.addressesTableConfig.editing[index + prop] = value;
  }
}
