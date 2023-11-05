import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';

import { ForbiddenComponent } from './forbidden/forbidden.component';
import { NotFoundComponent } from './not-found/not-found.component';

const routes: Routes = [
  { component: ForbiddenComponent, path: '403' },
  { component: NotFoundComponent, path: '404' },
  { path: '**', redirectTo: '404' },
];

@NgModule({
  exports: [RouterModule],
  imports: [RouterModule.forChild(routes)],
})
export class ErrorsRoutingModule {}
