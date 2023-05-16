import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'account',
    loadChildren: () => import('./account/account.routes').then((m) => m.routes)       
  },
  {
    path: 'client',
    loadChildren: () => import('./client/client.routes').then((m) => m.routes)    
  },
  {
    path: 'employe',
    loadChildren: () => import('./employe/employe.routes').then((m) => m.routes)    
  },
  {
    path: '',
    redirectTo: 'account',
    pathMatch: 'full',
  }  
];
