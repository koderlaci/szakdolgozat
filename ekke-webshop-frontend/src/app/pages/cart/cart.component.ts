import { Component, computed, inject, signal } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { AddOrderAddressRequest } from 'api-generated';
import { filter, firstValueFrom, take, takeUntil } from 'rxjs';
import { AccountChooserDialog } from 'src/app/dialogs/account-chooser.dialog';
import { AddressService } from 'src/app/services/address.service';
import { CartService } from 'src/app/services/cart.service';
import { ErrorMessageService } from 'src/app/services/error-messages.service';
import { OrderService } from 'src/app/services/order.service';
import { PaymentService } from 'src/app/services/payment.service';
import { UserHandlerService } from 'src/app/services/user-handler.service';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss'],
})
export class CartComponent {
  private addressService = inject(AddressService);
  private orderService = inject(OrderService);
  private router = inject(Router);

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

  protected addressForm = new FormGroup({
    country: new FormControl<string>('', [Validators.required]),
    zipCode: new FormControl<string>('', [Validators.required]),
    city: new FormControl<string>('', [Validators.required]),
    streetName: new FormControl<string>('', [Validators.required]),
    streetType: new FormControl<string>('', [Validators.required]),
    houseNumber: new FormControl<string>('', [Validators.required]),
    apartment: new FormControl<string>(''),
    floor: new FormControl<string>(''),
    door: new FormControl<string>(''),
  });
  protected deliveryMode = '';

  constructor() {
    this.paymentService.transactionMined
      .pipe(
        filter((receipt) => receipt !== null),
        takeUntilDestroyed()
      )
      .subscribe(async (receipt) => {
        if (Number(receipt.status) === 1) {
          const orderAddress = await firstValueFrom(
            this.addressService.createOrderAddress(
              this.addressForm.getRawValue() as AddOrderAddressRequest
            )
          );

          const userId = this.userHandlerService.userLoggedIn();

          if (userId) {
            const activeCart = await firstValueFrom(
              this.cartService.getActiveCartByUserId(userId)
            );

            await firstValueFrom(
              this.orderService.createOrder({
                userId: userId,
                addressId: orderAddress.id,
                cartId: activeCart.id,
                price: this.totalPrice(),
                deliveryMode: this.deliveryMode,
                date: new Date().toString(),
              })
            )
              .then(() => {
                this.paymentService.transactionMined.next(null);
                this.cartService.clearCart(userId);
                this.succesfulPayment.set(true);
              })
              .catch(() => {
                this.errorMessage =
                  'Sikertelen fizetés, kérjük vedd fel a kapcsolatot az ügyfélszolgálattal.';
              });
          }
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
    if (this.addressForm.invalid || this.deliveryMode === '') {
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

  goBackToLanding() {
    this.succesfulPayment.set(false);
    this.router.navigateByUrl('/landing');
  }
}
