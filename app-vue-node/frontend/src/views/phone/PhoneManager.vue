<template>
  <AppAgGrid
    :column-defs="columnDefs"
    :row-data="rowData"
    :loading="isLoading"
    @grid-ready="onGridReady"
  />
</template>

<script setup lang="ts">
import { ref, onMounted, computed, reactive } from "vue";
import AppAgGrid from "@/components/ag-grid/AppAgGrid.vue";
import { usePhoneStore } from "@/stores/phone";

const phone = usePhoneStore();

const columnDefs = ref([
  { field: "name" },
  { field: "price" },
  { field: "image" },
]);

const rowData = computed(() => {
  return phone.listPhone;
});

const isLoading = computed(() => {
  return phone.isLoading;
});

const onGridReady = (params: any) => {
  console.log(params);
};

onMounted(() => {
  phone.getListPhone();
});
</script>

<style scoped></style>
