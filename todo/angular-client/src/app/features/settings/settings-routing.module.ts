import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';

import { SettingsDialogComponent } from './settings.dialog.component';
import { SettingAccountComponent } from './account/account.component';
import { SettingGeneralComponent } from './general/general.component';
import { SettingSidebarComponent } from './sidebar/sidebar.component';
import { SettingThemeComponent } from './theme/theme.component';

const routes: Routes = [
    {
        children: [
            {
                component: SettingAccountComponent,
                path: 'account',
            },
            {
                component: SettingGeneralComponent,
                path: 'general',
            },
            {
                component: SettingThemeComponent,
                path: 'theme',
            },
            {
                component: SettingSidebarComponent,
                path: 'sidebar',
            },
        ],
        component: SettingsDialogComponent,
        path: '',
    },
];

@NgModule({
    exports: [RouterModule],
    imports: [RouterModule.forChild(routes)],
})
export class SettingsRoutingModule {}
