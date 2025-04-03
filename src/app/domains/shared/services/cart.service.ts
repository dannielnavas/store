import { Injectable, computed, signal } from '@angular/core';
import { Product } from '@shared/models/product.model';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  cart = signal<Product[]>([]);
  total = computed(() => {
    const cart = this.cart();
    return cart.reduce((acc, curr) => acc + curr.price, 0);
  });

  addToCart(product: Product) {
    this.cart.update(prev => [...prev, product]);
  }
}
