import {Component, Input} from '@angular/core';
import {InputTypes} from "@shared/components/common/input/input.enum";
import {isEmptyObj} from "@shared/helpers";

@Component({
  selector: 'app-input-validator',
  templateUrl: './input-validator.component.html',
  styleUrls: ['./input-validator.component.scss']
})
export class InputValidatorComponent {
  @Input() inputType: InputTypes = InputTypes.Text;
  @Input() placeholder!: string;
  @Input() form: any;
  @Input() formControlName: any;

  ngOnInit() {
    console.log(this.form)
  }

  protected readonly isEmptyObj = isEmptyObj;
}
