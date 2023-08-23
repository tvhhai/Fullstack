import {Component, Input, ViewEncapsulation} from '@angular/core';
import {ButtonGroup} from "@shared/components/common/button-group/button-group.model";

@Component({
  selector: 'app-button-group',
  templateUrl: './button-group.component.html',
  styleUrls: ['./button-group.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class ButtonGroupComponent {
  @Input() btnGroupData!: ButtonGroup[];
}
