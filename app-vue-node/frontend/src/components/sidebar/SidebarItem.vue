<template>
  <v-list-subheader v-if="subheader">{{ $t(item.i18nKey) }}</v-list-subheader>

  <v-list-item
    :prepend-icon="item.icon"
    :value="item.id"
    :title="$t(item.i18nKey)"
    :to="item.url"
    active-color="primary"
  ></v-list-item>
</template>

<script>
export default {
  name: "SidebarItem",
  components: {},
  props: {
    item: {
      type: Object,
      required: true,
    },
    subheader: {
      type: Boolean,
      required: false,
      default: false,
    },
    spacing: {
      type: Number,
      default: 0,
    },
  },

  setup() {
    return {};
  },
};
</script>

<style scoped></style>
