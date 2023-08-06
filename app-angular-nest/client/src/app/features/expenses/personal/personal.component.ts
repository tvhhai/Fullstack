import { Component } from "@angular/core";
import {
    ButtonColor,
    ButtonTypes
} from "@shared/components/common/button/button.enum";
import { formatCurrency, isEmptyArray } from "@shared/helpers";

import { ColDef, ColumnApi, GridApi, SelectionChangedEvent, ValueFormatterParams } from "ag-grid-community";
import { formatDateTime } from "@shared/helpers/time.helper";
import { EViewMode } from "@shared/enum/view-mode.enum";
import { TranslateService } from "@ngx-translate/core";
import { MatDialog } from "@angular/material/dialog";
import { forEach, get } from "lodash-es";
import { PersonalExpenseService } from "./personal.service";
import { DialogComponent } from "@shared/components/common/dialog/dialog.component";
import { BtnLeftAction } from "@shared/components/common/ag-grid/model/ag-grid.model";
import { EExpenseCategory } from "../enum/expense-category.enum";
import { PersonalExpense } from "../model/expense.model";

@Component({
    selector: "expense-personal",
    templateUrl: "./personal.component.html",
    styleUrls: ["./personal.component.scss"]
})
export class PersonalComponent {
    protected readonly ButtonTypes = ButtonTypes;
    protected readonly EViewMode = EViewMode;

    gridApi!: GridApi;
    columnApi!: ColumnApi;

    columnDefs: ColDef[] = [
        {
            field: "expenseCategory",
            headerName: this.translateService.instant("expenses.category"),
            valueFormatter: (params: ValueFormatterParams) => {
                return this.formatExpenseCategory(params);
            }
        },
        {
            field: "amount",
            headerName: this.translateService.instant("expenses.amount"),
            valueFormatter: (params: ValueFormatterParams) => {
                return formatCurrency(params.value, "vi-VN", "VND");
            },
            cellClass: params => {
                return params.data.expenseCategory.type===EExpenseCategory.EXPENSE ? EExpenseCategory.EXPENSE:EExpenseCategory.INCOME;
            }
        },
        {
            field: "date",
            headerName: this.translateService.instant("common.date"),
            valueFormatter: function(params: ValueFormatterParams) {
                return formatDateTime(params.value);
            }
        },
        {
            field: "note",
            headerName: this.translateService.instant("common.note")
        },
        {
            field: "updated_at",
            headerName: this.translateService.instant("common.updatedAt"),
            valueFormatter: function(params: ValueFormatterParams) {
                return formatDateTime(params.value);
            }
        }
    ];

    rowData: PersonalExpense[] = [];

    selectedRows: any[] = [];

    viewMod: EViewMode = EViewMode.View;

    spDeleteMulti: boolean = true;

    dataEdit: Partial<PersonalExpense> = {};

    btnAction: Record<string, BtnLeftAction> = {
        add: {
            id: "add",
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
            id: "edit",
            i18nKey: "common.edit",
            onClick: () => this.handleEdit(),
            disable: () => this.handleDisable(),
            icon: "mode_edit",
            color: ButtonColor.Accent
            // permission: Todo
        },
        delete: {
            id: "delete",
            i18nKey: "common.delete",
            onClick: () => this.handleDelete(),
            disable: () => this.handleDisable(this.spDeleteMulti),
            icon: "delete",
            color: ButtonColor.Warn
            // permission: Todo
        }
    };

    toolbarLeftAction = [
        this.btnAction["add"],
        this.btnAction["edit"],
        this.btnAction["delete"]
    ];

    constructor(
            private personalExpenseService: PersonalExpenseService,
            private translateService: TranslateService,
            public dialog: MatDialog
    ) {
    }

    ngOnInit() {
        this.getData();
    }

    onGridReady(params: { api: GridApi; columnApi: ColumnApi }) {
        this.gridApi = params.api;
        this.columnApi = params.columnApi;
        this.selectRowsFromData();
    }

    getData() {
        this.personalExpenseService.getData().subscribe({
            next: (response) => {
                this.rowData = response.data;
            },
            error: (error) => {
                console.log("Error:", error);
            }
        });
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

    formatExpenseCategory = (data: any) => {
        return get(data, "value.name");
    };

    backToView() {
        this.viewMod = EViewMode.View;
    }

}
