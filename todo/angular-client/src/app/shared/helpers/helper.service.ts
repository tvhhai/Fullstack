import { PreSettingService } from '@core/bootstrap/presetting.service';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class HelpersService {
  settings!: any;

  constructor(private preSettingService: PreSettingService) {
    this.settings = this.preSettingService.getSettings();
  }

  formatCurrency(amount: number): string {
    const currency =
      typeof this.settings.currency === 'string'
        ? JSON.parse(this.settings.currency)
        : this.settings.currency;

    if (currency) {
      const locale: string = currency.locale,
        currencyCode: string = currency.currencyCode;

      const formatter = new Intl.NumberFormat(locale, {
        currency: currencyCode,
        style: 'currency',
      });

      return formatter.format(amount);
    }

    return '';
  }
}
