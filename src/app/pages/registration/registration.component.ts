import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserHandlerService } from 'src/app/services/user-handler.service';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.scss']
})
export class RegistrationComponent implements OnInit {

  registrationForm = new FormGroup({
    name: new FormControl('', [Validators.required, Validators.minLength(3)]),
    neptun: new FormControl('', [Validators.required, Validators.minLength(6), Validators.maxLength(6)]),
    email: new FormControl('', [Validators.required, Validators.minLength(3), Validators.pattern(/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/)]),
    password: new FormControl('', [Validators.required, Validators.minLength(8), Validators.pattern(`(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}`)])
  })

  constructor(private userHandlerService: UserHandlerService, private router: Router) { }

  ngOnInit(): void {
  }

  registrate() {
    if (this.registrationForm.valid) {
      this.userHandlerService.registrate(this.registrationForm.getRawValue()).subscribe(res => {
        this.userHandlerService.setUserLoggedIn(res as boolean);
        if (res) {
          this.router.navigate(['/landing']);
        }
      })
    }
    else {
      Object.values(this.registrationForm.controls).forEach(element => {
        element.markAsTouched();
      });
    }
  }

  controlValid(control: string) {
    if (!this.registrationForm.get(control)?.touched) {
      return true;
    }

    return this.registrationForm.get(control)?.valid;
  }

  getErrorMessage(control: string) {
    if (!this.registrationForm.get(control)?.errors) {
      return '';
    }

    if (control === 'name') {
      switch (Object.keys(this.registrationForm.get(control)?.errors as object)[0]) {
        case 'required':
          return 'Kötelező mező!'
        case 'minlength':
          return 'A név hossza minimum 3 karakter!'
      }
    }

    if (control === 'neptun') {
      switch (Object.keys(this.registrationForm.get(control)?.errors as object)[0]) {
        case 'required':
          return 'Kötelező mező!'
        case 'minlength':
          return 'A neptun kód hossza minimum 6 karakter!'
        case 'maxlength':
          return 'A neptun kód hossza maximum 6 karakter!'
      }
    }

    if (control === 'email') {
      switch (Object.keys(this.registrationForm.get(control)?.errors as object)[0]) {
        case 'required':
          return 'Kötelező mező!'
        case 'minlength':
          return 'Az email hossza minimum 3 karakter!'
        case 'pattern':
          return 'Helytelen formátum!'
      }
    }

    if (control === 'password') {
      switch (Object.keys(this.registrationForm.get(control)?.errors as object)[0]) {
        case 'required':
          return 'Kötelező mező!'
        case 'minlength':
          return 'A jelszó hossza minimum 8 karakter!'
        case 'pattern':
          return 'A jelszónak tartalmaznia kell legalább 1 kis betűt, 1 nagy betűt és 1 számot!'
      }
    }

    return '';
  }
}
