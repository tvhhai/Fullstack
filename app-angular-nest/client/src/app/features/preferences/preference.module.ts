import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PreferencesRoutingModule } from './preference-routing.module';
import { UserSettingComponent } from './user-setting/user-setting.component';
import { SystemSettingComponent } from './system-setting/system-setting.component';
import {TranslateModule} from "@ngx-translate/core";
import {SharedModule} from "@shared/shared.module";


@NgModule({
  declarations: [
    UserSettingComponent,
    SystemSettingComponent
  ],
    imports: [
        CommonModule,
        PreferencesRoutingModule,
        TranslateModule,
        SharedModule
    ]
})
export class PreferenceModule { }
