import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';

import { ProjectComponent } from './project/project.component';
import { TodayComponent } from './today/today.component';

const routes: Routes = [
    { component: TodayComponent, path: 'today' },
    { component: ProjectComponent, path: 'project/:subPath' },
];

@NgModule({
    exports: [RouterModule],
    imports: [RouterModule.forChild(routes)],
})
export class TodosRoutingModule {}
