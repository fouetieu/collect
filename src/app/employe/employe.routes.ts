import { Routes } from '@angular/router';
import { EmployePage } from './employe.page';

export const routes: Routes = [
  {
    path: '',
    component: EmployePage,
    children: [           
      {
        path: 'dashboard',
        loadComponent: () => import('./dashboard/dashboard.page').then( m => m.DashboardPage)
      },
      {
        path: 'clients',
        loadChildren: () => import('./clients/clients.routes').then((m) => m.routes) 
      },
      {
        path: 'commissions',
        loadComponent: () => import('./commissions/commissions.page').then((m) => m.CommissionsPage) 
      },      
      {
        path: 'settings',
        loadComponent: () => import('./settings/settings.page').then((m) => m.SettingsPage) 
      },
      {
        path: '',
        redirectTo: '/employe/dashboard',
        pathMatch: 'full',
      },
    ],
  },
  {
    path: '',
    redirectTo: '/employe/dashboard',
    pathMatch: 'full'
  }


];
