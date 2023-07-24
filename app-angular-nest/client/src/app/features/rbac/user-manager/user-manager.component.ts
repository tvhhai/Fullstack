import { Component } from '@angular/core';
import {
  ButtonColor,
  ButtonTypes,
} from '@shared/components/common/button/button.enum';
import {
  ColDef,
  ColumnApi,
  GridApi,
  SelectionChangedEvent,
  ValueFormatterParams,
} from 'ag-grid-community';
import { forEach, get } from 'lodash-es';
import { UserService } from './user-manager.service';
import { User } from './user-manager.model';
import { TranslateService } from '@ngx-translate/core';
import { EViewMode } from '../../../constants/enum/view-mode.enum';
import { isEmptyArray, isEmptyObj } from '@shared/helpers';
import { formatDateTime } from '@shared/helpers/time.helper';
import { MatDialog } from '@angular/material/dialog';
import { DialogComponent } from '@shared/components/common/dialog/dialog.component';
import { DataDialog } from '@shared/components/common/dialog/dialog.model';

@Component({
  selector: 'app-user-manager',
  templateUrl: './user-manager.component.html',
  styleUrls: ['./user-manager.component.scss'],
})
export class UserManagerComponent {
  protected readonly ButtonTypes = ButtonTypes;
  protected readonly isEmptyObj = isEmptyObj;

  gridApi!: GridApi;
  columnApi!: ColumnApi;

  columnDefs: ColDef[] = [
    {
      field: 'username',
      headerName: this.translateService.instant('user.columns.username'),
    },
    {
      field: 'firstName',
      headerName: this.translateService.instant('user.columns.firstName'),
    },
    {
      field: 'lastName',
      headerName: this.translateService.instant('user.columns.lastName'),
    },
    {
      field: 'email',
      headerName: this.translateService.instant('user.columns.email'),
    },
    {
      field: 'updated_at',
      headerName: this.translateService.instant('common.updatedAt'),
      valueFormatter: function (params: ValueFormatterParams) {
        return formatDateTime(params.value);
      },
    },
  ];

  rowData: User[] = [];

  selectedRows: any[] = [];

  viewMod: EViewMode = EViewMode.Create;

  spDeleteMulti: boolean = true;

  dataEdit: Partial<User> = {};

  constructor(
    private userService: UserService,
    private translateService: TranslateService,
    public dialog: MatDialog
  ) {}

  ngOnInit() {
    this.getData();
  }

  onGridReady(params: { api: GridApi; columnApi: ColumnApi }) {
    this.gridApi = params.api;
    this.columnApi = params.columnApi;
    this.selectRowsFromData();
  }

  getData() {
    this.userService.getData().subscribe({
      next: (response) => {
        this.rowData = response.data;
      },
      error: (error) => {
        console.log('Error:', error);
      },
    });
  }

  refresh() {
    this.getData();
  }

  handleAdd = () => {
    this.viewMod = EViewMode.Create;
  };

  handleEdit = () => {
    const id = get(this.selectedRows[0], 'id');
    this.viewMod = EViewMode.Edit;
    this.edit(id);
  };

  edit(id: User) {
    this.userService.getById(id).subscribe({
      next: (res) => {
        this.dataEdit = res.data;
      },
      error: () => {},
    });
  }

  handleDelete = () => {
    if (this.selectedRows.length === 1) {
      const id = get(this.selectedRows[0], 'id');
      this.openDialog(id);
    } else {
      const ids: string[] = this.selectedRows.map((val) => val.id);
      this.openDialog(ids);
    }
  };

  selectRowsFromData() {
    if (!isEmptyArray(this.selectedRows)) {
      this.gridApi.forEachNode((node) => {
        forEach(this.selectedRows, function (val) {
          if (val.id === node.data.id) {
            node.setSelected(true);
          }
        });
      });
    }
  }

  btnAction = {
    add: {
      id: 'add',
      i18nKey: 'common.add',
      onClick: this.handleAdd,
      disable: false,
      icon: 'add',
      color: ButtonColor.Primary,
      // permission: Todo
    },
    edit: {
      id: 'edit',
      i18nKey: 'common.edit',
      onClick: this.handleEdit,
      disable: this.handleDisable(),
      icon: 'mode_edit',
      color: ButtonColor.Accent,
      // permission: Todo
    },
    delete: {
      id: 'delete',
      i18nKey: 'common.delete',
      onClick: this.handleDelete,
      disable: this.handleDisable(this.spDeleteMulti),
      icon: 'delete',
      color: ButtonColor.Warn,
      // permission: Todo
    },
  };

  toolbarLeftAction = [
    this.btnAction.add,
    this.btnAction.edit,
    this.btnAction.delete,
  ];

  handleDisable(spDeleteMulti?: boolean): boolean {
    let selected;
    if (
      get(this.gridApi, 'getSelectedRows') &&
      !this.gridApi['destroyCalled']
    ) {
      selected = this.selectedRows;
    }
    return spDeleteMulti
      ? !(selected && selected.length > 0)
      : !(selected && selected.length > 0 && selected.length <= 1);
  }

  onSelectionChanged(event: SelectionChangedEvent) {
    this.selectedRows = event.api.getSelectedRows();

    forEach(this.toolbarLeftAction, (val) => {
      if (val.id === 'edit') {
        val.disable = this.handleDisable();
      }
      if (val.id === 'delete') {
        val.disable = this.handleDisable(this.spDeleteMulti);
      }
    });
  }

  save() {
    this.getData();
  }

  openDialog(id: User | string[]) {
    const dialogRef = this.dialog.open(DialogComponent, {
      data: {
        title: 'common.confirmDelete',
        message: this.translateService.instant('common.deleteItemMsg', {
          count: Array.isArray(id) ? id.length : 1,
          s: Array.isArray(id) ? 's' : '',
        }),
        labelApply: 'common.ok',
      },
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

  delete(id: User) {
    this.userService.delete(id).subscribe({
      next: () => {
        this.getData();
        this.removeColumn();
      },
      error: () => {},
    });
  }

  deleteMulti(ids: string[]) {
    this.userService.deleteMulti(ids).subscribe({
      next: () => {
        this.getData();
        this.removeColumn();
      },
      error: () => {},
    });
  }

  removeColumn() {
    const selectedData = this.gridApi.getSelectedRows();
    this.gridApi.applyTransaction({ remove: selectedData });
  }

  backToView() {
    this.viewMod = EViewMode.View;
    this.dataEdit = {};
  }

  cancel() {
    this.backToView();
  }
}
