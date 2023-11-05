import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { ForbiddenComponent } from './forbidden/forbidden.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { ErrorsRoutingModule } from './errors-routing.module';

@NgModule({
  declarations: [ForbiddenComponent, NotFoundComponent],
  imports: [CommonModule, ErrorsRoutingModule],
})
export class ErrorsModule {}
