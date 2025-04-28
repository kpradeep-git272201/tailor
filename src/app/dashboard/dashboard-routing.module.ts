import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DefaultDashboradPage } from './pages/default-dashborad/default-dashborad.page';
import { WithfabricPage } from './pages/withfabric/withfabric.page';
import { ArticlePage } from './pages/article/article.page';
import { ArticleDetailsPage } from './pages/article-details/article-details.page';
import { OrderSummaryPage } from './pages/order-summary/order-summary.page';

const routes: Routes = [
  {
    path: '',
    children: [
      { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
      { path: 'dashboard', component: DefaultDashboradPage },
      { path: 'with-fabric', component: WithfabricPage },
      { path: 'with-fabric/:article', component: ArticlePage },
      {
        path: 'with-fabric/:article/:articleId',
        component: ArticleDetailsPage,
      },
      {
        path: 'with-fabric/:article/:articleId/order-summary',
        component: OrderSummaryPage,
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DashboardRoutingModule {}
