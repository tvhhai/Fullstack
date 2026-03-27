import { inject, provideAppInitializer } from "@angular/core";
import { Settings } from "./settings";
import { Translate } from "./translate";
import { StartUp } from "@bootstrap/start-up";

export const BOOTSTRAP_PROVIDERS = [
    provideAppInitializer(() => {
        const startup = inject(StartUp);
        return startup.load();
    }),
    provideAppInitializer(() => {
        const startup = inject(Settings);
        return startup.load();
    }),
    provideAppInitializer(() => {
        const startup = inject(Translate);
        return startup.load();
    }),
];
