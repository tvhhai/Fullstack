import { DataDialog } from '@shared/components/common/dialog/dialog.model';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { CKEditorModule } from '@ckeditor/ckeditor5-angular';
import { MatDivider } from '@angular/material/divider';
import { Component, Inject } from '@angular/core';

@Component({
    imports: [MatDivider, CKEditorModule],
    selector: 'app-task-item-detail',
    standalone: true,
    styleUrl: './task-item-detail.component.scss',
    templateUrl: './task-item-detail.component.html',
})
export class TaskItemDetailComponent {
    public Editor = ClassicEditor;

    public onReady(editor: ClassicEditor): void {
        const element = editor.ui.getEditableElement()!;
        const parent = element.parentElement!;

        parent.insertBefore(editor.ui.view.toolbar.element!, element);
    }

    constructor(
        @Inject(MAT_DIALOG_DATA) public data: DataDialog,
        public dialogRef: MatDialogRef<TaskItemDetailComponent>
    ) {}

    onCancelClick() {
        this.dialogRef.close(true);
    }
}
