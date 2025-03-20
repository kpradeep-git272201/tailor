import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('./tabs/tabs.routes').then((m) => m.routes),
  },
  {
    path: 'auth',
    loadChildren: () => import('./pages/auth/auth.module').then((m) => m.AuthModule),
  },
  {
    path: 'book-tailor',
    loadComponent: () => import('./pages/customer/book-tailor/book-tailor.page').then( m => m.BookTailorPage)
  },
  {
    path: 'new-order',
    loadComponent: () => import('./pages/tailor/new-order/new-order.page').then( m => m.NewOrderPage)
  },
  {
    path: 'withfabric',
    loadComponent: () => import('./pages/customer/withfabric/withfabric.page').then( m => m.WithfabricPage)
  },
  {
    path: 'withoutfabric',
    loadComponent: () => import('./pages/customer/withoutfabric/withoutfabric.page').then( m => m.WithoutfabricPage)
  },  {
    path: 'article',
    loadComponent: () => import('./pages/customer/article/article.page').then( m => m.ArticlePage)
  },
  {
    path: 'chart-model',
    loadComponent: () => import('./pages/customer/chart-model/chart-model.page').then( m => m.ChartModelPage)
  },


];
