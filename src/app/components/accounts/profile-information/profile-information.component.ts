import { FormGroup, FormBuilder } from '@angular/forms';
import { AuthService } from './../../../core/services/auth.service';
import { Client } from './../../../core/models/client';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-profile-information',
  templateUrl: './profile-information.component.html',
  styleUrls: ['./profile-information.component.css']
})
export class ProfileInformationComponent implements OnInit {

  private currentUser: Client = this.authService.getCurrentUser();

  profileForm: FormGroup;

  constructor(private authService: AuthService,
              private fb: FormBuilder) { }

  ngOnInit() {

    this.profileForm = this.fb.group({
      firstName: [''],
      lastName: [''],
      gender: [],
      mobile: [],
      email: []
    });

  }

}
