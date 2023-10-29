import { Injectable, inject } from '@angular/core';
import { AddOrderRequest, OrderApiService } from 'api-generated';

@Injectable({
  providedIn: 'root',
})
export class OrderService {
  private orderApiService = inject(OrderApiService);

  getAllOrders() {
    return this.orderApiService.getAllOrders();
  }

  createOrder(formData: AddOrderRequest) {
    return this.orderApiService.addOrder(formData);
  }
}
