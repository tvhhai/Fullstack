import { effect, Injectable } from "@angular/core";
import { TranslateService } from "@ngx-translate/core";
import { Settings } from "@bootstrap/settings";

@Injectable({
    providedIn: "root"
})
export class Translate {
    private initialized = false;

    constructor(private translate: TranslateService, private settings: Settings) {
        effect(() => {
            const lang = this.settings.settings().language;
            if (this.initialized) return;
            this.applyLanguage(lang);
        });
    }

    load() {
        const lang = this.settings.settings().language;
        return new Promise<void>(resolve => {
            this.initialized = true;
            this.applyLanguage(lang, resolve);
        });
    }

    private applyLanguage(lang: string, done?: () => void) {
        this.translate.setFallbackLang(lang);

        this.translate.use(lang).subscribe({
            next: () => console.log(`Successfully initialized '${lang}' language.`),
            error: () => console.error(`Problem with '${lang}' language initialization.`),
            complete: () => done?.(),
        });
    }
}
