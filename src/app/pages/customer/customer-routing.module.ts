import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CdashboardPage } from './cdashboard/cdashboard.page';
import { ExploreTailorsPage } from './explore-tailors/explore-tailors.page';
import { TailorProfilePage } from './tailor-profile/tailor-profile.page';
import { BookTailorPage } from './book-tailor/book-tailor.page';

const routes: Routes = [
  { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
  { path: 'dashboard', component: CdashboardPage },
  { path: 'tailors', component: ExploreTailorsPage },
  { path: 'tailor-profile/:id', component: TailorProfilePage },
  { path: 'book-tailor', component: BookTailorPage }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CustomerRoutingModule { }
