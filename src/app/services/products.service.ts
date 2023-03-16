import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ProductType } from '../pages/products/products.component';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {

  constructor(private http: HttpClient) { }

  getProducts(type: ProductType) {
    switch (type) {
      case ProductType.MEN:
        return this.http.get('/api/menProducts');

      case ProductType.WOMEN:
        return this.http.get('/api/womenProducts');

      case ProductType.ACCESSARY:
        return this.http.get('/api/accessaryProducts');
    }
  }
  
}
