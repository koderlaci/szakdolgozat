export * from './productApi.service';
import { ProductApiService } from './productApi.service';
export * from './test.service';
import { TestService } from './test.service';
export * from './userApi.service';
import { UserApiService } from './userApi.service';
export const APIS = [ProductApiService, TestService, UserApiService];
