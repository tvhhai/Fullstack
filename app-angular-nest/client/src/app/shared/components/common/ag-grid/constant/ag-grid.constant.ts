export class AgGridConstant {
    public static readonly AG_GRID_CHECKBOX_SELECTION = {
        field: "",
        suppressMovable: true,
        lockPosition: "left",
        colId: "app-ag-grid-check-box",
        pinned: "left",
        width: 54,
        minWidth: 54,
        maxWidth: 54,
        checkboxSelection: true,
        headerCheckboxSelection: true,
        sortable: false,
        filter: false,
        resizable: false
    };

    public static readonly DEFAULT_COL_DEFS = {
        editable: false,
        sortable: true,
        filter: true,
        resizable: true,
        lockPinned: true // Don't allow pinning for this example
    };

    public static readonly ITEMS_PER_PAGE_OPTIONS = [
        5, 10, 50, 100, 250, 500, 1000
    ];

    public static readonly STATUS = {
        UP: "#2ca02c",
        WARNING: "#ff7f0e",
        DOWN: "#d62728"
    };

    public static readonly COLOR_ACCENT = {
        LOW: {
            title: "status.low",
            color: "#26c6da",
            background: "#e8f7ff"
        },
        MEDIUM: {
            title: "status.medium",
            color: "#1e88e5",
            background: "#ecf6ff"
        },
        HIGH: {
            title: "status.high",
            color: "#ffb22b",
            background: "#fff8ec"
        },
        CRITICAL: {
            title: "status.critical",
            color: "#fc4b6c",
            background: "#f9e7eb"
        }
    };

}
