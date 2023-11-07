import { Component, OnInit, inject } from '@angular/core';
import { AddUserAddressRequest } from 'api-generated';
import { firstValueFrom } from 'rxjs';
import { MapperService } from 'src/app/services/mapper.service';
import { OrderService } from 'src/app/services/order.service';
import { UserHandlerService } from 'src/app/services/user-handler.service';
import { EndProduct } from 'src/app/types/types';

type Order = {
  id: number;
  status: string;
  address: AddUserAddressRequest;
  products: EndProduct[];
  deliveryMode: string;
  totalPrice: string;
  date: string;
};

@Component({
  selector: 'app-user-orders',
  templateUrl: './user-orders.component.html',
  styleUrls: ['./user-orders.component.scss'],
})
export class UserOrdersComponent implements OnInit {
  private userHandlerService = inject(UserHandlerService);
  protected orderService = inject(OrderService);
  protected mapperService = inject(MapperService);

  protected orders: Order[] = [];

  async ngOnInit() {
    const userId = this.userHandlerService.userLoggedIn();
    if (userId) {
      this.orders = await firstValueFrom(
        this.orderService.getUserFriendlyOrdersByUserId(userId)
      );
      this.orders = this.orders.reverse();
    }
  }
}
