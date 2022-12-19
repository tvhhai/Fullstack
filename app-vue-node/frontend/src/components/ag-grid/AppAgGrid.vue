<template>
  <AppLoader :is-loading="loading" />
  <ag-grid-vue
    class="ag-theme-alpine"
    style="height: 500px"
    :columnDefs="columnDefs"
    :rowData="rowData"
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

<script setup lang="ts">
import { reactive, onMounted, ref, defineEmits } from "vue";
import AppLoader from "@/components/loader.vue";
import { AgGridVue } from "ag-grid-vue3";


const props = defineProps({
  columnDefs: {
    type: Object,
    require: true
  },
  rowData: {
    type: Object,
    require: true
  },
  loading: {
    type: Boolean,
    require: true
  }
});
const emit = defineEmits(["grid-ready"]);

// setup(props, { emit }) {
const gridApi = ref(null); // Optional - for accessing Grid's API
const onGridReady = (params: any) => {
  console.log(params);
  emit("grid-ready", params);
  gridApi.value = params.api;
};

// DefaultColDef sets props common to all Columns
const defaultColDef = {
  editable: false,
  sortable: true,
  filter: true,
  resizable: true,
  lockPinned: true // Don't allow pinning for this example
};

</script>

<style lang="scss"></style>
