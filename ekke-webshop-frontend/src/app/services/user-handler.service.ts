import { Injectable, inject, signal } from '@angular/core';
import { AddUserRequest, LoginRequest, UserApiService } from 'api-generated';

@Injectable({
  providedIn: 'root',
})
export class UserHandlerService {
  private userService = inject(UserApiService);

  userLoggedIn = signal<number | null>(
    Number(sessionStorage.getItem('userLoggedIn'))
  );

  login(formData: LoginRequest) {
    return this.userService.login(formData);
  }

  register(formData: AddUserRequest) {
    return this.userService.addUser(formData);
  }

  getAllUsers() {
    return this.userService.getAllUsers();
  }

  setUserLoggedIn(value: number | null) {
    this.userLoggedIn.set(value);
    if (value) {
      sessionStorage.setItem('userLoggedIn', value.toString());
    }
  }
}
