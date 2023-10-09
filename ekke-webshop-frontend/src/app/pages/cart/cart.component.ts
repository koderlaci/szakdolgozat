import { Component, inject, signal } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { CartService } from 'src/app/services/cart.service';
import { ErrorMessageService } from 'src/app/services/error-messages.service';
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
  protected errorMessageService = inject(ErrorMessageService);

  protected succesfulPayment = signal(false);

  protected productsPrice = this.cartService.getCartProductsPrice();
  protected deliveryFee = 100;
  protected totalPrice: number;

  protected form = new FormGroup({
    country: new FormControl(null, [Validators.required]),
    zipCode: new FormControl(null, [Validators.required]),
    city: new FormControl(null, [Validators.required]),
    streetName: new FormControl(null, [Validators.required]),
    streetType: new FormControl(null, [Validators.required]),
    houseNumber: new FormControl(null, [Validators.required]),
    apartment: new FormControl(null),
    floor: new FormControl(null),
    door: new FormControl(null),
  });

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
    if (this.form.invalid) {
      return true;
    }

    return false;
  }
}
