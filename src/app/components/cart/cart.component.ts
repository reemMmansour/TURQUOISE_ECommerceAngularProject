import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { Product } from 'src/app/model/Product';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css'],
})
export class CartComponent implements OnInit {
  constructor() {}
  cartProducts: Product[] = [];
  // dataSource = new MatTableDataSource<Product>(this.cartProducts);
  displayedColumns = [
    'image',
    'title',
    'category',
    'price',
    'quantity',
    'totle',
    'delete',
  ];

  ngOnInit(): void {
    this.getCartProducts();
    // this.calculateTotal(this.cartProducts);

    // console.log(this.dataSource);
    // console.log(this.cartProducts[1].quantity);
    // this.minQuantity(2)
  }
  getCartProducts() {
    if ('cart' in localStorage) {
      this.cartProducts = JSON.parse(localStorage.getItem('cart')!);
    }
    console.table(this.cartProducts);
    return this.cartProducts;
  }
  plusQuantity(item: any) {
    console.log(item);
    item.quantity++;
    // this.cartProducts.forEach(ele => {
    //   if (ele.id === index.item.id) {
    //     ele.quantity = +ele.quantity +1
    //   }
    // })
    localStorage.setItem('cart', JSON.stringify(this.cartProducts));
  }
  minQuantity(item: any) {
    item.quantity--;
    localStorage.setItem('cart', JSON.stringify(this.cartProducts));
  }
  // for updata localStorage
  detectChange() {
    localStorage.setItem('cart', JSON.stringify(this.cartProducts));
  }
  // Delete Products
  deleteProduct(item: any) {
    this.cartProducts.forEach((ele) => {
      if (ele.id === item.item.id) {
        // this.cartProducts.splice(this.cartProducts);
      }
    });
    // this.cartProducts.splice(item.);

    localStorage.setItem('cart', JSON.stringify(this.cartProducts));
  }

  deleteAllProducts() {
    this.cartProducts = [];
    localStorage.setItem('cart', JSON.stringify(this.cartProducts));
  }
  calculateTotal(index: any): number {
    let total = 0;

    this.cartProducts.forEach(ele => {
      total += ele.price * ele.quantity;
    })
    console.log(total);
    return total;
  }
}
