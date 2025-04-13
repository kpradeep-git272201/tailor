import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomePage } from './home/home.page';
import { MenuPage } from './menu/menu.page';
import { TailorPage } from './tailor/tailor.page';

const routes: Routes = [
  {
    path: '',
    children: [
      {
        path: 'tailor',
        loadComponent: () =>
          import('./tailor/tailor.page').then((m) => m.TailorPage),
      },
    ],
  },
];
// const routes: Routes = [
//   // { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
  
//   { path: 'home', component: HomePage },
//   { path: 'menu', component: MenuPage },
//   { path: 'tailor', component: TailorPage },
//   // { path: 'tailor-profile/:id', component: TailorProfilePage },
//   // { path: 'book-tailor', component: BookTailorPage },
//   // { path: 'with-fabric', component: WithfabricPage },
//   // { path: 'with-out-fabric', component: WithoutfabricPage },
//   // { path: 'with-fabric/:article', component: ArticlePage },
// ];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MytabsRoutingModule { }
