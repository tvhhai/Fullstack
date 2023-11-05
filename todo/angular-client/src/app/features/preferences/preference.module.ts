import { TranslateModule } from '@ngx-translate/core';
import { SharedModule } from '@shared/shared.module';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { SystemSettingComponent } from './system-setting/system-setting.component';
import { UserSettingComponent } from './user-setting/user-setting.component';
import { PreferencesRoutingModule } from './preference-routing.module';

@NgModule({
    declarations: [UserSettingComponent, SystemSettingComponent],
    imports: [
        CommonModule,
        PreferencesRoutingModule,
        TranslateModule,
        SharedModule,
    ],
})
export class PreferenceModule {}
