import { Injectable, computed, effect, inject, signal } from '@angular/core';
import { CartProduct, EndProduct } from '../types/types';
import { UserHandlerService } from './user-handler.service';
import { CartApiService } from 'api-generated';
import { firstValueFrom } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  private userHandlerService = inject(UserHandlerService);
  private cartApiService = inject(CartApiService);

  public cart = signal<CartProduct[]>([]);
  public cartProductsPrice = computed(() => {
    let sum = 0;

    this.cart().forEach((product) => {
      sum = sum + product.price * product.selectedQuantity;
    });

    return sum;
  });
  public itemAddedToCart = signal<number | null>(null);

  constructor() {
    this.setCart();
    this.userHandlerService.userLoggedIn_.subscribe((loggedIn) => {
      if (loggedIn === null) {
        return;
      }
      if (loggedIn) {
        const userId = this.userHandlerService.userLoggedIn();
        if (userId) {
          this.syncCart(userId);
        }
      } else {
        this.clearCart();
      }
    });
  }

  async setCart() {
    const userId = this.userHandlerService.userLoggedIn();
    if (userId) {
      const dbCart = await firstValueFrom(
        this.cartApiService.getAllCartProductsByUserId(userId)
      );
      this.cart.set(dbCart);
    } else {
      const sessionCart = sessionStorage.getItem('cart');
      if (sessionCart) {
        this.cart.set(JSON.parse(sessionCart));
      }
    }
  }

  async addProductToCart(product: EndProduct) {
    let tempCart = this.cart();
    const tempProduct = tempCart.find((pr) => pr.id === product.id);

    if (tempProduct) {
      tempProduct.selectedQuantity++;
    } else {
      tempCart.push({
        ...product,
        selectedQuantity: 1,
      });
    }
    this.cart.set(tempCart);
    this.itemAddedToCart.set(Date.now());

    const userId = this.userHandlerService.userLoggedIn();
    if (userId) {
      await firstValueFrom(
        this.cartApiService.addCartItem({
          userId: userId,
          productId: product.id,
          date: new Date().toString(),
        })
      );
    } else {
      sessionStorage.setItem('cart', JSON.stringify(this.cart()));
    }
  }

  async removeProductFromCart(productId: number) {
    const tempCart = this.cart();
    const userId = this.userHandlerService.userLoggedIn();

    if (userId) {
      await firstValueFrom(
        this.cartApiService.deleteCartItemByProductIdAndUserId(
          productId,
          userId
        )
      );
    }

    const productInTempCartIndex = tempCart.findIndex(
      (prd) => prd.id === productId
    );

    if (tempCart[productInTempCartIndex].selectedQuantity > 1) {
      tempCart[productInTempCartIndex].selectedQuantity--;
    } else {
      tempCart.splice(productInTempCartIndex, 1);
    }

    this.cart.set(tempCart);

    if (!userId) {
      sessionStorage.setItem('cart', JSON.stringify(this.cart()));
    }
  }

  getCartProductsCount() {
    let count = 0;

    this.cart().forEach((product) => {
      count = count + product.selectedQuantity;
    });

    return count;
  }

  async clearCart(userId?: number) {
    this.cart.set([]);
    if (userId) {
      await firstValueFrom(
        this.cartApiService.disableCurrentCreateNewCart({ userId })
      );
    }
  }

  async syncCart(userId: number) {
    for (const item of this.cart()) {
      if (item.selectedQuantity > 1) {
        for (let i = 0; i < item.selectedQuantity; i++) {
          await firstValueFrom(
            this.cartApiService.addCartItem({
              userId: userId,
              productId: item.id,
              date: new Date().toString(),
            })
          );
        }
      } else {
        await firstValueFrom(
          this.cartApiService.addCartItem({
            userId: userId,
            productId: item.id,
            date: new Date().toString(),
          })
        );
      }
    }

    const newCart = await firstValueFrom(
      this.cartApiService.getAllCartProductsByUserId(userId)
    );

    this.cart.set(newCart);
  }

  getActiveCartByUserId(userId: number) {
    return this.cartApiService.getActiveCartByUserId(userId);
  }
}
