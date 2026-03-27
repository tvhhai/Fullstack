<template>
  child

  {{ props }}
</template>

<script setup lang="ts">
import { ref, watch } from "vue";

interface Props {
  data: {};
}

const props = defineProps<Props>();

watch(props, (newVal, oldVal) => {
  console.log(`count changed from ${oldVal} to ${newVal}`);
});
</script>

<style scoped></style>
