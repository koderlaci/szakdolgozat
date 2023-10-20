import { Component, inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { PaymentService } from '../services/payment.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'account-chooser-dialog',
  template: `
    <div class="main-container">
      <h1 mat-dialog-title class="title">
        Kérjük válaszd ki, melyik tárcáddal szeretnél fizetni:
      </h1>
      <div mat-dialog-content class="content" [formGroup]="form">
        <mat-radio-group class="radio-group" formControlName="paymentAddress">
          <mat-radio-button
            *ngFor="let account of data; index as i"
            [value]="account"
            >{{ 'Tárca ' + (i + 1) + ': ' + account }}</mat-radio-button
          >
        </mat-radio-group>
      </div>
      <button
        mat-raised-button
        class="button"
        [disabled]="this.form.invalid"
        (click)="chooseAccount()"
      >
        Kiválasztom
      </button>
    </div>
  `,
  styles: [
    `
      .main-container {
        display: flex;
        flex-direction: column;
        gap: 20px;
        padding: 20px;
        background: #0b1e58;
        overflow: hidden;
      }

      .title {
        color: white;
      }

      .radio-group {
        display: flex;
        flex-direction: column;
      }

      .button {
        margin: 0 auto;
      }
    `,
  ],
})
export class AccountChooserDialog {
  private paymentService = inject(PaymentService);

  protected dialogRef = inject(MatDialogRef<AccountChooserDialog>);
  protected data = inject(MAT_DIALOG_DATA);

  protected form = new FormGroup({
    paymentAddress: new FormControl<string | null>(null, [Validators.required]),
  });

  constructor() {
    this.dialogRef.disableClose = true;
    this.dialogRef.backdropClick().subscribe(() => {
      this.dialogRef.close(false);
    });
  }

  chooseAccount() {
    if (this.form.controls.paymentAddress.value) {
      this.paymentService.paymentAddress.set(
        this.form.controls.paymentAddress.value
      );
      this.dialogRef.close(true);
    }
  }
}
