<template>
  <ag-grid-vue
    class="ag-theme-alpine"
    style="height: 500px"
    :columnDefs="columnDefs.value"
    :rowData="rowData.value"
    :defaultColDef="defaultColDef"
    :floatingFilter="true"
    rowSelection="multiple"
    :animateRows="true"
    :suppressCellFocus="true"
    :suppressMenuHide="true"
    :suppressDragLeaveHidesColumns="true"
    :rowMultiSelectWithClick="true"
    :pagination="true"
    @cell-clicked="cellWasClicked"
    @grid-ready="onGridReady"
  >
  </ag-grid-vue>
</template>

<script>
import { reactive, onMounted, ref } from "vue";

import { AgGridVue } from "ag-grid-vue3";
export default {
  name: "AppAgGrid",
  components: {
    AgGridVue,
  },
  setup() {
    const gridApi = ref(null); // Optional - for accessing Grid's API

    // Obtain API from grid's onGridReady event
    const onGridReady = (params) => {
      gridApi.value = params.api;
    };

    const rowData = reactive({}); // Set rowData to Array of Objects, one Object per Row

    // Each Column Definition results in one Column.
    const columnDefs = reactive({
      value: [{ field: "name" }, { field: "price" }, { field: "image" }],
    });

    // DefaultColDef sets props common to all Columns
    const defaultColDef = {
      editable: false,
      sortable: true,
      filter: true,
      resizable: true,
      lockPinned: true, // Dont allow pinning for this example
    };

    // Example load data from sever
    onMounted(() => {
      fetch("https://5fa04305e21bab0016dfd001.mockapi.io/api/v1/listphone")
        .then((result) => result.json())
        .then((remoteRowData) => (rowData.value = remoteRowData));
    });

    return {
      onGridReady,
      columnDefs,
      rowData,
      defaultColDef,
      cellWasClicked: (event) => {
        // Example of consuming Grid Event
        console.log("cell was clicked", event);
      },
      deselectRows: () => {
        gridApi.value.deselectAll();
      },
    };
  },
};
</script>

<style  lang="scss">

</style>
