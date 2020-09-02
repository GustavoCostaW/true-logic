import { Address } from './../addresses/model/address.model';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { take, map } from 'rxjs/operators';
import { Observable, interval } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AddressesService {
  constructor(private http: HttpClient) {}

  getAddresses(): Observable<string> {
    return this.http.get<string>(
      'https://0f1c6e64.s3.amazonaws.com/addresses.txt',
      {
        responseType: 'text' as 'json',
      }
    );
  }

  updateAddress(address): Observable<Address> {
    /* it simulates an HTTP request, I'm supposing to receive a ID property
    in the address param above and send a PUT or POST request below. */

    // it simulates an HTTP request using an observable that returns in 1s
    return interval(1000).pipe(
      map(() => address),
      take(1)
    );
  }
}
