import {
  Component,
  EventEmitter,
  Input,
  Output,
  SimpleChanges,
  ViewChild,
  ViewEncapsulation,
} from '@angular/core';
import {
  ColDef,
  ColumnApi,
  GridApi,
  GridOptions,
  GridReadyEvent,
  SelectionChangedEvent,
} from 'ag-grid-community';
import { AgGridAngular } from 'ag-grid-angular';
import { AgGridConstant } from '@shared/components/common/ag-grid/ag-grid.component.constant';
import { isEmptyArray } from '@shared/helpers';
import { cloneDeep } from 'lodash-es';
import { TranslateService } from '@ngx-translate/core';
import {
  ButtonColor,
  ButtonTypes,
} from '@shared/components/common/button/button.enum';
import { AgGridService } from '@shared/components/common/ag-grid/ag-grid.service';
import { SubscriptSizing } from '@angular/material/form-field';

interface ButtonAction {
  id: string;
  i18nKey: string;
  onClick: () => void;
  disable: () => void;
  icon: string;
  color: ButtonColor;
  // permission: string;
}

@Component({
  selector: 'app-ag-grid',
  templateUrl: './ag-grid.component.html',
  styleUrls: ['./ag-grid.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class AgGridComponent {
  public ButtonTypes = ButtonTypes;
  public ButtonColor = ButtonColor;
  private _selectMultiWithCheckbox: boolean = false;
  private _selectSingleWithoutCheckbox: boolean = false;

  @Input() gridName!: string;
  @Input() rowData!: any[];
  @Input() columnDefs!: ColDef[];

  @Input() defaultColDef!: ColDef;
  @Input() itemsPerPage!: number;

  @Input() toolbarLeftAction!: any[];

  @Input() suppressFullScreen: boolean = false;

  @Input()
  set selectMultiWithCheckbox(value: boolean) {
    this._selectMultiWithCheckbox = value;
    if (this._selectMultiWithCheckbox) {
      this._selectSingleWithoutCheckbox = false;
    }
  }

  get selectMultiWithCheckbox(): boolean {
    return this._selectMultiWithCheckbox;
  }

  @Input()
  set selectSingleWithoutCheckbox(value: boolean) {
    this._selectSingleWithoutCheckbox = value;
    if (this._selectSingleWithoutCheckbox) {
      this._selectMultiWithCheckbox = false;
    }
  }

  get selectSingleWithoutCheckbox(): boolean {
    return this._selectSingleWithoutCheckbox;
  }

  @Output() gridReady = new EventEmitter<{
    api: GridApi;
    columnApi: ColumnApi;
  }>();
  @Output() selectionChanged = new EventEmitter<any>();
  @Output() clickRefresh = new EventEmitter<void>();

  @ViewChild(AgGridAngular) agGrid!: AgGridAngular; // For accessing the Grid's API

  gridApi!: GridApi;
  columnApi!: ColumnApi;
  gridOptions!: GridOptions;

  currentPage: number = 1;
  totalRow: number = 0;
  totalPage: number = 0;
  fromIndex: number = 0;
  toIndex: number = 0;
  rowDataPagination!: any[];
  searchValue!: string;
  subscriptSizing: SubscriptSizing = 'dynamic';
  isShowRefreshBtn: boolean = false;
  isFullScreen: boolean = false;

  ITEMS_PER_PAGE_OPTIONS = AgGridConstant.ITEMS_PER_PAGE_OPTIONS;
  AG_GRID_CHECKBOX_SELECTION = AgGridConstant.AG_GRID_CHECKBOX_SELECTION;

  public overlayNoRowsTemplate =
    '<div class="custom-overlay-no-rows">' +
    '<span>' +
    this.translateService.instant('agGrid.agGridNoData') +
    '</span>' +
    '</div>';

  constructor(
    private translateService: TranslateService,
    private agGridService: AgGridService
  ) {}

  ngOnInit() {
    this.defaultColDef = this.defaultColDef || AgGridConstant.DEFAULT_COL_DEFS;
    this.itemsPerPage = this.itemsPerPage || this.ITEMS_PER_PAGE_OPTIONS[0];

    if (this.rowData.length > 0) {
      this.assignRowData(this.rowData);
    }
    this.addCheckboxSelectionToColumnDefs();
    this.showRefreshBtn();
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['rowData']) {
      this.assignRowData(changes['rowData'].currentValue);
    }
  }

  ngOnDestroy(): void {}

  showRefreshBtn() {
    this.isShowRefreshBtn = this.clickRefresh.observed;
  }

  fullScreen() {
    this.isFullScreen = !this.isFullScreen;
  }

  assignRowData(rowData: any[]) {
    this.rowDataPagination = cloneDeep(rowData);
  }

  onSelectionChanged(event: SelectionChangedEvent) {
    this.selectionChanged.emit(event);
    this.agGridService.selectedRows = event.api.getSelectedRows();
  }

  onGridReady(params: GridReadyEvent) {
    this.gridApi = params.api;
    this.columnApi = params.columnApi;
    this.gridReady.emit(params);
    this.onPaginationChanged();
    this.gridApi.sizeColumnsToFit();
  }

  onSearchChange(value: string) {
    this.gridApi.setQuickFilter(value);

    const filteredRows: any[] = [];
    this.gridApi.forEachNodeAfterFilter((rowNode: any) => {
      filteredRows.push(rowNode.data);
    });

    isEmptyArray(filteredRows)
      ? this.gridApi.showNoRowsOverlay()
      : this.gridApi.hideOverlay();

    this.rowDataPagination = !!value ? filteredRows : this.rowData;
  }

  onPageChange(number: number) {
    this.currentPage = number;
    this.gridApi.paginationGoToPage(number - 1);
  }

  onItemsPerPageChange(value: any) {
    this.gridApi.paginationSetPageSize(value);
  }

  onPaginationChanged() {
    if (this.gridApi) {
      this.totalPage = this.gridApi.paginationGetTotalPages();
      this.totalRow = this.gridApi.paginationGetRowCount();

      this.currentPage = this.gridApi.paginationGetCurrentPage() + 1;

      const rowData = this.gridApi.getRenderedNodes();

      if (isEmptyArray(rowData)) {
        this.currentPage = 0;
      } else {
        this.currentPage = this.gridApi.paginationGetCurrentPage() + 1; // as the first page is zero
      }
      this.updatePageIndices();
    }
  }

  refresh() {
    this.clickRefresh.emit();
  }

  private updatePageIndices() {
    let fromIndex =
      this.currentPage >= 1
        ? (this.currentPage - 1) * this.itemsPerPage + 1
        : 0;
    let toIndex = Math.min(fromIndex + this.itemsPerPage - 1, this.totalRow);
    this.fromIndex = fromIndex;
    this.toIndex = toIndex;
  }

  private addCheckboxSelectionToColumnDefs() {
    if (this.selectMultiWithCheckbox && !this.isHaveCheckBox()) {
      this.columnDefs.unshift(this.AG_GRID_CHECKBOX_SELECTION as ColDef);
    }
  }

  private isHaveCheckBox() {
    return this.columnDefs.find((val) => {
      return val.colId === this.AG_GRID_CHECKBOX_SELECTION.colId;
    });
  }
}
