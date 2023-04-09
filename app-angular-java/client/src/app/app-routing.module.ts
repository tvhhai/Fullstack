import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';

import {Test1Component} from './components/test1/test1.component';
import {Test2Component} from './components/test2/test2.component';
import {DashboardComponent} from './components/dashboard/dashboard.component';
import {LayoutComponent} from './components/theme/layout/layout.component';

import {PageNotFoundComponent} from './components/page-not-found/page-not-found.component';


const appRoutes: Routes = [
    {
        path: '', component: LayoutComponent,
        children: [
            { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
            { path: 'dashboard', component: DashboardComponent },
            {
                path: 'test1',
                component: Test1Component,
                // outlet: 'popup'
            },
            {
                path: 'test2',
                component: Test2Component,
                // outlet: 'popup'
            },
        ]
    },


    // {
    //   path: 'admin',
    //   loadChildren: () => import('./admin/admin.module').then(m => m.AdminModule),
    //   canMatch: [authGuard]
    // },
    // {
    //   path: 'crisis-center',
    //   loadChildren: () => import('./crisis-center/crisis-center.module').then(m => m.CrisisCenterModule),
    //   data: { preload: true }
    // },
    {path: '**', component: PageNotFoundComponent}
];

@NgModule({
    imports: [
        RouterModule.forRoot(
            appRoutes,
            {
                enableTracing: false, // <-- debugging purposes only
                // preloadingStrategy: SelectivePreloadingStrategyService,
            }
        )
    ],
    exports: [
        RouterModule
    ]
})
export class AppRoutingModule {
}


/*
Copyright Google LLC. All Rights Reserved.
Use of this source code is governed by an MIT-style license that
can be found in the LICENSE file at https://angular.io/license
*/
