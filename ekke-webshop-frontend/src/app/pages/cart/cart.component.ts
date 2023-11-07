import { Component, computed, effect, inject, signal } from '@angular/core';
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
import { PaymentWarningDialog } from 'src/app/dialogs/payment-warning.dialog';
import { MapperService } from 'src/app/services/mapper.service';
import { ProductsService } from 'src/app/services/products.service';
import { MobilePayDialog } from 'src/app/dialogs/mobile-pay.dialog';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss'],
})
export class CartComponent {
  private addressService = inject(AddressService);
  private orderService = inject(OrderService);
  private productService = inject(ProductsService);
  private router = inject(Router);
  protected mapperService = inject(MapperService);

  protected cartService = inject(CartService);
  protected paymentService = inject(PaymentService);
  protected userHandlerService = inject(UserHandlerService);
  protected errorMessageService = inject(ErrorMessageService);
  protected dialog = inject(MatDialog);

  protected succesfulPayment = signal(false);
  protected pendingPayment = signal(false);

  protected productsPrice = this.cartService.cartProductsPrice;
  protected deliveryFee = signal<number>(0);
  protected totalPrice = computed(() => {
    return this.productsPrice() + this.deliveryFee();
  });

  protected errorMessage = '';

  protected addressForm = new FormGroup({
    country: new FormControl<string>('', [
      Validators.required,
      Validators.maxLength(20),
    ]),
    zipCode: new FormControl<string>('', [
      Validators.required,
      Validators.maxLength(20),
    ]),
    city: new FormControl<string>('', [
      Validators.required,
      Validators.maxLength(20),
    ]),
    streetName: new FormControl<string>('', [
      Validators.required,
      Validators.maxLength(20),
    ]),
    streetType: new FormControl<string>('', [
      Validators.required,
      Validators.maxLength(20),
    ]),
    houseNumber: new FormControl<string>('', [
      Validators.required,
      Validators.maxLength(20),
    ]),
    apartment: new FormControl<string>('', Validators.maxLength(20)),
    floor: new FormControl<string>('', Validators.maxLength(20)),
    door: new FormControl<string>('', Validators.maxLength(20)),
  });
  protected deliveryMode = '';
  protected dataHandlingStatement = false;

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
                txhash: this.paymentService.transactionHash(),
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

    effect(() => {
      if (this.pendingPayment()) {
        this.addressForm.disable();
      } else {
        this.addressForm.enable();
        this.closeDialogs();
      }
    });

    this.preloadUserAddress();
  }

  async pay() {
    this.pendingPayment.set(true);
    this.errorMessage = '';
    try {
      await this.checkProductAvailabilityByQuantity();
    } catch (error) {
      this.errorMessage = (error as Error).message;
      this.pendingPayment.set(false);
      return;
    }
    await this.paymentService
      .connect()
      .then(async () => {
        if (await this.openDialog(this.paymentService.accounts)) {
          this.openWarningDialog();
          this.paymentService
            .purchase(this.totalPrice())
            .then((isTransactionValid) => {
              if (!isTransactionValid) {
                this.errorMessage =
                  'Sikertelen fizetés, kérjük vedd fel a kapcsolatot az ügyfélszolgálattal.';
                this.pendingPayment.set(false);
              } else {
                try {
                  this.subtractProductQuantities();
                } catch (error) {
                  this.errorMessage = (error as Error).message;
                  this.pendingPayment.set(false);
                  return;
                }
              }
            })
            .catch(() => {
              this.errorMessage = 'Sikertelen fizetés, kérjük próbáld újra.';
              this.pendingPayment.set(false);
            });
        } else {
          this.errorMessage = 'Sikertelen fizetés, kérjük próbáld újra.';
          this.pendingPayment.set(false);
        }
      })
      .catch(() => {
        this.errorMessage =
          'Nem találtunk MetaMask fiókot, kérjük telepítsd fel a bővítményt a következő oldalon: <a href="https://metamask.io/" target="_blank">metamask.io</a>';
        this.pendingPayment.set(false);
      });
  }

  async payWithApp() {
    this.pendingPayment.set(true);
    this.errorMessage = '';
    try {
      await this.checkProductAvailabilityByQuantity();
    } catch (error) {
      this.errorMessage = (error as Error).message;
      this.pendingPayment.set(false);
      return;
    }
    if (await this.openAppDialog(this.totalPrice())) {
      this.openWarningDialog();
      this.paymentService
        .purchaseInApp(this.totalPrice())
        .then((isTransactionValid) => {
          if (!isTransactionValid) {
            this.errorMessage =
              'Sikertelen fizetés, kérjük vedd fel a kapcsolatot az ügyfélszolgálattal.';
            this.pendingPayment.set(false);
          } else {
            try {
              this.subtractProductQuantities();
            } catch (error) {
              this.errorMessage = (error as Error).message;
              this.pendingPayment.set(false);
              return;
            }
          }
        })
        .catch(() => {
          this.errorMessage = 'Sikertelen fizetés, kérjük próbáld újra.';
          this.pendingPayment.set(false);
        });
    } else {
      this.pendingPayment.set(false);
    }
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
    if (!this.dataHandlingStatement) {
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

  openWarningDialog() {
    this.dialog.open(PaymentWarningDialog);
  }

  async openAppDialog(dialogData: any) {
    const dialogRef = this.dialog.open(MobilePayDialog, {
      data: dialogData,
    });

    return await firstValueFrom(dialogRef.afterClosed());
  }

  closeDialogs() {
    this.dialog.closeAll();
  }

  goToOrders() {
    this.succesfulPayment.set(false);
    this.router.navigateByUrl('/profile/orders');
  }

  onDeliveryModeChanged() {
    if (this.deliveryMode === 'delivery') {
      this.deliveryFee.set(100);
    } else {
      this.deliveryFee.set(0);
    }
  }

  async preloadUserAddress() {
    const userId = this.userHandlerService.userLoggedIn();
    if (userId) {
      const address = await firstValueFrom(
        this.addressService.getUserAddressByUserId(userId)
      );
      if (address) {
        this.addressForm.controls.country.setValue(address.country);
        this.addressForm.controls.zipCode.setValue(address.zipCode);
        this.addressForm.controls.city.setValue(address.city);
        this.addressForm.controls.streetName.setValue(address.streetName);
        this.addressForm.controls.streetType.setValue(address.streetType);
        this.addressForm.controls.houseNumber.setValue(address.houseNumber);
        this.addressForm.controls.apartment.setValue(address.apartment);
        this.addressForm.controls.floor.setValue(address.floor);
        this.addressForm.controls.door.setValue(address.door);
      }
    }
  }

  async checkProductAvailabilityByQuantity() {
    const products = this.cartService.cart();
    for (const product of products) {
      await firstValueFrom(
        this.productService.checkProductAvailabilityByQuantity(
          product.id,
          product.selectedQuantity
        )
      )
        .then((response) => {
          if (response.message === 'Nincs elegendő termék raktáron.') {
            throw new Error(
              response.message +
                ' (' +
                product.name +
                ', ' +
                this.mapperService.mapProductTypeName(product.type) +
                ', ' +
                product.size +
                ', ' +
                this.mapperService.mapProductColorName(product.color) +
                ')'
            );
          } else if (response.error) {
            throw new Error(response.message);
          }
        })
        .catch((response) => {
          throw new Error(response.message);
        });
    }
  }

  async subtractProductQuantities() {
    const products = this.cartService.cart();
    for (const product of products) {
      await firstValueFrom(
        this.productService.subtractProductQuantityById({
          id: product.id,
          quantity: product.selectedQuantity,
        })
      )
        .then((response) => {
          if (response.message === 'Nincs elegendő termék raktáron.') {
            throw new Error(
              'Sikertelen fizetés, kérjük vedd fel a kapcsolatot az ügyfélszolgálattal.'
            );
          } else if (response.error) {
            throw new Error(response.message);
          }
        })
        .catch((response) => {
          throw new Error(response.message);
        });
    }
  }
}
