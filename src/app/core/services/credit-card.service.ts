import { CreditCard } from '../models/creditcard';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})

export class CreditCardService {

  private onCreditCard = new BehaviorSubject<boolean>(false);

  constructor(private http: HttpClient) { }

  public createCreditCart(creditcart: CreditCard): Observable<CreditCard> {
    const uri = `${environment.ApiRoot}/creditscards/`;
    return this.http.post<CreditCard>(uri, creditcart);
  }

  public getCreditCard(url: any): Observable<CreditCard> {
    //const uri = `${environment.ApiRoot}/address/${id}/`;
    return this.http.get<CreditCard>(url);
  }

  public patchCreditCard(data: any, url: any): Observable<CreditCard> {
    //const uri = `${environment.ApiRoot}/address/${id}/`;
    return this.http.patch<CreditCard>(url, data);
  }

  public getObserverOnCreditCard() {
    return this.onCreditCard;
  }

}
