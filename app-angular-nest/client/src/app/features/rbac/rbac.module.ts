import { NgModule } from '@angular/core';

import { RbacRoutingModule } from './rbac-routing.module';
import { UserManagerComponent } from './user-manager/user-manager.component';
import { SharedModule } from '@shared/shared.module';
import { AddEditUserMngFormComponent } from './user-manager/form/add-edit-user-mng-form.component';
import { RoleComponent } from './role/role.component';

@NgModule({
  declarations: [
    UserManagerComponent,
    AddEditUserMngFormComponent,
    RoleComponent,
  ],
  imports: [SharedModule, RbacRoutingModule],
})
export class RbacModule {}
