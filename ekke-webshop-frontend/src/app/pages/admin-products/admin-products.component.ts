import { Component, OnInit, inject } from '@angular/core';
import { Router } from '@angular/router';
import { firstValueFrom } from 'rxjs';
import { MapperService } from 'src/app/services/mapper.service';
import { ProductsService } from 'src/app/services/products.service';

type Product = {
  id: number;
  variantId: string;
  name: string;
  type: string;
  color: string;
  size: string;
  price: number;
  quantity: number;
};

@Component({
  selector: 'app-admin-products',
  templateUrl: './admin-products.component.html',
  styleUrls: ['./admin-products.component.scss'],
})
export class AdminProductsComponent implements OnInit {
  private productService = inject(ProductsService);
  private router = inject(Router);
  protected mapperService = inject(MapperService);

  private products: Product[] = [];
  protected menProducts: Product[] = [];
  protected womenProducts: Product[] = [];
  protected accessaryProducts: Product[] = [];

  async ngOnInit() {
    this.products = await firstValueFrom(this.productService.getAllProducts());
    this.menProducts = this.products.filter(
      (product) => product.type === 'men'
    );
    this.womenProducts = this.products.filter(
      (product) => product.type === 'women'
    );
    this.accessaryProducts = this.products.filter(
      (product) => product.type === 'accessary'
    );
  }

  onProductClick(productId: number) {
    this.router.navigateByUrl(`/admin/product/${productId}`);
  }
}
