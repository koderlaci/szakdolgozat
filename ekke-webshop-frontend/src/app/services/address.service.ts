import { Injectable, inject } from '@angular/core';
import { AddOrderAddressRequest, AddressApiService } from 'api-generated';

@Injectable({
  providedIn: 'root',
})
export class AddressService {
  private addressApiService = inject(AddressApiService);

  getAllOrderAdresses() {
    return this.addressApiService.getAllOrderAddresses();
  }

  createOrderAddress(formData: AddOrderAddressRequest) {
    return this.addressApiService.addOrderAddress(formData);
  }
}
