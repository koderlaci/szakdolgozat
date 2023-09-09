import { Injectable, inject, signal } from '@angular/core';
import { AddUserRequest, LoginRequest, UserService } from 'api-generated';

@Injectable({
  providedIn: 'root',
})
export class UserHandlerService {
  private userService = inject(UserService);

  userLoggedIn = signal<boolean>(
    sessionStorage.getItem('userLoggedIn') as unknown as boolean
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

  setUserLoggedIn(value: boolean) {
    this.userLoggedIn.set(value);
    sessionStorage.setItem('userLoggedIn', value.toString());
  }
}
