import { Routes } from '@angular/router';
import { ClientsPage } from './clients.page';

export const routes: Routes = [
  {
    path: '',
    component: ClientsPage
  },
  {
    path: 'create',
    loadComponent: () => import('./create/create.page').then( m => m.CreatePage)
  },
  {
    path: ':id/detail',
    loadComponent: () => import('./detail/detail.page').then( m => m.DetailPage)
  }



];
