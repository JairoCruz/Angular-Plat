import { Component, OnInit } from '@angular/core';

import { Product, CreateProductDTO, UpdateProductDTO } from '../../models/product.model';

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
   // this.productsService.getAllProducts()
   this.productsService.getProductsByPage(10, 0)
    .subscribe(data => {
      // console.log(data);
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

  toggleProductDetail() {
    this.showProductDetail = !this.showProductDetail;
  }


  onShowDetail(id: string){
    this.productsService.getProduct(id)
      .subscribe(data => {
        this.toggleProductDetail();
        this.productChosen = data;
      });
  }


  createNewProduct() {
    const product: CreateProductDTO = {
      title: 'Nueva productJ',
      description: 'nueva descripcion',
      images: ['https://placeimg.com/640/480/any'],
      price: 10000,
      categoryId: 2,

    }


    this.productsService.create(product)
    .subscribe(data => {
      console.log('created', data);
      // lo que hace unshift es agregar al array en la primera posicion
      // lo que se esta devolviendo
      this.products.unshift(data);
    });


  }


  updateProduct() {
    const changes: UpdateProductDTO = {
      title: 'Some change title',
    }
    const id = this.productChosen.id;
    this.productsService.update(id, changes)
    .subscribe(data => {
      const productIndex = this.products.findIndex(item => item.id === this. productChosen.id);
      this.products[productIndex] = data;
    });
    this.toggleProductDetail();
  }


  deleteProduct() {
    const id = this.productChosen.id;

    this.productsService.delete(id)
    .subscribe(() => {
      const productIndex = this.products.findIndex(item => item.id === this. productChosen.id);
      this.products.splice(productIndex, 1);
      this.showProductDetail = false;
    });
  }


  loadMore() {
    this.productsService.getProductsByPage(this.limit, this.offset)
    .subscribe(data => {
      this.products = this.products.concat(data);
      this.offset += this.limit;
    });
  }


  total = 0;
  myShoppingCart: Product[] = [];

  products: Product[] = [];

  showProductDetail = false;

  productChosen: Product = {
    id: '',
    price: 0,
    images: [],
    title: '',
    category: {
      id: '',
      name: '',
    }, 
    description: ''
  };

  limit = 10;
  offset = 0;

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
