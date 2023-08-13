import {TemplateRef} from "@angular/core";

export interface DataDialog {
  [prop: string]: any;

  title: string;
  message?: string;
  template?: TemplateRef<any>;
  labelCancel?: string;
  labelApply?: string;
  isDisable?: () => boolean;
}
