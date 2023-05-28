export class AgGridConstant {
    public static readonly AG_GRID_CHECKBOX_SELECTION = {
        field: "",
        suppressMovable: true,
        lockPosition: 'left',
        colId: 'app-ag-grid-check-box',
        pinned: "left",
        width: 54,
        minWidth: 54,
        maxWidth: 54,
        checkboxSelection: true,
        headerCheckboxSelection: true,
        sortable: false,
        filter: false,
        resizable: false,
    }

    public static readonly DEFAULT_COL_DEFS = {
        editable: false,
        sortable: true,
        filter: true,
        resizable: true,
        lockPinned: true, // Dont allow pinning for this example
    }

    public static readonly ITEMS_PER_PAGE_OPTIONS = [5, 10, 50, 100, 250, 500, 1000];


}
