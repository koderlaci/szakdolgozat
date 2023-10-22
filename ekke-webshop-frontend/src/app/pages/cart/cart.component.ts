import { Component, computed, inject, signal } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { firstValueFrom } from 'rxjs';
import { AccountChooserDialog } from 'src/app/dialogs/account-chooser.dialog';
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
  protected dialog = inject(MatDialog);

  protected succesfulPayment = signal(false);
  protected pendingPayment = signal(false);

  protected productsPrice = this.cartService.cartProductsPrice;
  protected deliveryFee = signal<number>(100);
  protected totalPrice = computed(() => {
    return this.productsPrice() + this.deliveryFee();
  });

  protected errorMessage = '';

  protected form = new FormGroup({
    country: new FormControl<string | null>('null', [Validators.required]),
    zipCode: new FormControl<string | null>('null', [Validators.required]),
    city: new FormControl<string | null>('null', [Validators.required]),
    streetName: new FormControl<string | null>('null', [Validators.required]),
    streetType: new FormControl<string | null>('null', [Validators.required]),
    houseNumber: new FormControl<string | null>('null', [Validators.required]),
    apartment: new FormControl<string | null>('null'),
    floor: new FormControl<string | null>('null'),
    door: new FormControl<string | null>('null'),
    deliveryMethod: new FormControl<boolean | null>(true, [
      Validators.required,
    ]),
  });

  constructor() {
    this.paymentService.transactionMined.subscribe((receipt) => {
      if (receipt && Number(receipt.status) === 1) {
        this.cartService.clearCart();
        this.succesfulPayment.set(true);
      } else if (receipt) {
        this.errorMessage = 'Sikertelen fizetés, kérjük próbáld újra.';
      }
      this.pendingPayment.set(false);
    });
  }

  async pay() {
    this.pendingPayment.set(true);
    await this.paymentService
      .connect()
      .then(async () => {
        if (await this.openDialog(this.paymentService.accounts)) {
          this.paymentService
            .purchase(this.totalPrice())
            .then((isTransactionValid) => {
              if (!isTransactionValid) {
                this.errorMessage = 'Sikertelen fizetés, kérjük próbáld újra.';
                this.pendingPayment.set(false);
              }
            })
            .catch(() => {
              this.errorMessage = 'Sikertelen fizetés, kérjük próbáld újra.';
              this.pendingPayment.set(false);
            });
        } else {
          this.pendingPayment.set(false);
        }
      })
      .catch(() => {
        this.errorMessage =
          'Nem találtunk MetaMask fiókot, kérjük telepítsd fel a bővítményt a következő oldalon: <a href="https://metamask.io/" target="_blank">metamask.io</a>';
        this.pendingPayment.set(false);
      });
  }

  isPayButtonDisabled(): boolean {
    if (this.productsPrice() === 0) {
      return true;
    }
    if (!this.userHandlerService.userLoggedIn()) {
      return true;
    }
    if (this.form.invalid) {
      return true;
    }
    if (this.pendingPayment()) {
      return true;
    }

    return false;
  }

  removeProduct(productId: number) {
    this.cartService.removeProductFromCart(productId);
  }

  async openDialog(dialogData: any) {
    const dialogRef = this.dialog.open(AccountChooserDialog, {
      data: dialogData,
    });

    return await firstValueFrom(dialogRef.afterClosed());
  }
}
