import { Component, EventEmitter, Input, Output } from '@angular/core';
import {
  ButtonColor,
  ButtonTypes,
} from '@shared/components/common/button/button.enum';

@Component({
  selector: 'app-button',
  templateUrl: './button.component.html',
  styleUrls: ['./button.component.scss'],
})
export class ButtonComponent {
  public ButtonTypes = ButtonTypes;

  @Input() btnType: ButtonTypes = ButtonTypes.Raised;
  @Input() btnColor: ButtonColor = ButtonColor.Basic;
  @Input() btnText!: string;
  @Input() btnDisabled: boolean = false;
  @Input() ariaLabel!: string;
  @Input() btnIcon!: string;

  @Output() btnClick = new EventEmitter<void>();

  handleClick() {
    this.btnClick.emit();
  }
}
