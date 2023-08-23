import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { TodayComponent } from "./today/today.component";

const routes: Routes = [
    { path: "today", component: TodayComponent }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class TodosRoutingModule {
}
