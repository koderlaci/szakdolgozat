import { Component, inject } from '@angular/core';
import { UserHandlerService } from 'src/app/services/user-handler.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
})
export class ProfileComponent {
  private userHandlerService = inject(UserHandlerService);

  logout() {
    this.userHandlerService.setUserLoggedIn(null);
  }
}
