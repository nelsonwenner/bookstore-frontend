import { CartService } from 'src/app/core/services/cart.service';
import { Cart } from './../../../core/models/cart';

export class CartBaseComponent {
  public cartList: Cart[];
  public totalPrice: number;

  constructor(protected cartService: CartService) {
    this.loadCart();
  }

  loadCart(): void {
    this.cartService.cartListSubject
      .subscribe(res => {
        this.cartList = res;
        let total = 0;
        for(let cart of this.cartList) {
          total += cart.book.prince * cart.quantity;
        }
        this.totalPrice = total;
      });
  }

  removeFromCart(index): void {
    this.cartService.removeCart(index);
  }
}
