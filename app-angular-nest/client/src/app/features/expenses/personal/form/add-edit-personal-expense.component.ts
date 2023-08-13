import { Component, EventEmitter, Input, Output, TemplateRef, ViewChild, ViewEncapsulation } from "@angular/core";
import { EViewMode } from "@shared/enum/view-mode.enum";
import { ButtonColor, ButtonTypes } from "@shared/components/common/button/button.enum";
import { FormBuilder, FormControl, FormGroup, Validators } from "@angular/forms";
import { PersonalExpenseService } from "../personal.service";
import { filterObjectByKeys, getObjectKeys, isEmptyArray, isEmptyObj } from "@shared/helpers";
import { DialogComponent } from "@shared/components/common/dialog/dialog.component";
import { MatDialog } from "@angular/material/dialog";
import {
    ExpenseCategory,
    PersonalExpense,
    PersonalExpenseRequest,
    TabExpenseCategory
} from "../../model/expense.model";
import { Role } from "../../../rbac/role/role.model";
import { UserService } from "@core/authentication/services/user.service";
import { DebtConstant } from "../../constant/debt-category.constant";
import { EExpenseCategory, EExpenseCategoryLabel } from "../../enum/expense-category.enum";
import { ExpenseCategoryService } from "../../category/category.service";
import { WalletService } from "../../wallet/wallet.service";
import { IWallet } from "../../wallet/model/waller.model";
import { cloneDeep, get, isEqual } from "lodash";
import { TranslateService } from "@ngx-translate/core";

@Component({
    selector: "add-edit-personal-expense",
    templateUrl: "./add-edit-personal-expense.component.html",
    styleUrls: ["./add-edit-personal-expense.component.scss"],
    encapsulation: ViewEncapsulation.None
})
export class AddEditPersonalExpenseComponent {
    protected readonly ButtonColor = ButtonColor;
    protected readonly ButtonTypes = ButtonTypes;
    protected readonly isEmptyArray = isEmptyArray;

    constructor(
        private personalExpenseService: PersonalExpenseService,
        private expenseCategoryService: ExpenseCategoryService,
        private walletService: WalletService,
        private userService: UserService,
        private formBuilder: FormBuilder,
        private translateService: TranslateService,
        public dialog: MatDialog
    ) {
    }

    @ViewChild("dialogTemplate") dialogTemplate!: TemplateRef<any>;
    @Input() viewMode!: EViewMode;
    @Output() save = new EventEmitter();
    @Output() cancel = new EventEmitter();

    form: FormGroup = new FormGroup({
        amount: new FormControl(""),
        date: new FormControl(""),
        note: new FormControl(""),
        expenseCategory: new FormControl("")
    });

    isValid: boolean = false;
    tabs!: TabExpenseCategory[];
    selectedTab = new FormControl(0);
    selectedExpensesCategory!: any;
    walletSelected!: IWallet | undefined;
    dataEditBk!: Partial<PersonalExpenseRequest>;
    idEdit!: number;

    ngOnInit() {
        this.initForm();
        this.getExpensesCategory();
        this.getWalletActive();
    }

    callFuncInEditMode() {
        if (this.isEditMode()) {
            this.personalExpenseService.getDataEdit().subscribe(
                {
                    next: (data) => {
                        console.log("personalExpenseService.getDataEdit");
                        this.idEdit = get(data, "id", NaN);
                        this.setDataEdit(data);
                        this.setBkDataEdit(data);
                    }
                });
        }
    }

    setDataEdit(data: PersonalExpense) {
        this.form.patchValue({
            amount: data.amount,
            date: data.date,
            note: data.note,
            expenseCategory: data.expenseCategory.name
        });
        this.activeItem(data.expenseCategory);
    }

    setBkDataEdit(dataBk: Partial<PersonalExpense>) {
        if (!isEmptyObj(dataBk)) {
            const formValueKeys = getObjectKeys(this.form.value);
            const filteredDataBk = filterObjectByKeys(dataBk, formValueKeys);

            this.dataEditBk = cloneDeep(filteredDataBk);
            this.dataEditBk.expenseCategory = dataBk.expenseCategory?.name;
        }
    }

    isEditMode(): boolean {
        return this.viewMode === EViewMode.Edit;
    }

    initForm() {
        this.form = this.formBuilder.group(
            {
                amount: [0, [Validators.required]],
                date: [new Date(), [Validators.required]],
                expenseCategory: ["", [Validators.required]],
                note: ["", []]
            }
        );
    }

    getExpensesCategory() {
        this.expenseCategoryService.getData().subscribe({
            next: (category) => {
                this.tabs = [
                    {
                        label: this.translateService.instant(EExpenseCategoryLabel.EXPENSE),
                        items: category.data.filter(value => value.type === EExpenseCategory.EXPENSE && !DebtConstant.LIST_DEBT.includes(value.name))
                    },
                    {
                        label: this.translateService.instant(EExpenseCategoryLabel.INCOME),
                        items: category.data.filter(value => value.type === EExpenseCategory.INCOME && !DebtConstant.LIST_DEBT.includes(value.name))
                    },
                    {
                        label: this.translateService.instant(EExpenseCategoryLabel.DEBTORLOAN),
                        items: category.data.filter(value => DebtConstant.LIST_DEBT.includes(value.name))
                    }
                ];

                this.callFuncInEditMode();
                this.onFormChange();
            }
        });
    }

    getWalletActive() {
        this.walletService.getDataWallet().subscribe({
            next: (data) => {
                this.walletSelected = data.find(val => val.active);
            }
        });
    }

    activeItem(event: ExpenseCategory) {
        this.tabs.forEach((tab: TabExpenseCategory) => {
            tab.items.forEach((item: ExpenseCategory) => {
                item.active = event.name === item.name;
            });
        });

        const selectedIndex = this.tabs.findIndex((tab) => tab.items.some((item) => item.active));
        this.selectedTab.setValue(selectedIndex);

        this.selectedExpensesCategory = event;
    }

    selectedCategory() {
        this.openDialog();
    }

    onFormChange() {
        this.form.valueChanges.subscribe((form) => {
            this.checkValid(form);
        });
    }

    checkValid(dataEdit: Partial<Role>) {
        if (this.viewMode === EViewMode.Create) {
            this.isValid = !this.form.invalid;
        } else {
            this.isValid = !this.form.invalid && !isEqual(this.dataEditBk, dataEdit);
        }
    }

    openDialog() {
        const dialogRef = this.dialog.open(DialogComponent, {
            data: {
                title: "expenses.category",
                template: this.dialogTemplate,
                labelApply: "common.ok"
            }
        });

        dialogRef.afterClosed().subscribe((result) => {
            if (result) {
                this.form.patchValue({
                    expenseCategory: this.selectedExpensesCategory.name
                });
            }
        });
    }

    onSaveClick() {
        const formData = this.parseDataRequest();
        console.log(formData);

        if (this.viewMode === EViewMode.Create) {
            this.create(formData);
            this.clearData();
        } else if (this.viewMode === EViewMode.Edit) {
            this.update(this.idEdit, formData);
        }
    }

    parseDataRequest() {
        const formData = this.getFormData();
        formData.user = this.userService.getCurrentUserObj().id;
        formData.expenseCategory = this.selectedExpensesCategory;
        formData.wallet = this.walletSelected?.id;
        return formData;
    }


    create(formData: PersonalExpense) {
        this.personalExpenseService.create(formData).subscribe({
            next: () => {
                this.clearData();
                this.save.emit();
            },
            error: () => {
            }
        });
    }

    update(id: number, formData: PersonalExpense) {
        console.log(id, formData);
        this.personalExpenseService.update(id, formData).subscribe({
            next: () => {
                this.onCancelClick();
                this.save.emit();
            },
            error: () => {
            },
        });
    }

    clearData() {
        this.form.reset();
        this.form.patchValue({
            amount: 0,
            date: new Date,
        });
    }


    getFormData() {
        return this.form.value;
    }

    onCancelClick() {
        this.cancel.emit();
    }

}
