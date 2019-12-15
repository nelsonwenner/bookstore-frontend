import { Injectable } from '@angular/core';

/* Add imports */
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';

const ApiEndpoints = {
  login: 'api-token',
  user: 'users'
};

@Injectable({
  providedIn: 'root'
})

export class UsersService {

  constructor(private http: HttpClient) { }

  public login(user: any) {

    let uri = `${environment.ApiRoot}/${ApiEndpoints.login}`;

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
