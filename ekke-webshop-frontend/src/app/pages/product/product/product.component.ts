import { Component, OnInit, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { firstValueFrom } from 'rxjs';
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
export class ProductComponent implements OnInit {
  private productsService = inject(ProductsService);
  private route = inject(ActivatedRoute);

  protected product: Product = {
    variantId: '',
    name: '',
    price: 0,
    colors: [],
    sizes: [],
  };

  ngOnInit(): void {
    this.route.paramMap.subscribe(async (params) => {
      const product = await firstValueFrom(
        this.productsService.getProductForProductPageByVariantId(
          params.get('variant') as string
        )
      );
      this.product = product;
    });
  }
}
