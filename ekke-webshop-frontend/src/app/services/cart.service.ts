import { Injectable, effect, inject, signal } from '@angular/core';
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
  public itemAddedToCart = signal<number | null>(null);

  constructor() {
    this.userHandlerService.userLoggedIn_.subscribe((loggedIn) => {
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

    const userId = this.userHandlerService.userLoggedIn();

    if (userId) {
      await firstValueFrom(
        this.cartApiService.addCartItem({
          userId: userId,
          productId: product.id,
          date: new Date().toString(),
        })
      );
    }

    this.itemAddedToCart.set(Date.now());
    this.cart.set(tempCart);
  }

  removeProductFromCart(product: EndProduct) {
    const tempCart = this.cart();
    tempCart.splice(
      tempCart.findIndex((prd) => prd.id === product.id),
      1
    );
    this.cart.set(tempCart);
  }

  getCartProductsPrice() {
    let sum = 0;

    this.cart().forEach((product) => {
      sum = sum + product.price * product.selectedQuantity;
    });

    return sum;
  }

  getCartProductsCount() {
    let count = 0;

    this.cart().forEach((product) => {
      count = count + product.selectedQuantity;
    });

    return count;
  }

  clearCart() {
    this.cart.set([]);
  }

  async syncCart(userId: number) {
    for (const item of this.cart()) {
      await firstValueFrom(
        this.cartApiService.addCartItem({
          userId: userId,
          productId: item.id,
          date: new Date().toString(),
        })
      );
    }

    const newCart = await firstValueFrom(
      this.cartApiService.getAllCartProductsByUserId(userId)
    );
    const currentCart = this.cart();

    if (JSON.stringify(newCart) !== JSON.stringify(currentCart)) {
      this.cart.set(newCart);
    }
  }
}
