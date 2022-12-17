<script setup lang="ts">
import { RouterView } from "vue-router";
</script>

<template>
  <RouterView />
</template>

<style>
.v-list-item__prepend > .v-icon {
  margin-inline-end: 12px;
}
.v-list-group {
  --prepend-width: 20px;
}
.v-list-item--active {
  background-color: #eee;
}
</style>
