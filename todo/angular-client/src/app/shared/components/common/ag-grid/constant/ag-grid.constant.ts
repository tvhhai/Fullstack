export class AgGridConstant {
    public static readonly AG_GRID_CHECKBOX_SELECTION = {
        checkboxSelection: true,
        colId: "app-ag-grid-check-box",
        field: "",
        filter: false,
        headerCheckboxSelection: true,
        lockPosition: "left",
        maxWidth: 54,
        minWidth: 54,
        pinned: "left",
        resizable: false,
        sortable: false,
        suppressMovable: true,
        width: 54
    };

    public static readonly DEFAULT_COL_DEFS = {
        editable: false,
        filter: true,
        lockPinned: true, // Don't allow pinning for this example
        resizable: true,
        sortable: true
    };

    public static readonly ITEMS_PER_PAGE_OPTIONS = [
        5, 10, 50, 100, 250, 500, 1000
    ];



}
