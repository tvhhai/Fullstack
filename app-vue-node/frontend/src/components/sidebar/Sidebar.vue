<template>
  <div class="mx-auto">
    <v-list v-model:opened="open">
      <div v-for="(item, i) in sidebarsData" :key="i">
        <template v-if="item.children">
          <SidebarItemExpand :subheader="true" :item="item" />
        </template>

        <template v-else>
          <SidebarItem :item="item" :subheader="true" />
        </template>
      </div>
    </v-list>
  </div>
</template>

<script lang="ts">
import { reactive, ref, defineComponent } from "vue";
import SidebarItem from "./SidebarItem.vue";
import SidebarItemExpand from "./SidebarItemExpand.vue";
import { sidebars } from "@/constants/sidebars";

export default defineComponent({
  name: "SidebarApp",
  components: {
    SidebarItem,
    SidebarItemExpand,
  },
  setup() {
    const products = sidebars.products;

    const dashboard = sidebars.dashboard;

    const users = sidebars.users;

    const open = ref(["Users"]);
    const sidebarsData = ref([dashboard, products, users]);

    return {
      sidebarsData,
      open,
    };
  },
});
</script>

<style lang="scss">
.dot-icon {
  background: black;
  border-radius: 100%;
  display: inline-flex;
  height: 8px;
  margin-right: 16px;
  width: 8px;
}
</style>
