import { Component, inject } from '@angular/core';
import { UserHandlerService } from 'src/app/services/user-handler.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent {
  public userHandlerService = inject(UserHandlerService);
}
