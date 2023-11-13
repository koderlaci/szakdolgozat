import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

// components
import { AdminComponent } from './pages/admin/admin.component';
import { CartComponent } from './pages/cart/cart.component';
import { LandingComponent } from './pages/landing/landing.component';
import { LoginComponent } from './pages/login/login.component';
import { ProductsComponent } from './pages/products/products.component';
import { ProfileComponent } from './pages/profile/profile.component';
import { RegistrationComponent } from './pages/registration/registration.component';
import { UserOrdersComponent } from './pages/user-orders/user-orders.component';
import { ProductComponent } from './pages/product/product/product.component';
import { AdminOrdersComponent } from './pages/admin-orders/admin-orders.component';
import { AdminProductsComponent } from './pages/admin-products/admin-products.component';
import { AdminUsersComponent } from './pages/admin-users/admin-users.component';
import { AdminProductComponent } from './pages/admin-product/admin-product.component';
import { AdminUserComponent } from './pages/admin-user/admin-user.component';
import { AdminOrderComponent } from './pages/admin-order/admin-order.component';

// guards
import { IsUserLoggedInGuard } from './guards/isUserLoggedIn/is-user-logged-in.guard';
import { IsUserLoggedOutGuard } from './guards/isUserLoggedOut/is-user-logged-out.guard';
import { IsUserAdminGuard } from './guards/isUserAdmin/is-user-admin.guard';

const routes: Routes = [
  { path: '', redirectTo: '/landing', pathMatch: 'full' },
  { path: 'landing', component: LandingComponent },
  { path: 'products/:type', component: ProductsComponent },
  {
    path: 'login',
    component: LoginComponent,
    canActivate: [IsUserLoggedOutGuard],
  },
  {
    path: 'registration',
    component: RegistrationComponent,
    canActivate: [IsUserLoggedOutGuard],
  },
  { path: 'cart', component: CartComponent },
  {
    path: 'admin',
    canActivate: [IsUserAdminGuard],
    children: [
      {
        path: 'landing',
        component: AdminComponent,
      },
      {
        path: 'products',
        component: AdminProductsComponent,
      },
      {
        path: 'users',
        component: AdminUsersComponent,
      },
      {
        path: 'orders',
        component: AdminOrdersComponent,
      },
      {
        path: 'product/:id',
        component: AdminProductComponent,
      },
      {
        path: 'user/:id',
        component: AdminUserComponent,
      },
      {
        path: 'order/:id',
        component: AdminOrderComponent,
      },
    ],
  },
  {
    path: 'profile',
    canActivate: [IsUserLoggedInGuard],
    children: [
      {
        path: 'details',
        component: ProfileComponent,
        canActivate: [IsUserLoggedInGuard],
      },
      {
        path: 'orders',
        component: UserOrdersComponent,
        canActivate: [IsUserLoggedInGuard],
      },
    ],
  },
  { path: 'product/:variant', component: ProductComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
