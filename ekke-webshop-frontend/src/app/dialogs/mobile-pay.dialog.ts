import { Component, inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { PaymentService } from '../services/payment.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { OrderService } from '../services/order.service';
import { firstValueFrom } from 'rxjs';

@Component({
  selector: 'mobile-pay-dialog',
  template: `
    <div class="main-container">
      <p class="overflow">
        1. Küldj {{ data }} UniTokent a következő címre:
        0x619d3fbC6880F2fCEFD8715b27845513bcCB5076
      </p>
      <p>
        2. Másold be az alábbi mezőbe a tranzakciós lenyomatot (transaction
        hash) és fogadd el
      </p>
      <mat-form-field class="input" [formGroup]="form">
        <mat-label>Tranzakciós lenyomat</mat-label>
        <input matInput type="text" formControlName="transactionHash" />
      </mat-form-field>
      <div class="error">
        {{ errorMessage }}
      </div>
      <button
        mat-raised-button
        class="button"
        [disabled]="this.form.invalid"
        (click)="sendTransactionHash()"
      >
        Elfogadom
      </button>
    </div>
  `,
  styles: [
    `
      .main-container {
        display: flex;
        flex-direction: column;
        gap: 10px;
        padding: 20px;
        background: #0b1e58;
        overflow: hidden;
      }

      .overflow {
        overflow-wrap: break-word;
      }

      .input {
        width: 80%;
        max-width: 500px;
        margin: 0 auto;
      }

      .button {
        margin: 0 auto;
      }

      .error {
        color: red;
        min-height: 20px;
        margin-bottom: 10px;
      }
    `,
  ],
})
export class MobilePayDialog {
  private paymentService = inject(PaymentService);
  private orderService = inject(OrderService);

  protected dialogRef = inject(MatDialogRef<MobilePayDialog>);
  protected data = inject(MAT_DIALOG_DATA);
  protected errorMessage = '';

  protected form = new FormGroup({
    transactionHash: new FormControl<string | null>(null, [
      Validators.required,
    ]),
  });

  constructor() {
    this.dialogRef.disableClose = true;
    this.dialogRef.backdropClick().subscribe(() => {
      this.dialogRef.close(false);
    });
  }

  async sendTransactionHash() {
    this.errorMessage = '';

    if (this.form.controls.transactionHash.value) {
      const isHashHasBeenUsed = await firstValueFrom(
        this.orderService.checkIfTransactionHashHasBeenUsed(
          this.form.controls.transactionHash.value
        )
      );

      if (isHashHasBeenUsed) {
        this.errorMessage =
          'Ezt a tranzakciós lenyomatot már használták egy előző tranzakcióhoz.';
      } else {
        this.paymentService.transactionHash.set(
          this.form.controls.transactionHash.value
        );
        this.dialogRef.close(true);
      }
    }
  }
}
