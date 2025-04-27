import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginPage } from './login/login.page';
import { OtpVerificationPage } from './otp-verification/otp-verification.page';
import { ResetPasswordPage } from './reset-password/reset-password.page';

const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'login', component: LoginPage },
  { path: 'otp-verification', component: OtpVerificationPage },
  { path: 'reset-password', component: ResetPasswordPage }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AuthRoutingModule { }
