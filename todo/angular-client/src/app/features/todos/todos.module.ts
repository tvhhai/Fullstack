import { CdkDropListGroup, CdkDropList, CdkDrag } from '@angular/cdk/drag-drop';
import { CKEditorModule } from '@ckeditor/ckeditor5-angular';
import { TranslateModule } from '@ngx-translate/core';
import { SharedModule } from '@shared/shared.module';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { TaskItemDetailComponent } from './task/dialog/task-item-detail/task-item-detail.component';
import { ProjectComponent } from './project/project.component';
import { TodosRoutingModule } from './todos-routing.module';
import { TaskDonePipe } from './task/pipe/task-done.pipe';
import { TodayComponent } from './today/today.component';
import { TaskComponent } from './task/task.component';
import { TaskPipe } from './task/task.pipe';

@NgModule({
    declarations: [
        TodayComponent,
        ProjectComponent,
        TaskComponent,
        TaskPipe,
        TaskDonePipe,
        TaskItemDetailComponent,
    ],
    exports: [],
    imports: [
        CommonModule,
        TodosRoutingModule,
        TranslateModule,
        SharedModule,
        CdkDropList,
        CdkDrag,
        CdkDropListGroup,
        CKEditorModule,
    ],
})
export class TodosModule {}
