<template>
  <!--  <v-list-group :value="value">-->
  <!--    <template v-slot:activator="{ props }">-->
  <!--      <v-list-item-->
  <!--        v-bind="props"-->
  <!--        title="Actions"-->
  <!--      ></v-list-item>-->
  <!--    </template>-->

  <!--    <v-list-item-->

  <!--      :value="title"-->
  <!--      :title="title"-->
  <!--      :prepend-icon="icon"-->
  <!--    ></v-list-item>-->

  <!--  </v-list-group>-->

  <!--  {{list, value, title}}-->


  <v-list-group :value="value">
    <template v-slot:activator="{ props }">
      <v-list-item
        v-bind="props"
        :title="title"
      ></v-list-item>
    </template>

<!--    <v-list-item-->

<!--      :value="title"-->
<!--      :title="title"-->
<!--      :prepend-icon="icon"-->
<!--    ></v-list-item>-->

  </v-list-group>


</template>

<script>
import { computed } from "vue";

export default {
  name: "SidebarItemExpand",
  props: {
    group: {
      type: Object
    },
    list: {
      type: Object
    },
    value: {
      type: String,
      required: true
    },
    title: {
      type: String,
      required: true
    }
  },

  setup(props) {
    console.log(props.value);
    // console.log(props.list);

    const hasChildren = computed(() => {
      const { children } = props.group;

      console.log(children && children.length > 0);
      return true;
    });

    return {
      hasChildren
    };
  }
};
</script>

<style scoped></style>
