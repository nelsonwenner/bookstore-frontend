import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})

export class OrderService {

  private orderSubject = new BehaviorSubject(false);

  constructor(private http: HttpClient) { }

  public order(data): Observable<any> {
    const uri = `${environment.ApiRoot}/orders/`;
    return this.http.post<any>(uri, data);
  }

  public getOrders(): Observable<any> {
    const uri = `${environment.ApiRoot}/orders/`;
    return this.http.get<any>(uri);
  }

  public deleteOrder(id): Observable<any> {
    const uri = `${environment.ApiRoot}/orders/${id}/`;
    return this.http.delete<any>(uri);
  }

  public getObserverOrder() {
    return this.orderSubject;
  }

}
