import { Injectable, inject } from '@angular/core';
import { ProductType } from '../types/types';
import { ProductService } from 'api-generated';

@Injectable({
  providedIn: 'root',
})
export class ProductsService {
  private productService = inject(ProductService);

  getProducts(type: ProductType) {
    switch (type) {
      case ProductType.MEN:
        return this.productService.getMenProducts();

      case ProductType.WOMEN:
        return this.productService.getWomenProducts();

      case ProductType.ACCESSARY:
        return this.productService.getAccessaryProducts();
    }
  }

  getAllProductsForProductSlider() {
    return this.productService.getSliderProducts();
  }

  getProductForProductPageByVariantId(variantId: string) {
    return this.productService.getProduct(variantId);
  }
}
