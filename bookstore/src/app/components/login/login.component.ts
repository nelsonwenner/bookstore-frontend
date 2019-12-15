import { Component, OnInit } from '@angular/core';

/* Add imports*/
import { UsersService } from './../../services/users.service';
import { MatDialog, MatDialogRef } from '@angular/material';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { Router } from "@angular/router";
import { SignupComponent } from '../signup/signup.component';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})

export class LoginComponent implements OnInit {

  registerForm: FormGroup;
  submitted = false;

  constructor(public dialogRef: MatDialogRef<LoginComponent>,
              private usersService: UsersService,
              private formBuilder: FormBuilder,
              public dialog: MatDialog,
              private router: Router) { }

  ngOnInit() {

    this.registerForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });

  }

  private async login() {

    this.submitted = true;

    if (this.registerForm.invalid) { return; }

    const response = await this.usersService.login(this.registerForm.value).toPromise();

    if (response['token']) {

      const data = {
        token: response['token'],
        user_id: response['user_id'],
        username: response['username'],
        email: response['email'],
        is_staff: response['is_staff']
      }
      
      localStorage.setItem('token', JSON.stringify(data));
      //this.router.navigate(['/dashboard']);
      return;
    }
  }

  get attribute() { return this.registerForm.controls; }

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
