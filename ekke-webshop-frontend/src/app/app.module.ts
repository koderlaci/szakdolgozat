import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';

// web components
import { register } from 'swiper/element/bundle';
register();

// components
import { HeaderComponent } from './components/header/header.component';

// dialogs
import { AccountChooserDialog } from './dialogs/account-chooser.dialog';
import { PaymentWarningDialog } from './dialogs/payment-warning.dialog';
import { MobilePayDialog } from './dialogs/mobile-pay.dialog';

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
import { UserOrdersComponent } from './pages/user-orders/user-orders.component';

// material
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';
import { MatIconModule } from '@angular/material/icon';
import { MatBadgeModule } from '@angular/material/badge';
import { MatMenuModule } from '@angular/material/menu';
import { MatInputModule } from '@angular/material/input';
import { MatRadioModule } from '@angular/material/radio';
import { MatDialogModule } from '@angular/material/dialog';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatCheckboxModule } from '@angular/material/checkbox';

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
    AccountChooserDialog,
    PaymentWarningDialog,
    MobilePayDialog,
    UserOrdersComponent,
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
    MatRadioModule,
    MatDialogModule,
    MatProgressSpinnerModule,
    MatCheckboxModule,
    FormsModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class AppModule {}
