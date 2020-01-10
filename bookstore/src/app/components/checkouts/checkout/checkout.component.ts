import { CartService } from 'src/app/core/services/cart.service';
import { CartBaseComponent } from './../../carts/cart-popup/cart-base.component';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.scss']
})

export class CheckoutComponent extends CartBaseComponent {

  constructor(protected cartService: CartService) {
    super(cartService);
  }

  ngOnInit() { }

}
