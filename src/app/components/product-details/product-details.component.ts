import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Product } from 'src/app/model/Product';
import { CommunationService } from 'src/app/shared/services/communation.service';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.css'],
})
export class ProductDetailsComponent {
  productdetails: Product;
  loader: boolean = false;
  productId: string;

  constructor(
    private activatedRoute: ActivatedRoute,
    private communicationService: CommunationService
  ) {}

  ngOnInit(): void {
    this.loader = true;
    this.getProductsDetails();
  }

  //********* Products Details *********/
  getProductsDetails() {
    this.loader = true;
    this.productId = this.activatedRoute.snapshot.paramMap.get('id');
    console.log(this.productId);
    this.communicationService
      .getProductByID(this.productId)
      .subscribe((res) => {
        this.loader = false;
        this.productdetails = res;
        console.log(this.productdetails);
      });
  }

  //********* Rating *********/
  rating: number;
  getArray(rate: number, isEmptyStar: boolean) {
    if (isEmptyStar == true) {
      rate = 5 - Math.floor(this.productdetails.rating.rate);
    }
    return Array.from({ length: rate }, (_, i) => i + 1);
  }
}
