import { Address } from './../model/address.model';
import { AddressesService } from './../../core/addresses.service';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { filter, distinctUntilChanged, map } from 'rxjs/operators';

export interface AddressesStoreState {
  loading: boolean;
  loaded: boolean;
  error: undefined;
  data: Address[];
}

@Injectable({
  providedIn: 'root',
})
export class AddressesStoreService {
  /* OUR private state */
  private _state: AddressesStoreState = {
    loading: true,
    loaded: false,
    error: undefined,
    data: undefined,
  };

  private _addressesState$: BehaviorSubject<
    AddressesStoreState
  > = new BehaviorSubject(this._state);

  // it is a property to make our tests easier to mock.
  private worker: Worker;

  /* OUR SELECTORS */
  public addresses$ = this._addressesState$.asObservable().pipe(
    map((state) => state.data),
    filter((data) => Array.isArray(data)),
    distinctUntilChanged()
  );

  public loading$ = this._addressesState$.asObservable().pipe(
    map((state) => state.loading),
    distinctUntilChanged()
  );

  constructor(private addressesService: AddressesService) {}

  public loadAddresses(): void {
    this.addressesService.getAddresses().subscribe((addressesAsString) => {
      /* Let's not make our browser sad right? I've created this Web worker
      to parse our addresses */
      this.worker = new Worker('../addresses.worker', { type: 'module' });
      this.worker.postMessage(addressesAsString);

      this.worker.onmessage = ({ data }) => {
        this.updateState({
          loading: false,
          loaded: true,
          error: undefined,
          data,
        });
      };
    });
  }

  public updateAddress(row: Address, rowIndex: number): void {
    const updatedAddresses = [...this._state.data];
    updatedAddresses[rowIndex] = row;

    /* I was wondering about it and how we update our state here depends what
    the client decides, ux or business logic, whatever, if he wanna show to the
    user the changed state and then send the HTTP request or he wanna make sure
    the back-end has saved all information and then shows the changes, here
    I'm simulating the first behavior, I'm showing the data and then sent
    the 'request'
     */

    console.log('updating address!');

    this.updateState({
      loading: true,
      loaded: false,
      error: undefined,
      data: updatedAddresses,
    });

    this.addressesService.updateAddress(row).subscribe((address) => {
      // updated successfully
      this.updateState({
        ...this._state,
        loading: false,
        loaded: true,
      });
    });
  }

  private updateState(state: AddressesStoreState): void {
    this._addressesState$.next((this._state = state));
  }
}
