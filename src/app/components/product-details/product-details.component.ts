import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Product } from 'src/app/model/Product';
import { CommunationService } from 'src/app/services/communation.service';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.css']
})
export class ProductDetailsComponent {
  // product: Product;

  productdetails: Product;

  productId: string;
  constructor(
    private activatedRoute: ActivatedRoute,
    private communicationService: CommunationService
  ) {
    // this.getProduct();
  }
  ngOnInit(): void {
    this.productId = this.activatedRoute.snapshot.paramMap.get('id');
    console.log(this.productId);
    this.communicationService
      .getProductByID(this.productId)
      .subscribe((res) => {
        this.productdetails = res;
        console.log(this.productdetails);
        // this.productdetails = this.communicationService.products.find(
        //   (x) => x.id == this.productId
        // );
        // console.log(this.productdetails);
      });
  }

  rating: number;
  getArray(rate: number, isEmptyStar: boolean) {
    if (isEmptyStar == true) {
       rate = 5 - Math.floor(this.productdetails.rating.rate);
    }
    return Array.from({ length: rate }, (_, i) => i + 1);
  }
}
