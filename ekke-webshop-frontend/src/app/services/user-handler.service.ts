import { Injectable, inject, signal } from '@angular/core';
import {
  AddUserRequest,
  EditPasswordRequest,
  EditUserRequest,
  LoginRequest,
  UserApiService,
} from 'api-generated';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UserHandlerService {
  private userService = inject(UserApiService);

  userLoggedIn = signal<number | null>(
    sessionStorage.getItem('userLoggedIn')
      ? Number(sessionStorage.getItem('userLoggedIn'))
      : null
  );
  isUserAdmin = signal<boolean>(
    sessionStorage.getItem('isUserAdmin') === 'true' ? true : false
  );

  userLoggedIn_ = new BehaviorSubject<boolean | null>(null);

  login(formData: LoginRequest) {
    return this.userService.login(formData);
  }

  register(formData: AddUserRequest) {
    return this.userService.addUser(formData);
  }

  getAllUsers() {
    return this.userService.getAllUsers();
  }

  getUserById(id: number) {
    return this.userService.getUserById(id);
  }

  editUser(formData: EditUserRequest) {
    return this.userService.editUser(formData);
  }

  editPassword(formData: EditPasswordRequest) {
    return this.userService.editPassword(formData);
  }

  setUserLoggedIn(value: number | null) {
    this.userLoggedIn.set(value);
    if (value) {
      this.userLoggedIn_.next(true);
      sessionStorage.setItem('userLoggedIn', value.toString());
    } else {
      this.userLoggedIn_.next(false);
      sessionStorage.removeItem('userLoggedIn');
    }
  }

  setIsUserAdmin(value: boolean) {
    this.isUserAdmin.set(value);
    sessionStorage.setItem('isUserAdmin', value.toString());
  }
}
