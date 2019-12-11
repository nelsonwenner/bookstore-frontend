import { Injectable } from '@angular/core';

/* Add imports */
import { HttpHeaders, HttpClient } from '@angular/common/http';

const ApiEndpoints = {
  login: 'api-token',
  user: 'users'
};

@Injectable({
  providedIn: 'root'
})

export class UsersService {

  private UriApi:string = "http://localhost:8000";

  constructor(private http: HttpClient) { }

  public login(user: any) {

    let uri = `${this.UriApi}/${ApiEndpoints.login}`;

    return this.http.post(uri, JSON.stringify(user), this.loadHeaders());

  }

  private loadHeaders(token: string = '') {

    let headers = new HttpHeaders({
      'Content-Type': "application/json",
      "Authorization": `Bearer ${token}`
    });

    return { headers };
  }

}
