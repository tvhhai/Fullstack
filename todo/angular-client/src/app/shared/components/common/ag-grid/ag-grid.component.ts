import {
    ViewEncapsulation,
    SimpleChanges,
    EventEmitter,
    Component,
    OnChanges,
    OnDestroy,
    ViewChild,
    OnInit,
    Output,
    Input,
} from '@angular/core';
import {
    SelectionChangedEvent,
    DragStoppedEvent,
    GridReadyEvent,
    GridOptions,
    ColumnApi,
    GridApi,
    ColDef,
} from 'ag-grid-community';
import {
    ButtonColor,
    ButtonTypes,
} from '@shared/components/common/button/button.enum';
import { AgGridConstant } from '@shared/components/common/ag-grid/constant/ag-grid.constant';
import { BtnLeftAction } from '@shared/components/common/ag-grid/model/ag-grid.model';
import { AgGridService } from '@shared/components/common/ag-grid/ag-grid.service';
import { sortObjByObjMap, isEmptyArray } from '@shared/helpers';
import { SubscriptSizing } from '@angular/material/form-field';
import { TranslateService } from '@ngx-translate/core';
import { AgGridAngular } from 'ag-grid-angular';
import { cloneDeep } from 'lodash';

@Component({
    encapsulation: ViewEncapsulation.None,
    selector: 'app-ag-grid',
    styleUrls: ['./ag-grid.component.scss'],
    templateUrl: './ag-grid.component.html',
})
export class AgGridComponent
    implements OnInit, OnDestroy, OnChanges, OnDestroy
{
    public ButtonTypes = ButtonTypes;
    public ButtonColor = ButtonColor;
    private _selectMultiWithCheckbox = false;
    private _selectSingleWithoutCheckbox = false;

    @Input() gridName!: string;
    @Input() rowData!: any[];
    @Input() columnDefs!: ColDef[];

    @Input() defaultColDef!: ColDef;
    @Input() itemsPerPage!: number;

    @Input() toolbarLeftAction!: BtnLeftAction[];

    @Input() suppressFullScreen = false;

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
        columnApi: ColumnApi;
        api: GridApi;
    }>();
    @Output() selectionChanged = new EventEmitter<any>();
    @Output() clickRefresh = new EventEmitter<void>();

    @ViewChild(AgGridAngular) agGrid!: AgGridAngular; // For accessing the Grid's API

    gridApi!: GridApi;
    columnApi!: ColumnApi;
    gridOptions: GridOptions = {};

    currentPage = 1;
    totalRow = 0;
    totalPage = 0;
    fromIndex = 0;
    toIndex = 0;
    rowDataPagination!: any[];
    searchValue!: string;
    subscriptSizing: SubscriptSizing = 'dynamic';
    isShowRefreshBtn = false;
    isFullScreen = false;

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
        this.gridOptions.onDragStopped = (e: DragStoppedEvent) =>
            this.onDragStopped(e);

        this.defaultColDef =
            this.defaultColDef || AgGridConstant.DEFAULT_COL_DEFS;
        this.itemsPerPage = this.itemsPerPage || this.ITEMS_PER_PAGE_OPTIONS[1];

        if (!isEmptyArray(this.rowData)) {
            this.assignRowData(this.rowData);
        }
        this.addCheckboxSelectionToColumnDefs();
        this.showRefreshBtn();
        this.getTableSettings();
    }

    getTableSettings() {
        this.agGridService.getData(this.gridName).subscribe({
            next: res => {
                if (!res.data) {
                    this.createTableSettings();
                } else {
                    const tableConfig: ColDef[] = res.data.tableConfig;
                    this.updateColumnDefs(tableConfig);
                }
            },
        });
    }

    updateColumnDefs(dataUpdate: ColDef[]) {
        const currentColumnState = this.columnDefs;

        const arrKeySort: any[] =
            dataUpdate.map((value: ColDef) => value.colId) || [];

        const result: ColDef[] = sortObjByObjMap(
            currentColumnState,
            arrKeySort,
            'field'
        );

        this.gridApi.setColumnDefs(result);
    }

    createTableSettings() {
        const data = {
            tableConfig: this.columnApi.getColumnState(),
            tableId: this.gridName,
        };
        this.agGridService.create(data).subscribe({
            next: res => {
                console.log(res);
            },
        });
    }

    onDragStopped(event: DragStoppedEvent) {
        console.log('DragStoppedEvent: ', event);
        const data = {
            tableConfig: this.columnApi.getColumnState(),
            tableId: this.gridName,
        };
        this.agGridService.update(this.gridName, data).subscribe({
            next: res => {
                console.log(res);
            },
        });
    }

    ngOnChanges(changes: SimpleChanges) {
        if (changes['rowData']) {
            this.assignRowData(changes['rowData'].currentValue);
        }
    }

    ngOnDestroy(): void {
        console.log();
    }

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

        this.rowDataPagination = value ? filteredRows : this.rowData;
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
        const fromIndex =
            this.currentPage >= 1
                ? (this.currentPage - 1) * this.itemsPerPage + 1
                : 0;
        const toIndex = Math.min(
            fromIndex + this.itemsPerPage - 1,
            this.totalRow
        );
        this.fromIndex = fromIndex;
        this.toIndex = toIndex;
    }

    private addCheckboxSelectionToColumnDefs() {
        if (this.selectMultiWithCheckbox && !this.isHaveCheckBox()) {
            this.columnDefs.unshift(this.AG_GRID_CHECKBOX_SELECTION as ColDef);
        }
    }

    private isHaveCheckBox() {
        return this.columnDefs.find(val => {
            return val.colId === this.AG_GRID_CHECKBOX_SELECTION.colId;
        });
    }
}
