import { Injectable } from '@angular/core';

/* Add imports */
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Router } from '@angular/router';

const ApiEndpoints = {
  login: 'api-token',
  user: 'users'
};

@Injectable({
  providedIn: 'root'
})

export class AuthService {

  constructor(private http: HttpClient, private router: Router) { }

  public login(user: any): any {
    const uri = `${environment.ApiRoot}/${ApiEndpoints.login}`;
    return this.http.post(uri, user);
  }

  logout(): void {
    localStorage.removeItem('currentUser');
    this.router.navigate(['/login']);
  }

  loggedIn(): boolean {
    return !!localStorage.getItem('currentUser');
  }

  getToken(): string {
    const currentUser = JSON.parse(localStorage.getItem('currentUser'));

    if (!!currentUser) {
      return currentUser.token;
    }
  }

  getCurrentUser(): any {
    return JSON.parse(localStorage.getItem('currentUser'));
  }
}
