import { Routes } from '@angular/router';
import { AboutComponent } from './domains/info/pages/about/about.component';
import { ListComponent } from './domains/products/pages/list/list.component';

export const routes: Routes = [
  {
    path: '',
    component: ListComponent
  },
  {
    path: 'about',
    component: AboutComponent
  }
];
