import { Component, TemplateRef, ViewChild } from "@angular/core";
import { WalletService } from "./wallet.service";
import {  isEmptyArray } from "@shared/helpers";
import { DialogComponent } from "@shared/components/common/dialog/dialog.component";
import { MatDialog } from "@angular/material/dialog";
import { FormBuilder, FormControl, FormGroup, Validators } from "@angular/forms";
import { ButtonTypes } from "@shared/components/common/button/button.enum";
import { IWallet } from "./model/waller.model";
import { HelpersService } from "@shared/helpers/helper.service";

@Component({
    selector: "expense-wallet",
    templateUrl: "./wallet.component.html",
    styleUrls: ["./wallet.component.scss"]
})
export class WalletComponent {
    constructor(
        private walletService: WalletService,
        public dialog: MatDialog,
        private formBuilder: FormBuilder,
        private helpersService: HelpersService,) {
    }

    @ViewChild("dialogTemplate") dialogTemplate!: TemplateRef<any>;

    wallets: IWallet[] = [];
    walletSelected!: IWallet | undefined;

    form: FormGroup = new FormGroup({
        nameWallet: new FormControl(""),
        amount: new FormControl("")
    });

    ngOnInit() {
        this.getData();
        this.initForm();
    }

    getData() {
        this.walletService.getDataWallet().subscribe(
            {
                next: (data) => {
                    if (!isEmptyArray(data)) {
                        this.wallets = this.parseDataResponse(data);
                        if (isEmptyArray(this.wallets)) {
                            this.openDialog();
                        } else {
                            this.walletSelected = this.wallets.find(val => val.active);
                        }
                    }
                }
            }
        );
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
                title: "expenses.waller.createTitle",
                template: this.dialogTemplate,
                labelApply: "common.ok",
                isDisable: () => {
                    return this.form.invalid;
                }
            }
        });

        dialogRef.afterClosed().subscribe((result) => {
            if (result) {
                const data = this.form.value;
                data.active = true;
                console.log(data);
                this.walletService.create(data).subscribe({
                    next: () => {

                    }
                });
            }
        });
    }

    parseDataResponse(data: any[]) {
        data.forEach(val => {
            val.amount = this.helpersService.formatCurrency(val.amount);
        });
        return data;
    }

    selectWallet() {
        this.walletSelected = this.wallets.find(val => val.active);
    }

    protected readonly ButtonTypes = ButtonTypes;
}
