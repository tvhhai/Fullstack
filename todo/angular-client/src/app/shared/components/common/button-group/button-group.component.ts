import { ButtonGroup } from '@shared/components/common/button-group/button-group.model';
import { ViewEncapsulation, Component, Input } from '@angular/core';

@Component({
  encapsulation: ViewEncapsulation.None,
  selector: 'app-button-group',
  styleUrls: ['./button-group.component.scss'],
  templateUrl: './button-group.component.html',
})
export class ButtonGroupComponent {
  @Input() btnGroupData!: ButtonGroup[];
}
