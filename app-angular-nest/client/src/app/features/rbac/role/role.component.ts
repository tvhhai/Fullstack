import { Component } from "@angular/core";
import {
    ColDef,
    ColumnApi,
    GridApi,
    SelectionChangedEvent,
    ValueFormatterParams
} from "ag-grid-community";
import { RoleService } from "./role.service";
import { TranslateService } from "@ngx-translate/core";
import { MatDialog } from "@angular/material/dialog";
import { Role } from "./role.model";
import { EViewMode } from "@shared/enum/view-mode.enum";
import { forEach, get, size } from "lodash";
import {
    ButtonColor,
    ButtonTypes
} from "@shared/components/common/button/button.enum";
import { DialogComponent } from "@shared/components/common/dialog/dialog.component";
import { isEmptyArray } from "@shared/helpers";
import { StatusComponent } from "@shared/components/common/ag-grid/status/status.component";
import { AgGridConstant } from "@shared/components/common/ag-grid/constant/ag-grid.constant";
import { RoleConstant } from "./constants/role.constants";
import { BtnLeftAction } from "@shared/components/common/ag-grid/model/ag-grid.model";
import { AppConstant } from "@shared/constants";
import { TimeHelpersService } from "@shared/helpers/time.helper.service";

@Component({
    selector: "rbac-role",
    templateUrl: "./role.component.html",
    styleUrls: ["./role.component.scss"]
})
export class RoleComponent {
    protected readonly EViewMode = EViewMode;
    protected readonly ButtonTypes = ButtonTypes;
    gridApi!: GridApi;
    columnApi!: ColumnApi;

    columnDefs: ColDef[] = [
        {
            field: "name",
            headerName: this.translateService.instant("common.name")
        },
        {
            field: "description",
            headerName: this.translateService.instant("common.description")
        },
        {
            field: "systemDefine",
            headerName: this.translateService.instant("role.columns.systemDefine"),
            cellRendererSelector: (params) => {
                const data = {
                    value: params.value
                        ? RoleConstant.SYSTEM_DEFINE
                        : RoleConstant.CUSTOM,
                    status: params.value
                        ? AppConstant.COLOR_ACCENT.LOW
                        : AppConstant.COLOR_ACCENT.MEDIUM
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

    rowData: Role[] = [];

    selectedRows: Role[] = [];

    viewMod: EViewMode = EViewMode.View;

    spDeleteMulti: boolean = true;

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
        },
        edit: {
            id: "edit",
            i18nKey: "common.edit",
            onClick: () => this.handleEdit(),
            disable: () => this.handleDisable(),
            icon: "mode_edit",
            color: ButtonColor.Accent
        },
        delete: {
            id: "delete",
            i18nKey: "common.delete",
            onClick: this.handleDelete,
            disable: () => this.handleDisable(this.spDeleteMulti),
            icon: "delete",
            color: ButtonColor.Warn
        }
    };

    toolbarLeftAction: BtnLeftAction[] = [
        this.btnAction["add"],
        this.btnAction["edit"],
        this.btnAction["delete"]
    ];

    constructor(
        private roleService: RoleService,
        private translateService: TranslateService,
        private timeHelpersService: TimeHelpersService,
        private dialog: MatDialog
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
        this.roleService.getData().subscribe({
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

    save() {
        this.getData();
    }

    handleAdd() {
        this.viewMod = EViewMode.Create;
        this.roleService.setDataEdit({
            name: "",
            description: "",
            permissions: []
        });
    };

    handleEdit() {
        const id = get(this.selectedRows[0], "id");
        this.viewMod = EViewMode.Edit;
        this.edit(id);
    };

    edit(id: number) {
        this.roleService.getById(id).subscribe({
            next: (res) => {
                this.roleService.setDataEdit({
                    id: id,
                    name: res.data.name,
                    description: res.data.description,
                    permissions: res.data.permissions
                });
            },
            error: () => {
            }
        });
    }

    handleDelete() {
        if (this.selectedRows.length === 1) {
            const id = get(this.selectedRows[0], "id");
            this.openDialog(id);
        } else {
            const ids: number[] = this.selectedRows.map((val) => val.id);
            this.openDialog(ids);
        }
    };

    handleDisable(spDeleteMulti?: boolean): boolean {
        let selected: Role[] = [];
        if (
            get(this.gridApi, "getSelectedRows") &&
            !this.gridApi["destroyCalled"]
        ) {
            selected = this.selectedRows;
        }

        return spDeleteMulti
            ? this.isSystemDefined(selected) || size(selected) === 0
            : size(selected) !== 1;
    }

    isSystemDefined(selected: Role[]) {
        return !!selected.find((val) => val.systemDefine);
    }

    onSelectionChanged(event: SelectionChangedEvent) {
        this.selectedRows = event.api.getSelectedRows();

        forEach(this.toolbarLeftAction, (val) => {
            // if (val.id === 'edit') {
            //   val.disable = this.handleDisable();
            // }
            // if (val.id === 'delete') {
            //   val.disable = this.handleDisable(this.spDeleteMulti);
            // }
        });
    }

    openDialog(id: number | number[]) {
        const dialogRef = this.dialog.open(DialogComponent, {
            data: {
                title: "common.confirmDelete",
                message: this.translateService.instant("common.deleteItemMsg", {
                    count: Array.isArray(id) ? id.length : 1,
                    s: Array.isArray(id) ? "s" : ""
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

    delete(id: number) {
        this.roleService.delete(id).subscribe({
            next: () => {
                this.getData();
                this.removeColumn();
            },
            error: () => {
            }
        });
    }

    deleteMulti(ids: number[]) {
        this.roleService.deleteMulti(ids).subscribe({
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

    backToView() {
        this.viewMod = EViewMode.View;
        this.roleService.setDataEdit({
            name: "",
            description: "",
            permissions: []
        });
    }

    cancel() {
        this.backToView();
    }
}
