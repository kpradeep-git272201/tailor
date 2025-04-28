import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'auth',
    loadChildren: () => import('./auth/auth.module').then((m) => m.AuthModule),
  },
  {
    path: 'main',
    loadChildren: () => import('./dashboard/dashboard.module').then( m => m.DashboardModule)
  },
  {
    path: '',
    redirectTo: 'main',
    pathMatch: 'full',
  },
  {
    path: 'order-summary',
    loadComponent: () => import('./dashboard/pages/order-summary/order-summary.page').then( m => m.OrderSummaryPage)
  },
  
  // {
  //   path: 'login',
  //   loadComponent: () => import('./auth/login/login.page').then( m => m.LoginPage)
  // },
  // {
  //   path: 'otp-verification',
  //   loadComponent: () => import('./auth/otp-verification/otp-verification.page').then( m => m.OtpVerificationPage)
  // },
  // {
  //   path: 'registeration',
  //   loadComponent: () => import('./auth/registeration/registeration.page').then( m => m.RegisterationPage)
  // },
  // {
  //   path: 'reset-password',
  //   loadComponent: () => import('./auth/reset-password/reset-password.page').then( m => m.ResetPasswordPage)
  // },
  // {
  //   path: 'tailor-list',
  //   loadComponent: () => import('./tailor/pages/tailor-list/tailor-list.page').then( m => m.TailorListPage)
  // },
  // {
  //   path: 'tailor-details',
  //   loadComponent: () => import('./tailor/pages/tailor-details/tailor-details.page').then( m => m.TailorDetailsPage)
  // },
  // {
  //   path: 'tailor-profile',
  //   loadComponent: () => import('./tailor/pages/tailor-profile/tailor-profile.page').then( m => m.TailorProfilePage)
  // },
  // {
  //   path: 'footer',
  //   loadComponent: () => import('./footer/footer.page').then( m => m.FooterPage)
  // },
  // {
  //   path: 'top-rated-fabric',
  //   loadComponent: () => import('./dashboard/pages/top-rated-fabric/top-rated-fabric.page').then( m => m.TopRatedFabricPage)
  // },
  // {
  //   path: 'top-rated-tailor',
  //   loadComponent: () => import('./dashboard/pages/top-rated-tailor/top-rated-tailor.page').then( m => m.TopRatedTailorPage)
  // },
  // {
  //   path: 'login',
  //   loadComponent: () => import('./auth/pages/login/login.page').then( m => m.LoginPage)
  // },
  // {
  //   path: 'otp-verification',
  //   loadComponent: () => import('./auth/pages/otp-verification/otp-verification.page').then( m => m.OtpVerificationPage)
  // },
  // {
  //   path: 'registeration',
  //   loadComponent: () => import('./auth/pages/registeration/registeration.page').then( m => m.RegisterationPage)
  // },
  // {
  //   path: 'reset-password',
  //   loadComponent: () => import('./auth/pages/reset-password/reset-password.page').then( m => m.ResetPasswordPage)
  // }
];
