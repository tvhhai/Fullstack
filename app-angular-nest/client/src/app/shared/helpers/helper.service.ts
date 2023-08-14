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
        const currency = typeof this.settings.currency === "string"
            ? JSON.parse(this.settings.currency)
            : this.settings.currency;

        if (currency) {
            const locale: string = currency.locale,
                currencyCode: string = currency.currencyCode;

            const formatter = new Intl.NumberFormat(locale, {
                style: "currency",
                currency: currencyCode,
            });

            return formatter.format(amount);
        }

        return "";
    }

}