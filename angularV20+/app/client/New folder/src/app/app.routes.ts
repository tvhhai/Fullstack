import { Routes } from "@angular/router";
import { AdminLayout } from "./layout/admin-layout/admin-layout";
import { errorsRoutes } from "./shared/components/errors/errors-routing";
import { Dashboard } from "./features/dashboard/dashboard";

export const appRoutes: Routes = [
    {
        path: "",
        component: AdminLayout,
        children: [
            { path: "", redirectTo: "dashboard", pathMatch: "full", },
            {
                path: "dashboard",
                component: Dashboard,
            },
        ]
    },
    // { path: "", children: errorsRoutes },
    { path: "error", children: errorsRoutes },
    { path: "**", redirectTo: "error/404" }

];
