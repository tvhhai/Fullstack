import { AfterViewInit, Component, TemplateRef, ViewChild } from "@angular/core";
import { WalletService } from "./wallet.service";
import { isEmptyArray } from "@shared/helpers";
import { DialogComponent } from "@shared/components/common/dialog/dialog.component";
import { MatDialog } from "@angular/material/dialog";
import { FormBuilder, FormControl, FormGroup, Validators } from "@angular/forms";
import { ButtonTypes } from "@shared/components/common/button/button.enum";
import { IWallet } from "./model/waller.model";
import { HelpersService } from "@shared/helpers/helper.service";
import { ToastrService } from "ngx-toastr";
import { skip } from "rxjs";

@Component({
    selector: "expense-wallet",
    templateUrl: "./wallet.component.html",
    styleUrls: ["./wallet.component.scss"]
})
export class WalletComponent implements AfterViewInit {
    constructor(
        private walletService: WalletService,
        public dialog: MatDialog,
        private formBuilder: FormBuilder,
        private helpersService: HelpersService,
        private toast: ToastrService,
    ) {
    }

    @ViewChild("dialogTemplate") dialogTemplate!: TemplateRef<any>;

    wallets: IWallet[] = [];
    walletSelected!: IWallet | undefined;

    form: FormGroup = new FormGroup({
        nameWallet: new FormControl(""),
        amount: new FormControl("")
    });

    ngOnInit() {
        this.initForm();
    }

    ngAfterViewInit() {
        this.getData();
    }

    getData() {
        this.walletService.getDataWallet()
            .pipe(
                skip(1) // Bỏ qua sự kiện đầu tiên (init data)
            ).subscribe(
            {
                next: (data) => {
                    if (!isEmptyArray(data)) {
                        this.wallets = data
                        this.walletSelected = data.find(val => val.active);
                    } else {
                        this.openDialog();
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
                isShowCancelBtn: false,
                isDisable: () => {
                    return this.form.invalid;
                }
            }
        });

        dialogRef.afterClosed().subscribe((result) => {
            if (result) {
                const data = this.form.value;
                data.active = true;
                this.walletService.create(data).subscribe({
                    next: (res) => {
                        this.wallets = res.data
                        this.toast.success(res.message);
                        this.walletSelected = this.wallets.find(val => val.active);
                    }
                });
            }
        });
    }

    selectWallet() {
        this.walletSelected = this.wallets.find(val => val.active);
    }

    protected readonly ButtonTypes = ButtonTypes;
}
