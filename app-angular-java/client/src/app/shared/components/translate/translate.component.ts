import {Component} from '@angular/core';
import {TranslateService} from "@ngx-translate/core";

@Component({
    selector: 'app-translate',
    templateUrl: './translate.component.html',
    styleUrls: ['./translate.component.scss']
})
export class TranslateComponent {
    langs: {[key: string]: string} = {
        'en': 'EN',
        'vn': 'VN',
    };

    constructor(private translate: TranslateService) {
        translate.addLangs(['en', 'vi']);
    }

    useLanguage(language: string) {
        this.translate.use(language);
        // this.settings.setLanguage(language);
    }
}
