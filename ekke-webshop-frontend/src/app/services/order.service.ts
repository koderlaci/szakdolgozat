import { Injectable, inject } from '@angular/core';
import {
  AddOrderRequest,
  EditOrderRequest,
  OrderApiService,
} from 'api-generated';

@Injectable({
  providedIn: 'root',
})
export class OrderService {
  private orderApiService = inject(OrderApiService);

  getAllOrders() {
    return this.orderApiService.getAllOrders();
  }

  getUserFriendlyOrderByOrderId(orderId: number) {
    return this.orderApiService.getUserReadableOrderByOrderId(orderId);
  }

  getUserFriendlyOrdersByUserId(userId: number) {
    return this.orderApiService.getAllUserReadableOrdersByUserId(userId);
  }

  createOrder(formData: AddOrderRequest) {
    return this.orderApiService.addOrder(formData);
  }

  editOrder(formData: EditOrderRequest) {
    return this.orderApiService.editOrder(formData);
  }

  checkIfTransactionHashHasBeenUsed(txhash: string) {
    return this.orderApiService.checkIfTransactionHashHasBeenUsed(txhash);
  }

  deleteOrderById(id: number) {
    return this.orderApiService.deleteOrder(id);
  }
}
