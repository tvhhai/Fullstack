import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { TodayComponent } from "./today/today.component";
import { ProjectComponent } from "./project/project.component";

const routes: Routes = [
    { path: "today", component: TodayComponent },
    { path: "project/:subPath", component: ProjectComponent },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class TodosRoutingModule {
}
