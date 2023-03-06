import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminComponent } from './pages/admin/admin.component';
import { CartComponent } from './pages/cart/cart.component';
import { DeliveryComponent } from './pages/delivery/delivery.component';
import { LandingComponent } from './pages/landing/landing.component';
import { LoginComponent } from './pages/login/login.component';
import { ProductsComponent } from './pages/products/products.component';
import { ProfileComponent } from './pages/profile/profile.component';
import { RegistrationComponent } from './pages/registration/registration.component';

const routes: Routes = [
  { path: "", redirectTo: "/landing", pathMatch: "full"},
  { path: "landing", component: LandingComponent},
  { path: "products", component: ProductsComponent},
  { path: "login", component: LoginComponent},
  { path: "registration", component: RegistrationComponent},
  { path: "delivery", component: DeliveryComponent},
  { path: "cart", component: CartComponent},
  { path: "admin", component: AdminComponent},
  { path: "profile", component: ProfileComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
