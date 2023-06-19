import { NgModule } from '@angular/core';

import { UsersRoutingModule } from './users-routing.module';
import { UserManagerComponent } from './user-manager/user-manager.component';
import { SharedModule } from '@shared/shared.module';
import { AddEditUserMngFormComponent } from './user-manager/form/add-edit-user-mng-form.component';

@NgModule({
  declarations: [UserManagerComponent, AddEditUserMngFormComponent],
  imports: [SharedModule, UsersRoutingModule],
})
export class UsersModule {}
