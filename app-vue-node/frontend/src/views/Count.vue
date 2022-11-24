<template>
  <div class="about">Count</div>
  <v-btn @click="increment" elevation="2">{{ counter.count }}</v-btn>
</template>
<script lang="ts">
import { useCounterStore } from "@/stores/counter";

export default {
  setup() {
    const counter = useCounterStore();

    function increment() {
      counter.increment();
    }

    return {
      increment,
      counter,
    };
  },
};
</script>
<style></style>
