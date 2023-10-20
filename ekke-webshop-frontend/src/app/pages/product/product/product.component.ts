import { Component, OnInit, effect, inject } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { firstValueFrom } from 'rxjs';
import { CartService } from 'src/app/services/cart.service';
import { ProductsService } from 'src/app/services/products.service';

export type Product = {
  variantId: string;
  name: string;
  price: number;
  colors: string[];
  sizes: string[];
};

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss'],
})
export class ProductComponent {
  private cartService = inject(CartService);
  private productsService = inject(ProductsService);
  private route = inject(ActivatedRoute);

  protected productDetailsForm = new FormGroup({
    color: new FormControl('', Validators.required),
    size: new FormControl('', Validators.required),
  });

  protected product: Product = {
    variantId: '',
    name: '',
    price: 0,
    colors: [],
    sizes: [],
  };

  protected errorMessage = '';

  constructor() {
    this.route.paramMap.subscribe(async (params) => {
      const product = await firstValueFrom(
        this.productsService.getProductForProductPageByVariantId(
          params.get('variant') as string
        )
      );
      this.product = product;
    });
  }

  async onColorChange(color: string) {
    const sizes: string[] = await firstValueFrom(
      this.productsService.getProductSizesByVariantIdAndColor(
        this.product.variantId,
        color
      )
    );
    this.product.sizes = sizes;
    this.productDetailsForm.controls.size.reset();
  }

  async addProductToCart() {
    const product = {
      variantId: this.product.variantId,
      color: this.productDetailsForm.controls.color.value,
      size: this.productDetailsForm.controls.size.value,
    };

    if (product.variantId && product.color && product.size) {
      const productToCart = await firstValueFrom(
        this.productsService.getProductByDetails(
          product.variantId,
          product.color,
          product.size
        )
      );

      if (this.cartService.getCartProductsCount() >= 20) {
        this.errorMessage = 'A kosárba maximum 20 db terméket helyezhetsz.';
      } else {
        this.errorMessage = '';
        this.cartService.addProductToCart(productToCart);
      }
    }
  }
}
