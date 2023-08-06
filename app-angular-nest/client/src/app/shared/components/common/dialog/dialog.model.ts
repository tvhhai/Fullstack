import { Component, TemplateRef } from "@angular/core";

export interface DataDialog {
  title: string;
  message: string;
  template: TemplateRef<any>;
  labelCancel: string;
  labelApply: string;
  isDisable: () => boolean;
}
