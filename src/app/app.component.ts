import { Component, OnInit } from '@angular/core';
import { CommunationService } from './shared/services/communation.service';
import { Product } from './model/Product';
import { Route, Router } from '@angular/router';
import { AlertService } from './shared/services/alert.service';
import { isEmpty } from 'rxjs';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  title = 'secondProjectWithRouting';
  products: Product[] = [];
  cartProducts?: Product[];
  private storageEventListener: EventListener | null = null;

  constructor(
    private communicationService: CommunationService,
    private route: Router,
    private alertService: AlertService
  ) {}
  ngOnInit(): void {
    this.getCartProducts();
    this.setupStorageEventListener();
  }

  // *************************
  ngOnDestroy(): void {
    this.removeStorageEventListener();
  }

  private setupStorageEventListener(): void {
    this.storageEventListener = this.handleStorageChange.bind(this);
    window.addEventListener('storage', this.storageEventListener);
  }

  private removeStorageEventListener(): void {
    if (this.storageEventListener) {
      window.removeEventListener('storage', this.storageEventListener);
      this.storageEventListener = null;
    }
  }

  private handleStorageChange(event: StorageEvent): void {
    if (event.key === 'cart') {
      this.getCartProducts();
    }
  }

  getCartProducts(): void {
    if ('cart' in localStorage) {
      this.cartProducts = JSON.parse(localStorage.getItem('cart')!);
    } else {
      this.cartProducts = [];
    }
    this.updateBadgeValue();
  }

  updateBadgeValue(): void {
    const badge = document.getElementById('cartBadge');
    if (badge) {
      badge.innerText = this.cartProducts.length.toString();
    }
  }
  // *************************

  // getCartProducts() {
  //   if ('cart' in localStorage) {
  //     this.cartProducts = JSON.parse(localStorage.getItem('cart')!);
  //   }
  //   return this.cartProducts;
  // }

  goToCartPage() {
    if (JSON.parse(localStorage.getItem('cart')!).length > 0) {
      this.route.navigateByUrl('/cart');
    } else {
      this.alertService.show('there are no products in the cart yet.');
      // this.route.navigateByUrl('/products');
    }
  }
}

// badgeValue: number;
// cartP?: Product[];
// this.getBadgeValue();

// getBadgeValue() {
//   if (JSON.parse(localStorage.getItem('cart')!).length > 0) {
//     this.cartP = this.getCartProducts();
//     console.log(this.cartP.length);
//     let storedValue = this.cartP.length;
//     this.badgeValue = storedValue ? storedValue : 0;
//     console.log(this.badgeValue);
//   } else {
//     this.badgeValue = 0;
//   }
//   return this.badgeValue;
// }
