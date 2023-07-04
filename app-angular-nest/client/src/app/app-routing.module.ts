import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { environmentProd } from '@env/environment.prod';
import { AuthGuard } from '@core/authentication/guards/auth.guard';

import { AdminLayoutComponent } from '@shared/components/theme/admin-layout/admin-layout.component';
import { AuthLayoutComponent } from '@shared/components/theme/auth-layout/auth-layout.component';
import { SignInComponent } from '@shared/components/theme/auth-layout/sign-in/sign-in.component';
import { SignUpComponent } from '@shared/components/theme/auth-layout/sign-up/sign-up.component';

const appRoutes: Routes = [
  {
    path: '',
    component: AdminLayoutComponent,
    canActivate: [AuthGuard],
    canActivateChild: [AuthGuard],
    children: [
      { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
      {
        path: 'dashboard',
        loadChildren: () =>
          import('././features/dashboard/dashboard.module').then(
            (m) => m.DashboardModule
          ),
      },
      {
        path: 'test',
        loadChildren: () =>
          import('./features/test/test.module').then((m) => m.TestModule),
      },
      {
        path: 'rbac',
        loadChildren: () =>
          import('./features/rbac/rbac.module').then((m) => m.RbacModule),
      },
    ],
  },
  {
    path: 'auth',
    component: AuthLayoutComponent,
    canActivate: [AuthGuard],
    canActivateChild: [AuthGuard],
    children: [
      { path: 'sign-in', component: SignInComponent },
      { path: 'sign-up', component: SignUpComponent },
    ],
  },
  {
    path: '',
    loadChildren: () =>
      import('./features/errors/errors.module').then((m) => m.ErrorsModule),
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(appRoutes, {
      enableTracing: false, // <-- debugging purposes only
      useHash: environmentProd.useHash,
      // preloadingStrategy: SelectivePreloadingStrategyService,
    }),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}

/*
Copyright Google LLC. All Rights Reserved.
Use of this source code is governed by an MIT-style license that
can be found in the LICENSE file at https://angular.io/license
*/
