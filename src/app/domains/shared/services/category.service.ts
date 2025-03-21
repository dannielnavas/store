import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Category } from '@shared/models/product.model';

@Injectable({
  providedIn: 'root',
})
export class CategoryService {
  private http = inject(HttpClient);

  getAllCategories() {
    return this.http.get<Category[]>(
      'https://api.escuelajs.co/api/v1/categories',
    );
  }
}
