import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TodosRoutingModule } from './todos-routing.module';
import { TodayComponent } from './today/today.component';
import { ProjectComponent } from './project/project.component';


@NgModule({
  declarations: [
    TodayComponent,
    ProjectComponent
  ],
  imports: [
    CommonModule,
    TodosRoutingModule
  ]
})
export class TodosModule { }
