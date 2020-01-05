import { Router } from '@angular/router';
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
              private eleref: ElementRef,
              private router: Router) {

    super(cartService);
  }

  ngOnInit() {

    this.cartService.getToggleCartSubject().subscribe(res => {
        this.isVisible = res;
    });
  }

  private onPageClick(event): void {
    if (this.isVisible && !this.eleref.nativeElement.contains(event.target) &&
        event.target.className !== 'cart-remove') {
      this.cartService.toggleCart();
    }
  }

  emptyCart() {
    console.log('oiii')
    if (this.cartList.length) {

      this.router.navigate(['/carts']);
    }
  }
}
