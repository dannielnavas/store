import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { environment } from '@env/environment';
import { Product } from '@shared/models/product.model';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  private http = inject(HttpClient);

  getProducts(category_id?: string) {
    const url = new URL(`${environment.apiUrl}/api/v1/products`);
    if (category_id) {
      url.searchParams.append('categoryId', category_id);
    }
    return this.http.get<Product[]>(url.toString());
  }

  getOne(id: string) {
    return this.http.get<Product>(
      `${environment.apiUrl}/api/v1/products/${id}`
    );
  }
}
