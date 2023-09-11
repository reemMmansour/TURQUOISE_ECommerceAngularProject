import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { Product } from 'src/app/model/Product';
import { cart } from 'src/app/model/cart';
import { CartService } from '../services/cart.service';
import { AlertService } from 'src/app/shared/services/alert.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css'],
})
export class CartComponent implements OnInit {
  constructor(
    private serviceCart: CartService,
    private alertService: AlertService
  ) {}
  cartProducts?: Product[];
  allTotal: number;
  dataSource = new MatTableDataSource<Product>(this.cartProducts);
  displayedColumns = [
    'image',
    'title',
    'category',
    'price',
    'quantity',
    'total',
    'delete',
  ];

  ngOnInit(): void {
    this.getCartProducts();
    this.getCartTotal();
  }

  // **********************************
  getCartProducts() {
    if ('cart' in localStorage) {
      this.cartProducts = JSON.parse(localStorage.getItem('cart')!);
    }
    // console.table(this.cartProducts);
    return this.cartProducts;
  }
  // **********************************
  plusQuantity(item: any) {
    // console.log(item);
    item.quantity++;
    localStorage.setItem('cart', JSON.stringify(this.cartProducts));
    this.getCartTotal();
  }

  // **********************************
  minQuantity(item: any) {
    item.quantity--;
    localStorage.setItem('cart', JSON.stringify(this.cartProducts));
    this.getCartTotal();
  }

  // **********************************
  // for updata localStorage
  detectChange() {
    localStorage.setItem('cart', JSON.stringify(this.cartProducts));
    this.getCartTotal();
  }

  // **********************************
  // Delete Products
  deleteProduct(item: any) {
    const index = this.cartProducts.indexOf(item);
    if (index >= 0) {
      this.cartProducts.splice(index, 1);
      localStorage.setItem('cart', JSON.stringify(this.cartProducts));
      this.getCartTotal();
      if ('cart' in localStorage) {
        this.cartProducts = JSON.parse(localStorage.getItem('cart')!);
      }
    }
  }

  // **********************************
  // Delete All Products
  deleteAllProducts() {
    this.cartProducts = [];
    localStorage.setItem('cart', JSON.stringify(this.cartProducts));
    this.getCartTotal();
  }

  // **********************************
  // Total Price
  getCartTotal() {
    let total = 0;
    if (JSON.parse(localStorage.getItem('cart')!).length > 0) {
      this.cartProducts = JSON.parse(localStorage.getItem('cart')!);
      console.log(this.cartProducts);
      this.cartProducts.forEach((ele) => {
        total += ele.item.price * ele.quantity;
        this.allTotal = total;
      });
    } else {
      this.allTotal = 0;
    }
    console.log(total);
    console.log(this.allTotal);
  }
  
  // Add To Cart
  addCart() {
    if (JSON.parse(localStorage.getItem('cart')!).length > 0) {
      let products = this.cartProducts.map((item) => {
        return { productsId: item.item.id, quantity: item.quantity };
      });
      let model = {
        userId: 5,
        date: new Date(),
        products: products,
      };
      this.serviceCart.createNewCart(model).subscribe(
        (res) => {
          this.alertService.show('Done! Your Order Is Successfully Send.');
        },
        (error) => {
          this.alertService.show('Sorry, sending failed! Try again.');
        }
      );
    } else {
      this.alertService.show('there are no products in the cart yet.');
    }
  }
}
