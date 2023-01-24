import { Component, EventEmitter, Input, Output } from '@angular/core';

import { Product, CreateProductDTO, UpdateProductDTO } from '../../../models/product.model';

import { StoreService } from 'src/app/services/store.service';

import { ProductsService } from 'src/app/services/products.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent {

  constructor(private storeService: StoreService, private productsService: ProductsService) {
    this.myShoppingCart = this.storeService.getShoppingCart();
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
    this.statusDetail = 'loading';
    // Esto es de muestra para ver el error que se muestra al enviar
    // un id diferente
    //this.toggleProductDetail();
    if(!this.showProductDetail) {
      this.showProductDetail = true;
    }
    this.productsService.getProduct(id)
      .subscribe(data => {
        this.productChosen = data;
        this.statusDetail = "success"
      }, response => {
        // console.log(response.error.message);
        console.log(response)
        // Esta no es la mejor manera de mostrar error esto es
        // solo para prueba
        window.alert(response);
        this.statusDetail = "error";
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


 

  onLoadMore() {
    this.loadMore.emit();
  }


  total = 0;

  myShoppingCart: Product[] = [];

  @Input() products: Product[] = [];

  @Output() loadMore = new EventEmitter();

  // @Input() productId: string | null = null;

  @Input()
  set productId(id: string | null) {
    if (id){
      this.onShowDetail(id);
    }
    
  };

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

  
  statusDetail: 'loading' | 'success' | 'error' | 'init' = 'init';

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
