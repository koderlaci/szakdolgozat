import { Component, OnInit, inject } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ErrorMessageService } from 'src/app/services/error-messages.service';
import { UserHandlerService } from 'src/app/services/user-handler.service';
import { firstValueFrom } from 'rxjs';
import {
  AddUserAddressRequest,
  EditUserAddressRequest,
  EditUserRequest,
} from 'api-generated';
import { AddressService } from 'src/app/services/address.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
})
export class ProfileComponent implements OnInit {
  private userHandlerService = inject(UserHandlerService);
  private addressService = inject(AddressService);
  protected errorMessageService = inject(ErrorMessageService);

  protected user = {
    id: null,
    name: null,
    neptun: null,
    email: null,
    password: null,
  };
  protected address = {
    id: null,
    country: null,
    zipCode: null,
    city: null,
    streetName: null,
    streetType: null,
    houseNumber: null,
    apartment: null,
    floor: null,
    door: null,
  };
  protected profileResponse = {
    error: false,
    message: null,
  };
  protected passwordResponse = {
    error: false,
    message: null,
  };
  protected addressResponse = {
    error: false,
    message: null,
  };

  protected profileForm = new FormGroup({
    name: new FormControl<string>('', [Validators.minLength(3)]),
    neptun: new FormControl<string>('', [
      Validators.minLength(6),
      Validators.maxLength(6),
    ]),
    email: new FormControl<string>('', [
      Validators.minLength(3),
      Validators.pattern(
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
      ),
    ]),
    password: new FormControl<string>('', [
      Validators.required,
      Validators.minLength(8),
      Validators.pattern(/^(?=.*[A-Z])(?=.*[0-9])(?=.*[a-z]).{8,64}$/),
    ]),
    newPassword: new FormControl<string>('', [
      Validators.required,
      Validators.minLength(8),
      Validators.pattern(/^(?=.*[A-Z])(?=.*[0-9])(?=.*[a-z]).{8,64}$/),
    ]),
    newPasswordConfirmation: new FormControl<string>('', [
      Validators.required,
      Validators.minLength(8),
      Validators.pattern(/^(?=.*[A-Z])(?=.*[0-9])(?=.*[a-z]).{8,64}$/),
    ]),
  });

  protected addressForm = new FormGroup({
    country: new FormControl<string>('', [
      Validators.required,
      Validators.maxLength(20),
    ]),
    zipCode: new FormControl<string>('', [
      Validators.required,
      Validators.maxLength(20),
    ]),
    city: new FormControl<string>('', [
      Validators.required,
      Validators.maxLength(20),
    ]),
    streetName: new FormControl<string>('', [
      Validators.required,
      Validators.maxLength(20),
    ]),
    streetType: new FormControl<string>('', [
      Validators.required,
      Validators.maxLength(20),
    ]),
    houseNumber: new FormControl<string>('', [
      Validators.required,
      Validators.maxLength(20),
    ]),
    apartment: new FormControl<string>('', [Validators.maxLength(20)]),
    floor: new FormControl<string>('', [Validators.maxLength(20)]),
    door: new FormControl<string>('', [Validators.maxLength(20)]),
  });

  async ngOnInit() {
    await this.getUserInformation();
  }

  async editProfile() {
    const formData = this.profileForm.getRawValue();

    if (
      this.user.id &&
      (this.user.name !== formData.name ||
        this.user.neptun !== formData.neptun ||
        this.user.email !== formData.email) &&
      this.profileForm.controls.name.valid &&
      this.profileForm.controls.neptun.valid &&
      this.profileForm.controls.email.valid
    ) {
      const response = await firstValueFrom(
        this.userHandlerService.editUser({
          id: this.user.id,
          name: formData.name,
          neptun: formData.neptun,
          email: formData.email,
        } as EditUserRequest)
      );
      this.profileResponse = response;
      setTimeout(() => {
        this.profileResponse.message = null;
      }, 5000);
      await this.getUserInformation();
    }
  }

  async editPassword() {
    const formData = this.profileForm.getRawValue();

    if (
      this.user.id &&
      formData.password &&
      formData.newPassword &&
      this.profileForm.controls.password.valid &&
      this.profileForm.controls.newPassword.valid &&
      this.profileForm.controls.newPasswordConfirmation.valid &&
      formData.newPassword === formData.newPasswordConfirmation
    ) {
      const response = await firstValueFrom(
        this.userHandlerService.editPassword({
          id: this.user.id,
          password: formData.password,
          newPassword: formData.newPassword,
        })
      );
      this.passwordResponse = response;
      setTimeout(() => {
        this.passwordResponse.message = null;
      }, 5000);
      await this.getUserInformation();
    }
  }

  async editAddress() {
    const formData = this.addressForm.getRawValue();

    if (
      this.address &&
      this.address.id &&
      this.user.id &&
      formData.country &&
      formData.zipCode &&
      formData.city &&
      formData.streetName &&
      formData.streetType &&
      formData.houseNumber
    ) {
      const dto: EditUserAddressRequest = {
        id: this.address.id,
        userId: this.user.id,
        country: formData.country,
        zipCode: formData.zipCode,
        city: formData.city,
        streetName: formData.streetName,
        streetType: formData.streetType,
        houseNumber: formData.houseNumber,
        apartment: formData.apartment ?? '',
        floor: formData.floor ?? '',
        door: formData.door ?? '',
      };

      const response = await firstValueFrom(
        this.addressService.editUserAddress(dto)
      );
      this.addressResponse = response;
      setTimeout(() => {
        this.addressResponse.message = null;
      }, 5000);
    } else if (
      this.user.id &&
      formData.country &&
      formData.zipCode &&
      formData.city &&
      formData.streetName &&
      formData.streetType &&
      formData.houseNumber
    ) {
      const dto: AddUserAddressRequest = {
        userId: this.user.id,
        country: formData.country,
        zipCode: formData.zipCode,
        city: formData.city,
        streetName: formData.streetName,
        streetType: formData.streetType,
        houseNumber: formData.houseNumber,
        apartment: formData.apartment ?? '',
        floor: formData.floor ?? '',
        door: formData.door ?? '',
      };

      const response = await firstValueFrom(
        this.addressService.createUserAddress(dto)
      );
      this.addressResponse = response;
      setTimeout(() => {
        this.addressResponse.message = null;
      }, 5000);
    }
    await this.getUserInformation();
  }

  async getUserInformation() {
    const userId = this.userHandlerService.userLoggedIn();
    if (userId) {
      this.user = await firstValueFrom(
        this.userHandlerService.getUserById(userId)
      );
      this.profileForm.controls.name.setValue(this.user.name);
      this.profileForm.controls.neptun.setValue(this.user.neptun);
      this.profileForm.controls.email.setValue(this.user.email);

      this.address = await firstValueFrom(
        this.addressService.getUserAddressByUserId(userId)
      );
      if (this.address) {
        this.addressForm.controls.country.setValue(this.address.country);
        this.addressForm.controls.zipCode.setValue(this.address.zipCode);
        this.addressForm.controls.city.setValue(this.address.city);
        this.addressForm.controls.streetName.setValue(this.address.streetName);
        this.addressForm.controls.streetType.setValue(this.address.streetType);
        this.addressForm.controls.houseNumber.setValue(
          this.address.houseNumber
        );
        this.addressForm.controls.apartment.setValue(this.address.apartment);
        this.addressForm.controls.floor.setValue(this.address.floor);
        this.addressForm.controls.door.setValue(this.address.door);
      }
    }
  }

  isProfileButtonDisabled() {
    const formData = this.profileForm.getRawValue();

    if (
      (this.user.name !== formData.name ||
        this.user.neptun !== formData.neptun ||
        this.user.email !== formData.email) &&
      this.profileForm.controls.name.valid &&
      this.profileForm.controls.neptun.valid &&
      this.profileForm.controls.email.valid
    ) {
      return false;
    }
    return true;
  }

  isPasswordButtonDisabled() {
    const formData = this.profileForm.getRawValue();

    if (
      this.profileForm.controls.password.valid &&
      this.profileForm.controls.newPassword.valid &&
      this.profileForm.controls.newPasswordConfirmation.valid &&
      formData.newPassword === formData.newPasswordConfirmation
    ) {
      return false;
    }
    return true;
  }

  isAddressButtonDisabled() {
    if (this.addressForm.valid) {
      return false;
    }
    return true;
  }
}
