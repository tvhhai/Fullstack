import { Component } from '@angular/core';
import { ColDef, ColumnApi, GridApi, ValueFormatterParams } from 'ag-grid-community';
import { RoleService } from './role.service';
import { TranslateService } from '@ngx-translate/core';
import { MatDialog } from '@angular/material/dialog';
import { formatDateTime } from '@shared/helpers/time.helper';
import { Role } from './role.model';

@Component({
  selector: 'app-role',
  templateUrl: './role.component.html',
  styleUrls: ['./role.component.scss']
})
export class RoleComponent {
  gridApi!: GridApi;
  columnApi!: ColumnApi;

  columnDefs: ColDef[] = [
    {
      field: 'name',
      headerName: this.translateService.instant('common.name'),
    },
    {
      field: 'description',
      headerName: this.translateService.instant('common.description'),
    },
    {
      field: 'updated_at',
      headerName: this.translateService.instant('common.updatedAt'),
      valueFormatter: function (params: ValueFormatterParams) {
        return formatDateTime(params.value);
      },
    },
  ];

  rowData: Role[] = [];

  selectedRows: any[] = [];

  constructor(
    private roleService: RoleService,
    private translateService: TranslateService,
    public dialog: MatDialog
  ) {}

  ngOnInit() {
    this.getData();
  }

  onGridReady(params: { api: GridApi; columnApi: ColumnApi }) {
    this.gridApi = params.api;
    this.columnApi = params.columnApi;
    // this.selectRowsFromData();
  }

  getData() {
    this.roleService.getData().subscribe({
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
}
