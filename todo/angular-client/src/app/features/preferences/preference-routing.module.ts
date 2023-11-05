import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';

import { SystemSettingComponent } from './system-setting/system-setting.component';
import { UserSettingComponent } from './user-setting/user-setting.component';

const routes: Routes = [
    { component: UserSettingComponent, path: 'user-setting' },
    { component: SystemSettingComponent, path: 'system-setting' },
];

@NgModule({
    exports: [RouterModule],
    imports: [RouterModule.forChild(routes)],
})
export class PreferencesRoutingModule {}
