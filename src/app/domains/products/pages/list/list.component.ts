import { CommonModule } from '@angular/common';
import {
  Component,
  Input,
  OnChanges,
  OnInit,
  inject,
  signal,
} from '@angular/core';
import { RouterLinkWithHref } from '@angular/router';
import { Category, Product } from '@shared/models/product.model';
import { CartService } from '@shared/services/cart.service';
import { CategoryService } from '@shared/services/category.service';
import { ProductService } from '@shared/services/product.service';
import { ProductComponent } from '../../components/product/product.component';

@Component({
  selector: 'app-list',
  imports: [CommonModule, ProductComponent, RouterLinkWithHref],
  templateUrl: './list.component.html',
  styleUrl: './list.component.css',
})
export default class ListComponent implements OnInit, OnChanges {
  products = signal<Product[]>([]);
  categories = signal<Category[]>([]);
  private cartService = inject(CartService);
  private productsService = inject(ProductService);
  private categoryService = inject(CategoryService);
  @Input() slug?: string;

  ngOnInit() {
    this.getCategories();
  }

  ngOnChanges() {
    this.getProducts();
  }

  private getProducts() {
    this.productsService
      .getProducts({ category_slug: this.slug })
      .subscribe(products => {
        this.products.set(products);
      });
  }

  private getCategories() {
    this.categoryService.getAllCategories().subscribe({
      next: categories => {
        this.categories.set(categories);
      },
      error: err => {
        console.log(err);
      },
    });
  }

  addToCart(prduct: Product) {
    this.cartService.addToCart(prduct);
  }
}
