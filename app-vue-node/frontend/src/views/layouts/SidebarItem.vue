<template>
  <div v-if="!sidebar.children">
    <v-list-subheader>{{ sidebar.i18nKey }}</v-list-subheader>
    <v-list-item
      :prepend-icon="sidebar.icon"
      :value="sidebar.i18nKey"
      :title="sidebar.i18nKey"
      active-color="primary"
    ></v-list-item>
  </div>

  <div v-if="sidebar.children">
    <v-list-subheader>{{ sidebar.i18nKey }}</v-list-subheader>

<!--    {{ sidebar }}-->

    <br><br><br><br><br>


    <div>
      <SidebarItemExpand
        :list="sidebar.children"
        :value="sidebar.i18nKey"
        :title="sidebar.i18nKey"
      />
    </div>
  </div>

</template>

<script>
import { computed } from "vue";
import SidebarItemExpand from "./SidebarItemExpand";

export default {
  name: "SidebarItem",
  components: {
    SidebarItemExpand,
  },
  props: {
    sidebar: {
      type: Object,
      required: true,
    },
    spacing: {
      type: Number,
      default: 0,
    },
  },

  setup(props) {
    const hasChildren = computed(() => {
      const { children } = props.sidebar;
      return children && children.length > 0;
    });

    return {
      hasChildren,
    };
  },
};
</script>

<style scoped></style>
