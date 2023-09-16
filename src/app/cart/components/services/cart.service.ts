import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  cartCount = new BehaviorSubject<number>(0);

  constructor(private http: HttpClient) {}
  createNewCart(model: any) {
    return this.http.post(`${environment.baseAPI}carts`, model);
  }
}
