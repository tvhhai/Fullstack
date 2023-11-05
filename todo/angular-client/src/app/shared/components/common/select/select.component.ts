import {
    ViewEncapsulation,
    EventEmitter,
    Component,
    Output,
    Input,
} from '@angular/core';
import { MatSelectChange } from '@angular/material/select';
import { isEmptyArray } from '@shared/helpers';
import { ObjSelection } from '@shared/model';

@Component({
    encapsulation: ViewEncapsulation.None,
    selector: 'app-select',
    styleUrls: ['./select.component.scss'],
    templateUrl: './select.component.html',
})
export class SelectComponent {
    @Input() modelValue: any;
    @Input() formCtrlName = '';
    @Input() formGroup: any;
    @Input() showColor = false;
    @Input() arrVal!: (string | number)[];
    @Input() arrObjVal!: ObjSelection[];

    @Output() selectionChange = new EventEmitter<MatSelectChange>();
    @Output() modelValueChange = new EventEmitter<any>();

    constructor() {}

    public isListEmpty = isEmptyArray;

    onValueChange(event: MatSelectChange) {
        this.selectionChange.emit(event);
    }
}
