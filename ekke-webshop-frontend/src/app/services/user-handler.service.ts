import { Injectable, inject, signal } from '@angular/core';
import { AddUserRequest, LoginRequest, UserApiService } from 'api-generated';

@Injectable({
  providedIn: 'root',
})
export class UserHandlerService {
  private userService = inject(UserApiService);

  userLoggedIn = signal<boolean>(
    sessionStorage.getItem('userLoggedIn') === 'true' ? true : false
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
