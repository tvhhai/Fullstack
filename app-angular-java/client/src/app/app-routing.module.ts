import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { environmentProd } from '@env/environment.prod';
import { AuthGuard } from "./core/authentication/guards/auth.guard";


import { DashboardComponent } from './components/dashboard/dashboard.component';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';
import { AdminLayoutComponent } from './shared/components/theme/admin-layout/admin-layout.component';
import { AuthLayoutComponent } from './shared/components/theme/auth-layout/auth-layout.component';
import { SignInComponent } from './shared/components/theme/auth-layout/sign-in/sign-in.component';
import { SignUpComponent } from './shared/components/theme/auth-layout/sign-up/sign-up.component';

const appRoutes: Routes = [
  {
    path: '',
    component: AdminLayoutComponent,
    canActivate: [AuthGuard],
    canActivateChild: [AuthGuard],
    children: [
      { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
      { path: 'dashboard', component: DashboardComponent },
      {
        path: 'test',
        loadChildren: () => import('./modules/test/test.module').then(m => m.TestModule),
      },
    ],
  },
  {
    path: 'auth',
    component: AuthLayoutComponent,
    children: [
      { path: 'sign-in', component: SignInComponent },
      { path: 'sign-up', component: SignUpComponent },
    ],
  },
  { path: '**', component: PageNotFoundComponent },
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
