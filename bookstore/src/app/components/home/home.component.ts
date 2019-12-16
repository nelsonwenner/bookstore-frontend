import { Component, OnInit } from '@angular/core';

/* Add import */
import { MatIconRegistry } from '@angular/material/icon';
import { DomSanitizer } from '@angular/platform-browser';
import { BookService } from '../../services/book.service';
import { Router } from '@angular/router';

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
    loop: true,
    margin: 10,
    autoplay: true,
    animateOut: 'fadeOut',
    autoHeight: true,
    autoHeightClass: 'owl-height',
  };

  books: [];

  default = new Array(6);

  constructor(private bookService: BookService,
              iconRegistry: MatIconRegistry,
              sanitizer: DomSanitizer,
              private router: Router) {

    this.bookService.getAllBooks().subscribe(response => {

      if (!response.status) { this.books = response.results; }

    });

  }

  ngOnInit() {
  }

}
