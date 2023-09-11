import { Dialog, DialogModule } from '@angular/cdk/dialog';
import {
  Component,
  EventEmitter,
  Inject,
  Input,
  NgModule,
  Output,
} from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { AlertService } from '../../shared/services/alert.service';

@Component({
  selector: 'app-quantity-demanded-dialog-box',
  templateUrl: './quantity-demanded-dialog-box.component.html',
  styleUrls: ['./quantity-demanded-dialog-box.component.css'],
})
export class QuantityDemandedDialogBoxComponent {
  constructor(
    public dialogRef: MatDialogRef<QuantityDemandedDialogBoxComponent>,
    private alertService: AlertService
  ) {}
  // @Inject(MAT_DIALOG_DATA) public data: DialogModule

  inputValue: number;
  // @Input() dataproduct: any = {};
  // @Output() itemAdd = new EventEmitter();
  // @Output() itemAdd: EventEmitter<number> = new EventEmitter<number>();
  // onNoClick() {

  addToCart(value: number): void {
    if (value > 0) {
      this.inputValue = value;
      this.dialogRef.close({ data: this.inputValue });
      this.alertService.show('Added to cart.');
    } else {
      this.alertService.show('Please enter the required quantity! ');
    }
  }
  onNoClick(): void {
    this.dialogRef.close();
  }
}
