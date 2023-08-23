import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {SystemSettingComponent} from "./system-setting/system-setting.component";
import {UserSettingComponent} from "./user-setting/user-setting.component";

const routes: Routes = [
  {path: 'user-setting', component: UserSettingComponent},
  {path: 'system-setting', component: SystemSettingComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PreferencesRoutingModule { }
