import { Routes } from '@angular/router';
import { ClientPage } from './client.page';

export const routes: Routes = [
  {
    path: '',
    component: ClientPage,
    children: [           
      {
        path: 'home',
        loadComponent: () => import('./home/home.page').then( m => m.HomePage)
      },
      {
        path: 'transactions',
        loadComponent: () => import('./transactions/transactions.page').then((m) => m.TransactionsPage) 
      },      
      {
        path: 'settings',
        loadComponent: () => import('./settings/settings.page').then((m) => m.SettingsPage) 
      },
      {
        path: '',
        redirectTo: '/client/home',
        pathMatch: 'full',
      },
    ],
  },
  {
    path: '',
    redirectTo: '/client/home',
    pathMatch: 'full'
  }


];
