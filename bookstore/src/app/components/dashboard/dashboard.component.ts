import { Component, OnInit } from '@angular/core';

/* Add imports */
import { Router } from "@angular/router";

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})

export class DashboardComponent implements OnInit {

  private token = JSON.parse(localStorage.getItem('token'));

  constructor(private router: Router) { }

  ngOnInit() {

    console.log(this.token.username);
    
  }

  private logout() {

    localStorage.removeItem('token');
    this.router.navigate(['/login']);
  }
}
