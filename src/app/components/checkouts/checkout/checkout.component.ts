import { Cart } from './../../../core/models/cart';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';
import { ItemOrderService } from './../../../core/services/item-order.service';
import { OrderService } from './../../../core/services/order.service';
import { CreditCardService } from './../../../core/services/credit-card.service';
import { AddressService } from './../../../core/services/address.service';
import { CreditCard } from './../../../core/models/creditcard';
import { Address } from './../../../core/models/address';
import { Client } from './../../../core/models/client';
import { AuthService } from './../../../core/services/auth.service';
import { CartService } from 'src/app/core/services/cart.service';
import { CartBaseComponent } from './../../carts/cart-popup/cart-base.component';
import { Component, OnInit } from '@angular/core';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.scss']
})

export class CheckoutComponent extends CartBaseComponent {

  private currentUser: Client = this.authService.getCurrentUser();

  private subscription = [];

  private creditcard: CreditCard;
  private addresss: Address;

  constructor(private creditCartService: CreditCardService,
              private itemOrderService: ItemOrderService,
              private ngxService: NgxUiLoaderService,
              private orderService: OrderService,
              protected cartService: CartService,
              private authService: AuthService,
              private address: AddressService,
              private toastr: ToastrService,
              private router: Router) {

    super(cartService);

    this.getAddress();
    this.getCreditCart();

  }

  ngOnInit() { }

  createOrder(): void {

    this.subscription.push(this.orderService.order({client: this.currentUser.url,
    status: environment.status_sale_default})
    .subscribe(response => {

      this.cartList.forEach(cart => {

        this.itemOrderService.itemOrder({
          book: cart.book.url,
          order: response.url,
          amount: cart.quantity })
        .subscribe(resp => { console.log(resp); });

      });

      this.loading();
    }));

  }

  getAddress(): void {
    if (!!this.authService.getCurrentUser()) {
      const client = this.authService.getCurrentUser();

      this.addresss = client.address;

    }
  }

  getCreditCart(): void {
    if (!!this.authService.getCurrentUser()) {
      const client = this.authService.getCurrentUser();

      this.creditcard = client.credit_card;

    }
  }

  loading(): Promise<any> {
    this.ngxService.start();

    return new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve(this.ngxService.stop());

        resolve(this.toastr.success('Order completed successfully', null, {
          progressAnimation: 'decreasing',
          positionClass: 'toast-center-center',
          progressBar: true,
          closeButton: true,
          timeOut: 15000,
        }));

        resolve(this.router.navigate(['home']));
      }, 10000);
    });
  }

}
