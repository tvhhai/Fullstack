import { Routes } from "@angular/router";
import { AdminLayout } from "@layout/components/admin-layout/admin-layout";
import { errorsRoutes } from "@shared/components/errors/errors-routing";
import { Dashboard } from "@features/dashboard/dashboard";
import { AuthLayout } from "@layout/components/auth-layout/auth-layout";
import { AuthGuard } from "@core/authentication/guards/auth.guard";
import { SignIn } from "@layout/components/auth-layout/sign-in/sign-in";
import { SignUp } from "@layout/components/auth-layout/sign-up/sign-up";

export const appRoutes: Routes = [
    {
        path: "",
        component: AdminLayout,
        canActivate: [AuthGuard],
        canActivateChild: [AuthGuard],
        children: [
            { path: "", redirectTo: "dashboard", pathMatch: "full", },
            {
                path: "dashboard",
                component: Dashboard,
            },
        ]
    },
    {
        path: "auth",
        component: AuthLayout,
        canActivate: [AuthGuard],
        canActivateChild: [AuthGuard],
        children: [
            { path: "sign-in", component: SignIn },
            { path: "sign-up", component: SignUp }
        ]
    },
    { path: "error", children: errorsRoutes },
    { path: "**", redirectTo: "error/404" }

];
