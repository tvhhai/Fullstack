import { NgModule } from '@angular/core';

import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';
import { MaterialModule } from '../modules/material.module';
import { TranslateComponent } from './components/translate/translate.component';
import { AuthLayoutComponent } from './components/theme/auth-layout/auth-layout.component';
import { BrandingComponent } from './components/theme/branding/branding.component';
import { HeaderComponent } from './components/theme/header/header.component';
import { AdminLayoutComponent } from './components/theme/admin-layout/admin-layout.component';
import { SidebarComponent } from './components/theme/sidebar/sidebar.component';
import { SidebarItemComponent } from './components/theme/sidebar-item/sidebar-item.component';
import { SignInComponent } from './components/theme/auth-layout/sign-in/sign-in.component';
import { SignUpComponent } from './components/theme/auth-layout/sign-up/sign-up.component';
import { RouterLink, RouterOutlet } from '@angular/router';
import { AppRoutingModule } from '../app-routing.module';

const MODULES: any[] = [
  CommonModule,
  MaterialModule,
  TranslateModule,
  AppRoutingModule,
];

const COMPONENTS: any[] = [
  TranslateComponent,
  AuthLayoutComponent,
  BrandingComponent,
  HeaderComponent,
  AdminLayoutComponent,
  SidebarComponent,
  SidebarItemComponent,
  SignInComponent,
  SignUpComponent,
];
const COMPONENTS_DYNAMIC: any[] = [];
const DIRECTIVES: any[] = [];
const PIPES: any[] = [];

@NgModule({
  imports: [...MODULES, RouterLink, RouterOutlet],
  exports: [...MODULES, ...COMPONENTS, ...DIRECTIVES, ...PIPES],
  declarations: [...COMPONENTS, ...COMPONENTS_DYNAMIC, ...DIRECTIVES, ...PIPES],
})
export class SharedModule {}
