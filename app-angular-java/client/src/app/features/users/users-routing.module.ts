import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {UserManagerComponent} from "./user-manager/user.component";


const routes: Routes = [
    {path: '', component: UserManagerComponent},
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class UsersRoutingModule {
}
