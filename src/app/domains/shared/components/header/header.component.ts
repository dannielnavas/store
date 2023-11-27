import { CommonModule } from '@angular/common';
import { Component, Input, SimpleChanges, signal } from '@angular/core';
import { Product } from '../../models/product.model';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {
  hideSideMenu = signal(true);
  @Input() cart: Product[] = [];
  total = signal(0);

  toogleSideMenu() {
    console.log('toogleSideMenu');
    this.hideSideMenu.update(prev => !prev);
  }

  ngOnChanges(changes: SimpleChanges) {
    const cart = changes['cart'];
    if (cart) {
      this.total.set(this.calculateTotal());
    }
  }

  calculateTotal() {
    return this.cart.reduce((acc, curr) => acc + curr.price, 0);
  }
}
