import { CommonModule, NgOptimizedImage } from '@angular/common';
import {
  Component,
  OnInit,
  effect,
  inject,
  input,
  linkedSignal,
} from '@angular/core';
import { rxResource } from '@angular/core/rxjs-interop';
import { environment } from '@env/environment';
import { RelatedComponent } from '@products/components/related/related.component';
import { CartService } from '@shared/services/cart.service';
import { ProductService } from '@shared/services/product.service';
import { MetaTagsService } from '../../../shared/services/meta-tags.service';

@Component({
  selector: 'app-product-detail',
  imports: [CommonModule, NgOptimizedImage, RelatedComponent],
  templateUrl: './product-detail.component.html',
  styleUrl: './product-detail.component.css',
})
export default class ProductDetailComponent implements OnInit {
  private productServices = inject(ProductService);
  private cartService = inject(CartService);
  private metaTagsService = inject(MetaTagsService);
  // titleServices = inject(Title);
  // meta = inject(Meta);
  // product = signal<Product | null>(null);
  readonly slug = input.required<string>();
  // cover = signal<string>('');
  // los computed casi no se pueden modificar
  // cover = computed(() => {
  //   return this.product()?.images[0] || '';
  // });
  // $cover = linkedSignal(() => {
  //   return this.product()?.images[0] || '';
  // });

  productResource = rxResource({
    request: () => ({
      slug: this.slug(),
    }),
    loader: ({ request }) => {
      return this.productServices.getOneBySlug(request.slug);
    },
  });

  $cover = linkedSignal({
    source: this.productResource.value,
    computation: (product, previosValue) => {
      return product?.images[0] || previosValue?.value;
    },
  });

  constructor() {
    effect(() => {
      const product = this.productResource.value();
      if (product) {
        this.metaTagsService.updateMetaTags({
          title: product.title,
          description: product.description,
          image: product.images[0],
          url: `${environment.domain}/product/${product.slug}`,
        });
        // this.titleServices.setTitle(product.title);
        // this.meta.updateTag({
        //   name: 'description',
        //   content: product.description,
        // });
        // this.meta.updateTag({
        //   name: 'og:title',
        //   content: product.title,
        // });
        // this.meta.updateTag({
        //   name: 'og:description',
        //   content: product.description,
        // });
        // this.meta.updateTag({
        //   name: 'og:image',
        //   content: product.images[0],
        // });
        // this.meta.updateTag({
        //   name: 'og:url',
        //   content: `${environment.domain}/product/${product.slug}`,
        // });
        // this.meta.updateTag({
        //   name: 'og:type',
        //   content: 'product',
        // });
      }
    });
  }
  ngOnInit() {
    // const slug = this.slug();
    // if (slug) {
    //   this.productServices.getOneBySlug(slug).subscribe({
    //     next: product => {
    //       this.product.set(product);
    //       // if (product?.images && product.images.length > 0) {
    //       //   this.cover.set(product.images[0]);
    //       // }
    //     },
    //     error: err => {
    //       console.log(err);
    //     },
    //   });
    // }
  }

  changeCover(newImages: string) {
    this.$cover.set(newImages);
  }

  addToCart() {
    const product = this.productResource.value();
    if (!product) return;
    this.cartService.addToCart(product);
  }
}
