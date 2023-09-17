import { Injectable, inject } from '@angular/core';
import { ProductType } from '../types/types';
import { ProductApiService } from 'api-generated';

@Injectable({
  providedIn: 'root',
})
export class ProductsService {
  private productApiService = inject(ProductApiService);

  getProducts(type: ProductType) {
    switch (type) {
      case ProductType.MEN:
        return this.productApiService.getMenProducts();

      case ProductType.WOMEN:
        return this.productApiService.getWomenProducts();

      case ProductType.ACCESSARY:
        return this.productApiService.getAccessaryProducts();
    }
  }

  getAllProductsForProductSlider() {
    return this.productApiService.getSliderProducts();
  }

  getProductForProductPageByVariantId(variantId: string) {
    return this.productApiService.getProduct(variantId);
  }

  getProductSizesByVariantIdAndColor(variantId: string, color: string) {
    return this.productApiService.getProductSizesByVariantIdAndColor(
      variantId,
      color
    );
  }

  getProductColorsByVariantIdAndSize(variantId: string, size: string) {
    return this.productApiService.getProductColorsByVariantIdAndSize(
      variantId,
      size
    );
  }

  getProductByDetails(variantId: string, color: string, size: string) {
    return this.productApiService.getProductByDetails(variantId, color, size);
  }
}
