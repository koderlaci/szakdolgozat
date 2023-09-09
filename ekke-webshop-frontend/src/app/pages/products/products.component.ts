import { Component, OnInit, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductsService } from 'src/app/services/products.service';
import { Product, ProductType } from 'src/app/types/types';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss'],
})
export class ProductsComponent implements OnInit {
  private productsService = inject(ProductsService);
  private route = inject(ActivatedRoute);

  private productType: ProductType = ProductType.MEN;

  protected products: Product[] = [];

  ngOnInit(): void {
    this.route.paramMap.subscribe((params) => {
      switch (params.get('type')) {
        case 'men':
          this.productType = ProductType.MEN;
          break;

        case 'women':
          this.productType = ProductType.WOMEN;
          break;

        case 'accessary':
          this.productType = ProductType.ACCESSARY;
          break;
      }
      this.productsService.getProducts(this.productType).subscribe((result) => {
        this.products = result as Product[];
      });
    });
  }
}
