import { Component, OnInit, OnDestroy } from '@angular/core';
import { Location } from '@angular/common';
import { Subscription } from 'rxjs';
import { ToastrService } from 'ngx-toastr';

/* Add imports*/
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { SignupComponent } from '../signup/signup.component';
import { MatDialog, MatDialogRef } from '@angular/material';
import { AuthService } from '../../services/auth.service';
import { Router } from "@angular/router";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})

export class LoginComponent implements OnInit, OnDestroy {

  subscriptionLogin: Subscription;
  subscriptiondialogRef: Subscription;

  registerForm: FormGroup;
  submitted = false;

  constructor(public dialogRef: MatDialogRef<LoginComponent>,
              private authService: AuthService,
              private formBuilder: FormBuilder,
              private toastr: ToastrService,
              private location: Location,
              public dialog: MatDialog,
              private router: Router) { }

  ngOnInit() {

    this.registerForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });

  }

  ngOnDestroy() {

    if (this.subscriptionLogin) {
      this.subscriptionLogin.unsubscribe();
    }

    if (this.subscriptiondialogRef) {
      this.subscriptiondialogRef.unsubscribe();
    }

  }

  login(): void {

    this.submitted = true;

    if (this.registerForm.invalid) { return; }

    this.subscriptionLogin = this.authService.login(this.registerForm.value)
    .subscribe(response => {

        if (response.token) {

          const data = {
            token: response.token,
            user_id: response.user_id,
            username: response.username,
            email: response.email,
            is_staff: response.is_staff
          };

          localStorage.setItem('currentUser', JSON.stringify(data));
          this.onNoClick();
          location.reload();
        }
      },
      error => {
        return this.toastr.error('Invalid Credentials', 'Login');
      }
    );
  }

  get attribute() { return this.registerForm.controls; }

  onSignUpClick() {
    this.dialogRef.close();

    setTimeout(() => {
      const dialogRef = this.dialog.open(SignupComponent, {
        data: {}
      });

      this.subscriptiondialogRef = dialogRef.afterClosed().subscribe(
        res => console.log(res)
      );
    }, 300);
  }

  onNoClick(): void {
    this.dialogRef.close();
  }
}
