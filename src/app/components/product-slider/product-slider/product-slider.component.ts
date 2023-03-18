import { Component, OnInit } from '@angular/core';
import { ProductsService } from 'src/app/services/products.service';
import { Product } from 'src/app/types/types';

@Component({
  selector: 'app-product-slider',
  templateUrl: './product-slider.component.html',
  styleUrls: ['./product-slider.component.scss']
})
export class ProductSliderComponent implements OnInit {

  products: Product[] = []

  constructor(private productsService: ProductsService) { }

  ngOnInit(): void {
    this.productsService.getAllProductsForProductSlider().subscribe(products => this.products = products as Product[]);
  }

}
