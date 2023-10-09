import { Injectable } from '@angular/core';
import { ValidationErrors } from '@angular/forms';

@Injectable({
  providedIn: 'root',
})
export class ErrorMessageService {
  getErrorMessage(errors: ValidationErrors | null, field?: string) {
    if (!errors) {
      return '';
    }

    if (errors['required']) {
      return 'Kötelező mező!';
    }

    if (errors['minlength']) {
      return (
        'Minimum karakterszám: ' + errors['minlength'].requiredLength + '.'
      );
    }

    if (errors['maxlength']) {
      return (
        'Maximum karakterszám: ' + errors['maxlength'].requiredLength + '.'
      );
    }

    if (errors['pattern']) {
      if (field === 'password') {
        return 'Nem megfelelő formátum! A jelszónak tartalmaznia kell legalább 1 kis betűt, 1 nagy betűt és 1 számot!';
      } else {
        return 'Nem megfelelő formátum!';
      }
    }

    return 'Hiba történt.';
  }
}
