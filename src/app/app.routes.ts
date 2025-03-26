import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadChildren: () => import(/* @vite-ignore */ './tabs/tabs.routes').then((m) => m.routes),
  },
  {
    path: 'auth',
    loadChildren: () => import(/* @vite-ignore */ './pages/auth/auth.module').then((m) => m.AuthModule),
  },
  {
    path: 'withfabric',
    loadComponent: () => import(/* @vite-ignore */ './pages/customer/withfabric/withfabric.page').then(m => m.WithfabricPage),
  },
  {
    path: 'withoutfabric',
    loadComponent: () => import(/* @vite-ignore */ './pages/customer/withoutfabric/withoutfabric.page').then(m => m.WithoutfabricPage),
  },
  {
    path: 'article',
    loadComponent: () => import(/* @vite-ignore */ './pages/customer/article/article.page').then(m => m.ArticlePage),
  },
  {
    path: 'chart-model',
    loadComponent: () => import(/* @vite-ignore */ './pages/customer/chart-model/chart-model.page').then(m => m.ChartModelPage),
  }

];
