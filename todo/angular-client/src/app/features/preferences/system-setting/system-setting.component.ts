import {Component} from '@angular/core';
import {FormControl, FormGroup} from "@angular/forms";

@Component({
    selector: 'app-system-setting',
    templateUrl: './system-setting.component.html',
    styleUrls: ['./system-setting.component.scss']
})
export class SystemSettingComponent {

    languageSettings: any[] = [
        {
            name:"",
            value:""
        },
        {
            name:"",
            value:""
        }
    ]

    constructor() {
    }

    ngOnInit() {
    }
}
