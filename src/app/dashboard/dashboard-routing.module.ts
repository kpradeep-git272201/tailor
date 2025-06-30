import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DefaultDashboradPage } from './pages/default-dashborad/default-dashborad.page';
import { WithfabricPage } from './pages/withfabric/withfabric.page';
import { ArticlePage } from './pages/article/article.page';
import { ArticleDetailsPage } from './pages/article-details/article-details.page';
import { OrderSummaryPage } from './pages/order-summary/order-summary.page';
import { TailorListPage } from '../tailor/pages/tailor-list/tailor-list.page';
import { MenuPage } from './pages/menu/menu.page';
import { CartPage } from '../users/pages/cart/cart.page';
import { MyorderPage } from '../users/pages/myorder/myorder.page';

const routes: Routes = [
  {
    path: '',
    children: [
      { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
      { path: 'dashboard', component: DefaultDashboradPage },
      { path: 'with-fabric', component: WithfabricPage },
      { path: 'with-fabric/:article', component: ArticlePage },
      {
        path: 'with-fabric/:articleId/:fabricId',
        component: ArticleDetailsPage,
      },
      {
        path: 'with-fabric/:article/:articleId/order-summary',
        component: OrderSummaryPage,
      },
      {
        path: 'menu',
        component: MenuPage
      },
      {
        path: 'cart',
        component: CartPage
      },
        {
        path: 'myorder',
        component: MyorderPage
      },
      {
        path: 'tailor',
        loadChildren: () => import('../tailor/tailor.module').then( m => m.TailorModule)
      },
      {
        path: 'user',
        loadChildren: () => import('../users/users.module').then( m => m.UsersModule)
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DashboardRoutingModule {}
