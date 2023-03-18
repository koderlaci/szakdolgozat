import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

// components
import { AdminComponent } from './pages/admin/admin.component';
import { CartComponent } from './pages/cart/cart.component';
import { DeliveryComponent } from './pages/delivery/delivery.component';
import { LandingComponent } from './pages/landing/landing.component';
import { LoginComponent } from './pages/login/login.component';
import { ProductsComponent } from './pages/products/products.component';
import { ProfileComponent } from './pages/profile/profile.component';
import { RegistrationComponent } from './pages/registration/registration.component';

// guards
import { IsUserLoggedInGuard } from './guards/isUserLoggedIn/is-user-logged-in.guard';
import { IsUserLoggedOutGuard } from './guards/isUserLoggedOut/is-user-logged-out.guard';
import { ProductComponent } from './pages/product/product/product.component';

const routes: Routes = [
  { path: "", redirectTo: "/landing", pathMatch: "full"},
  { path: "landing", component: LandingComponent},
  { path: "products/:type", component: ProductsComponent},
  { path: "login", component: LoginComponent, canActivate: [IsUserLoggedOutGuard]},
  { path: "registration", component: RegistrationComponent, canActivate: [IsUserLoggedOutGuard]},
  { path: "delivery", component: DeliveryComponent, canActivate: [IsUserLoggedInGuard]},
  { path: "cart", component: CartComponent},
  { path: "admin", component: AdminComponent}, // todo: implement guard
  { path: "profile", component: ProfileComponent, canActivate: [IsUserLoggedInGuard]},
  { path: "product/:variant", component: ProductComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
