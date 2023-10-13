import { Component, inject } from '@angular/core';
import { FormGroup, UntypedFormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ErrorMessageService } from 'src/app/services/error-messages.service';
import { UserHandlerService } from 'src/app/services/user-handler.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent {
  private userHandlerService = inject(UserHandlerService);
  private router = inject(Router);
  protected errorMessageService = inject(ErrorMessageService);

  protected form = new FormGroup({
    email: new UntypedFormControl(null, [
      Validators.required,
      Validators.pattern(
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
      ),
    ]),
    password: new UntypedFormControl(null, [Validators.required]),
  });

  protected loginResponse = {
    userId: null,
    message: '',
  };

  login() {
    if (this.form.valid) {
      this.userHandlerService
        .login(this.form.getRawValue())
        .subscribe((res) => {
          this.loginResponse = res;
          this.userHandlerService.setUserLoggedIn(
            Number(this.loginResponse.userId)
          );
          if (this.loginResponse.userId) {
            this.router.navigate(['/landing']);
          }
        });
    } else {
      Object.values(this.form.controls).forEach((element) => {
        element.markAsTouched();
      });
    }
  }
}
