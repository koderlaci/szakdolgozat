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

  getUserFriendlyOrdersByUserId(userId: number) {
    return this.orderApiService.getAllUserReadableOrdersByUserId(userId);
  }

  createOrder(formData: AddOrderRequest) {
    return this.orderApiService.addOrder(formData);
  }

  checkIfTransactionHashHasBeenUsed(txhash: string) {
    return this.orderApiService.checkIfTransactionHashHasBeenUsed(txhash);
  }
}
