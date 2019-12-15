import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})

export class HomeComponent implements OnInit {

  carouselOptions = {
    items: 1,
    dots: false,
    center: true,
    navigation: false,
    loop:true,
    margin:10,
    autoplay:true,
    animateOut: 'fadeOut',
    autoHeight: true,
    autoHeightClass: 'owl-height',
  }

  images:[];

  default = new Array(18);

  constructor() { }

  ngOnInit() {
  }

}
