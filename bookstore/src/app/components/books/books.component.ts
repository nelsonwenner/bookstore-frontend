import { Component, OnInit } from '@angular/core';

/* Add imports */
import { Router } from '@angular/router';
import { BookService } from 'src/app/services/book.service';

@Component({
  selector: 'app-books',
  templateUrl: './books.component.html',
  styleUrls: ['./books.component.css']
})

export class BooksComponent implements OnInit {

  applyFilter: boolean = false;

  carouselOptions = {
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

  books: [];

  default = new Array(12);

  constructor(private bookService: BookService,
              private router: Router) {

    this.bookService.getAllBooks().subscribe(response => {

      if (!response.status) { this.books = response.results; }

    });
  }

  ngOnInit() {}

  preserveFilterName:string;
  showFilter: boolean = false;

  showOption(selectedOption: string){
    if (selectedOption === this.preserveFilterName) {
      this.showFilter = false;
      this.preserveFilterName = null;
    } else {
      this.showFilter = true;
      this.preserveFilterName = selectedOption;
    }
  }

}
