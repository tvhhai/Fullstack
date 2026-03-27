import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { RouterModule, Routes } from "@angular/router";
import { NotFound } from "./not-found/not-found";

export const errorsRoutes: Routes = [
    // { path: "401", component: UnauthorizedComponent },
    // { path: "403", component: ForbiddenComponent },
    { path: "404", component: NotFound },
    // { path: "500", component: ServerErrorComponent },
    { path: "**", redirectTo: "error/404" }
];

