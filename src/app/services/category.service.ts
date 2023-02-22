import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';

import { Category } from './../models/category.model';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  private apiUrl = 'https://api.escuelajs.co/api/v1/categories';

  constructor(
    private http: HttpClient
  ) { }


    getAll(limit?: number, offset?: number) {
      let params = new HttpParams();
      if (limit && offset) {
        params = params.set('limit', limit);
        params = params.set('offset', limit);
      }
      return this.http.get<Category[]>(this.apiUrl, { params });
    }


    createCategory(data: Partial<Category>) {
      return this.http.post<Category>(this.apiUrl, data);
    }

    updateCategory(id: string, data: Partial<Category>) {
      return this.http.put<Category>(this.apiUrl, data);
    }

    checkCategory(name: string) {
      return this.http.post(`${this.apiUrl}/availability`, { name });
    }

}
