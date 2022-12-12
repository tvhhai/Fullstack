<template>
  <v-app :theme="theme">
    <v-navigation-drawer v-model="drawer">
      <Sidebar />
    </v-navigation-drawer>

    <v-app-bar title="Application" :elevation="2">
      <template v-slot:prepend>
        <v-app-bar-nav-icon @click="toggleSidebar"></v-app-bar-nav-icon>
      </template>

      <v-spacer></v-spacer>

      <v-btn
        :icon="theme === 'light' ? 'mdi-weather-sunny' : 'mdi-weather-night'"
        @click="toggleTheme"
      >
      </v-btn>
    </v-app-bar>

    <v-main>
      <RouterView />
    </v-main>
  </v-app>
</template>

<script lang="ts">
import { ref } from "vue";
import Sidebar from "../../components/sidebar/Sidebar.vue";
export default {
  name: "MainLayout",
  components: {
    Sidebar,
  },

  setup() {
    const theme = ref("light");
    const drawer = ref(true);

    function toggleTheme() {
      theme.value = theme.value === "light" ? "dark" : "light";
    }

    function toggleSidebar() {
      drawer.value = !drawer.value;
    }

    return { toggleTheme, toggleSidebar, theme, drawer };
  },
};
</script>

<style scoped lang="scss"></style>
