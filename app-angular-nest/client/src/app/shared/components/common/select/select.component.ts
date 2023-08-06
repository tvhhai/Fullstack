import {
  Component,
  EventEmitter,
  Input,
  Output,
  ViewEncapsulation,
} from '@angular/core';
import { isEmptyArray } from '@shared/helpers';
import { formatDate } from "@shared/helpers/time.helper";

interface ObjSelection {
  value: string;
  name: string | number;
}

@Component({
  selector: 'app-select',
  templateUrl: './select.component.html',
  styleUrls: ['./select.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class SelectComponent {
  @Input() modelValue: any;
  @Input('arrVal') arrVal!: (string | number)[];
  @Input('arrObjVal') arrObjVal!: ObjSelection[];

  @Output() selectionChange = new EventEmitter<{ $event: any }>();
  @Output() modelValueChange = new EventEmitter<any>();

  public isListEmpty = isEmptyArray;

  onValueChange(event: any) {
    this.selectionChange.emit(event);
  }

  protected readonly formatDate = formatDate;
  protected readonly NaN = NaN;
}
