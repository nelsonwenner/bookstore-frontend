import { Component, OnInit, ViewChildren, QueryList, OnDestroy } from '@angular/core';
import { CartService } from 'src/app/core/services/cart.service';
import { User } from './../../../core/models/user';

/* Add imports */
import { MatDialog } from '@angular/material';
import { LoginComponent } from '../../login/login.component';
import { AuthService } from '../../../core/services/auth.service';
import { MdePopoverTrigger } from '@material-extended/mde';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})

export class HeaderComponent implements OnInit, OnDestroy {

  subscription = [];
  currentUser: User;
  cartCountItem = 0;

  @ViewChildren(MdePopoverTrigger) trigger: QueryList<MdePopoverTrigger>;

  constructor(private authService: AuthService,
              private cartService: CartService,
              public dialog: MatDialog) { }

  ngOnInit() {

    this.observerCart();
    this.observerLogin();

  }

  ngOnDestroy() {

    this.subscription.forEach(sub => sub.unsubscribe());

  }

  toggleCartPopup(event) {
    event.preventDefault();
    event.stopPropagation();
    this.cartService.toggleCart();
  }

  openLoginDialog(): void {
    const dialogRef = this.dialog.open(LoginComponent, {
    });

    this.subscription.push(dialogRef.afterClosed().
      subscribe(result => {
      console.log('The dialog was closed');
    }));
  }

  logout(): void {
    this.currentUser = null;
    this.authService.logout();
  }

 observerCart(): void {
  this.subscription.push(this.cartService.cartListSubject.
    subscribe(response => {
    this.cartCountItem = response.length;
  }));
 }

 observerLogin(): void {
  this.currentUser = this.authService.getCurrentUser();
  this.subscription.push(this.authService.getObserverIsLogged().
    subscribe(isLogged => {
    if (isLogged) {
      this.currentUser = this.authService.getCurrentUser();
    }
  }));
 }

}
