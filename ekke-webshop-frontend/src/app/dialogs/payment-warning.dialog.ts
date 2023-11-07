import { Component } from '@angular/core';

@Component({
  selector: 'payment-warning-dialog',
  template: `
    <div class="main-container">
      <h1 class="title">Fizetés folyamatban, kérjük ne hagyd el az oldalt!</h1>
      <h1 class="title">
        Webes fizetés esetén erősítsd meg a tranzakciót a felugró MetaMask
        ablakban.
      </h1>
      <h1 class="title">
        Applikációs fizetés esetén kérjük várj, amíg feldolgozzuk a tranzakciót.
      </h1>
      <mat-progress-spinner
        class="spinner"
        [color]="'primary'"
        [mode]="'indeterminate'"
      >
      </mat-progress-spinner>
    </div>
  `,
  styles: [
    `
      .main-container {
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        padding: 20px;
        background: #0b1e58;
        overflow: hidden;
      }

      .title {
        color: white;
        font-size: 16px;
        font-weight: normal;
      }

      .spinner {
        margin-top: 20px;
      }
    `,
  ],
})
export class PaymentWarningDialog {}
