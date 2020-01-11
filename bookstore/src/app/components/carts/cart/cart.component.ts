import { CreditCardService } from './../../../core/services/credit-card.service';
import { AddressService } from './../../../core/services/address.service';
import { LoginComponent } from './../../login/login.component';
import { MatDialog } from '@angular/material';
import { AuthService } from './../../../core/services/auth.service';
import { CartService } from 'src/app/core/services/cart.service';
import { CartBaseComponent } from './../cart-popup/cart-base.component';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})

export class CartComponent extends CartBaseComponent  {

  private currentUser = JSON.parse(localStorage.getItem('currentUser'));

  constructor(private creditCardService: CreditCardService,
              private addressService: AddressService,
              protected cartService: CartService,
              private authService: AuthService,
              private toastr: ToastrService,
              public dialog: MatDialog,
              private router: Router) {

    super(cartService);
  }

  changeQuantity(cart, quantity): void {
    cart.quantity = quantity;
    this.cartService.reloadCart(this.cartList);
  }

  checkout(): void {
    if (this.authService.loggedIn()) {

      if (this.currentUser.address &&
        this.currentUser.credit_card) {
        this.router.navigate(['carts/checkouts']);

      } else {

        this.router.navigate(['accounts']);

        this.toastr.error('Register your address and credit card in your account.', null, {
          progressAnimation: 'decreasing',
          positionClass: 'toast-center-center',
          progressBar: true,
          closeButton: true,
          timeOut: 15000,
        });
      }

    } else {
      this.router.navigate(['home']);
      this.openLoginDialog();
    }
  }

  openLoginDialog(): void {
    const dialogRef = this.dialog.open(LoginComponent, {
    });

    dialogRef.afterClosed().
      subscribe(result => {
      console.log('The dialog was closed');
    });
  }

}
