import { Component, effect, inject } from '@angular/core';
import { Router } from '@angular/router';
import { CartService } from 'src/app/services/cart.service';
import { UserHandlerService } from 'src/app/services/user-handler.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent {
  private router = inject(Router);

  public userHandlerService = inject(UserHandlerService);
  public cartService = inject(CartService);

  protected showCartNotification = false;

  constructor() {
    effect(() => {
      if (this.cartService.itemAddedToCart()) {
        this.showCartNotification = true;

        setTimeout(() => {
          this.showCartNotification = false;
        }, 2000);
      }
    });
  }

  logout() {
    this.userHandlerService.setUserLoggedIn(null);
    this.router.navigateByUrl('/login');
  }
}
