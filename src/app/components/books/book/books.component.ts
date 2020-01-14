import { CartService } from 'src/app/core/services/cart.service';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { ToastrService } from 'ngx-toastr';

/* Add imports */
import { ActivatedRoute, Router } from '@angular/router';
import { BookService } from 'src/app/core/services/book.service';
import { Book } from 'src/app/core/models/book';

@Component({
  selector: 'app-books',
  templateUrl: './books.component.html',
  styleUrls: ['./books.component.css']
})

export class BooksComponent implements OnInit, OnDestroy {

  private subscription = [];

  private applyFilter: boolean = false;
  private itemsPerPage: number = 12;
  private currentPage: number = 1;
  private totalPages: any = [];

  private carouselOptions = {
    items: 1,
    dots: false,
    navigation: false,
    loop: true,
    margin: 10,
    autoplay: true,
    animateOut: 'fadeOut',
    autoHeight: true,
    autoHeightClass: 'owl-height'
  };

  private books: Array<Book>;

  private default = new Array(12);

  constructor(private activatedRoute: ActivatedRoute,
              private cartService: CartService,
              private bookService: BookService,
              private toastr: ToastrService,
              private router: Router) { }

  ngOnInit() {

    this.subscription.push(this.activatedRoute.queryParams
    .subscribe(query => this.loadPage(query.page || 1)));

  }

  ngOnDestroy() {

   this.subscription.forEach(sub => sub.unsubscribe());

  }

  private loadPage(page: number): void {

    this.subscription.push(this.bookService.getAllBooks(page)
      .subscribe(response => {

      this.totalPages = this.countPages(response.count, 12);

      this.currentPage = page;

      if (!response.status) {
        this.books = response.results;
      }
    }));
  }

  private countPages(amountItems, itemsPerPage) {
    const totalPages: any = [];

    let amountPages = Math.round((amountItems + 1) / itemsPerPage);

    if (Math.round((amountItems + 1)) % 12 !== 0) { amountPages++; }

    for (let i = 1; i <= amountPages; i++) { totalPages.push(i); }

    return totalPages;
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
