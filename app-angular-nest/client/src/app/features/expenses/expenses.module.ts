import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";

import { ExpensesRoutingModule } from "./expenses-routing.module";
import { PersonalComponent } from "./personal/personal.component";
import { SharedModule } from "@shared/shared.module";
import { AddEditPersonalExpenseComponent } from "./personal/form/add-edit-personal-expense.component";
import { ReportComponent } from "./report/report.component";
import { CategoryComponent } from "./category/category.component";
// import { WalletComponent } from "./wallet/wallet.component";


@NgModule({
    declarations: [
        PersonalComponent,
        AddEditPersonalExpenseComponent,
        ReportComponent,
        CategoryComponent,
        // WalletComponent
    ],
    imports: [
        CommonModule,
        ExpensesRoutingModule,
        SharedModule
    ]
})
export class ExpensesModule {
}
