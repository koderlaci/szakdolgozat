import { Component, OnInit, inject } from '@angular/core';
import { Router } from '@angular/router';
import { firstValueFrom } from 'rxjs';
import { UserHandlerService } from 'src/app/services/user-handler.service';

type User = {
  id: number;
  name: string;
  neptun: string;
  email: string;
};

@Component({
  selector: 'app-admin-users',
  templateUrl: './admin-users.component.html',
  styleUrls: ['./admin-users.component.scss'],
})
export class AdminUsersComponent implements OnInit {
  private userHandlerService = inject(UserHandlerService);
  private router = inject(Router);

  protected users: User[] = [];

  async ngOnInit() {
    this.users = await firstValueFrom(this.userHandlerService.getAllUsers());
    this.users = this.users.filter((user) => user.name);
  }

  onUserClick(userId: number) {
    this.router.navigateByUrl(`/admin/user/${userId}`);
  }
}
