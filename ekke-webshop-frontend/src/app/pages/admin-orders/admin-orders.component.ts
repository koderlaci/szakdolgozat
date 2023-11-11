import { Component, OnInit, inject } from '@angular/core';
import { Router } from '@angular/router';
import { firstValueFrom } from 'rxjs';
import { MapperService } from 'src/app/services/mapper.service';
import { OrderService } from 'src/app/services/order.service';

type Order = {
  id: number;
  status: string;
  userId: number;
  addressId: number;
  cartId: number;
  price: number;
  deliveryMode: string;
  date: string;
  txhash: string;
};

@Component({
  selector: 'app-admin-orders',
  templateUrl: './admin-orders.component.html',
  styleUrls: ['./admin-orders.component.scss'],
})
export class AdminOrdersComponent implements OnInit {
  private orderService = inject(OrderService);
  private router = inject(Router);
  protected mapperService = inject(MapperService);

  protected orders: Order[] = [];

  async ngOnInit() {
    this.orders = await firstValueFrom(this.orderService.getAllOrders());
  }

  onOrderClick(orderId: number) {
    this.router.navigateByUrl(`/admin/order/${orderId}`);
  }
}
