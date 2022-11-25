<script setup lang="ts">
import { RouterView } from "vue-router";
</script>

<template>
  <RouterView />
</template>

<style>
.v-list-item__prepend > .v-icon {
  margin-inline-end: 16px;
}
.v-list-group {
  --prepend-width: 20px;
}
</style>
