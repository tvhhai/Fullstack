import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Component, Inject, OnInit } from '@angular/core';

import { ButtonColor, ButtonTypes } from '../button/button.enum';
import { DataDialog } from './dialog.model';

@Component({
    selector: 'app-dialog',
    styleUrls: ['./dialog.component.scss'],
    templateUrl: './dialog.component.html',
})
export class DialogComponent implements OnInit {
    protected ButtonTypes = ButtonTypes;
    protected ButtonColor = ButtonColor;
    protected labelCancel = 'common.cancel';
    protected labelApply = 'common.save';
    protected disabled: (() => boolean) | boolean = false;
    protected isShowCancelBtn = true;
    protected isShowSaveBtn = true;

    constructor(
        @Inject(MAT_DIALOG_DATA) public data: DataDialog,
        public dialogRef: MatDialogRef<DialogComponent>
    ) {}

    ngOnInit() {
        if (this.data) {
            this.labelCancel = this.data?.labelCancel ?? this.labelCancel;
            this.labelApply = this.data?.labelApply ?? this.labelApply;
            this.disabled = this.data?.isDisable ?? false;
            this.isShowCancelBtn =
                this.data?.isShowCancelBtn ?? this.isShowCancelBtn;
            this.isShowSaveBtn = this.data?.isShowSaveBtn ?? this.isShowSaveBtn;
        }
    }

    onConfirmClick(): void {
        this.dialogRef.close(true);
    }

    onCancelClick(): void {
        this.dialogRef.close(false);
    }
}
