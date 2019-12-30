import { CartService } from 'src/app/core/services/cart.service';
import { CartBaseComponent } from './../cart-popup/cart-base.component';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent extends CartBaseComponent {

  constructor(protected cartService: CartService) {
    super(cartService);
  }

  ngOnInit() {}

  changeQuantity(cart, quantity): void {
    cart.quantity = quantity;
    this.cartService.reloadCart(this.cartList);
  }

}
