import { Injectable } from '@angular/core';
import { MatSnackBar, MatSnackBarConfig } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root'
})
export class AlertService {

  constructor(private snackBar: MatSnackBar) { }

  show(message: string, duration: number = 2000): void {

    this.snackBar.open(message, 'OK', {

      // duration: duration,
      panelClass: ['custom-snackbar'],
      horizontalPosition: 'center',
      verticalPosition: 'top', // Display snackbar at the top
      politeness: 'assertive'
    });
  }
}
