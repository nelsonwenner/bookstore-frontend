import { ToastrService } from 'ngx-toastr';
import { Component, OnInit, OnDestroy } from '@angular/core';

/* Add import */
import { MatIconRegistry } from '@angular/material/icon';
import { DomSanitizer } from '@angular/platform-browser';
import { BookService } from '../../core/services/book.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Book } from 'src/app/core/models/book';
import { CartService } from 'src/app/core/services/cart.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})

export class HomeComponent implements OnInit, OnDestroy {

  private subscription = [];

  private carouselOptions = {
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

  private books: Array<Book>;

  private default = new Array(12);

  constructor(private activatedRoute: ActivatedRoute,
              private bookService: BookService,
              private cartService: CartService,
              iconRegistry: MatIconRegistry,
              private toastr: ToastrService,
              sanitizer: DomSanitizer,
              private router: Router) { }

  ngOnInit() {

    this.subscription.push(this.bookService.getAllBooks(1)
      .subscribe(response => {
      if (!response.status) { this.books = response.results; }
    }));

  }

  ngOnDestroy() {

    this.subscription.forEach(sub => sub.unsubscribe());

  }

  private addToCart(book): void {
    this.cartService.addToCart({book, quantity: 1});

    this.toastr.success('Product Added to the Cart', null, {
      progressAnimation: 'decreasing',
      positionClass: 'toast-bottom-right',
      progressBar: true,
      closeButton: true,
      timeOut: 3000,
    });
  }

  private getBook(id: number): void {
    this.router.navigate([`books/${id}`]);
  }
}
