import { AuthService } from './../../core/services/auth.service';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { ToastrService } from 'ngx-toastr';

/* Add import */
import { MatDialogRef, MatDialog } from '@angular/material';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { LoginComponent } from '../login/login.component';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})

export class SignupComponent implements OnInit, OnDestroy  {

  private subscription = [];

  private registerForm: FormGroup;
  private submitted = false;

  constructor(public dialogRef: MatDialogRef<SignupComponent>,
              private formBuilder: FormBuilder,
              private authService: AuthService,
              private toastr: ToastrService,
              public dialog: MatDialog) { }

  ngOnInit() {

    this.registerForm = this.formBuilder.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      phone: ['', Validators.required],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });

  }
  
  ngOnDestroy() {

    this.subscription.forEach(sub => sub.unsubscribe());

  }

  private register() {

    this.submitted = true;

    if (this.registerForm.invalid) { return; }

    this.subscription.push(this.authService.register(this.registerForm.value)
    .subscribe(response => {

      if (response) {

        this.onLoginClick();

        return this.toastr.success('Success register ', null, {
          progressAnimation: 'decreasing',
          positionClass: 'toast-top-center',
          progressBar: true,
          closeButton: true,
          timeOut: 3000,
        });
      }

    }));
  }

  private get attribute() { return this.registerForm.controls; }

  private onLoginClick() {
    this.dialogRef.close();
    setTimeout(() => {
      const dialogRef = this.dialog.open(LoginComponent, {
        data: {}
      });
      dialogRef.afterClosed().subscribe(
        res => console.log(res)
      );
    }, 300);
  }

}
