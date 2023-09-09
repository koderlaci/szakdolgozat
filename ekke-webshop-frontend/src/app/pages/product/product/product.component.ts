import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductsService } from 'src/app/services/products.service';

type Product = {
  variantId: string,
  name: string,
  price: number,
  colors: string[],
  sizes: string[],
}

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss']
})
export class ProductComponent implements OnInit {

  variant: string | null = '';

  product: Product = {
    variantId: '',
    name: '',
    price: 0,
    colors: [],
    sizes: []
  }

  constructor(private route: ActivatedRoute, private productsService: ProductsService) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      this.variant = params.get("variant")
    })
    this.productsService.getProductForProductPageByVariantId(this.variant as string)
    .subscribe(product => {
      this.product = product as Product
    })
  }

}
