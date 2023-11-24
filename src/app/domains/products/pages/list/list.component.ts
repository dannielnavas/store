import { CommonModule } from '@angular/common';
import { Component, signal } from '@angular/core';
import { Product } from '../../../shared/models/product.model';
import { ProductComponent } from '../../components/product/product.component';

@Component({
  selector: 'app-list',
  standalone: true,
  imports: [CommonModule, ProductComponent],
  templateUrl: './list.component.html',
  styleUrl: './list.component.css',
})
export class ListComponent {
  products = signal<Product[]>([]);

  constructor() {
    const initProducts: Product[] = [
      {
        id: 1,
        title: 'Product 1',
        price: 100,
        description: 'This is the product 1 description',
        image: 'https://picsum.photos/200/300?random=1',
        creationAt: new Date().toISOString(),
      },
      {
        id: 2,
        title: 'Product 2',
        price: 200,
        description: 'This is the product 2 description',
        image: 'https://picsum.photos/200/300?random=2',
        creationAt: new Date().toISOString(),
      },
      {
        id: 3,
        title: 'Product 3',
        price: 300,
        description: 'This is the product 3 description',
        image: 'https://picsum.photos/200/300?random=3',
        creationAt: new Date().toISOString(),
      },
    ];

    this.products.set(initProducts);
  }

  fromChildHandler(message: string) {
    console.log('fromChildHandler', message);
  }
}
