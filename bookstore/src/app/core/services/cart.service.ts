import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Book } from '../models/book';
import { Cart } from '../models/cart';

@Injectable({
  providedIn: 'root'
})

export class CartService {

  public cartListSubject = new BehaviorSubject([]);
  public toggleCartSubject = new BehaviorSubject(false);

  constructor() { }

  toggleCart() {
    this.toggleCartSubject.next(!this.toggleCartSubject.getValue());
  }

  addToCart(cart: Cart): void {
    let current = this.cartListSubject.getValue();
    let currentCart = current.find(c => c.book.title === cart.book.title);
    if (currentCart) { currentCart.quantity += cart.quantity; }
    else current.push(cart);
    this.cartListSubject.next(current);
  }

  reloadCart(cartList): void {
    this.cartListSubject.next(cartList);
  }

  removeCart(index): void {
    let current = this.cartListSubject.getValue();
    current.splice(index, 1);
    this.cartListSubject.next(current);
  }
}
