import { Component, inject } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AddUserAddressRequest, EditOrderRequest } from 'api-generated';
import { firstValueFrom } from 'rxjs';
import { MapperService } from 'src/app/services/mapper.service';
import { OrderService } from 'src/app/services/order.service';
import { EndProduct } from 'src/app/types/types';

type Order = {
  id: number;
  status: string;
  userEmail: string;
  address: AddUserAddressRequest;
  cartId: number;
  products: EndProduct[];
  deliveryMode: string;
  totalPrice: string;
  date: string;
  txhash: string;
};

@Component({
  selector: 'app-admin-order',
  templateUrl: './admin-order.component.html',
  styleUrls: ['./admin-order.component.scss'],
})
export class AdminOrderComponent {
  private route = inject(ActivatedRoute);
  private router = inject(Router);
  protected orderService = inject(OrderService);
  protected mapperService = inject(MapperService);

  protected statusForm = new FormGroup({
    status: new FormControl<string | null>(null, Validators.required),
  });

  protected order: Order | null = null;
  protected statuses = [
    'paid',
    'under preparation',
    'under delivery',
    'ready to collect',
    'completed',
  ];
  protected response = {
    error: false,
    message: '',
  };

  constructor() {
    this.route.paramMap.subscribe(async (params) => {
      this.getOrder(Number(params.get('id')));
    });
  }

  async getOrder(id: number) {
    this.order = await firstValueFrom(
      this.orderService.getUserFriendlyOrderByOrderId(id)
    );
    if (this.order) {
      this.statusForm.controls.status.setValue(this.order?.status);
    }
  }

  async onEdit() {
    if (this.order) {
      await firstValueFrom(
        this.orderService.editOrder({
          id: this.order.id,
          status: this.statusForm.controls.status.value,
        } as EditOrderRequest)
      )
        .then(async (result) => {
          this.response = result;
          if (this.order) {
            await this.getOrder(this.order.id);
          }
        })
        .catch((error) => {
          this.response.error = true;
          this.response.message = error.message;
        })
        .finally(() => {
          setTimeout(() => {
            this.response.message = '';
          }, 5000);
        });
    }
  }

  async onDelete() {
    if (this.order) {
      await firstValueFrom(this.orderService.deleteOrderById(this.order.id))
        .then((result) => {
          this.response = result;
          setTimeout(() => {
            this.router.navigateByUrl('admin/orders');
          }, 2000);
        })
        .catch((error) => {
          this.response.error = true;
          this.response.message = error.message;
        })
        .finally(() => {
          setTimeout(() => {
            this.response.message = '';
          }, 5000);
        });
    }
  }
}
