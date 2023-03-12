import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

type LoginForm = {
  email: string,
  password: string
}

@Injectable({
  providedIn: 'root'
})
export class UserHandlerService {

  constructor(private http: HttpClient) { }

  login(formData: LoginForm) {
    return this.http.post('/api/login', formData);
  }

  getAllUsers() {
    return this.http.get('/api/allusers');
  }
}
