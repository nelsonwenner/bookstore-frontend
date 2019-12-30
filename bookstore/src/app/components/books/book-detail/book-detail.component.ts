import { BookService } from 'src/app/core/services/book.service';
import { CartService } from 'src/app/core/services/cart.service';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription} from 'rxjs';


@Component({
  selector: 'app-book-detail',
  templateUrl: './book-detail.component.html',
  styleUrls: ['./book-detail.component.css']
})

export class BookDetailComponent implements OnInit, OnDestroy  {

  subscription = [];
  quantity: number = 1;
  book: any;

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
              private bookService: BookService,
              private cartService: CartService) {

    this.subscription.push(this.bookService.
      getBook(this.activatedRoute.snapshot.params.id).
      subscribe(response => {
      this.book = response;
    }));

  }

  ngOnInit() { }

  ngOnDestroy() {

    this.subscription.forEach(sub => sub.unsubscribe());

  }

  addToCart(book): void {
    if (this.quantity) {

      this.cartService.addToCart({book, quantity: this.quantity});

    }
  }

  changeQuantity(newQuantity: number): void {
    this.quantity = newQuantity;
  }

}
