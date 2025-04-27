import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DefaultDashboradPage } from './pages/default-dashborad/default-dashborad.page';
import { WithfabricPage } from './pages/withfabric/withfabric.page';
import { ArticlePage } from './pages/article/article.page';
import { ArticleDetailsPage } from './pages/article-details/article-details.page';

const routes: Routes = [
  {
      path: '',
      children: [
        { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
        { path: 'dashboard', component: DefaultDashboradPage },
        // { path: 'tailor-profile/:id', component: TailorProfilePage },
        // { path: 'book-tailor', component: BookTailorPage },
        { path: 'with-fabric', component: WithfabricPage },
        { path: 'with-fabric/:article', component: ArticlePage },
        { path: 'with-fabric/:article/:articleId', component: ArticleDetailsPage },
      ],
    },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DashboardRoutingModule { }
