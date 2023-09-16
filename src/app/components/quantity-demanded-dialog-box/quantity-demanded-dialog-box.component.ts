import { Dialog, DialogModule } from '@angular/cdk/dialog';
import {
  Component,
  EventEmitter,
  Inject,
  Input,
  NgModule,
  OnInit,
  Output,
} from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { AlertService } from '../../shared/services/alert.service';
import { CartService } from 'src/app/cart/components/services/cart.service';
import { Product } from 'src/app/model/Product';

@Component({
  selector: 'app-quantity-demanded-dialog-box',
  templateUrl: './quantity-demanded-dialog-box.component.html',
  styleUrls: ['./quantity-demanded-dialog-box.component.css'],
})
export class QuantityDemandedDialogBoxComponent implements OnInit {
  inputValue: number;
  cartProducts?: Product[];

  constructor(
    public dialogRef: MatDialogRef<QuantityDemandedDialogBoxComponent>,
    private alertService: AlertService,
    private serviceCart: CartService
  ) {}
  ngOnInit(): void {}
  // @Inject(MAT_DIALOG_DATA) public data: DialogModule

  addItemCart() {
    if ('cart' in localStorage) {
      this.cartProducts = JSON.parse(localStorage.getItem('cart')!);
      this.serviceCart.cartCount.next(this.cartProducts.length + 1);
      localStorage.setItem('cart', JSON.stringify(this.cartProducts));
    }
  }
  addToCart(value: number): void {
    if (value > 0) {
      this.inputValue = value;
      this.dialogRef.close({ data: this.inputValue });
      this.addItemCart();
      this.alertService.show('Added to cart.');
    } else {
      this.alertService.show('Please enter the required quantity! ');
    }
  }
  onNoClick(): void {
    this.dialogRef.close();
  }
}
