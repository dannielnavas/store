import { CommonModule } from '@angular/common';
import { Component, Input, inject, signal } from '@angular/core';
import { Product } from '@shared/models/product.model';
import { ProductService } from '@shared/services/product.service';

@Component({
  selector: 'app-product-detail',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './product-detail.component.html',
  styleUrl: './product-detail.component.css',
})
export class ProductDetailComponent {
  @Input() id?: string;
  private productServices = inject(ProductService);
  product = signal<Product | null>(null);

  ngOnInit() {
    if (this.id) {
      this.productServices.getOne(this.id).subscribe({
        next: (product) => {
          this.product.set(product);
        },
        error: (err) => {
          console.log(err);
        },
      });
    }
  }
}
