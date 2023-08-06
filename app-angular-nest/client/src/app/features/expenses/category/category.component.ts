import { Component, ElementRef, QueryList, ViewChildren } from "@angular/core";
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
import { forEach, get } from "lodash-es";
import { DialogComponent } from "@shared/components/common/dialog/dialog.component";
import { ExpenseCategoryService } from "./category.service";
import { AgGridConstant } from "@shared/components/common/ag-grid/constant/ag-grid.constant";
import { StatusComponent } from "@shared/components/common/ag-grid/status/status.component";
import { DebtConstant } from "../constant/debt-category.constant";
import { ExpenseCategory, TabAction } from "../model/expense.model";

@Component({
    selector: "expense-category",
    templateUrl: "./category.component.html",
    styleUrls: ["./category.component.scss"]
})
export class CategoryComponent {
    protected readonly ButtonTypes = ButtonTypes;
    protected readonly EViewMode = EViewMode;

    @ViewChildren("tabAction") tabActions!: QueryList<ElementRef>;

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
                    value: params.value===EExpenseCategory.EXPENSE
                            ? EExpenseCategoryLabel.EXPENSE
                            :EExpenseCategoryLabel.INCOME,
                    status: params.value===EExpenseCategory.EXPENSE
                            ? AgGridConstant.COLOR_ACCENT.LOW
                            :AgGridConstant.COLOR_ACCENT.HIGH
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
            valueFormatter: function(params: ValueFormatterParams) {
                return formatDateTime(params.value);
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
            title: "income.title",
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

    constructor(
            private personalExpenseService: PersonalExpenseService,
            private expenseCategoryService: ExpenseCategoryService,
            private translateService: TranslateService,
            public dialog: MatDialog
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
                    this.rowData = response.data.filter(val => val.type===activeTab.type && !DebtConstant.LIST_DEBT.includes(val.name));
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
        this.tabAction.forEach((tab: any) => {
            tab.active = false;
        });
        item.active = true;
        this.getData();
    }

    getIncome(item: TabAction) {
        this.tabAction.forEach((tab: any) => {
            tab.active = false;
        });
        item.active = true;

        this.getData();
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
        this.viewMod = EViewMode.Create;
    };

    handleEdit = () => {
        const id = get(this.selectedRows[0], "id");
        this.viewMod = EViewMode.Edit;
        this.edit(id);
    };

    edit(id: number) {
        this.personalExpenseService.getById(id).subscribe({
            next: (res) => {
                // this.dataEdit = res.data;
                // console.log(res.data)
                // this.personalExpenseService.setDataEdit({
                //   id: id,
                //   username: res.data.username,
                //   email: res.data.email,
                //   roles: res.data.roles,
                //   password: res.data.password,
                //   confirmPassword: res.data.confirmPassword,
                // });
            },
            error: () => {
            }
        });
    }

    handleDelete = () => {
        if (this.selectedRows.length===1) {
            const id = get(this.selectedRows[0], "id");
            this.openDialog(id);
        } else {
            const ids: string[] = this.selectedRows.map((val) => val.id);
            this.openDialog(ids);
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
                :!(selected && !isEmptyArray(selected) && selected.length <= 1);
    }

    openDialog(id: number | string[]) {
        const dialogRef = this.dialog.open(DialogComponent, {
            data: {
                title: "common.confirmDelete",
                message: this.translateService.instant("common.deleteItemMsg", {
                    count: Array.isArray(id) ? id.length:1,
                    s: Array.isArray(id) ? "s":""
                }),
                labelApply: "common.ok"
            }
        });

        dialogRef.afterClosed().subscribe((result) => {
            if (result) {
                if (Array.isArray(id)) {
                    this.deleteMulti(id);
                } else {
                    this.delete(id);
                }
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
                    if (val.id===node.data.id) {
                        node.setSelected(true);
                    }
                });
            });
        }
    }

    backToView() {
        this.viewMod = EViewMode.View;
    }
}
