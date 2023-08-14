import { Pipe, PipeTransform } from '@angular/core';
import { HelpersService } from "@shared/helpers/helper.service";
import { PreSettingService } from "@core/bootstrap/presetting.service";
import { map } from "rxjs/operators";

@Pipe({
    name: 'appCurrency'
})
export class CurrencyPipe implements PipeTransform {
    constructor(private helpersService: HelpersService,
                private preSettingService: PreSettingService,
    ) {
    }

    transform(value: unknown, ...args: unknown[]) {
        return this.preSettingService.getDataPreSetting().pipe(
            map((timeZones) => {
                if (value) {
                    return this.helpersService.formatCurrency(Number(value));
                }
                return null;
            })
        );
    }

}
