export * from './product.service';
import { ProductService } from './product.service';
export * from './test.service';
import { TestService } from './test.service';
export * from './user.service';
import { UserService } from './user.service';
export const APIS = [ProductService, TestService, UserService];
