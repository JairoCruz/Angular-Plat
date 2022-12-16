import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Product, CreateProductDTO, UpdateProductDTO } from './../models/product.model';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {

  private apiUrl = 'https://young-sands-07814.herokuapp.com/api/products';

  constructor(
    // Esta es un inyecion de dependencias
    private http: HttpClient
  ) { }


    getAllProducts() {
      // Tipa el tipo de objetos que devolvera la solicitud
      
      //return this.http.get<Product[]>('https://fakestoreapi.com/products');
      return this.http.get<Product[]>(this.apiUrl);
    }


    getProduct(id: string){
      return this.http.get<Product>(`${this.apiUrl}/${id}`)
    }

    // en este caso enviamos un dto y recivimos un objeto producto, esta es una flexibilidad que te brinda
    create (dto: CreateProductDTO) {
      return this.http.post<Product>(this.apiUrl, dto);
    }
    

    update(id: string, dto: any) {
      return this.http.put<Product>(`${this.apiUrl}/${id}`, dto);
    }
}
