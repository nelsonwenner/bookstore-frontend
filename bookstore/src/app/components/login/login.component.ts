import { Component, OnInit, OnDestroy } from '@angular/core';
import { ToastrService } from 'ngx-toastr';

/* Add imports*/
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { SignupComponent } from '../signup/signup.component';
import { MatDialog, MatDialogRef } from '@angular/material';
import { AuthService } from '../../core/services/auth.service';
import { Router } from "@angular/router";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})

export class LoginComponent implements OnInit, OnDestroy {

  private subscription = [];

  private registerForm: FormGroup;
  private submitted = false;

  constructor(public dialogRef: MatDialogRef<LoginComponent>,
              private authService: AuthService,
              private formBuilder: FormBuilder,
              private toastr: ToastrService,
              public dialog: MatDialog,
              private router: Router) { }

  ngOnInit() {

    this.registerForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });

  }

  ngOnDestroy() {

    this.subscription.forEach(sub => sub.unsubscribe());

  }

  private login(): void {

    this.submitted = true;

    if (this.registerForm.invalid) { return; }

    this.subscription.push(this.authService.login(this.registerForm.value)
    .subscribe(response => {

      if (response.token && !response.is_staff) {

        localStorage.setItem('currentUser', JSON.stringify(response));

        this.subscription.push(this.authService.getDataClient(response.id)
        .subscribe(client => {

          localStorage.setItem('currentUser', JSON.stringify(client));
          this.authService.getObserverIsLoggedIn().next(true);
          this.onNoClick();
        }));
      }
    },
    error => {
      return this.toastr.error('Invalid Credentials', 'Login', {
        progressAnimation: 'decreasing',
        positionClass: 'toast-bottom-right',
        progressBar: true,
        closeButton: true,
        timeOut: 3000,
      });
    }));
  }

  private get attribute() { return this.registerForm.controls; }

  private onSignUpClick(): void {
    this.dialogRef.close();

    setTimeout(() => {
      const dialogRef = this.dialog.open(SignupComponent, {
        data: {}
      });

      this.subscription.push(dialogRef.afterClosed().
      subscribe(res => console.log(res)
      ));
    }, 300);
  }

  private onNoClick(): void {
    this.dialogRef.close();
  }
}
