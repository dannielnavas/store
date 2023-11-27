import { CommonModule } from '@angular/common';
import { Component, inject, signal } from '@angular/core';
import { HeaderComponent } from '../../../shared/components/header/header.component';
import { Product } from '../../../shared/models/product.model';
import { CartService } from '../../../shared/services/cart.service';
import { ProductComponent } from '../../components/product/product.component';

@Component({
  selector: 'app-list',
  standalone: true,
  imports: [CommonModule, ProductComponent, HeaderComponent],
  templateUrl: './list.component.html',
  styleUrl: './list.component.css',
})
export class ListComponent {
  products = signal<Product[]>([]);
  private cartService = inject(CartService);

  constructor() {
    const initProducts: Product[] = [
      {
        id: 1,
        title: 'Product 1',
        price: 100,
        description: 'This is the product 1 description',
        image: 'https://picsum.photos/600/600?random=1',
        creationAt: new Date().toISOString(),
      },
      {
        id: 2,
        title: 'Product 2',
        price: 200,
        description: 'This is the product 2 description',
        image: 'https://picsum.photos/600/600?random=2',
        creationAt: new Date().toISOString(),
      },
      {
        id: 3,
        title: 'Product 3',
        price: 300,
        description: 'This is the product 3 description',
        image: 'https://picsum.photos/600/600?random=3',
        creationAt: new Date().toISOString(),
      },
    ];

    this.products.set(initProducts);
  }

  addToCart(prduct: Product) {
    this.cartService.addToCart(prduct);
  }
}
