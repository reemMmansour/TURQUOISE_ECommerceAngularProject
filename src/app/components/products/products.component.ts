import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { Product } from 'src/app/model/Product';
import { QuantityDemandedDialogBoxComponent } from 'src/app/quantity-demanded-dialog-box/quantity-demanded-dialog-box.component';
import { AlertService } from 'src/app/services/alert.service';
import { CommunationService } from 'src/app/services/communation.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css'],
})
export class ProductsComponent implements OnInit {
  products: Product[] = [];
  categories: Product[] = [];
  category: string[] = [];
  active: boolean = false;
  pageNotFound: boolean = false;
  errorStatus?;
  cartProducts: any[] = [];
  // @output() errorStatus? = new EventEmitter();
  constructor(
    private communicationService: CommunationService,
    private activatedRoute: ActivatedRoute,
    private alertService: AlertService
  ) {}
  ngOnInit(): void {
    // this.getProducts();
    this.getProducts();
    // this.onShowDetails()
    this.getGategories();
  }
  onPageNotFound() {
    this.pageNotFound = true;
  }
  // productId;
  // productDetails;
  // onShowDetails() {
  //   this.productId = this.activatedRoute.snapshot.paramMap.get('id');
  //   this.productDetails = this.communicationService
  //     .getAllProducts()
  //     .subscribe((res: Product[]) => {
  //       res.find((x) => x.id == this.productId);
  //     });
  // }

  getProducts() {
    this.communicationService.getAllProducts().subscribe(
      (res: Product[]) => {
        this.pageNotFound = false;
        // console.log(res[0]);
        // console.log(res);
        this.products = res;
        // console.log(this.products[1].category)
        // console.log(this.products);
      },
      (error) => {
        console.log(error.message);
        this.onPageNotFound();
        this.errorStatus = error.status;
        console.log(this.errorStatus);
      }
    );
  }

  // ************ Get All Gategories ***********

  getGategories() {
    this.communicationService.getAllCategories().subscribe(
      (res: string[]) => {
        // console.log(res[0]);
        this.category = res;
        // console.log(this.category);
        return this.category;
      },
      (error) => {
        console.log(error.message);
      }
    );
    // this.onShowDetails()
  }

  // ************ filter ***********
  filterGategories(event: any) {
    // console.log(event.target.innerText);
    let textValue = event.target.innerText;
    // console.log(event)
    if (textValue == 'All') {
      this.getProducts();
      this.active = true;
    } else {
      this.active = true;
      this.getProductsCategories(textValue);
    }
    // this.active = false;
  }
  getProductsCategories(cate: string) {
    this.communicationService.getProductsByCategory(cate).subscribe((res) => {
      this.products = res;
    });
  }
  addToCart(event: any) {
    // console.log(event);

    if ('cart' in localStorage) {
      this.cartProducts = JSON.parse(localStorage.getItem('cart')!);
      let exist = this.cartProducts.find((item) => {
        return item.item.id === event.item.id;
      });
      if (!exist) {
        this.cartProducts.push(event);
        localStorage.setItem('cart', JSON.stringify(this.cartProducts));
      }
    } else {
      // console.log(event);
      this.cartProducts.push(event);
      localStorage.setItem('cart', JSON.stringify(this.cartProducts));
    }
  }

  itemAdd(event: any) {
    this.addToCart(event);
    console.log(event);
  }
  // QuantityItemAdd(event: any) {
  //   this.addToCart(event);

  //   console.log(event);
  // }
}
