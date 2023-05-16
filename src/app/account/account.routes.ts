import { Routes } from '@angular/router';
import { AccountPage } from './account.page';

export const routes: Routes = [
  {
    path: '',
    component: AccountPage,
    children: [           
      {
        path: 'auth',
        loadComponent: () => import('./auth/auth.page').then( m => m.AuthPage)
      },
      {
        path: '',
        redirectTo: '/account/auth',
        pathMatch: 'full',
      },
    ],
  },
  {
    path: '',
    redirectTo: '/account/auth',
    pathMatch: 'full',
  }


];
