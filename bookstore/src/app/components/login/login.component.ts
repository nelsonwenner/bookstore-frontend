import { Component, OnInit } from '@angular/core';

/* Add imports*/
import { UsersService } from './../../services/users.service';
import { MatDialog, MatDialogRef } from '@angular/material';
import { FormGroup, FormControl } from '@angular/forms';
import { Router } from "@angular/router";
import { SignupComponent } from '../signup/signup.component';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})

export class LoginComponent implements OnInit {

  loginForm = new FormGroup({
      email: new FormControl(''),
      password: new FormControl('')
  });

  private user:any = {}

  constructor(public dialogRef: MatDialogRef<LoginComponent>,
    public dialog: MatDialog,
    private usersService: UsersService,
    private router: Router) { }

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
          email: response['email'],
          is_staff: response['is_staff']
        }

        localStorage.setItem('token', JSON.stringify(data));
        this.router.navigate(['/dashboard']);
        return;
      }

    } else {

      console.log("Formulario invalido");
    }
  }

  onSignUpClick() {
    this.dialogRef.close();
    setTimeout(() => {
      const dialogRef = this.dialog.open(SignupComponent,{
        data: {}
      });
      dialogRef.afterClosed().subscribe(
        res => console.log(res)
      );
    }, 300);
  }

}
