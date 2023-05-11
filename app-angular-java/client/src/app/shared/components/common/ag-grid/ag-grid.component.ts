import {Component, EventEmitter, Input, Output, ViewChild, ViewEncapsulation} from '@angular/core';
import {CellClickedEvent, ColDef, ColumnApi, GridApi, GridOptions, GridReadyEvent} from "ag-grid-community";
import {AgGridAngular} from "ag-grid-angular";
import {AgGridConstant} from "@shared/components/common/ag-grid/ag-grid.component.constant";
import {isEmptyArray} from "@shared/helpers";
import {cloneDeep} from 'lodash';

@Component({
    selector: 'app-ag-grid',
    templateUrl: './ag-grid.component.html',
    styleUrls: ['./ag-grid.component.scss'],
})
export class AgGridComponent {
    @Input() gridName!: string;
    @Input() rowData!: any[];
    @Input() columnDefs!: ColDef[];

    @Input() defaultColDef!: ColDef;
    @Input() itemsPerPage!: number;

    @Output() gridReady: EventEmitter<{ api: GridApi, columnApi: ColumnApi }> = new EventEmitter();

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
    rowDataBk!: any[];
    searchValue!: string;

    ITEMS_PER_PAGE_OPTIONS = AgGridConstant.ITEMS_PER_PAGE_OPTIONS;

    constructor() {
    }

    ngOnInit() {
        this.defaultColDef = this.defaultColDef || AgGridConstant.DEFAULT_COL_DEFS;
        this.itemsPerPage = this.itemsPerPage || this.ITEMS_PER_PAGE_OPTIONS[0];

        this.rowDataBk = cloneDeep(this.rowData);
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

        this.rowData = value ? filteredRows : this.rowDataBk;
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
