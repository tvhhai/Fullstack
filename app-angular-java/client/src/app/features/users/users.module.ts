import {NgModule} from '@angular/core';

import {UsersRoutingModule} from './users-routing.module';
import {UserComponent1} from './user/user.component';
import {SharedModule} from "@shared/shared.module";


@NgModule({
    declarations: [
        UserComponent1
    ],
    imports: [
        SharedModule,
        UsersRoutingModule,
    ]
})
export class UsersModule {
}
