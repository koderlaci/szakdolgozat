import { Component } from '@angular/core';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss'],
})
export class CartComponent {
  protected productsPrice = 500;
  protected deliveryFee = 100;
  protected totalPrice: number;

  constructor() {
    this.totalPrice = this.productsPrice + this.deliveryFee;
  }

  pay() {
    console.log('pay');
  }
}
