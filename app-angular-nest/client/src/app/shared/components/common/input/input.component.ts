import {
  Component,
  EventEmitter,
  Input,
  Output,
  ViewEncapsulation,
} from '@angular/core';
import {InputTypes} from '@shared/components/common/input/input.enum';
import {MatFormFieldAppearance, SubscriptSizing} from '@angular/material/form-field';

// @ts-ignore
@Component({
  selector: 'app-input',
  templateUrl: './input.component.html',
  styleUrls: ['./input.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class InputComponent {
  @Input() inputModel: any;
  @Input() inputSize: 'small' | 'normal' = 'normal';
  @Input() inputType: InputTypes = InputTypes.Text;
  @Input() appearance: MatFormFieldAppearance = 'outline'; // 'legacy', 'standard', 'fill', 'outline'
  @Input() inputPlaceholder: string = '';
  @Input() inputLabel: string = '';
  @Input() subscriptSizing: SubscriptSizing = 'fixed'

  @Output() inputModelChange = new EventEmitter<any>();
  @Output() inputOnChange = new EventEmitter<any>();
}
