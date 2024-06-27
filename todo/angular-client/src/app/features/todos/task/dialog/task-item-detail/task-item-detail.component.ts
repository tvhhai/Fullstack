import {
    ButtonColor,
    ButtonTypes,
} from '@shared/components/common/button/button.enum';
import { DataDialog } from '@shared/components/common/dialog/dialog.model';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { Component, Inject } from '@angular/core';

import { ITaskReq } from '../../model/task.model';
import { TaskService } from '../../task.service';

@Component({
    selector: 'app-task-item-detail',
    // standalone: true,
    styleUrl: './task-item-detail.component.scss',
    templateUrl: './task-item-detail.component.html',
})
export class TaskItemDetailComponent {
    protected readonly ButtonColor = ButtonColor;
    protected readonly ButtonTypes = ButtonTypes;

    Editor = ClassicEditor;
    model = {
        editorData: '',
    };

    onReady(editor: ClassicEditor): void {
        const element = editor.ui.getEditableElement()!;
        const parent = element.parentElement!;

        parent.insertBefore(editor.ui.view.toolbar.element!, element);
    }

    constructor(
        @Inject(MAT_DIALOG_DATA) public data: DataDialog,
        public dialogRef: MatDialogRef<TaskItemDetailComponent>,
        private taskService: TaskService
    ) {}

    onCancelClick() {
        this.dialogRef.close(true);
    }

    change() {
        console.log();
    }

    onConfirmClick() {
        console.log(this.model.editorData);
        const taskReq: ITaskReq = {
            description: this.model.editorData,
        };
        this.taskService.updateTask(39, taskReq).subscribe(() => {
            console.log('hhihih');
        });
    }
}
