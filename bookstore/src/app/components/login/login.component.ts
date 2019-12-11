import { Component, OnInit } from '@angular/core';

/* Add imports*/
import { FormGroup } from '@angular/forms';
import { UsersService } from './../../services/users.service';

/* Add Imports */
import { Router } from "@angular/router";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  private user:any = {}

  constructor(private usersService: UsersService, private router: Router) { }

  ngOnInit() {

    this.user = {
      username: '',
      password: ''
    };

  }

  private async signin(form: FormGroup) {

    if(form.valid) {

      const response = await this.usersService.login(this.user).toPromise();

      if(response['token']) {

        const data = {
          token: response['token'],
          user_id: response['user_id'],
          username: response['username'],
          email: response['email']
        }
  
        localStorage.setItem('token', JSON.stringify(data));
        this.router.navigate(['/dashboard']);
        return;
      }

    } else {

      console.log("Formulario invalido");
    }
  }
}
