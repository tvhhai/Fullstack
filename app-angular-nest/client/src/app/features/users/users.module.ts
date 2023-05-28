import {NgModule} from '@angular/core';

import {UsersRoutingModule} from './users-routing.module';
import {UserManagerComponent} from './user-manager/user.component';
import {SharedModule} from "@shared/shared.module";


@NgModule({
    declarations: [
      UserManagerComponent
    ],
    imports: [
        SharedModule,
        UsersRoutingModule,
    ]
})
export class UsersModule {
}
