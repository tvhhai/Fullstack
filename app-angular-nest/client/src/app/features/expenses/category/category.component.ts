import { Component, ElementRef, QueryList, TemplateRef, ViewChild, ViewChildren } from "@angular/core";
import { ButtonColor, ButtonTypes } from "@shared/components/common/button/button.enum";
import { EViewMode } from "@shared/enum/view-mode.enum";
import { ColDef, ColumnApi, GridApi, SelectionChangedEvent, ValueFormatterParams } from "ag-grid-community";
import { isEmptyArray } from "@shared/helpers";
import { EExpenseCategory, EExpenseCategoryLabel } from "../enum/expense-category.enum";
import { formatDateTime } from "@shared/helpers/time.helper";
import { PersonalExpenseService } from "../personal/personal.service";
import { TranslateService } from "@ngx-translate/core";
import { MatDialog } from "@angular/material/dialog";
import { BtnLeftAction } from "@shared/components/common/ag-grid/model/ag-grid.model";
import { forEach, get } from "lodash";
import { DialogComponent } from "@shared/components/common/dialog/dialog.component";
import { ExpenseCategoryService } from "./category.service";
import { AgGridConstant } from "@shared/components/common/ag-grid/constant/ag-grid.constant";
import { StatusComponent } from "@shared/components/common/ag-grid/status/status.component";
import { DebtConstant } from "../constant/debt-category.constant";
import { ExpenseCategory, TabAction } from "../model/expense.model";
import { DataDialog } from "@shared/components/common/dialog/dialog.model";
import { FormControl, FormGroup } from "@angular/forms";
import { AppConstant } from "@shared/constants";
import { TimeHelpersService } from "@shared/helpers/time.helper.service";

@Component({
    selector: "expense-category",
    templateUrl: "./category.component.html",
    styleUrls: ["./category.component.scss"]
})
export class CategoryComponent {
    protected readonly ButtonTypes = ButtonTypes;
    protected readonly EViewMode = EViewMode;

    @ViewChildren("tabAction") tabActions!: QueryList<ElementRef>;
    @ViewChild("dialogTemplate") dialogTemplate!: TemplateRef<any>;

    gridApi!: GridApi;
    columnApi!: ColumnApi;
    leftLineActive!: any;
    widthLineActive!: any;
    columnDefs: ColDef[] = [
        {
            field: "name",
            headerName: this.translateService.instant("common.name")
        },
        {
            field: "icon",
            headerName: this.translateService.instant("common.icon")
        },
        {
            field: "type",
            headerName: this.translateService.instant("common.type"),
            cellRendererSelector: (params) => {
                const data = {
                    value: params.value === EExpenseCategory.EXPENSE
                        ? this.translateService.instant(EExpenseCategoryLabel.EXPENSE)
                        : this.translateService.instant(EExpenseCategoryLabel.INCOME),
                    status: params.value === EExpenseCategory.EXPENSE
                        ? AppConstant.COLOR_ACCENT.LOW
                        : AppConstant.COLOR_ACCENT.HIGH
                };

                return {
                    component: StatusComponent,
                    params: { data }
                };
            }
        },
        {
            field: "updated_at",
            headerName: this.translateService.instant("common.updatedAt"),
            valueFormatter: (params: ValueFormatterParams) => {
                return this.timeHelpersService.formatDateTime(params.value);
            }
        }
    ];
    rowData: ExpenseCategory[] = [];
    selectedRows: any[] = [];
    viewMod: EViewMode = EViewMode.View;
    spDeleteMulti: boolean = true;
    btnAction: Record<string, BtnLeftAction> = {
        add: {
            id: "add-category",
            i18nKey: "common.add",
            onClick: () => this.handleAdd(),
            disable: () => {
                return false;
            },
            icon: "add",
            color: ButtonColor.Primary
            // permission: Todo
        },
        edit: {
            id: "edit-category",
            i18nKey: "common.edit",
            onClick: () => this.handleEdit(),
            disable: () => this.handleDisable(),
            icon: "mode_edit",
            color: ButtonColor.Accent
            // permission: Todo
        },
        delete: {
            id: "delete-category",
            i18nKey: "common.delete",
            onClick: () => this.handleDelete(),
            disable: () => this.handleDisable(this.spDeleteMulti),
            icon: "delete",
            color: ButtonColor.Warn
            // permission: Todo
        }
    };
    tabAction: TabAction[] = [
        {
            title: "expenses.title",
            onClick: (item: TabAction) => this.getExpense(item),
            active: true,
            type: EExpenseCategory.EXPENSE
        },
        {
            title: "expenses.income.title",
            onClick: (item: any) => this.getIncome(item),
            active: false,
            type: EExpenseCategory.INCOME
        }
    ];
    toolbarLeftAction = [
        this.btnAction["add"],
        this.btnAction["edit"],
        this.btnAction["delete"]
    ];
    form: FormGroup = new FormGroup({
        name: new FormControl(""),
        icon: new FormControl(""),
        type: new FormControl(EExpenseCategory.EXPENSE),
    });
    radioType = [
        {
            title: this.translateService.instant(EExpenseCategoryLabel.EXPENSE),
            value: EExpenseCategory.EXPENSE
        },
        {
            title: this.translateService.instant(EExpenseCategoryLabel.INCOME),
            value: EExpenseCategory.INCOME
        },
    ];

    constructor(
        private personalExpenseService: PersonalExpenseService,
        private expenseCategoryService: ExpenseCategoryService,
        private translateService: TranslateService,
        private timeHelpersService: TimeHelpersService,
        private dialog: MatDialog
    ) {
    }

    ngOnInit() {
        this.getData();
    }

    getData() {
        this.expenseCategoryService.getData().subscribe({
            next: (response) => {
                const activeTab = this.tabAction.find((tab: any) => tab.active);
                if (activeTab) {
                    this.rowData = response.data.filter(val => val.type === activeTab.type && !DebtConstant.LIST_DEBT.includes(val.name));
                    this.activeTab();
                }
            },
            error: (error) => {
                console.log("Error:", error);
            }
        });
    }

    activeTab() {
        this.tabActions.forEach((divRef: ElementRef) => {
            const { offsetLeft, offsetWidth } = divRef.nativeElement;
            if (divRef.nativeElement.classList.contains("active")) {
                this.leftLineActive = offsetLeft + "px";
                this.widthLineActive = offsetWidth + "px";
            }
        });
    }

    onGridReady(params: { api: GridApi; columnApi: ColumnApi }) {
        this.gridApi = params.api;
        this.columnApi = params.columnApi;
        this.selectRowsFromData();
    }

    getExpense(item: TabAction) {
        this.setTabActive(item);
        this.getData();
    }

    getIncome(item: TabAction) {
        this.setTabActive(item);
        this.getData();
    }

    setTabActive(item: TabAction) {
        this.tabAction.forEach((tab: any) => {
            tab.active = false;
        });
        item.active = true;
    }

    refresh() {
        this.getData();
    }

    save() {
        this.getData();
    }

    cancel() {
        this.backToView();
    }

    handleAdd = () => {
        const config: DataDialog = {
            title: "expenses.category.addTitle",
            viewMode: EViewMode.Create,
            template: this.dialogTemplate,
            labelApply: "common.ok"
        };
        this.openDialog(config);
    };

    handleEdit = () => {
        const id = get(this.selectedRows[0], "id");
        const config: DataDialog = {
            title: "expenses.category.editTitle",
            viewMode: EViewMode.Edit,
            template: this.dialogTemplate,
            labelApply: "common.ok"
        };
        this.edit(id);
        this.openDialog(config);
    };

    edit(id: number) {
        this.expenseCategoryService.getById(id).subscribe({
            next: (res) => {
                this.form.patchValue({
                    name: res.data.name,
                    icon: res.data.icon,
                    type: res.data.type,
                });
            },
            error: () => {
            }
        });
    }

    handleDelete = () => {
        if (this.selectedRows.length === 1) {
            const id = get(this.selectedRows[0], "id");
            this.openDialog(EViewMode.Delete, id);
        } else {
            const ids: string[] = this.selectedRows.map((val) => val.id);
            this.openDialog(EViewMode.Delete, ids);
        }
    };

    handleDisable(spDeleteMulti?: boolean): boolean {
        let selected;
        if (
            get(this.gridApi, "getSelectedRows") &&
            !this.gridApi["destroyCalled"]
        ) {
            selected = this.selectedRows;
        }

        return spDeleteMulti
            ? !(selected && !isEmptyArray(selected))
            : !(selected && !isEmptyArray(selected) && selected.length <= 1);
    }

    openDialog(config: any, id?: number | string[]) {
        const dialog = this.dialog.open(DialogComponent, {
            data: {
                title: config.title,
                template: config.template,
                // message: this.translateService.instant("common.deleteItemMsg", {
                //   count: Array.isArray(id) ? id.length : 1,
                //   s: Array.isArray(id) ? "s" : ""
                // }),
                labelApply: config.labelApply
            }
        });

        dialog.afterClosed().subscribe((result) => {
            if (result) {
                const data = this.form.value;

                if (config.viewMod === EViewMode.Create) {
                    this.expenseCategoryService.create(data).subscribe({
                        next: (res) => {
                            this.clearData();
                            this.getData();
                        }
                    });
                } else if (config.viewMod === EViewMode.Edit) {
                    this.expenseCategoryService.create(data).subscribe({
                        next: (res) => {

                        }
                    });
                }

                console.log(this.form.value);
                // if (Array.isArray(id)) {
                //   this.deleteMulti(id);
                // } else {
                //   id ? this.delete(id) : '';
                // }
            }
        });
    }

    onSelectionChanged(event: SelectionChangedEvent) {
        this.selectedRows = event.api.getSelectedRows();
    }

    delete(id: number) {
        this.personalExpenseService.delete(id).subscribe({
            next: () => {
                this.getData();
                this.removeColumn();
            },
            error: () => {
            }
        });
    }

    deleteMulti(ids: string[]) {
        this.personalExpenseService.deleteMulti(ids).subscribe({
            next: () => {
                this.getData();
                this.removeColumn();
            },
            error: () => {
            }
        });
    }

    removeColumn() {
        const selectedData = this.gridApi.getSelectedRows();
        this.gridApi.applyTransaction({ remove: selectedData });
    }

    selectRowsFromData() {
        if (!isEmptyArray(this.selectedRows)) {
            this.gridApi.forEachNode((node) => {
                forEach(this.selectedRows, function(val) {
                    if (val.id === node.data.id) {
                        node.setSelected(true);
                    }
                });
            });
        }
    }

    clearData() {
        this.form.reset();
    }

    backToView() {
        this.viewMod = EViewMode.View;
    }
}
