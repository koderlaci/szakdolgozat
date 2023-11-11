import { Component, inject } from '@angular/core';
import {
  UntypedFormControl,
  UntypedFormGroup,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { ErrorMessageService } from 'src/app/services/error-messages.service';
import { UserHandlerService } from 'src/app/services/user-handler.service';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.scss'],
})
export class RegistrationComponent {
  private userHandlerService = inject(UserHandlerService);
  private router = inject(Router);
  protected errorMessageService = inject(ErrorMessageService);

  protected registrationResponse = {
    userId: null,
    isAdmin: false,
    message: '',
  };

  form = new UntypedFormGroup({
    name: new UntypedFormControl(null, [
      Validators.required,
      Validators.minLength(3),
    ]),
    neptun: new UntypedFormControl(null, [
      Validators.required,
      Validators.minLength(6),
      Validators.maxLength(6),
    ]),
    email: new UntypedFormControl(null, [
      Validators.required,
      Validators.minLength(3),
      Validators.pattern(
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
      ),
    ]),
    password: new UntypedFormControl(null, [
      Validators.required,
      Validators.minLength(8),
      Validators.pattern(/^(?=.*[A-Z])(?=.*[0-9])(?=.*[a-z]).{8,64}$/),
    ]),
    dataHandlingStatement: new UntypedFormControl(false, Validators.required),
  });

  register() {
    if (!this.form.controls.dataHandlingStatement.value) {
      this.registrationResponse.message =
        'Az adatkezelési tájékoztatót kötelező elfogadni.';
      return;
    }
    this.registrationResponse.message = '';
    if (this.form.valid) {
      const formData = this.form.getRawValue();
      this.userHandlerService
        .register({
          name: formData.name,
          neptun: formData.neptun,
          email: formData.email,
          password: formData.password,
        })
        .subscribe((res) => {
          if (res.message) {
            this.registrationResponse.message = res.message;
          } else {
            this.registrationResponse.userId = res.userId;
            this.registrationResponse.isAdmin = res.isAdmin;

            this.userHandlerService.setUserLoggedIn(
              this.registrationResponse.userId
            );
            this.userHandlerService.setIsUserAdmin(
              this.registrationResponse.isAdmin
            );
            this.router.navigateByUrl('/landing');
          }
        });
    } else {
      Object.values(this.form.controls).forEach((element) => {
        element.markAsTouched();
      });
    }
  }
}
