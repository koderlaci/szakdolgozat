import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

type LoginForm = {
  email: string,
  password: string
}

type RegistrationForm = {
  name: string,
  neptun: string,
  email: string,
  password: string
}

@Injectable({
  providedIn: 'root'
})
export class UserHandlerService {

  localUrl = "http://localhost:4201";

  constructor(private http: HttpClient) { }

  login(formData: LoginForm) {
    return this.http.post(this.localUrl + '/login', formData);
  }

  registrate(formData: RegistrationForm) {
    return this.http.post(this.localUrl + '/adduser', formData);
  }

  getAllUsers() {
    return this.http.get('/api/allusers');
  }
}
