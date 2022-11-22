import { Component, OnInit } from '@angular/core';

import { Product } from '../../models/product.model';

import { StoreService } from 'src/app/services/store.service';
import { ProductsService } from 'src/app/services/products.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent implements OnInit {

  constructor(private storeService: StoreService, private productsService: ProductsService) {
    this.myShoppingCart = this.storeService.getShoppingCart();
   }

  ngOnInit(): void {
    this.productsService.getAllProducts()
    .subscribe(data => {
      console.log(data);
      this.products = data;
    });
  }


  onAddToShoppingCart(product: Product) {
    //console.log(product);
   // this.myShoppingCart.push(product);
   // this.total = this.myShoppingCart.reduce((sum, item) => sum + item.price, 0);
   
   
   // Utilizando la inyeccion de dependencias
   this.storeService.addProduct(product)
   this.total = this.storeService.getTotal();
  }


  total = 0;
  myShoppingCart: Product[] = [];

  products: Product[] = [];

 /* products: Product[] = [
    {
      id: '1',
      name: 'EL mejor juguete',
      price: 565,
      image: './assets/images/toy.jpg'
    },
    {
      id: '2',
      name: 'Bicicleta casi nueva',
      price: 356,
      image: './assets/images/bike.jpg'
    },
    {
      id: '3',
      name: 'Colleción de albumnes',
      price: 34,
      image: './assets/images/album.jpg'
    },
    {
      id: '4',
      name: 'Mis libros',
      price: 23,
      image: './assets/images/books.jpg'
    },
  ];
  */

}
