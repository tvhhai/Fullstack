import {NgModule} from '@angular/core';

import {FeaturesRoutingModule} from './features-routing.module';
import {UsersModule} from "./users/users.module";
import {SharedModule} from "@shared/shared.module";


@NgModule({
    declarations: [],
    imports: [
        SharedModule,
        FeaturesRoutingModule,
        UsersModule,
    ],

})
export class FeaturesModule {
}
