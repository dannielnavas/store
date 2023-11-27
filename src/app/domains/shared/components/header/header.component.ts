import { CommonModule } from '@angular/common';
import { Component, Input, signal } from '@angular/core';
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

  toogleSideMenu() {
    console.log('toogleSideMenu');
    this.hideSideMenu.update(prev => !prev);
  }
}
