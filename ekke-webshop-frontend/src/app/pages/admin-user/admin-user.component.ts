import { Component, inject, signal } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AddUserRequest, EditUserRequest } from 'api-generated';
import { firstValueFrom } from 'rxjs';
import { ErrorMessageService } from 'src/app/services/error-messages.service';
import { UserHandlerService } from 'src/app/services/user-handler.service';

@Component({
  selector: 'app-admin-user',
  templateUrl: './admin-user.component.html',
  styleUrls: ['./admin-user.component.scss'],
})
export class AdminUserComponent {
  private userHandlerService = inject(UserHandlerService);
  private route = inject(ActivatedRoute);
  private router = inject(Router);
  protected errorMessageService = inject(ErrorMessageService);

  protected userId = signal<number>(0);

  protected userForm = new FormGroup({
    id: new FormControl<number | null>(null, Validators.required),
    name: new FormControl(null, [Validators.required, Validators.minLength(3)]),
    neptun: new FormControl(null, [
      Validators.required,
      Validators.minLength(6),
      Validators.maxLength(6),
    ]),
    email: new FormControl(null, [
      Validators.required,
      Validators.minLength(3),
      Validators.pattern(
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
      ),
    ]),
    password: new FormControl('', [
      Validators.required,
      Validators.minLength(8),
      Validators.pattern(/^(?=.*[A-Z])(?=.*[0-9])(?=.*[a-z]).{8,64}$/),
    ]),
  });

  protected response = {
    userId: null,
    isAdmin: false,
    error: false,
    message: '',
  };

  constructor() {
    this.route.paramMap.subscribe(async (params) => {
      this.userForm.reset();
      this.userForm.enable();
      const id = Number(params.get('id'));
      if (id !== 0) {
        const user = await firstValueFrom(
          this.userHandlerService.getUserById(id)
        );
        this.userForm.controls.password.removeValidators(Validators.required);
        this.userForm.controls.password.updateValueAndValidity();
        this.userForm.patchValue(user);
      }
      this.userForm.controls.id.disable();
      this.userId.set(id);
    });
  }

  async onCreate() {
    const formData = this.userForm.getRawValue();
    if (
      formData.name &&
      formData.neptun &&
      formData.email &&
      formData.password
    ) {
      await firstValueFrom(
        this.userHandlerService.register({
          name: formData.name,
          neptun: formData.neptun,
          email: formData.email,
          password: formData.password,
        } as AddUserRequest)
      )
        .then((result) => {
          this.response = result;
          if (this.response.userId) {
            setTimeout(() => {
              this.router.navigateByUrl('admin/users');
            }, 2000);
          }
        })
        .catch((error) => {
          this.response.error = true;
          this.response.message = error.message;
        })
        .finally(() => {
          setTimeout(() => {
            this.response.message = '';
          }, 5000);
        });
    }
  }

  async onEdit() {
    const formData = this.userForm.getRawValue();
    if (formData.id && formData.name && formData.neptun && formData.email) {
      await firstValueFrom(
        this.userHandlerService.editUser({
          id: formData.id,
          name: formData.name,
          neptun: formData.neptun,
          email: formData.email,
        } as EditUserRequest)
      )
        .then((result) => {
          this.response = result;
        })
        .catch((error) => {
          this.response.error = true;
          this.response.message = error.message;
        })
        .finally(() => {
          setTimeout(() => {
            this.response.message = '';
          }, 5000);
        });
    }
  }

  async onDelete() {
    const id = this.userForm.controls.id.value;
    if (id) {
      await firstValueFrom(this.userHandlerService.deleteUserById(id))
        .then((result) => {
          this.response = result;
          if (!this.response.error) {
            setTimeout(() => {
              this.router.navigateByUrl('admin/users');
            }, 2000);
          }
        })
        .catch((error) => {
          this.response.error = true;
          this.response.message = error.message;
        })
        .finally(() => {
          setTimeout(() => {
            this.response.message = '';
          }, 5000);
        });
    }
  }
}
