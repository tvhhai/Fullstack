import {Component} from '@angular/core';
import {TranslateService} from "@ngx-translate/core";
import {AppSettings} from "../../../models/setting";



@Component({
    selector: 'app-translate',
    templateUrl: './translate.component.html',
    styleUrls: ['./translate.component.scss']
})
export class TranslateComponent {
    langs: {[key: string]: string} = {
        'en-us': 'EN-US',
        'vn': 'VN',
    };

    constructor(private translate: TranslateService) {
        translate.addLangs(['en-us', 'vi']);
    }

    useLanguage(language: string) {
        this.translate.use(language);
        // this.settings.setLanguage(language);
    }
}
