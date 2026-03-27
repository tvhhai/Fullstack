import { Component, effect } from "@angular/core";
import { NgOptimizedImage } from "@angular/common";
import { TranslateService } from "@ngx-translate/core";
import { MatButton } from "@angular/material/button";
import { MatMenu, MatMenuItem, MatMenuTrigger } from "@angular/material/menu";
import { Settings } from "@bootstrap/settings";
import { LanguageType } from "@core/models/app-settings";

interface LangItem {
    key: LanguageType;
    value: string;
}

@Component({
    selector: "app-language-switcher",
    imports: [
        MatButton,
        MatMenuTrigger,
        MatMenu,
        MatMenuItem,
        NgOptimizedImage,
    ],
    templateUrl: "./language-switcher.html",
    styleUrl: "./language-switcher.scss"
})
export class LanguageSwitcher {
    i18n: LanguageType = "en";
    languages: LangItem[] = [
        { key: "en", value: "EN" },
        { key: "vn", value: "VN" }
    ];

    constructor(private translate: TranslateService, private settings: Settings) {
        translate.addLangs(["en", "vi"]);
        effect(() => {
            this.i18n = this.settings.settings().language;
        });
    }

    get currentLanguageLabel(): string {
        return this.languages.find(lang => lang.key === this.i18n)?.value || "";
    }

    useLanguage(language: LanguageType) {
        this.translate.use(language);
        this.settings.setLanguage(language);
    }
}
