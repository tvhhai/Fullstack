import { SharedModule } from '@shared/shared.module';
import { NgModule } from '@angular/core';

import { FeaturesRoutingModule } from './features-routing.module';
import { TodosModule } from './todos/todos.module';

@NgModule({
    declarations: [],
    imports: [SharedModule, FeaturesRoutingModule, TodosModule],
})
export class FeaturesModule {}
