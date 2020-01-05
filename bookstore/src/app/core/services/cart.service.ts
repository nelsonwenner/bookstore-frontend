import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Book } from '../models/book';
import { Cart } from '../models/cart';

@Injectable({
  providedIn: 'root'
})

export class CartService {

  private cartListSubject = new BehaviorSubject([]);
  private toggleCartSubject = new BehaviorSubject(false);

  constructor() { }

  public toggleCart(): void {
    this.toggleCartSubject.next(!this.toggleCartSubject.getValue());
  }

  public getCartListSubject() {
    return this.cartListSubject;
  }

  public getToggleCartSubject() {
    return this.toggleCartSubject;
  }

  public addToCart(cart: Cart): void {
    let current = this.cartListSubject.getValue();
    let currentCart = current.find(c => c.book.title === cart.book.title);
    if (currentCart) { currentCart.quantity += cart.quantity; }
    else current.push(cart);
    this.cartListSubject.next(current);
  }

  public reloadCart(cartList): void {
    this.cartListSubject.next(cartList);
  }

  public removeCart(index): void {
    let current = this.cartListSubject.getValue();
    current.splice(index, 1);
    this.cartListSubject.next(current);
  }
}
