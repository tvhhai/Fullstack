import {
  ViewEncapsulation,
  EventEmitter,
  Component,
  Output,
  Input,
} from '@angular/core';
import {
  MatFormFieldAppearance,
  SubscriptSizing,
} from '@angular/material/form-field';
import { InputTypes } from '@shared/components/common/input/input.enum';

@Component({
  encapsulation: ViewEncapsulation.None,
  selector: 'app-input',
  styleUrls: ['./input.component.scss'],
  templateUrl: './input.component.html',
})
export class InputComponent {
  @Input() inputModel: any;
  @Input() inputSize: 'normal' | 'small' = 'normal';
  @Input() inputType: InputTypes = InputTypes.Text;
  @Input() appearance: MatFormFieldAppearance = 'outline'; // 'legacy', 'standard', 'fill', 'outline'
  @Input() inputPlaceholder = '';
  @Input() inputLabel = '';
  @Input() subscriptSizing: SubscriptSizing = 'fixed';

  @Output() inputModelChange = new EventEmitter<any>();
  @Output() inputOnChange = new EventEmitter<any>();
}
