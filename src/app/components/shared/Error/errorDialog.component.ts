import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'error-message-dialog',
  template: `<h2 mat-dialog-title>Error</h2>
    <mat-dialog-content>{{ data.message }}</mat-dialog-content>
    <mat-dialog-actions>
      <button mat-button [mat-dialog-close]="'OK'">OK</button>
    </mat-dialog-actions>`,
})
export class ErrorMessageDialog {
  constructor(@Inject(MAT_DIALOG_DATA) public data: { message: string }) {}
}
