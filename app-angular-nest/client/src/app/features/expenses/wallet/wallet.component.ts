import { Component, TemplateRef, ViewChild } from "@angular/core";
import { WalletService } from "./wallet.service";
import { IWaller } from "./model/waller.model";
import { formatCurrency, isEmptyArray } from "@shared/helpers";
import { formatDate } from "@shared/helpers/time.helper";
import { DialogComponent } from "@shared/components/common/dialog/dialog.component";
import { MatDialog } from "@angular/material/dialog";
import { FormBuilder, FormControl, FormGroup, Validators } from "@angular/forms";

@Component({
    selector: "expense-wallet",
    templateUrl: "./wallet.component.html",
    styleUrls: ["./wallet.component.scss"]
})
export class WalletComponent {
    constructor(private walletService: WalletService,
                public dialog: MatDialog,
                private formBuilder: FormBuilder) {
    }

    @ViewChild("dialogTemplate") dialogTemplate!: TemplateRef<any>;

    wallets: any[] = [];

    form: FormGroup = new FormGroup({
        nameWallet: new FormControl(""),
        amount: new FormControl("")
    });

    ngOnInit() {
        this.getData();
        this.initForm();
    }

    getData() {
        this.walletService.getData().subscribe({
            next: (response) => {
                this.wallets = this.parseDataResponse(response.data);
                // this.wallet = formatCurrency(this.wallet, "vi-VN", "VND")

                if (isEmptyArray(this.wallets)) {
                    this.openDialog();
                }
                console.log(this.wallets);
            }
        });
    }

    initForm() {
        this.form = this.formBuilder.group(
            {
                nameWallet: ["", [Validators.required]],
                amount: ["", [Validators.required]]
            }
        );
    }

    openDialog() {
        const dialogRef = this.dialog.open(DialogComponent, {
            data: {
                title: "expenses.category",
                template: this.dialogTemplate,
                labelApply: "common.ok",
                isDisable: () => {
                    return this.form.invalid;
                }
            }
        });

        dialogRef.afterClosed().subscribe((result) => {
            if (result) {
                // this.form.patchValue({
                //     expenseCategory: this.selectedExpensesCategory.name
                // });
            }
        });
    }

    parseDataResponse(data: any[]) {

        data.forEach(val => {
            val.wallet = val.amount;
        });
        return data;
    }


    selectTimeRange() {

    }
}
