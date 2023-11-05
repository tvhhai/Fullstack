import { TemplateRef } from '@angular/core';

export interface DataDialog {
    [prop: string]: any;

    isDisable?: () => boolean;
    isShowCancelBtn?: boolean;
    isShowSaveBtn?: boolean;
    labelApply?: string;
    labelCancel?: string;
    message?: string;
    template?: TemplateRef<any>;
    title: string;
}
