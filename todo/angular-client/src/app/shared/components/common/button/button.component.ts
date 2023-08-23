import {Component, EventEmitter, Input, Output, ViewEncapsulation} from '@angular/core';
import {ButtonColor, ButtonTypes,} from '@shared/components/common/button/button.enum';

@Component({
  selector: 'app-button',
  templateUrl: './button.component.html',
  styleUrls: ['./button.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class ButtonComponent {
  public ButtonTypes = ButtonTypes;

  @Input() btnType: ButtonTypes = ButtonTypes.Raised;
  @Input() btnColor!: ButtonColor;
  @Input() btnText!: string;
  @Input() btnDisabled: (() => boolean) | boolean = false;
  get isDisabled(): boolean {
    return typeof this.btnDisabled === 'function' ? this.btnDisabled() : this.btnDisabled;
  }
  @Input() ariaLabel!: string;
  @Input() btnIcon!: string;

  @Output() btnClick = new EventEmitter<void>();

  handleClick() {
    this.btnClick.emit();
  }
}
