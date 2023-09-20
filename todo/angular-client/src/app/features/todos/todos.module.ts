import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TodosRoutingModule } from './todos-routing.module';
import { TodayComponent } from './today/today.component';
import { ProjectComponent } from './project/project.component';
import { TranslateModule } from "@ngx-translate/core";
import { SharedModule } from "@shared/shared.module";
import { TaskComponent } from './task/task.component';
import { NgIconComponent } from "@ng-icons/core";
import { CdkDrag, CdkDropList, CdkDropListGroup } from "@angular/cdk/drag-drop";


@NgModule({
    declarations: [
        TodayComponent,
        ProjectComponent,
        TaskComponent,
    ],
    exports: [],
    imports: [
        CommonModule,
        TodosRoutingModule,
        TranslateModule,
        SharedModule,
        NgIconComponent,
        CdkDropList,
        CdkDrag,
        CdkDropListGroup,
    ]
})
export class TodosModule { }
