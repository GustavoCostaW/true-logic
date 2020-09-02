import { AddressCellComponent } from './presentations/address-cell/address-cell.component';
import { SharedModule } from './../shared/shared.module';
import { AddressesComponent } from './containers/addresses/addresses.component';
import { NgModule } from '@angular/core';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';

@NgModule({
  imports: [NgxDatatableModule, SharedModule],
  declarations: [AddressesComponent, AddressesComponent, AddressCellComponent],
  exports: [AddressesComponent],
})
export class AddressesModule {}
