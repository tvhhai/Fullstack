import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { environment } from "@env/environment.prod";
import { AuthGuard } from "@core/authentication/guards/auth.guard";

import { AdminLayoutComponent } from "@shared/components/theme/admin-layout/admin-layout.component";
import { AuthLayoutComponent } from "@shared/components/theme/auth-layout/auth-layout.component";
import { SignInComponent } from "@shared/components/theme/auth-layout/sign-in/sign-in.component";
import { SignUpComponent } from "@shared/components/theme/auth-layout/sign-up/sign-up.component";

const appRoutes: Routes = [
    {
        path: "",
        component: AdminLayoutComponent,
        canActivate: [AuthGuard],
        canActivateChild: [AuthGuard],
        children: [
            { path: "", redirectTo: "today", pathMatch: "full" },
            {
                path: "",
                loadChildren: () =>
                    import("././features/todos/todos.module").then(
                        (m) => m.TodosModule
                    )
            },
            // {
            //     path: "apps",
            //     loadChildren: () =>
            //         import("./features/applications/applications.module").then((m) => m.ApplicationsModule)
            // }, {
            //     path: "preferences",
            //     loadChildren: () =>
            //         import("./features/preferences/preference.module").then((m) => m.PreferenceModule)
            // }
        ]
    },
    {
        path: "auth",
        component: AuthLayoutComponent,
        canActivate: [AuthGuard],
        canActivateChild: [AuthGuard],
        children: [
            { path: "sign-in", component: SignInComponent },
            { path: "sign-up", component: SignUpComponent }
        ]
    },
    {
        path: "",
        loadChildren: () =>
            import("./features/errors/errors.module").then((m) => m.ErrorsModule)
    }
];

@NgModule({
    imports: [
        RouterModule.forRoot(appRoutes, {
            enableTracing: false, // <-- debugging purposes only
            useHash: environment.useHash
            // preloadingStrategy: SelectivePreloadingStrategyService,
        })
    ],
    exports: [RouterModule]
})
export class AppRoutingModule {
}

/*
Copyright Google LLC. All Rights Reserved.
Use of this source code is governed by an MIT-style license that
can be found in the LICENSE file at https://angular.io/license
*/
