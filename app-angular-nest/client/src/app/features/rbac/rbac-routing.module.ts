import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UserManagerComponent } from './user-manager/user-manager.component';
import { RoleComponent } from './role/role.component';

const routes: Routes = [{ path: 'user', component: UserManagerComponent },
{ path: 'role', component: RoleComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class RbacRoutingModule {}
