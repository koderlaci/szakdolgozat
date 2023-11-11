import { Injectable, inject } from '@angular/core';
import { ProductType } from '../types/types';
import {
  AddProductRequest,
  EditProductRequest,
  ProductApiService,
  SubtractProductQuantityByIdRequest,
} from 'api-generated';

@Injectable({
  providedIn: 'root',
})
export class ProductsService {
  private productApiService = inject(ProductApiService);

  getAllProducts() {
    return this.productApiService.getAllProducts();
  }

  getProductById(id: number) {
    return this.productApiService.getProductById(id);
  }

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

  checkProductAvailabilityByQuantity(id: number, quantity: number) {
    return this.productApiService.checkProductAvailabilityByQuantity(
      id,
      quantity
    );
  }

  subtractProductQuantityById(formData: SubtractProductQuantityByIdRequest) {
    return this.productApiService.subtractProductQuantityById(formData);
  }

  addProduct(formData: AddProductRequest) {
    return this.productApiService.addProduct(formData);
  }

  editProduct(formData: EditProductRequest) {
    return this.productApiService.editProduct(formData);
  }

  deleteProductById(id: number) {
    return this.productApiService.deleteProduct(id);
  }
}
