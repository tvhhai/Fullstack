import { APP_INITIALIZER } from "@angular/core";
import { TranslateLangService } from "./bootstrap/translate-lang.service";
import { StartupService } from "./bootstrap/startup.service";
import { PreSettingService } from "@core/bootstrap/presetting.service";

export const appInitializerProviders = [
    {
        provide: APP_INITIALIZER,
        useFactory: StartupServiceFactory,
        deps: [StartupService],
        multi: true
    }, {
        provide: APP_INITIALIZER,
        useFactory: PreSettingServiceFactory,
        deps: [PreSettingService],
        multi: true
    }, {
        provide: APP_INITIALIZER,
        useFactory: TranslateLangServiceFactory,
        deps: [TranslateLangService],
        multi: true
    }
];

function TranslateLangServiceFactory(translateLangService: TranslateLangService) {
    return () => translateLangService.load();
}

function StartupServiceFactory(startupService: StartupService) {
    return () => startupService.load();
}

function PreSettingServiceFactory(preSettingService: PreSettingService) {
    return () => preSettingService.load();
}


