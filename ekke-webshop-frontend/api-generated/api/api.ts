export * from './productApi.service';
import { ProductApiService } from './productApi.service';
export * from './shippingAddressApi.service';
import { ShippingAddressApiService } from './shippingAddressApi.service';
export * from './userApi.service';
import { UserApiService } from './userApi.service';
export const APIS = [ProductApiService, ShippingAddressApiService, UserApiService];
