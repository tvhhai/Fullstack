import {NgModule} from '@angular/core';

import {CommonModule} from '@angular/common';
import {ReactiveFormsModule} from '@angular/forms';
import {TranslateModule} from '@ngx-translate/core';
import {NgxPermissionsModule} from 'ngx-permissions';
import {MaterialModule} from '../modules/material.module';
import {AppRoutingModule} from '../app-routing.module';

import {NavAccordionDirective} from './components/theme/sidebar-menu/nav-accordion.directive';
import {NavAccordionItemDirective} from './components/theme/sidebar-menu/nav-accordion-item.directive';
import {NavAccordionToggleDirective} from './components/theme/sidebar-menu/nav-accordion-toggle.directive';

import {SettingComponent} from './components/setting/setting.component';
import {SidebarMenuComponent} from './components/theme/sidebar-menu/sidebar-menu.component';
import {TranslateComponent} from './components/translate/translate.component';
import {AuthLayoutComponent} from './components/theme/auth-layout/auth-layout.component';
import {BrandingComponent} from './components/theme/branding/branding.component';
import {HeaderComponent} from './components/theme/header/header.component';
import {AdminLayoutComponent} from './components/theme/admin-layout/admin-layout.component';
import {SidebarComponent} from './components/theme/sidebar/sidebar.component';
import {SignInComponent} from './components/theme/auth-layout/sign-in/sign-in.component';
import {SignUpComponent} from './components/theme/auth-layout/sign-up/sign-up.component';
import {BreadcrumbComponent} from './components/theme/breadcrumb/breadcrumb.component';

const MODULES: any[] = [
    CommonModule,
    TranslateModule,
    AppRoutingModule,
    NgxPermissionsModule,
    ReactiveFormsModule,
    MaterialModule,

];

const COMPONENTS: any[] = [
    TranslateComponent,
    AuthLayoutComponent,
    BrandingComponent,
    HeaderComponent,
    AdminLayoutComponent,
    SidebarComponent,
    SignInComponent,
    SignUpComponent,
    SettingComponent,
    SidebarMenuComponent,
    BreadcrumbComponent
];
const COMPONENTS_DYNAMIC: any[] = [];
const DIRECTIVES: any[] = [NavAccordionItemDirective, NavAccordionDirective, NavAccordionToggleDirective];
const PIPES: any[] = [];

@NgModule({
    imports: [...MODULES],
    exports: [...MODULES, ...COMPONENTS, ...DIRECTIVES, ...PIPES],
    declarations: [...COMPONENTS, ...COMPONENTS_DYNAMIC, ...DIRECTIVES, ...PIPES],
})
export class SharedModule {
}
