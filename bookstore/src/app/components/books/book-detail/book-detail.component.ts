import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Book } from 'src/app/models/book';
import { Subscription } from 'rxjs';
import { BookService } from 'src/app/services/book.service';

@Component({
  selector: 'app-book-detail',
  templateUrl: './book-detail.component.html',
  styleUrls: ['./book-detail.component.css']
})
export class BookDetailComponent implements OnInit, OnDestroy  {

  subscriptionBooks: Subscription;
  book: Book;

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

  constructor(private activatedRoute: ActivatedRoute,
              private bookService: BookService) {

  this.subscriptionBooks = this.bookService.getBook(this.activatedRoute.snapshot.params.id).
  subscribe(response => { this.book = response; });

  }

  ngOnInit() { }

  ngOnDestroy() {

    if (this.subscriptionBooks) {
      this.subscriptionBooks.unsubscribe();
    }
  }

}
