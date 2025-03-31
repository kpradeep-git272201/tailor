import { Routes } from '@angular/router';
import { TabsPage } from './tabs.page';

export const routes: Routes = [
  {
    path: 'tabs',
    component: TabsPage,
    children: [
      {
        path: 'tab1',
        loadComponent: () =>
          import('../tab1/tab1.page').then((m) => m.Tab1Page),
      },
      {
        path: 'tab2',
        loadComponent: () =>
          import('../tab2/tab2.page').then((m) => m.Tab2Page),
      },
      {
        path: 'tailor',
        loadComponent: () =>
          import('../pages/mytabs/tailor/tailor.page').then((m) => m.TailorPage),
      },
      {
        path: 'tailor/:tailorId', 
        loadComponent: () =>
          import('../pages/customer/tailor-profile/tailor-profile.page').then((m) => m.TailorProfilePage),
      },
      {
        path: 'order',
        loadComponent: () =>
          import('../pages/customer/order/order.page').then((m) => m.OrderPage),
      },
      {
        path: 'dashboard',
        loadComponent: () =>
          import('../pages/customer/cdashboard/cdashboard.page').then((m) => m.CdashboardPage),
      },
      {
        path: 'home',
        loadComponent: () =>
          import('../pages/mytabs/home/home.page').then((m) => m.HomePage),
      },
      {
        path: 'menu',
        loadComponent: () =>
          import('../pages/mytabs/menu/menu.page').then((m) => m.MenuPage),
      },
      {
        path: 'cart',
        loadComponent: () =>
          import('../pages/customer/cart/cart.page').then((m) => m.CartPage),
      },
      {
        path: 'tab3',
        loadComponent: () =>
          import('../tab3/tab3.page').then((m) => m.Tab3Page),
      },
      {
        path: 'customer',
        loadChildren: () =>
          import('../pages/customer/customer.module').then((m) => m.CustomerModule),
      },
      {
        path: 'mytabs',
        loadChildren: () =>
          import('../pages/mytabs/mytabs.module').then((m) => m.MytabsModule),
      },
      {
        path: 'tailor',
        loadChildren: () =>
          import('../pages/tailor/tailor.module').then((m) => m.TailorModule),
      },
      {
        path: '',
        redirectTo: '/tabs/tab1',
        pathMatch: 'full',
      },
    ],
  },
  {
    path: '',
    redirectTo: '/tabs/mytabs',
    pathMatch: 'full',
  },
];
