import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddressPage } from './pages/address/address.page';
import { CartPage } from './pages/cart/cart.page';
import { MyorderPage } from './pages/myorder/myorder.page';

const routes: Routes = [
  {
      path: '',
      children: [
        { path: '', redirectTo: 'user/address', pathMatch: 'full' },
        {
          path: 'user/address',
          component: AddressPage
        },
        {
          path: 'user/address',
          component: CartPage
        },
        {
          path: 'user/address',
          component: MyorderPage
        },
      ],
    },



];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UsersRoutingModule { }
