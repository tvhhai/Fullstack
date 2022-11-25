<template>
  <div class="mx-auto">
    <v-list v-model:opened="open">
      <!--      <div v-for="(sidebar, i) in sidebars" :key="i">-->
      <SidebarItem
        v-for="(sidebar, i) in sidebars"
        :key="i"
        :sidebar="sidebar"
      />

      <!--        <v-divider></v-divider>-->

      <!--        <div v-if="!sidebar.child">-->
      <!--          <v-list-subheader>{{ sidebar.i18nKey }}</v-list-subheader>-->
      <!--          <v-list-item-->
      <!--            :prepend-icon="sidebar.icon"-->
      <!--            :value="sidebar.i18nKey"-->
      <!--            :title="sidebar.i18nKey"-->
      <!--            active-color="primary"-->
      <!--          ></v-list-item>-->
      <!--        </div>-->

      <!--        <div v-if="sidebar.child">-->
      <!--          <v-list-subheader>{{ sidebar.i18nKey }}</v-list-subheader>-->

      <!--          <v-list-group :value="sidebar.i18nKey">-->
      <!--            <template v-slot:activator="{ props }">-->
      <!--              <v-list-item-->
      <!--                v-bind="props"-->
      <!--                :title="sidebar.i18nKey"-->
      <!--                :prepend-icon="sidebar.icon"-->
      <!--                active-color="primary"-->
      <!--              >-->
      <!--              </v-list-item>-->
      <!--            </template>-->

      <!--            <v-list-item-->
      <!--              v-for="(child, is) in sidebar.child"-->
      <!--              :key="is"-->
      <!--              :value="child.i18nKey"-->
      <!--              :title="child.i18nKey"-->
      <!--              active-color="primary"-->
      <!--            >-->
      <!--              <template v-slot:prepend>-->
      <!--                <div class="dot-icon"></div>-->
      <!--              </template>-->
      <!--            </v-list-item>-->
      <!--          </v-list-group>-->
      <!--        </div>-->

      <!--      </div>-->
    </v-list>
  </div>
</template>

<script lang="ts">
import SidebarItem from "./SidebarItem.vue";
import { reactive, ref, defineComponent } from "vue";

export default defineComponent({
  name: "SidebarApp",
  components: {
    SidebarItem,
  },
  setup() {
    console.log("setup");

    const product = reactive({
      type: 1,
      id: "product",
      i18nKey: "Product",
      icon: "mdi-account-circle",
      children: ref([
        {
          i18nKey: "Manager",
          url: "/manager",
        },
        {
          i18nKey: "Type",
          url: "/type",
        },
      ]),
    });

    const dashboard = reactive({
      id: "dashboard",
      i18nKey: "dashboard",
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
          i18nKey: "admin",
          children: [
            {
              id: "manager",
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
          i18nKey: "action",
          children: [
            {
              id: "create",
              i18nKey: "create",
              url: "/create",
            },
            {
              id: "edit",
              i18nKey: "edit",
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
