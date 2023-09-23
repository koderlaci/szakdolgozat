import { Injectable, effect, signal } from '@angular/core';
import { CartProduct, EndProduct } from '../types/types';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  public cart = signal<CartProduct[]>([]);
  public itemAddedToCart = signal<number | null>(null);

  addProductToCart(product: EndProduct) {
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
}
