import { Injectable, inject } from '@angular/core';
import { AddOrderRequest, OrderApiService } from 'api-generated';
import { ProductType } from '../types/types';

@Injectable({
  providedIn: 'root',
})
export class OrderService {
  private orderApiService = inject(OrderApiService);

  getAllOrders() {
    return this.orderApiService.getAllOrders();
  }

  getUserFriendlyOrdersByUserId(userId: number) {
    return this.orderApiService.getAllUserReadableOrdersByUserId(userId);
  }

  createOrder(formData: AddOrderRequest) {
    return this.orderApiService.addOrder(formData);
  }
}
