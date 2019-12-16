import { Injectable } from '@angular/core';

/* Add import */
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class BookService {

  constructor(private httpClient: HttpClient) { }

  getAllBooks(): Observable<any> {
    return this.httpClient.get(`${environment.ApiRoot}/books/`);
  }

}
