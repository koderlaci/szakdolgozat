import { Component, inject, signal } from '@angular/core';
import { CartService } from 'src/app/services/cart.service';
import { PaymentService } from 'src/app/services/payment.service';
import { UserHandlerService } from 'src/app/services/user-handler.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss'],
})
export class CartComponent {
  protected cartService = inject(CartService);
  protected paymentService = inject(PaymentService);
  protected userHandlerService = inject(UserHandlerService);

  protected succesfulPayment = signal(false);

  protected productsPrice = this.cartService.getCartProductsPrice();
  protected deliveryFee = 100;
  protected totalPrice: number;

  constructor() {
    this.succesfulPayment.set(false);
    this.totalPrice = this.productsPrice + this.deliveryFee;
  }

  pay() {
    this.paymentService
      .purchase(this.totalPrice)
      .then(() => {
        console.log('sikeres fizetes');
        this.cartService.clearCart();
        this.succesfulPayment.set(true);
      })
      .catch((e) => {
        console.log('valami hiba tortent: ' + e);
      });
  }

  isPayButtonDisabled(): boolean {
    if (this.productsPrice === 0) {
      return true;
    }
    if (!this.userHandlerService.userLoggedIn()) {
      return true;
    }

    return false;
  }
}
