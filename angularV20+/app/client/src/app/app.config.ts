import {
    APP_INITIALIZER,
    ApplicationConfig, inject, provideAppInitializer,
    provideBrowserGlobalErrorListeners, provideZoneChangeDetection,
    provideZonelessChangeDetection
} from "@angular/core";
import { provideRouter, withInMemoryScrolling } from "@angular/router";
import { appRoutes } from "./app.routes";
import { BOOTSTRAP_PROVIDERS } from "@bootstrap/bootstrap.providers";
import { MAT_RIPPLE_GLOBAL_OPTIONS, RippleGlobalOptions } from "@angular/material/core";
import { provideTranslateService } from "@ngx-translate/core";
import { provideTranslateHttpLoader } from "@ngx-translate/http-loader";
import { environment } from "@env/environment";
import { httpInterceptorProviders } from "@core/interceptor";
import { BASE_URL } from "@core/interceptor/base-url.interceptor";

const globalRippleConfig: RippleGlobalOptions = {
    disabled: true,
    animation: {
        enterDuration: 300,
        exitDuration: 0
    }
};

export const appConfig: ApplicationConfig = {
    providers: [
        ...BOOTSTRAP_PROVIDERS,

        // UI configs
        { provide: MAT_RIPPLE_GLOBAL_OPTIONS, useValue: globalRippleConfig },

        // i18n
        provideTranslateService({
            loader: provideTranslateHttpLoader({
                prefix: "/assets/i18n/",
                suffix: ".json"
            }),
            // fallbackLang: "en",
            // lang: "en"
        }),

        // HTTP
        { provide: BASE_URL, useValue: environment.baseUrl },
        httpInterceptorProviders,

        // Error & CD
        provideBrowserGlobalErrorListeners(),
        provideZonelessChangeDetection(),

        // Router
        provideRouter(
            appRoutes,
            withInMemoryScrolling({
                scrollPositionRestoration: "enabled",
                anchorScrolling: "enabled"
            })
        ),
    ]
};
