import {NgModule} from '@angular/core';

import {CommonModule} from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {TranslateModule} from '@ngx-translate/core';
import {NgxPermissionsModule} from 'ngx-permissions';
import {MaterialModule} from './modules/material.module';
import {RouterModule} from "@angular/router";
import {AgGridModule} from "ag-grid-angular";
import {NgxPaginationModule} from "ngx-pagination";


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
import {LoaderComponent} from './components/loader/loader.component';
import {UserComponent} from './components/user/user.component';
import { AgGridComponent } from './components/common/ag-grid/ag-grid.component';
import { SelectComponent } from './components/common/select/select.component';
import { PaginationComponent } from './components/common/pagination/pagination.component';
import { InputComponent } from './components/common/input/input.component';
import { ButtonComponent } from './components/common/button/button.component';

const MODULES: any[] = [
    CommonModule,
    RouterModule,
    FormsModule,
    NgxPermissionsModule,
    ReactiveFormsModule,
    MaterialModule,
    TranslateModule,
    AgGridModule,
    NgxPaginationModule
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
    BreadcrumbComponent,
    UserComponent,
    LoaderComponent
];
const COMPONENTS_DYNAMIC: any[] = [];
const DIRECTIVES: any[] = [NavAccordionItemDirective, NavAccordionDirective, NavAccordionToggleDirective];
const PIPES: any[] = [];

@NgModule({
    imports: [...MODULES],
    exports: [...MODULES, ...COMPONENTS, ...DIRECTIVES, ...PIPES, AgGridComponent],
    declarations: [...COMPONENTS, ...COMPONENTS_DYNAMIC, ...DIRECTIVES, ...PIPES, AgGridComponent, SelectComponent, PaginationComponent, InputComponent, ButtonComponent,  ],
})
export class SharedModule {
}
