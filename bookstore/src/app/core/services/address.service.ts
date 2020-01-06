import { environment } from './../../../environments/environment';
import { Address } from './../models/address';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class AddressService {

  private onAddress = new BehaviorSubject<boolean>(false);

  constructor(private http: HttpClient) { }

  public createAddress(address: Address): Observable<Address> {
    const uri = `${environment.ApiRoot}/address/`;
    return this.http.post<Address>(uri, address);
  }

  public getAddress(url: any): Observable<Address> {
    //const uri = `${environment.ApiRoot}/address/${id}/`;
    return this.http.get<Address>(url);
  }

  public patchAddress(data: any, url: any): Observable<Address> {
    //const uri = `${environment.ApiRoot}/address/${id}/`;
    return this.http.patch<Address>(url, data);
  }


  public getObserverOnAddress() {
    return this.onAddress;
  }

}
