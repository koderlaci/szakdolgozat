import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';

// web components
import { register } from 'swiper/element/bundle';
register();

// components
import { HeaderComponent } from './components/header/header.component';

// pages
import { LandingComponent } from './pages/landing/landing.component';
import { ProductsComponent } from './pages/products/products.component';
import { LoginComponent } from './pages/login/login.component';
import { RegistrationComponent } from './pages/registration/registration.component';
import { AdminComponent } from './pages/admin/admin.component';
import { ProfileComponent } from './pages/profile/profile.component';
import { DeliveryComponent } from './pages/delivery/delivery.component';
import { CartComponent } from './pages/cart/cart.component';
import { ProductSliderComponent } from './components/product-slider/product-slider/product-slider.component';
import { ProductComponent } from './pages/product/product/product.component';
import { SandboxComponent } from './pages/sandbox/sandbox.component';

// material
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';
import { MatIconModule } from '@angular/material/icon';
import { MatBadgeModule } from '@angular/material/badge';
import { MatMenuModule } from '@angular/material/menu';
import { MatInputModule } from '@angular/material/input';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    LandingComponent,
    ProductsComponent,
    LoginComponent,
    RegistrationComponent,
    AdminComponent,
    ProfileComponent,
    DeliveryComponent,
    CartComponent,
    ProductSliderComponent,
    ProductComponent,
    SandboxComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
    MatExpansionModule,
    BrowserAnimationsModule,
    MatButtonModule,
    MatSelectModule,
    MatIconModule,
    MatBadgeModule,
    MatMenuModule,
    MatInputModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class AppModule {}
