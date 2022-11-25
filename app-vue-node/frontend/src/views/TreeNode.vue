<template>
  <div :style="nodeMargin">
    <v-alert type="success"> {{ node.label }}</v-alert>
    <div v-if="hasChildren">
      <TreeNode
        v-for="child in node.children"
        :key="child.id"
        :node="child"
        :spacing="spacing + 10"
      />
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  name: "TreeNode",
  props: {
    node: {
      type: Object,
      required: true
    },
    spacing: {
      type: Number,
      default: 0
    }
  },
  computed: {
    nodeMargin(): object {
      return {
        "margin-left": `${this.spacing}px`
      };
    },
    hasChildren(): boolean {
      const { children } = this.node;
      return children && children.length > 0;
    }
  },
  setup(props) {

    return {};
  }
});
</script>

<style scoped></style>
