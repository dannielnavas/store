import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  inject,
  input,
  resource,
} from '@angular/core';
import { rxResource } from '@angular/core/rxjs-interop';
import { RouterLinkWithHref } from '@angular/router';
import { Product } from '@shared/models/product.model';
import { CartService } from '@shared/services/cart.service';
import { CategoryService } from '@shared/services/category.service';
import { ProductService } from '@shared/services/product.service';
import { ProductComponent } from '../../components/product/product.component';

@Component({
  selector: 'app-list',
  imports: [CommonModule, ProductComponent, RouterLinkWithHref],
  templateUrl: './list.component.html',
  styleUrl: './list.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class ListComponent {
  private cartService = inject(CartService);
  private productsService = inject(ProductService);
  private categoryService = inject(CategoryService);

  // products = signal<Product[]>([]);
  // loadingProducts = signal(false);
  // errorProducts = signal('');

  productsResource = rxResource({
    request: () => ({
      category_slug: this.slug(),
    }),
    loader: ({ request }) => this.productsService.getProducts(request),
  });

  // $categories = toSignal(this.categoryService.getAllCategories(), {
  //   initialValue: [],
  // });

  // uso con observbles
  // categoriesResource = rxResource({
  //   loader: () => this.categoryService.getAllCategories(),
  // });

  // uso con promesas
  categoriesResource = resource({
    loader: () => this.categoryService.getAllPromise(),
  });

  readonly slug = input<string>();

  // ngOnInit() {
  //   this.getCategories();
  // }

  // ngOnChanges() {
  //   this.getProducts();
  // }

  // private getProducts() {
  //   this.loadingProducts.set(true);
  //   this.errorProducts.set('');
  //   this.productsService.getProducts({ category_slug: this.slug() }).subscribe({
  //     next: products => {
  //       this.products.set(products);
  //       this.loadingProducts.set(false);
  //     },
  //     error: err => {
  //       this.errorProducts.set(err.message);
  //       this.loadingProducts.set(false);
  //     },
  //   });
  // }
  // cambiado por el toSignal
  // private getCategories() {
  //   this.categoryService.getAllCategories().subscribe({
  //     next: categories => {
  //       this.categories.set(categories);
  //     },
  //     error: err => {
  //       console.log(err);
  //     },
  //   });
  // }

  addToCart(product: Product) {
    this.cartService.addToCart(product);
  }

  resetCategories() {
    // this.$categories.set([]); no se puede por restricción

    this.categoriesResource.set([]);
  }

  reloadCategories() {
    this.categoriesResource.reload();
  }

  reloadProducts() {
    this.productsResource.reload();
  }

  resetProducts() {
    this.productsResource.set([]);
  }
}
