import { LoginComponent } from './../../login/login.component';
import { MatDialog } from '@angular/material';
import { AuthService } from './../../../core/services/auth.service';
import { CartService } from 'src/app/core/services/cart.service';
import { CartBaseComponent } from './../cart-popup/cart-base.component';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})

export class CartComponent extends CartBaseComponent  {

  constructor(protected cartService: CartService,
              private authService: AuthService,
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
      this.router.navigate(['carts/checkouts']);
    } else {
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
