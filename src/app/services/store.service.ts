import { Injectable } from '@angular/core';

import { BehaviorSubject } from 'rxjs';

import { Product } from '../models/product.model';

@Injectable({
  providedIn: 'root'
})
export class StoreService {

 private myShoppingCart: Product[] = [];

 private myCart = new BehaviorSubject<Product[]>([]);

 myCart$ = this.myCart.asObservable();

  constructor() { }

  addProduct(product: Product) {
    this.myShoppingCart.push(product);
    // Para que empieze a trasmitir los datos, para todos los que estan suscritos
    this.myCart.next(this.myShoppingCart);
  }

  getShoppingCart() {
    return this.myShoppingCart;
  }

  getTotal() {
    return this.myShoppingCart.reduce((sum, item) => sum + item.price, 0);
  }
}
