import { Injectable } from '@angular/core';

/* Add imports */
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable } from 'rxjs';
import { User } from '../models/user';
import { Client } from '../models/client';

const ApiEndpoints = {
  login: 'api-token',
  user: 'users',
  client: 'clients'
};

@Injectable({
  providedIn: 'root'
})

export class AuthService {

  private isloggedIn = new BehaviorSubject<boolean>(false);

  constructor(private http: HttpClient, private router: Router) { }

  public login(user: User): Observable<User> {
    const uri = `${environment.ApiRoot}/${ApiEndpoints.login}`;
    return this.http.post<User>(uri, user);
  }

  public logout(): void {
    localStorage.removeItem('currentUser');
    this.isloggedIn.next(false);
    this.router.navigate(['home']);
  }

  public loggedIn(): boolean {
    return !!localStorage.getItem('currentUser');
  }

  public getDataClient(id: number): Observable<Client>  {
    const uri = `${environment.ApiRoot}/${ApiEndpoints.client}/${id}/`;
    return this.http.get<Client>(uri);
  }

  public getObserverIsLoggedIn(): BehaviorSubject<boolean> {
    return this.isloggedIn;
  }

  public getToken(): string {
    const currentUser = JSON.parse(localStorage.getItem('currentUser'));

    if (!!currentUser) {
      return currentUser.token;
    }
  }

  public getCurrentUser(): Client {
    return JSON.parse(localStorage.getItem('currentUser'));
  }
}
