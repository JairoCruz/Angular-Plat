import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';

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


    getAllProducts(limit?: number, offset?: number) {

      let params = new HttpParams();
      if (limit && offset) {
        params = params.set('limit', limit);
        params= params.set('offset', limit);
      }

      // Tipa el tipo de objetos que devolvera la solicitud
      
      //return this.http.get<Product[]>('https://fakestoreapi.com/products');
      return this.http.get<Product[]>(this.apiUrl, { params });
    }


    getProduct(id: string){
      return this.http.get<Product>(`${this.apiUrl}/${id}`)
    }



    getProductsByPage(limit: number, offset: number) {
      return this.http.get<Product[]>(`${this.apiUrl}`, {
        params: { limit, offset }
      });
    }


    // en este caso enviamos un dto y recivimos un objeto producto, esta es una flexibilidad que te brinda
    create (dto: CreateProductDTO) {
      return this.http.post<Product>(this.apiUrl, dto);
    }
    

    update(id: string, dto: any) {
      return this.http.put<Product>(`${this.apiUrl}/${id}`, dto);
    }

    delete(id: string) {
      return this.http.delete<boolean>(`${this.apiUrl}/${id}`);
    }
}
