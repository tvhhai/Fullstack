import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TodosRoutingModule } from './todos-routing.module';
import { TodayComponent } from './today/today.component';
import { ProjectComponent } from './project/project.component';
import { TranslateModule } from "@ngx-translate/core";
import { SharedModule } from "@shared/shared.module";
import { TaskComponent } from './task/task.component';
import { SectionTaskComponent } from './section-task/section-task.component';
import { ActionTaskComponent } from './action-task/action-task.component';


@NgModule({
  declarations: [
    TodayComponent,
    ProjectComponent,
    TaskComponent,
    SectionTaskComponent,
    ActionTaskComponent
  ],
    imports: [
        CommonModule,
        TodosRoutingModule,
        TranslateModule,
        SharedModule
    ]
})
export class TodosModule { }
