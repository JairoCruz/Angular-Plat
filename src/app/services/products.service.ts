import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpErrorResponse, HttpStatusCode } from '@angular/common/http';

import { catchError, map } from 'rxjs/operators';

import { Product, CreateProductDTO, UpdateProductDTO } from './../models/product.model';
import { throwError } from 'rxjs';
import { isNgTemplate } from '@angular/compiler';
import { checkTime } from '../interceptores/time.interceptor';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {

  //private apiUrl = 'https://young-sands-07814.herokuapp.com/api/products';
  private apiUrl = 'https://api.escuelajs.co/api/v1';

  constructor(
    // Esta es un inyecion de dependencias
    private http: HttpClient
  ) { }



    getByCategory (categoryId: string, limit?: number, offset?: number) {
      
      let params = new HttpParams();
      if (limit && offset) {
        params = params.set('limit', limit);
        params= params.set('offset', limit);
      }

      return this.http.get<Product[]>(`${this.apiUrl}/categories/${categoryId}/products`, { params })
    }

    getAllProducts(limit?: number, offset?: number) {

      let params = new HttpParams();
      if (limit && offset) {
        params = params.set('limit', limit);
        params= params.set('offset', limit);
      }

      // Tipa el tipo de objetos que devolvera la solicitud
      
      //return this.http.get<Product[]>('https://fakestoreapi.com/products');
      return this.http.get<Product[]>(`${this.apiUrl}/products`, { params, context: checkTime() })
      .pipe(
        map(products => products.map(item => {
          return {
            ...item,
            taxes: .19 * item.price
          }
        }))
      );
    }


    getProduct(id: string){
      return this.http.get<Product>(`${this.apiUrl}/products/${id}`)
      .pipe(
        catchError((error: HttpErrorResponse) => {
          if (error.status === HttpStatusCode.Conflict) {
            return throwError('Algo esa fallando en el server');
          }
          if (error.status === HttpStatusCode.NotFound) {
            return throwError('el producto no existe');
          }

          if (error.status === HttpStatusCode.Unauthorized) {
            return throwError('No estas permitido');
          }
          return throwError('ups algo salio mal');
        })
      )
    }



    getProductsByPage(limit: number, offset: number) {
      return this.http.get<Product[]>(`${this.apiUrl}/products/`, {
        params: { limit, offset }, context: checkTime()
      })
      .pipe(
        map(products => products.map(item => {
          return {
            ...item,
            taxes: .19 * item.price
          }
        }))
      );
    }


    // en este caso enviamos un dto y recivimos un objeto producto, esta es una flexibilidad que te brinda
    create (dto: CreateProductDTO) {
      return this.http.post<Product>(`${this.apiUrl}/products`, dto);
    }
    

    update(id: string, dto: any) {
      return this.http.put<Product>(`${this.apiUrl}/products/${id}`, dto);
    }

    delete(id: string) {
      return this.http.delete<boolean>(`${this.apiUrl}/products/${id}`);
    }
}
