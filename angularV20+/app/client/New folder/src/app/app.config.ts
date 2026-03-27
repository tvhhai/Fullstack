import { ApplicationConfig, provideBrowserGlobalErrorListeners, provideZonelessChangeDetection } from "@angular/core";
import { provideRouter, withInMemoryScrolling } from "@angular/router";
import { provideAnimationsAsync } from "@angular/platform-browser/animations/async";
import { providePrimeNG } from "primeng/config";
import Aura from "@primeuix/themes/aura";
import Lara from "@primeuix/themes/lara";
import Nora from "@primeuix/themes/nora";
import Material from "@primeuix/themes/material";

import { appRoutes } from "./app.routes";

export const appConfig: ApplicationConfig = {
    providers: [
        provideAnimationsAsync(),
        providePrimeNG({
            theme: {
                preset: Aura,
                // options: {
                //     prefix: "p",
                //     darkModeSelector: "system",
                //     cssLayer: false
                // }
            }
        }),
        provideBrowserGlobalErrorListeners(),
        provideZonelessChangeDetection(),
        provideRouter(appRoutes, withInMemoryScrolling({
            scrollPositionRestoration: "enabled", // or 'top', or 'disabled'
            anchorScrolling: "enabled" // or 'disabled'
        }))
    ]
};
