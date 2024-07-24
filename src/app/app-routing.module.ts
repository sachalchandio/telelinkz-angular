import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppLayoutComponent } from './components/shared';
import { AuthGuard } from './auth/auth.guard';
import { UserType } from 'src/generated/graphqlTypes';

const routes: Routes = [
  {
    path: '',
    component: AppLayoutComponent,
    canActivate: [AuthGuard],
    // data: { expectedUserType: UserType.Admin }, // Only Admins can access the main route
    children: [
      {
        path: '',
        loadChildren: () =>
          import('./modules/homepage/homepage.module').then(
            (m) => m.HomepageModule
          ),
        // canActivate: [AuthGuard],
        // data: { expectedUserType: UserType.Admin }, // Only Admins can access the homepage
      },
      {
        path: 'xfinity',
        loadChildren: () =>
          import('./modules/providers/xfinity/xfinity.module').then(
            (m) => m.XfinityModule
          ),
        // canActivate: [AuthGuard],
        // data: { expectedUserType: UserType.Admin }, // Only Admins can access xfinity
      },
      {
        path: 'atnt',
        loadChildren: () =>
          import('./modules/providers/atnt/atnt.module').then(
            (m) => m.ATNTModule
          ),
        // canActivate: [AuthGuard],
        // data: { expectedUserType: UserType.Admin }, // Only Admins can access xfinity
      },
      {
        path: 'register',
        loadChildren: () =>
          import('./modules/UserReg/userReg.module').then(
            (m) => m.UserRegModule
          ),
      },
      {
        path: 'unauthorized',
        loadComponent: () =>
          import('./components/standalone/unauthorized/unauth.component').then(
            (m) => m.UnauthComponent
          ),
      },
    ],
  },
  {
    path: 'login',
    loadChildren: () =>
      import('./modules/login/login.module').then((m) => m.LoginModule),
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { scrollPositionRestoration: 'top' })],
  exports: [RouterModule],
})
export class AppRoutingModule {}
