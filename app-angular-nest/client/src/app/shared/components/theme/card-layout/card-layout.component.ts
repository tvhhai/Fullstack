import {Component, EventEmitter, Input, Output} from '@angular/core';
import {ButtonColor, ButtonTypes} from "@shared/components/common/button/button.enum";
import {EViewMode} from "@shared/enum/view-mode.enum";

@Component({
  selector: 'app-card-layout',
  templateUrl: './card-layout.component.html',
  styleUrls: ['./card-layout.component.scss']
})
export class CardLayoutComponent {
  protected readonly ButtonTypes = ButtonTypes;

  @Input() viewMode!: EViewMode;
  @Input() title!: string;
  @Input() showBackToView: boolean = false;


  @Output() save = new EventEmitter();
  @Output() cancel = new EventEmitter();
  @Output() backToView = new EventEmitter();


  onBackToView() {
    this.backToView.emit();
  }

  onSaveClick() {
    this.save.emit();
  }

  onCancelClick() {
    this.cancel.emit();
  }

  protected readonly ButtonColor = ButtonColor;
}
