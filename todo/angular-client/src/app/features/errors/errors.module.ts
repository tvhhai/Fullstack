import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ErrorsRoutingModule } from './errors-routing.module';
import { ForbiddenComponent } from './forbidden/forbidden.component';
import { NotFoundComponent } from './not-found/not-found.component';

@NgModule({
  declarations: [ForbiddenComponent, NotFoundComponent],
  imports: [CommonModule, ErrorsRoutingModule],
})
export class ErrorsModule {}
