import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Product } from '../../../shared/models/product.model';

@Component({
  selector: 'app-product',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './product.component.html',
  styleUrl: './product.component.css',
})
export class ProductComponent {
  // @Input({ required: true }) image: string = '';
  // @Input({ required: true }) price: number = 0;
  // @Input({ required: true }) title: string = '';
  @Input({ required: true }) product!: Product;

  @Output() addToCart = new EventEmitter();

  addCartHandler() {
    console.log('addCartHandler');
    this.addToCart.emit('Hola este es un mensaje desde el hijo');
  }
}
