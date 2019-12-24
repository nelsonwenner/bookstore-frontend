import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';

/* Add import */
import { MatIconRegistry } from '@angular/material/icon';
import { DomSanitizer } from '@angular/platform-browser';
import { BookService } from '../../services/book.service';
import { Router } from '@angular/router';
import { Book } from 'src/app/models/book';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})

export class HomeComponent implements OnInit, OnDestroy {

  subscriptionBooks: Subscription;

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

  books: Book[];

  default = new Array(12);

  constructor(private bookService: BookService,
              iconRegistry: MatIconRegistry,
              sanitizer: DomSanitizer,
              private router: Router) {

    this.subscriptionBooks = this.bookService.getAllBooks(1)
    .subscribe(response => {

      if (!response.status) { this.books = response.results; }

    });

  }

  ngOnInit() { }

  ngOnDestroy() {

    if (this.subscriptionBooks) {
      this.subscriptionBooks.unsubscribe();
    }

  }
}
