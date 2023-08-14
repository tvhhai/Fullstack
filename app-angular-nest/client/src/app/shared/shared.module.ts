import { NgModule } from "@angular/core";

import { CommonModule } from "@angular/common";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { TranslateModule } from "@ngx-translate/core";
import { NgxPermissionsModule } from "ngx-permissions";
import { MaterialModule } from "./modules/material.module";
import { RouterModule } from "@angular/router";
import { AgGridModule } from "ag-grid-angular";
import { NgxPaginationModule } from "ngx-pagination";
import { NgApexchartsModule } from "ng-apexcharts";
import { CurrencyMaskModule } from "ng2-currency-mask";


import { NavAccordionDirective } from "./components/theme/sidebar-menu/nav-accordion.directive";
import { NavAccordionItemDirective } from "./components/theme/sidebar-menu/nav-accordion-item.directive";
import { NavAccordionToggleDirective } from "./components/theme/sidebar-menu/nav-accordion-toggle.directive";
import { PasswordDefaultDirective } from "./directives/password-default.directive";

import { SettingComponent } from "./components/setting/setting.component";
import { SidebarMenuComponent } from "./components/theme/sidebar-menu/sidebar-menu.component";
import { TranslateComponent } from "./components/translate/translate.component";
import { AuthLayoutComponent } from "./components/theme/auth-layout/auth-layout.component";
import { BrandingComponent } from "./components/theme/branding/branding.component";
import { HeaderComponent } from "./components/theme/header/header.component";
import { AdminLayoutComponent } from "./components/theme/admin-layout/admin-layout.component";
import { SidebarComponent } from "./components/theme/sidebar/sidebar.component";
import { SignInComponent } from "./components/theme/auth-layout/sign-in/sign-in.component";
import { SignUpComponent } from "./components/theme/auth-layout/sign-up/sign-up.component";
import { BreadcrumbComponent } from "./components/theme/breadcrumb/breadcrumb.component";
import { LoaderComponent } from "./components/loader/loader.component";
import { UserComponent } from "./components/user/user.component";
import { AgGridComponent } from "./components/common/ag-grid/ag-grid.component";
import { SelectComponent } from "./components/common/select/select.component";
import { PaginationComponent } from "./components/common/pagination/pagination.component";
import { InputComponent } from "./components/common/input/input.component";
import { ButtonComponent } from "./components/common/button/button.component";
import { DialogComponent } from "./components/common/dialog/dialog.component";
import { StatusComponent } from "./components/common/ag-grid/status/status.component";
import { TransferListComponent } from "./components/common/transfer-list/transfer-list.component";
import { ButtonGroupComponent } from "./components/common/button-group/button-group.component";
import { CardLayoutComponent } from "./components/theme/card-layout/card-layout.component";
import { InputValidatorComponent } from "./components/common/input-validator/input-validator.component";
import { ChartComponent } from "./components/common/chart/chart.component";
import { LineChartComponent } from "./components/common/chart/line-chart/line-chart.component";
import { PieChartComponent } from "./components/common/chart/pie-chart/pie-chart.component";
import { BarChartComponent } from "./components/common/chart/bar-chart/bar-chart.component";
import { WalletComponent } from "../features/expenses/wallet/wallet.component";

import { CurrencyPipe } from "./pipe/currency.pipe";


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
    WalletComponent
];
const COMPONENTS_DYNAMIC: any[] = [];
const DIRECTIVES: any[] = [
    NavAccordionItemDirective,
    NavAccordionDirective,
    NavAccordionToggleDirective,
    PasswordDefaultDirective,
];
const PIPES: any[] = [
    CurrencyPipe
];

@NgModule({
    imports: [...MODULES],
    exports: [...MODULES, ...COMPONENTS, ...DIRECTIVES, ...PIPES,],
    declarations: [...COMPONENTS, ...COMPONENTS_DYNAMIC, ...DIRECTIVES, ...PIPES],
})
export class SharedModule {
}
