import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {AppRoutingModule} from './app-routing.module';
import {MaterialModule} from './modules/material.module';
import {LayoutModule} from '@angular/cdk/layout';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';

import {Router} from '@angular/router';

// Component
import {AppComponent} from './app.component';
import {LayoutComponent} from './components/theme/layout/layout.component';
import {SidebarComponent} from './components/theme/sidebar/sidebar.component';
import {HeaderComponent} from './components/theme/header/header.component';
import {DashboardComponent} from './components/dashboard/dashboard.component';
import {Test1Component} from './components/test1/test1.component';
import {Test2Component} from './components/test2/test2.component';
import {PageNotFoundComponent} from './components/page-not-found/page-not-found.component';
import { SidebarItemComponent } from './components/theme/sidebar-item/sidebar-item.component';
import { BrandingComponent } from './components/theme/branding/branding.component';

@NgModule({
  declarations: [
    AppComponent,
    LayoutComponent,
    SidebarComponent,
    HeaderComponent,
    DashboardComponent,
    Test1Component,
    Test2Component,
    PageNotFoundComponent,
    SidebarItemComponent,
    BrandingComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MaterialModule,
    LayoutModule,

  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
  // Diagnostic only: inspect router configuration
  constructor(router: Router) {
    // Use a custom replacer to display function names in the route configs
    // const replacer = (key, value) => (typeof value === 'function') ? value.name : value;

    // console.log('Routes: ', JSON.stringify(router.config, replacer, 2));
  }
}
