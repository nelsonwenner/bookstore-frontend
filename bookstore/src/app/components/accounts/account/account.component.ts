import { AuthService } from './../../../core/services/auth.service';
import { Client } from './../../../core/models/client';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.css']
})

export class AccountComponent implements OnInit {

  private currentUser: Client;

  constructor(private authService: AuthService) { }

  ngOnInit() {
  
    this.currentUser = this.authService.getCurrentUser();

  }

}
