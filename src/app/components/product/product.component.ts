import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Product } from 'src/app/model/Product';
import { CommunationService } from 'src/app/services/communation.service';
import { ProductsComponent } from '../products/products.component';
import { MatDialog } from '@angular/material/dialog';
import { QuantityDemandedDialogBoxComponent } from 'src/app/quantity-demanded-dialog-box/quantity-demanded-dialog-box.component';
import { AlertService } from 'src/app/services/alert.service';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css'],
})
export class ProductComponent implements OnInit {
  ngOnInit(): void {}

  // **************
  // @input() data!: Product;
  // **************

  @Input() data!: Product;

  @Output() itemAdd = new EventEmitter();
  quantity?: string;
  cartProducts: any[] = [];

  // addItemToCart() {
  //   this.itemAdd.emit(this.data);
  // }

  constructor(public dialog: MatDialog, private alertService: AlertService) {}

  openDialog(): void {
    if ('cart' in localStorage) {
      this.cartProducts = JSON.parse(localStorage.getItem('cart')!);
      let exist = this.cartProducts.find((item) => {
        return item.item.id === this.data.id;
      });
      if (exist) {
        this.alertService.show('product is already in your cart.');

        // alert('product is already in your cart');
      } else {
        const dialogRef = this.dialog.open(QuantityDemandedDialogBoxComponent, {
          data: { quantityOfProduct: this.quantity },
        });

        dialogRef.afterClosed().subscribe((result) => {
          console.log(result.data);
          this.quantity = result.data;
          console.log(this.quantity);
          this.itemAdd.emit({ item: this.data, quantity: this.quantity });
        });
      }
    }
  }
}
