import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CustomerRoutingModule } from './customer-routing.module';
import { SharedModule } from 'src/app/sharedmodule/sharedmodule.module';
import { MenuComponent } from 'src/app/components/menu/menu.component';


@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    CustomerRoutingModule,
    SharedModule,
    MenuComponent
  ],
  exports:[MenuComponent]
})
export class CustomerModule { }
