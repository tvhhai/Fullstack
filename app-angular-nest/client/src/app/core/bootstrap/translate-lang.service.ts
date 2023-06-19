import { Injectable, Injector } from '@angular/core';
// import {LOCATION_INITIALIZED} from "@angular/common";
import { TranslateService } from '@ngx-translate/core';

@Injectable({
  providedIn: 'root',
})
export class TranslateLangService {
  constructor(
    private injector: Injector,
    private translate: TranslateService
  ) // private settings: SettingsService
  {}

  load() {
    return new Promise<void>((resolve) => {
      // const locationInitialized = this.injector.get(LOCATION_INITIALIZED, Promise.resolve());
      // locationInitialized.then(() => {
      //   const browserLang = navigator.language;
      //   const defaultLang = browserLang.match(/en|vn/) ? browserLang : 'en';
      //
      //   // this.settings.setLanguage(defaultLang);
      //   this.translate.setDefaultLang(defaultLang);
      //   this.translate.use(defaultLang).subscribe(
      //       () => console.log(`Successfully initialized '${defaultLang}' language.'`),
      //       () => console.error(`Problem with '${defaultLang}' language initialization.'`),
      //       () => resolve()
      //   );
      // });

      const defaultLang: string = localStorage.getItem('lang') || 'en';

      this.translate.setDefaultLang(defaultLang);

      this.translate.use(defaultLang).subscribe({
        next: () =>
          console.log(`Successfully initialized '${defaultLang}' language.'`),
        error: () =>
          console.error(
            `Problem with '${defaultLang}' language initialization.'`
          ),
        complete: () => resolve(),
      });
    });
  }
}
