import { Injectable, inject, signal } from '@angular/core';
import { AddUserRequest, LoginRequest, UserApiService } from 'api-generated';
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
}
