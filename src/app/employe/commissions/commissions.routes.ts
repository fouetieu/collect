import { Routes } from '@angular/router';
import { CommissionsPage } from './commissions.page';

export const routes: Routes = [
  {
    path: '',
    component: CommissionsPage
  },
  {
    path: ':id/detail',
    loadComponent: () => import('./detail/detail.page').then( m => m.DetailPage)
  }

];
