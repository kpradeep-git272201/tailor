import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TdashboardPage } from './tdashboard/tdashboard.page';
import { AcceptRejectOrdersPage } from './accept-reject-orders/accept-reject-orders.page';
import { EarningsDashboardPage } from './earnings-dashboard/earnings-dashboard.page';
import { NewOrderPage } from './new-order/new-order.page';
import { ProfileMngtPage } from './profile-mngt/profile-mngt.page';
import { ReviewsFeedbackPage } from './reviews-feedback/reviews-feedback.page';
import { ViewBookingsPage } from './view-bookings/view-bookings.page';

const routes: Routes = [
  { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
  { path: 'dashboard', component: TdashboardPage },
  { path: 'accept-reject-orders', component: AcceptRejectOrdersPage },
  { path: 'earning-dashboard', component: EarningsDashboardPage },
  { path: 'new-orders', component: NewOrderPage },
  { path: 'profile-management', component: ProfileMngtPage },
  { path: 'review-feedback', component: ReviewsFeedbackPage },
  { path: 'view-bookings', component: ViewBookingsPage }, 
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TailorRoutingModule { }
