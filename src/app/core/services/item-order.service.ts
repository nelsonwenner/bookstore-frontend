import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class ItemOrderService {

  constructor(private http: HttpClient) { }

  public itemOrder(data): Observable<any> {
    const uri = `${environment.ApiRoot}/itemsorders/`;
    return this.http.post<any>(uri, data);
  }

}
