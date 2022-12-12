<template>
  <v-list-subheader v-if="subheader">{{ item.i18nKey }}</v-list-subheader>

  <v-list-group :value="item.id" :prepend-icon="item.icon">
    <template v-slot:activator="{ props }">
      <v-list-item v-bind="props" :title="item.i18nKey"></v-list-item>
    </template>

    <div v-for="(child, i) in item.children" :key="i">
      <div v-if="child.children">
        <v-list-group :value="child.id">
          <template v-slot:activator="{ props }">
            <v-list-item v-bind="props" :title="child.i18nKey"></v-list-item>
          </template>
          <div v-for="(b, i) in child.children" :key="i">
            <SidebarItem :item="b" />
          </div>
        </v-list-group>
      </div>

      <div v-else>
        <SidebarItem :item="child" />
      </div>
    </div>
  </v-list-group>
</template>

<script lang="ts">
import SidebarItem from "./SidebarItem.vue";

export default {
  name: "SidebarItemExpand",
  components: {
    SidebarItem,
  },
  props: {
    item: {
      type: Object,
    },
    subheader: {
      type: Boolean,
      required: false,
      default: false,
    },
  },

  setup() {
    return {};
  },
};
</script>

<style scoped></style>
