import { CommonModule, NgOptimizedImage } from '@angular/common';
import { Component, EventEmitter, Output, input } from '@angular/core';
import { RouterLinkWithHref } from '@angular/router';
import { Product } from '@shared/models/product.model';
import { ReversePipe } from '@shared/pipes/reverse.pipe';
import { TimeAgoPipe } from '@shared/pipes/time-ago.pipe';

@Component({
  selector: 'app-product',
  imports: [
    CommonModule,
    TimeAgoPipe,
    ReversePipe,
    RouterLinkWithHref,
    NgOptimizedImage,
  ],
  templateUrl: './product.component.html',
  styleUrl: './product.component.css',
})
export class ProductComponent {
  // @Input({ required: true }) image: string = '';
  // @Input({ required: true }) price: number = 0;
  // @Input({ required: true }) title: string = '';
  readonly product = input.required<Product>();

  @Output() addToCart = new EventEmitter();

  addCartHandler() {
    console.log('addCartHandler');
    this.addToCart.emit(this.product());
  }
}
