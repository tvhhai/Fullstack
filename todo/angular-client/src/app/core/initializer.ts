import { PreSettingService } from '@core/bootstrap/presetting.service';
import { APP_INITIALIZER } from '@angular/core';

import { TranslateLangService } from './bootstrap/translate-lang.service';
import { StartupService } from './bootstrap/startup.service';

export const appInitializerProviders = [
  {
    deps: [StartupService],
    multi: true,
    provide: APP_INITIALIZER,
    useFactory: StartupServiceFactory,
  },
  {
    deps: [PreSettingService],
    multi: true,
    provide: APP_INITIALIZER,
    useFactory: PreSettingServiceFactory,
  },
  {
    deps: [TranslateLangService],
    multi: true,
    provide: APP_INITIALIZER,
    useFactory: TranslateLangServiceFactory,
  },
];

function TranslateLangServiceFactory(
  translateLangService: TranslateLangService
) {
  return () => translateLangService.load();
}

function StartupServiceFactory(startupService: StartupService) {
  return () => startupService.load();
}

function PreSettingServiceFactory(preSettingService: PreSettingService) {
  return () => preSettingService.load();
}
