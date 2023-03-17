import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductsService } from 'src/app/services/products.service';

export enum ProductType {
  MEN,
  WOMEN,
  ACCESSARY
}

type Product = {
  variantId: number;
  name: string;
  colors: string[];
  price: number;
}

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent implements OnInit {

  productType: ProductType = ProductType.MEN;

  products: Product[] = [];

  constructor(private route: ActivatedRoute, private productsService: ProductsService) {
  }

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      switch (params.get("type")) {
        case 'men':
          this.productType = ProductType.MEN
          break;

        case 'women':
          this.productType = ProductType.WOMEN
          break;

        case 'accessary':
          this.productType = ProductType.ACCESSARY
          break;
      }
      this.productsService.getProducts(this.productType).subscribe(result => {
        this.products = result as Product[];
      })
    })
  }

}
