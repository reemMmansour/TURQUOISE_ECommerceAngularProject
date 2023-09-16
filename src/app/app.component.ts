import { Component, OnInit } from '@angular/core';
import { CommunationService } from './shared/services/communation.service';
import { Product } from './model/Product';
import { Route, Router } from '@angular/router';
import { AlertService } from './shared/services/alert.service';
import { BehaviorSubject, isEmpty } from 'rxjs';
import { CartService } from './cart/components/services/cart.service';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  title = 'TURQUOISE_ECommerceAngularProject';
  countHidden: boolean = true;

  products: Product[] = [];
  cartProducts?: Product[];
  cartCount: number;

  constructor(
    private communicationService: CommunationService,
    private route: Router,
    private alertService: AlertService,
    private serviceCart: CartService
  ) {
    this.serviceCart.cartCount.subscribe((res) => {
      this.cartCount = res;
      if (res != 0) {
        this.countHidden = false;
      }
      console.log(res);
    });
  }

  ngOnInit(): void {
    this.getCartProducts();
  }

  // *************************
  getCartProducts() {
    if ('cart' in localStorage) {
      this.cartProducts = JSON.parse(localStorage.getItem('cart')!);
      this.serviceCart.cartCount.next(this.cartProducts.length);
      // if (this.cartProducts.length != 0) {
      //   this.serviceCart.countHidden = false;
      //   this.countHidden = this.serviceCart.countHidden;
      // }
      // else {
      //   this.countHidden = true;
      // }
    }
    return this.cartProducts;
  }

  goToCartPage() {
    if (JSON.parse(localStorage.getItem('cart')!).length > 0) {
      this.route.navigateByUrl('/cart');
    } else {
      // this.countHidden = false;
      this.alertService.show('there are no products in the cart yet.');
      // this.route.navigateByUrl('/products');
    }
  }
}
