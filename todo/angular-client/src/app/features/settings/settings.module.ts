import { SharedModule } from '@shared/shared.module';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { SettingsDialogComponent } from './settings.dialog.component';
import { SettingSidebarComponent } from './sidebar/sidebar.component';
import { SettingAccountComponent } from './account/account.component';
import { SettingGeneralComponent } from './general/general.component';
import { SettingsRoutingModule } from './settings-routing.module';
import { SettingThemeComponent } from './theme/theme.component';
import { SettingsComponent } from './settings.component';

@NgModule({
    declarations: [
        SettingsComponent,
        SettingsDialogComponent,
        SettingAccountComponent,
        SettingGeneralComponent,
        SettingThemeComponent,
        SettingSidebarComponent,
    ],
    imports: [CommonModule, SettingsRoutingModule, SharedModule],
})
export class SettingsModule {}
