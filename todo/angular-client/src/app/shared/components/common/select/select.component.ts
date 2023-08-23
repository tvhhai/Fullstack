import {
    Component,
    EventEmitter,
    Input,
    Output,
    ViewEncapsulation,
} from "@angular/core";
import { isEmptyArray } from "@shared/helpers";
import { MatSelectChange } from "@angular/material/select";
import { ObjSelection } from "@shared/model";



@Component({
    selector: "app-select",
    templateUrl: "./select.component.html",
    styleUrls: ["./select.component.scss"],
    encapsulation: ViewEncapsulation.None,
})
export class SelectComponent {
    @Input() modelValue: any;
    @Input("arrVal") arrVal!: (string | number)[];
    @Input("arrObjVal") arrObjVal!: ObjSelection[];

    // @Output() selectionChange = new EventEmitter<{ $event: any }>();
    @Output() selectionChange = new EventEmitter<MatSelectChange>();
    @Output() modelValueChange = new EventEmitter<any>();

    public isListEmpty = isEmptyArray;

    onValueChange(event: MatSelectChange) {
        this.selectionChange.emit(event);
    }
}
