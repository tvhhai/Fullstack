import { Injectable } from "@angular/core";
import { TranslateService } from "@ngx-translate/core";

@Injectable({
    providedIn: "root"
})
export class TranslateLangService {
    constructor(
        private translate: TranslateService,
    ) {
    }

    load() {

        return new Promise<void>((resolve) => {
            const defaultLang: string = "en";

            this.translate.setDefaultLang(defaultLang);

            this.translate.use(defaultLang).subscribe({
                next: () =>
                    console.log(`Successfully initialized '${defaultLang}' language.'`),
                error: () =>
                    console.error(`Problem with '${defaultLang}' language initialization.'`),
                complete: () => resolve()
            });
        });
    }
}
