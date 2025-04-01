import { CommonModule, NgOptimizedImage } from '@angular/common';
import {
  Component,
  OnInit,
  inject,
  input,
  linkedSignal,
  signal,
} from '@angular/core';
import { Product } from '@shared/models/product.model';
import { CartService } from '@shared/services/cart.service';
import { ProductService } from '@shared/services/product.service';

@Component({
  selector: 'app-product-detail',
  imports: [CommonModule, NgOptimizedImage],
  templateUrl: './product-detail.component.html',
  styleUrl: './product-detail.component.css',
})
export default class ProductDetailComponent implements OnInit {
  readonly slug = input<string>();
  private productServices = inject(ProductService);
  private cartService = inject(CartService);
  product = signal<Product | null>(null);
  // cover = signal<string>('');
  // los computed casi no se pueden modificar
  // cover = computed(() => {
  //   return this.product()?.images[0] || '';
  // });
  // $cover = linkedSignal(() => {
  //   return this.product()?.images[0] || '';
  // });

  $cover = linkedSignal({
    source: this.product,
    computation: (product, previosValue) => {
      return product?.images[0] || previosValue?.value;
    },
  });

  ngOnInit() {
    const slug = this.slug();
    if (slug) {
      this.productServices.getOneBySlug(slug).subscribe({
        next: product => {
          this.product.set(product);
          // if (product?.images && product.images.length > 0) {
          //   this.cover.set(product.images[0]);
          // }
        },
        error: err => {
          console.log(err);
        },
      });
    }
  }

  changeCover(newImages: string) {
    this.$cover.set(newImages);
  }

  addToCart() {
    const prduct = this.product();
    if (!prduct) return;
    this.cartService.addToCart(prduct);
  }
}
