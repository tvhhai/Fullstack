import { Injectable } from "@angular/core";
import { PreSettingService } from "@core/bootstrap/presetting.service";

@Injectable({
    providedIn: "root",
})
export class HelpersService {
    settings!: any;

    constructor(private preSettingService: PreSettingService,) {
        this.settings = this.preSettingService.getSettings();
    }

    formatCurrency(amount: number): string {
        const currency = this.settings.currency;
        if (currency) {
            const locale: string = currency.locale, currencyCode: string = currency.currencyCode;
            // Create a new Intl.NumberFormat object with the specified locale and currency code
            const formatter = new Intl.NumberFormat(locale, {
                style: "currency",
                currency: currencyCode
            });
            // Format the amount as currency using the formatter
            return formatter.format(amount);
        }
        return "";
    }

}