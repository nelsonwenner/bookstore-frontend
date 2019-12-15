import { Component, OnInit } from '@angular/core';

/* Add import */
import { MatDialogRef, MatDialog } from '@angular/material';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { LoginComponent } from '../login/login.component';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})

export class SignupComponent implements OnInit {

  registerForm: FormGroup;
  submitted = false;

  constructor(public dialogRef: MatDialogRef<SignupComponent>,
              private formBuilder: FormBuilder,
              public dialog: MatDialog) { }

  ngOnInit() {

    this.registerForm = this.formBuilder.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      phone: ['', Validators.required],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });

  }

  private async register() {

    this.submitted = true;

    if (this.registerForm.invalid) { return; }

    alert('SUCCESS!! :-)\n\n' + JSON.stringify(this.registerForm.value));

  }

  get attribute() { return this.registerForm.controls; }

  onLoginClick(){
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
