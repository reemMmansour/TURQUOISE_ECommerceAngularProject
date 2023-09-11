import { HttpClient } from '@angular/common/http';
import { Injectable, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Product } from '../../model/Product';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class CommunationService implements OnInit {
  products: Product[] = [];
  // loadingSpinner: boolean =true;

  constructor(private http: HttpClient) {}
  ngOnInit(): void {
    // throw new Error('Method not implemented.');
    // this.setLoadingSpinnerValue(this.loadingSpinner);
  }

  // getLoadingSpinnerValue(): boolean {
  //   return this.loadingSpinner;
  // }
  // setLoadingSpinnerValue(value: boolean): void {
  //   this.loadingSpinner = value;
  // }
  getAllProducts(): Observable<Product[]> {
    return this.http.get<Product[]>(`${environment.baseAPI}products`);
    // return this.http.get<Product[]>(this.urlBaseApi).pipe(filter())
  }

  getAllCategories(): Observable<string[]> {
    return this.http.get<string[]>(`${environment.baseAPI}products/categories`);
  }

  getProductsByCategory(category: string): Observable<Product[]> {
    return this.http.get<Product[]>(
      `${environment.baseAPI}products/category/${category}`
    );
  }

  getProductByID(id: any): Observable<Product> {
    return this.http.get<Product>(`${environment.baseAPI}products/${id}`);
  }
}
