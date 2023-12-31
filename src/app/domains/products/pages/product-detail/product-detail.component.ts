import { CommonModule } from '@angular/common';
import { Component, Input, inject, signal } from '@angular/core';
import { Product } from '@shared/models/product.model';
import { CartService } from '@shared/services/cart.service';
import { ProductService } from '@shared/services/product.service';

@Component({
  selector: 'app-product-detail',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './product-detail.component.html',
  styleUrl: './product-detail.component.css',
})
export default class ProductDetailComponent {
  @Input() id?: string;
  private productServices = inject(ProductService);
  private cartService = inject(CartService);
  product = signal<Product | null>(null);
  cover = signal<string>('');

  ngOnInit() {
    if (this.id) {
      this.productServices.getOne(this.id).subscribe({
        next: (product) => {
          this.product.set(product);
          if (product?.images && product.images.length > 0) {
            this.cover.set(product.images[0]);
          }
        },
        error: (err) => {
          console.log(err);
        },
      });
    }
  }

  changeCover(newImages: string) {
    this.cover.set(newImages);
  }

  addToCart() {
    const prduct = this.product();
    if (!prduct) return;
    this.cartService.addToCart(prduct);
  }
}
