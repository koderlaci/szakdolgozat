import { Component, OnInit, inject } from '@angular/core';
import { Router } from '@angular/router';
import { ProductsService } from 'src/app/services/products.service';
import { Product } from 'src/app/types/types';

@Component({
  selector: 'app-product-slider',
  templateUrl: './product-slider.component.html',
  styleUrls: ['./product-slider.component.scss'],
})
export class ProductSliderComponent implements OnInit {
  protected products: Product[] = [];
  private productsService = inject(ProductsService);
  private router = inject(Router);

  ngOnInit(): void {
    this.productsService
      .getAllProductsForProductSlider()
      .subscribe((products) => (this.products = products as Product[]));
  }

  navigateToProduct(variantId: string) {
    this.router.navigate(['product/' + variantId]);
  }
}
