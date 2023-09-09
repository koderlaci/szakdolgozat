import { Component, OnInit, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductsService } from 'src/app/services/products.service';

type Product = {
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
export class ProductComponent implements OnInit {
  private productsService = inject(ProductsService);
  private route = inject(ActivatedRoute);

  private variant: string | null = '';
  protected product: Product = {
    variantId: '',
    name: '',
    price: 0,
    colors: [],
    sizes: [],
  };

  ngOnInit(): void {
    this.route.paramMap.subscribe((params) => {
      this.variant = params.get('variant');
    });
    this.productsService
      .getProductForProductPageByVariantId(this.variant as string)
      .subscribe((product) => {
        this.product = product as Product;
      });
  }
}
