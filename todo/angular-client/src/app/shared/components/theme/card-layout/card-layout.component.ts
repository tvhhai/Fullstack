import {
  ButtonColor,
  ButtonTypes,
} from '@shared/components/common/button/button.enum';
import { EventEmitter, Component, Output, Input } from '@angular/core';
import { EViewMode } from '@shared/enum/view-mode.enum';

@Component({
  selector: 'app-card-layout',
  styleUrls: ['./card-layout.component.scss'],
  templateUrl: './card-layout.component.html',
})
export class CardLayoutComponent {
  protected readonly ButtonTypes = ButtonTypes;
  protected readonly ButtonColor = ButtonColor;

  @Input() viewMode!: EViewMode;
  @Input() title!: string;
  @Input() showBackToView = false;

  @Output() backToView = new EventEmitter();

  onBackToView() {
    this.backToView.emit();
  }
}
