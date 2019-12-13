import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-slider',
  templateUrl: './slider.component.html',
  styleUrls: ['./slider.component.css']
})

export class SliderComponent implements OnInit {

  carouselOptions = {
    animateOut: 'bounceOutRight',
    animateIn: 'bounceInLeft',
    items: 1,
    dots: true,
    navigation: false,
    loop:true,
    margin:10,
    autoplay:true,
    autoHeight: true,
    autoHeightClass: 'owl-height',
  }


  images = [1, 2, 3, 4].map(() => `https://picsum.photos/1060/250?random&t=${Math.random()}`);

  constructor() { }

  ngOnInit() {
  }

}
