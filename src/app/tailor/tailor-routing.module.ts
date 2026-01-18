import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TailorListPage } from './pages/tailor-list/tailor-list.page';
import { TailorDetailsPage } from './pages/tailor-details/tailor-details.page';

const routes: Routes = [
  {
    path: '',
    children: [
      { path: '', redirectTo: 'tailorList', pathMatch: 'full' },
      { path: 'tailorList', component: TailorListPage },
      { path: 'tailorList/:id', component: TailorDetailsPage },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TailorRoutingModule {}
