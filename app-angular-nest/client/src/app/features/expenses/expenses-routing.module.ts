import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {PersonalComponent} from "./personal/personal.component";
import {ReportComponent} from "./report/report.component";
import { CategoryComponent } from "./category/category.component";

const routes: Routes = [
  {path: 'personal', component: PersonalComponent},
  {path: 'report', component: ReportComponent},
  {path: 'category', component: CategoryComponent},

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ExpensesRoutingModule { }
