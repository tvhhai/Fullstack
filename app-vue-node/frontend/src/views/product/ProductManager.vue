<template>
  <div>
    <p>{{ name }}</p>
    <v-btn @click="count++"> click</v-btn>

    <Child :data="props"></Child>
  </div>
</template>

<script setup>
import { ref, reactive, toRefs } from "vue";
import Child from "@/views/product/Child.vue";

const name = ref("Hai");
const props = ref({ name: "Hai", age: 27 });

function update(n) {
  n = "Linh"; // chỉ thay đổi bản sao, không ảnh hưởng name
  console.log(n);
}

update(name.value);
setTimeout(() => {
  console.log("update");
  // age.value++;
}, 1000);
</script>
