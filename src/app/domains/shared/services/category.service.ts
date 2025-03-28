import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { environment } from '@env/environment';
import { Category } from '@shared/models/product.model';

@Injectable({
  providedIn: 'root',
})
export class CategoryService {
  private http = inject(HttpClient);

  getAllCategories() {
    return this.http.get<Category[]>(`${environment.apiUrl}/api/v1/categories`);
  }
}
