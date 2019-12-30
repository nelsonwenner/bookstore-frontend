import { Injectable } from '@angular/core';

/* Add imports */
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable } from 'rxjs';
import { User } from '../models/user';

const ApiEndpoints = {
  login: 'api-token',
  user: 'users'
};

@Injectable({
  providedIn: 'root'
})

export class AuthService {

  isloggedIn = new BehaviorSubject<boolean>(false);

  constructor(private http: HttpClient, private router: Router) { }

  public login(user: User): Observable<any> {
    const uri = `${environment.ApiRoot}/${ApiEndpoints.login}`;
    return this.http.post<any>(uri, user);
  }

  logout(): void {
    localStorage.removeItem('currentUser');
    this.isloggedIn.next(false);
    this.router.navigate(['home']);
  }

  loggedIn(): boolean {
    return !!localStorage.getItem('currentUser');
  }

  getObserverIsLogged(): BehaviorSubject<boolean> {
    return this.isloggedIn;
  }

  getToken(): string {
    const currentUser = JSON.parse(localStorage.getItem('currentUser'));

    if (!!currentUser) {
      return currentUser.token;
    }
  }

  getCurrentUser(): User {
    return JSON.parse(localStorage.getItem('currentUser'));
  }
}
