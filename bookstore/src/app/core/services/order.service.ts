import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})

export class OrderService {

  constructor(private http: HttpClient) { }

  public order(data): Observable<any> {
    const uri = `${environment.ApiRoot}/orders/`;
    return this.http.post<any>(uri, data);
  }

}
