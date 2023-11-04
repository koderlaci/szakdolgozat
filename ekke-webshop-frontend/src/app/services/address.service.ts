import { Injectable, inject } from '@angular/core';
import {
  AddOrderAddressRequest,
  AddUserAddressRequest,
  AddressApiService,
  EditUserAddressRequest,
} from 'api-generated';

@Injectable({
  providedIn: 'root',
})
export class AddressService {
  private addressApiService = inject(AddressApiService);

  getAllOrderAdresses() {
    return this.addressApiService.getAllOrderAddresses();
  }

  getUserAddressByUserId(userId: number) {
    return this.addressApiService.getUserAddressByUserId(userId);
  }

  createUserAddress(formData: AddUserAddressRequest) {
    return this.addressApiService.addUserAddress(formData);
  }

  editUserAddress(formData: EditUserAddressRequest) {
    return this.addressApiService.editUserAddress(formData);
  }

  createOrderAddress(formData: AddOrderAddressRequest) {
    return this.addressApiService.addOrderAddress(formData);
  }
}
