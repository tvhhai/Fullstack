<template>
  <div class="mx-auto">
    <v-list v-model:opened="open">
      <div v-for="(item, i) in sidebars" :key="i">
        <template v-if="item.children">
          <SidebarItemExpand
            :subheader="true"
            :item="item"
          />
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
import a from "@/constants/sidebars"

export default defineComponent({
  name: "SidebarApp",
  components: {
    SidebarItem,
    SidebarItemExpand,
  },
  setup() {
    const product = reactive({
      type: 1,
      id: "product",
      i18nKey: "Product",
      icon: "mdi-account-circle",
      children: ref([
        {
          id: "Manager",
          i18nKey: "Manager",
          url: "/manager",
        },
        {
          id: "type",
          i18nKey: "Type",
          url: "/type",
        },
      ]),
    });

    const dashboard = reactive({
      id: "dashboard",
      i18nKey: "Dashboard",
      icon: "mdi-home",
      type: 0,
    });

    const users = reactive({
      type: 2,
      id: "user",
      i18nKey: "User",
      icon: "mdi-account-circle",
      children: [
        {
          id: "admin",
          i18nKey: "Admin",
          children: [
            {
              id: "manageruser",
              i18nKey: "Manager",
              url: "/manager",
            },
            {
              id: "setting",
              i18nKey: "Setting",
              url: "/setting",
            },
          ],
        },
        {
          id: "action",
          i18nKey: "Action",
          children: [
            {
              id: "create",
              i18nKey: "Create",
              url: "/create",
            },
            {
              id: "edit",
              i18nKey: "Edit",
              url: "/edit",
            },
          ],
        },
      ],
    });

    const open = ref(["Users"]);
    const sidebars = ref([dashboard, product, users]);

    return {
      sidebars,
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
