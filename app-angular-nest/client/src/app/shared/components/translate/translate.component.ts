import {Component} from '@angular/core';
import {TranslateService} from "@ngx-translate/core";

@Component({
    selector: ' app-translate',
    templateUrl: './translate.component.html',
    styleUrls: ['./translate.component.scss']
})
export class TranslateComponent {
    i18n:string = localStorage.getItem("lang") || "en";
    langs: {[key: string]: string} = {
        'en': 'EN',
        'vn': 'VN',
    };

    constructor(private translate: TranslateService) {
        translate.addLangs(['en', 'vi']);
    }

    useLanguage(language: string) {
        this.translate.use(language);
        localStorage.setItem("lang", language);
        this.i18n = localStorage.getItem("lang") || language;
    }
}
