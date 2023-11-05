import { TranslateService } from '@ngx-translate/core';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class TranslateLangService {
  constructor(private translate: TranslateService) {}

  load() {
    return new Promise<void>(resolve => {
      const defaultLang = 'en';

      this.translate.setDefaultLang(defaultLang);

      this.translate.use(defaultLang).subscribe({
        complete: () => resolve(),
        error: () =>
          console.error(
            `Problem with '${defaultLang}' language initialization.'`
          ),
        next: () =>
          console.log(`Successfully initialized '${defaultLang}' language.'`),
      });
    });
  }
}
