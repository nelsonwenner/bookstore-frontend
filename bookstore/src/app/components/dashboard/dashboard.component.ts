import { Component, OnInit } from '@angular/core';

/* Add imports */
import { Router } from "@angular/router";

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})

export class DashboardComponent implements OnInit {

  private currentUser = JSON.parse(localStorage.getItem('currentUser'));

  constructor(private router: Router) { }

  ngOnInit() {

    console.log(this.currentUser.username);

  }
}
