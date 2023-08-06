import { NgModule } from "@angular/core";

import { FeaturesRoutingModule } from "./features-routing.module";
import { SharedModule } from "@shared/shared.module";
import { GroupComponent } from "./rbac/group/group.component";

@NgModule({
    declarations: [
        GroupComponent
    ],
    imports: [
        SharedModule,
        FeaturesRoutingModule
    ]
})
export class FeaturesModule {
}
