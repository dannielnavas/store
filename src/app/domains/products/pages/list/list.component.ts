import { CommonModule } from '@angular/common';
import { Component, inject, signal } from '@angular/core';
import { HeaderComponent } from '@shared/components/header/header.component';
import { Product } from '@shared/models/product.model';
import { CartService } from '@shared/services/cart.service';
import { ProductService } from '@shared/services/product.service';
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
  private productsService = inject(ProductService);


  ngOnInit() {
    this.getProducts();
  }

  getProducts() {
    this.productsService.getProducts().subscribe((products) => {
      this.products.set(products);
    });
  }

  addToCart(prduct: Product) {
    this.cartService.addToCart(prduct);
  }
}
