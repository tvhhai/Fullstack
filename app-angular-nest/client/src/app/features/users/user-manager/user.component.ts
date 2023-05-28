import {Component} from '@angular/core';
import {ButtonColor} from '@shared/components/common/button/button.enum';
import {ColumnApi, GridApi, SelectionChangedEvent} from "ag-grid-community";
import {cloneDeep, forEach, get, map} from "lodash-es";


interface ButtonAction {
  id: string;
  i18nKey: string;
  onClick: () => void;
  disable: boolean;
  icon: string;
  color: ButtonColor;
  // permission: string;
}

@Component({
  selector: 'app-user-manager',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})
export class UserManagerComponent {

  gridApi!: GridApi;
  columnApi!: ColumnApi;

  columnDefs: ({ field: string })[] = [
    {field: 'make'},
    {field: 'model'},
    {field: 'price'}
  ]

  rowData: any[] = [
    {
      "make": "Porsche",
      "model": "Boxter",
      "price": 72000,
    },
    {
      "make": "Ford",
      "model": "Mondeo",
      "price": 32000,
    },
    {
      "make": "Ford",
      "model": "Mondeo",
      "price": 32000,
    }, {
      "make": "Porsche",
      "model": "Boxter",
      "price": 72000,
    },
    {
      "make": "Ford",
      "model": "Mondeo",
      "price": 32000,
    },
    {
      "make": "Ford",
      "model": "Mondeo",
      "price": 32000,
    }, {
      "make": "Porsche",
      "model": "Boxter",
      "price": 72000,
    },
    {
      "make": "Ford",
      "model": "Mondeo",
      "price": 32000,
    },
    {
      "make": "Ford",
      "model": "Mondeo",
      "price": 32000,
    }, {
      "make": "Porsche",
      "model": "Boxter",
      "price": 72000,
    },
    {
      "make": "Ford",
      "model": "Mondeo",
      "price": 32000,
    },
    {
      "make": "Ford",
      "model": "Mondeo",
      "price": 32000,
    }, {
      "make": "Porsche",
      "model": "Boxter",
      "price": 72000,
    },
    {
      "make": "Ford",
      "model": "Mondeo",
      "price": 32000,
    },
    {
      "make": "Ford",
      "model": "Mondeo",
      "price": 32000,
    }, {
      "make": "Porsche",
      "model": "Boxter",
      "price": 72000,
    },
    {
      "make": "Ford",
      "model": "Mondeo",
      "price": 32000,
    },
    {
      "make": "Ford",
      "model": "Mondeo",
      "price": 32000,
    }
  ]

  selectedRows: any[] = []


  handleAdd() {
    console.log('handleAdd')
  }

  handleEdit() {
    console.log('handleEdit')
  }

  handleDelete() {
    console.log('handleDelete')
  }

  onGridReady(params: { api: GridApi, columnApi: ColumnApi }) {
    this.gridApi = params.api;
    this.columnApi = params.columnApi;
  }


  btnAction = {
    add: {
      id: "add",
      i18nKey: "common.add",
      onClick: this.handleAdd,
      disable: false,
      icon: 'add',
      color: ButtonColor.Primary,
      // permission: Todo
    },
    edit: {
      id: "edit",
      i18nKey: "common.edit",
      onClick: this.handleEdit,
      disable: this.handleDisable(),
      icon: 'mode_edit',
      color: ButtonColor.Accent,
      // permission: Todo
    },
    delete: {
      id: "delete",
      i18nKey: "common.delete",
      onClick: this.handleDelete,
      disable: this.handleDisable(),
      icon: 'delete',
      color: ButtonColor.Warn,
      // permission: Todo
    },
  }
  toolbarLeftAction = [this.btnAction.add, this.btnAction.edit, this.btnAction.delete];

  handleDisable(): boolean {
    let selected;
    if (get(this.gridApi, 'getSelectedRows') && !this.gridApi['destroyCalled']) {
      selected = this.gridApi.getSelectedRows();
    }
    return !(
      selected &&
      selected.length > 0 &&
      selected.length <= 1
    );
  };


  onSelectionChanged(event: SelectionChangedEvent) {
    this.selectedRows = event.api.getSelectedRows();
    forEach(this.toolbarLeftAction, (val) => {
      if (val.id === 'edit' || val.id === 'delete') {
        val.disable = this.handleDisable();
      }
    });
  }
}
