import { InputTypes } from '@shared/components/common/input/input.enum';
import { Component, OnInit, Input } from '@angular/core';
import { isEmptyObj } from '@shared/helpers';

@Component({
  selector: 'app-input-validator',
  styleUrls: ['./input-validator.component.scss'],
  templateUrl: './input-validator.component.html',
})
export class InputValidatorComponent implements OnInit {
  @Input() inputType: InputTypes = InputTypes.Text;
  @Input() placeholder!: string;
  @Input() form: any;
  @Input() formControlName: any;

  ngOnInit() {
    console.log(this.form);
  }

  protected readonly isEmptyObj = isEmptyObj;
}
