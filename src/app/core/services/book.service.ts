import { Book } from 'src/app/core/models/book';
import { Injectable } from '@angular/core';

/* Add import */
import { environment } from '../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})

export class BookService {

  constructor(private httpClient: HttpClient) { }

  public getAllBooks(page: number): Observable<any> {
    return this.httpClient.get(`${environment.ApiRoot}/books/?page=${page}`);
  }

  public getBook(id: number): Observable<Book> {
    return this.httpClient.get<Book>(`${environment.ApiRoot}/books/${id}/`);
  }

}
