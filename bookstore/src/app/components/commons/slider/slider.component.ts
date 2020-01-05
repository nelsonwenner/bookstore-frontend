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
    loop: true,
    margin: 10,
    autoplay: true,
    autoHeight: true,
    autoHeightClass: 'owl-height',
  };

  banners = [

    {img: 'assets/images/banner/01.png'},
    {img: 'assets/images/banner/03.png'},
    {img: 'assets/images/banner/04.png'},
    {img: 'assets/images/banner/05.png'},
    {img: 'assets/images/banner/06.png'},
    {img: 'assets/images/banner/07.png'},
    {img: 'assets/images/banner/08.png'}

  ];

  constructor() { }

  ngOnInit() { }

}
