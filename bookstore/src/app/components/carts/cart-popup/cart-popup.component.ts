import { CartService } from 'src/app/core/services/cart.service';
import { CartBaseComponent } from './cart-base.component';
import { Component, OnInit, HostBinding, ElementRef } from '@angular/core';

@Component({
  host: {'(document:click)': 'onPageClick($event)'},
  selector: 'app-cart-popup',
  templateUrl: './cart-popup.component.html',
  styleUrls: ['./cart-popup.component.css']
})

export class CartPopupComponent extends CartBaseComponent {
  @HostBinding("class.visible") isVisible:boolean = false;

  constructor(protected cartService: CartService,
              private eleref: ElementRef) {

    super(cartService);
  }

  ngOnInit() {

    this.cartService.toggleCartSubject.subscribe(res => {
        this.isVisible = res;
    });
  }

  onPageClick(event) {
    if (this.isVisible && !this.eleref.nativeElement.contains(event.target) &&
        event.target.className !== 'cart-remove') {
      this.cartService.toggleCart();
    }
  }
}
