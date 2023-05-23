import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  Output,
  SimpleChanges,
  ViewChild,
  ViewEncapsulation
} from '@angular/core';
import {ColDef, ColumnApi, GridApi, GridOptions, GridReadyEvent, SelectionChangedEvent} from "ag-grid-community";
import {AgGridAngular} from "ag-grid-angular";
import {AgGridConstant} from "@shared/components/common/ag-grid/ag-grid.component.constant";
import {isEmptyArray} from "@shared/helpers";
import {cloneDeep} from 'lodash-es';
import {TranslateService} from '@ngx-translate/core';
import {ButtonColor, ButtonTypes} from "@shared/components/common/button/button.enum";

interface ButtonAction {
  id: string;
  i18nKey: string;
  onClick: () => void;
  disable: boolean;
  icon: string;
  color: ButtonColor;
  // permission: string;
} // Import Object từ core-js

@Component({
  selector: 'app-ag-grid',
  templateUrl: './ag-grid.component.html',
  styleUrls: ['./ag-grid.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class AgGridComponent {
  public ButtonTypes = ButtonTypes;
  public ButtonColor = ButtonColor;

  @Input() gridName!: string;
  @Input() rowData!: any[];
  @Input() columnDefs!: ColDef[];

  @Input() defaultColDef!: ColDef;
  @Input() itemsPerPage!: number;

  @Input() toolbarLeftAction!:  any;

  @Output() gridReady: EventEmitter<{ api: GridApi, columnApi: ColumnApi }> = new EventEmitter();
  @Output() selectionChanged = new EventEmitter<any>()

  // For accessing the Grid's API
  @ViewChild(AgGridAngular) agGrid!: AgGridAngular;


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

  ITEMS_PER_PAGE_OPTIONS = AgGridConstant.ITEMS_PER_PAGE_OPTIONS;

  public overlayNoRowsTemplate =
    '<div class="custom-overlay-no-rows">' +
    '<span>' +
    this.translateService.instant('agGrid.agGridNoData') +
    '</span>' +
    '</div>';

  constructor(private translateService: TranslateService) {
  }

  ngOnInit() {
    this.defaultColDef = this.defaultColDef || AgGridConstant.DEFAULT_COL_DEFS;
    this.itemsPerPage = this.itemsPerPage || this.ITEMS_PER_PAGE_OPTIONS[0];

    this.rowDataPagination = cloneDeep(this.rowData);
    console.log(this.toolbarLeftAction)
  }

  ngOnChanges(changes: SimpleChanges) {
    // Xử lý các thay đổi của các đầu vào tại đây
    console.log(changes)
  }

  onSelectionChanged(event: SelectionChangedEvent) {
    this.selectionChanged.emit(event);
  }

  onGridReady(params: GridReadyEvent) {
    this.gridApi = params.api;
    this.columnApi = params.columnApi;
    this.gridReady.emit(params);
    this.onPaginationChanged();

    this.gridApi.sizeColumnsToFit()
  }


  onSearchChange(value: string) {
    this.gridApi.setQuickFilter(value);

    const filteredRows: any[] = [];
    this.gridApi.forEachNodeAfterFilter((rowNode: any) => {
      filteredRows.push(rowNode.data);
    });

    isEmptyArray(filteredRows) ? this.gridApi.showNoRowsOverlay() : this.gridApi.hideOverlay();

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

  private updatePageIndices() {
    let fromIndex = this.currentPage >= 1 ? (this.currentPage - 1) * this.itemsPerPage + 1 : 0;
    let toIndex = Math.min(fromIndex + this.itemsPerPage - 1, this.totalRow);
    this.fromIndex = fromIndex;
    this.toIndex = toIndex;
  }

}
