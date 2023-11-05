import { NotificationComponent } from '@shared/components/theme/notification/notification.component';
import { HelpPageComponent } from '@shared/components/theme/help-page/help-page.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { NgxPermissionsModule } from 'ngx-permissions';
import { CurrencyMaskModule } from 'ng2-currency-mask';
import { TranslateModule } from '@ngx-translate/core';
import { NgxPaginationModule } from 'ngx-pagination';
import { NgApexchartsModule } from 'ng-apexcharts';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { AgGridModule } from 'ag-grid-angular';
import { NgModule } from '@angular/core';

import { NavAccordionToggleDirective } from './components/theme/sidebar-menu/nav-accordion-toggle.directive';
import { NavAccordionItemDirective } from './components/theme/sidebar-menu/nav-accordion-item.directive';
import { InputValidatorComponent } from './components/common/input-validator/input-validator.component';
import { TransferListComponent } from './components/common/transfer-list/transfer-list.component';
import { NavAccordionDirective } from './components/theme/sidebar-menu/nav-accordion.directive';
import { AddEditProjectComponent } from '../features/todos/project/add-edit/add-edit.component';
import { ButtonGroupComponent } from './components/common/button-group/button-group.component';
import { LineChartComponent } from './components/common/chart/line-chart/line-chart.component';
import { SidebarMenuComponent } from './components/theme/sidebar-menu/sidebar-menu.component';
import { AdminLayoutComponent } from './components/theme/admin-layout/admin-layout.component';
import { PieChartComponent } from './components/common/chart/pie-chart/pie-chart.component';
import { BarChartComponent } from './components/common/chart/bar-chart/bar-chart.component';
import { AuthLayoutComponent } from './components/theme/auth-layout/auth-layout.component';
import { SignInComponent } from './components/theme/auth-layout/sign-in/sign-in.component';
import { SignUpComponent } from './components/theme/auth-layout/sign-up/sign-up.component';
import { CardLayoutComponent } from './components/theme/card-layout/card-layout.component';
import { ActionProjectComponent } from '../features/todos/project/action/action.component';
import { PaginationComponent } from './components/common/pagination/pagination.component';
import { BreadcrumbComponent } from './components/theme/breadcrumb/breadcrumb.component';
import { StatusComponent } from './components/common/ag-grid/status/status.component';
import { SnackBarComponent } from './components/common/snack-bar/snack-bar.component';
import { PasswordDefaultDirective } from './directives/password-default.directive';
import { BrandingComponent } from './components/theme/branding/branding.component';
import { TranslateComponent } from './components/translate/translate.component';
import { SidebarComponent } from './components/theme/sidebar/sidebar.component';
import { AgGridComponent } from './components/common/ag-grid/ag-grid.component';
import { PasswordMeterDirective } from './directives/password-meter.directive';
import { SelectComponent } from './components/common/select/select.component';
import { ButtonComponent } from './components/common/button/button.component';
import { DialogComponent } from './components/common/dialog/dialog.component';
import { HeaderComponent } from './components/theme/header/header.component';
import { PasswordViewDirective } from './directives/password-view.directive';
import { InputComponent } from './components/common/input/input.component';
import { ChartComponent } from './components/common/chart/chart.component';
import { LoaderComponent } from './components/loader/loader.component';
import { UserComponent } from './components/user/user.component';
import { MaterialModule } from './modules/material.module';

const MODULES: any[] = [
    CommonModule,
    RouterModule,
    FormsModule,
    NgxPermissionsModule,
    ReactiveFormsModule,
    MaterialModule,
    TranslateModule,
    AgGridModule,
    NgxPaginationModule,
    CurrencyMaskModule,
    NgApexchartsModule,
    // TodosModule
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
    SidebarMenuComponent,
    BreadcrumbComponent,
    UserComponent,
    LoaderComponent,
    AgGridComponent,
    SelectComponent,
    PaginationComponent,
    InputComponent,
    ButtonComponent,
    ButtonGroupComponent,
    DialogComponent,
    StatusComponent,
    TransferListComponent,
    CardLayoutComponent,
    InputValidatorComponent,
    PieChartComponent,
    BarChartComponent,
    ChartComponent,
    LineChartComponent,
    AddEditProjectComponent,
    ActionProjectComponent,
    SnackBarComponent,
    NotificationComponent,
    HelpPageComponent,
];
const COMPONENTS_DYNAMIC: any[] = [];
const DIRECTIVES: any[] = [
    NavAccordionItemDirective,
    NavAccordionDirective,
    NavAccordionToggleDirective,
    PasswordDefaultDirective,
    PasswordMeterDirective,
    PasswordViewDirective,
];
const PIPES: any[] = [];

@NgModule({
    declarations: [
        ...COMPONENTS,
        ...COMPONENTS_DYNAMIC,
        ...DIRECTIVES,
        ...PIPES,
    ],
    exports: [...MODULES, ...COMPONENTS, ...DIRECTIVES, ...PIPES],
    imports: [...MODULES],
})
export class SharedModule {}
