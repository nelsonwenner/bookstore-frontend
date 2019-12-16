import { Component, OnInit } from '@angular/core';

/* Add imports*/
import { AuthService } from '../../services/auth.service';
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
              private authService: AuthService,
              private formBuilder: FormBuilder,
              public dialog: MatDialog,
              private router: Router) { }

  ngOnInit() {

    this.registerForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });

  }

  login() {

    this.submitted = true;

    if (this.registerForm.invalid) { return; }

    this.authService.login(this.registerForm.value).subscribe(response => {

        if (response.token) {

          const data = {
            token: response.token,
            user_id: response.user_id,
            username: response.username,
            email: response.email,
            is_staff: response.is_staff
          };

          localStorage.setItem('currentUser', JSON.stringify(data));
          this.dialogRef.close();
          this.router.navigate(['/dashboard']);
          return true;
        }
      },
      error => console.log(error)
    );
  }

  get attribute() { return this.registerForm.controls; }

  onSignUpClick() {
    this.dialogRef.close();
    setTimeout(() => {
      const dialogRef = this.dialog.open(SignupComponent, {
        data: {}
      });
      dialogRef.afterClosed().subscribe(
        res => console.log(res)
      );
    }, 300);
  }
}
