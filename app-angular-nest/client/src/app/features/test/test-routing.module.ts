import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { Test1Component } from "./test1/test1.component";
import { Test2Component } from "./test2/test2.component";
import { Test3Component } from "./test3/test3.component";

const routes: Routes = [
    { path: "test1", component: Test1Component },
    { path: "test2", component: Test2Component },
    { path: "test2/test3", component: Test3Component }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class TestRoutingModule {
}
