import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddressPage } from './pages/address/address.page';
import { CartPage } from './pages/cart/cart.page';
import { MyorderPage } from './pages/myorder/myorder.page';

const routes: Routes = [
  {
      path: '',
      children: [
        { path: '', redirectTo: 'address', pathMatch: 'full' },
        {
          path: 'address',
          component: AddressPage
        },
        {
          path: 'cart',
          component: CartPage
        },
        {
          path: 'myorder',
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
