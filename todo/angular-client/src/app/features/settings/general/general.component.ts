import { ViewEncapsulation, Component } from '@angular/core';

@Component({
    // encapsulation: ViewEncapsulation.None,
    selector: 'setting-general',
    styleUrls: ['./general.component.scss'],
    templateUrl: './general.component.html',
})
export class SettingGeneralComponent {
    currencySettings = [
        {
            name: 'a',
            value: 'a',
        },
    ];
    a = 'a';

    onChangeCurrency($event: any) {}
}
