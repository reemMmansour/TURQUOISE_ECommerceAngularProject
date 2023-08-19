import { Component, OnInit } from '@angular/core';
import { CommunationService } from './services/communation.service';
import { Product } from './model/Product';
import { Route, Router } from '@angular/router';
import { AlertService } from './services/alert.service';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  title = 'TURQUOISE_ECommerceAngularProject';
  // products: Product[] =[];
  constructor(
    private communicationService: CommunationService,
    private route: Router,
    private alertService: AlertService
  ) {}
  ngOnInit(): void {
    // this.communicationService.getAllProducts().subscribe((res: Product[]) => {
    //   console.log(res[0])
    //   console.log(res)
    //   this.products = res;
    //   // console.log(this.products[1].category)
    //   console.log(this.products)
    //   console.log(this.products)
    //   console.log(this.products)
    // })
  }
  goToCartPage() {
    if ('cart' in localStorage) {
      this.route.navigateByUrl('cart');
    } else {
      this.alertService.show('there are no products in the cart yet.');
    }
  }
}
