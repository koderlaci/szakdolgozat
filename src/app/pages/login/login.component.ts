import { Component, OnInit } from '@angular/core';
import { UntypedFormControl, UntypedFormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserHandlerService } from 'src/app/services/user-handler.service';

type LoginResponse = {
  authenticated: boolean,
  errorMessage: string
}

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  loginForm = new UntypedFormGroup({
    email: new UntypedFormControl('', [Validators.required, Validators.pattern(/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/)]),
    password: new UntypedFormControl('', [Validators.required])
  })

  loginResponse = {
    authenticated: false,
    errorMessage: ''
  };

  constructor(private userHandlerService: UserHandlerService, private router: Router) { }

  ngOnInit(): void {
  }

  login() {
    if (this.loginForm.valid) {
      this.userHandlerService.login(this.loginForm.getRawValue()).subscribe(res => {
        this.loginResponse = res as LoginResponse;
        this.userHandlerService.setUserLoggedIn(this.loginResponse.authenticated);
        if (this.loginResponse.authenticated) {
          this.router.navigate(['/landing']);
        }
      })
    }
    else {
      Object.values(this.loginForm.controls).forEach(element => {
        element.markAsTouched();
      });
    }
  }

  controlValid(control: string) {
    if (!this.loginForm.get(control)?.touched) {
      return true;
    }

    return this.loginForm.get(control)?.valid;
  }

  getErrorMessage(control: string) {
    if (!this.loginForm.get(control)?.errors) {
      return '';
    }

    if (control === 'email') {
      switch (Object.keys(this.loginForm.get(control)?.errors as object)[0]) {
        case 'required':
          return 'Kötelező mező!'
        case 'pattern':
          return 'Helytelen formátum!'
      }
    }

    if (control === 'password') {
      switch (Object.keys(this.loginForm.get(control)?.errors as object)[0]) {
        case 'required':
          return 'Kötelező mező!'
      }
    }

    return '';
  }
}
