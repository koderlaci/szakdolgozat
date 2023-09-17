import { Component, inject } from '@angular/core';
import { CartService } from 'src/app/services/cart.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss'],
})
export class CartComponent {
  protected cartService = inject(CartService);

  protected productsPrice = this.cartService.getCartProductsPrice();
  protected deliveryFee = 100;
  protected totalPrice: number;

  constructor() {
    this.totalPrice = this.productsPrice + this.deliveryFee;
  }

  pay() {
    console.log('pay');
  }
}
