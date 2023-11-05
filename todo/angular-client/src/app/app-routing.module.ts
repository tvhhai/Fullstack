import { AdminLayoutComponent } from '@shared/components/theme/admin-layout/admin-layout.component';
import { AuthLayoutComponent } from '@shared/components/theme/auth-layout/auth-layout.component';
import { SignInComponent } from '@shared/components/theme/auth-layout/sign-in/sign-in.component';
import { SignUpComponent } from '@shared/components/theme/auth-layout/sign-up/sign-up.component';
import { AuthGuard } from '@core/authentication/guards/auth.guard';
import { RouterModule, Routes } from '@angular/router';
import { environment } from '@env/environment.prod';
import { NgModule } from '@angular/core';

const appRoutes: Routes = [
    {
        canActivate: [AuthGuard],
        canActivateChild: [AuthGuard],
        children: [
            { path: '', pathMatch: 'full', redirectTo: 'today' },
            {
                loadChildren: () =>
                    import('././features/todos/todos.module').then(
                        m => m.TodosModule
                    ),
                path: '',
            },
            {
                path: 'settings',
                pathMatch: 'full',
                redirectTo: 'settings/account',
            },
            {
                loadChildren: () =>
                    import('././features/settings/settings.module').then(
                        m => m.SettingsModule
                    ),
                path: 'settings',
            },
        ],
        component: AdminLayoutComponent,
        path: '',
    },
    {
        canActivate: [AuthGuard],
        canActivateChild: [AuthGuard],
        children: [
            { component: SignInComponent, path: 'sign-in' },
            { component: SignUpComponent, path: 'sign-up' },
        ],
        component: AuthLayoutComponent,
        path: 'auth',
    },
    {
        loadChildren: () =>
            import('./features/errors/errors.module').then(m => m.ErrorsModule),
        path: '',
    },
];

@NgModule({
    exports: [RouterModule],
    imports: [
        RouterModule.forRoot(appRoutes, {
            enableTracing: false, // <-- debugging purposes only
            useHash: environment.useHash,
            // preloadingStrategy: SelectivePreloadingStrategyService,
        }),
    ],
})
export class AppRoutingModule {}

/*
Copyright Google LLC. All Rights Reserved.
Use of this source code is governed by an MIT-style license that
can be found in the LICENSE file at https://angular.io/license
*/
