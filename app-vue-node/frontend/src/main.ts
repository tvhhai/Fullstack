import { createApp } from "vue";
import { createPinia } from "pinia";

// Plugins
import { registerPlugins } from "@/plugins";

import App from "./App.vue";
import router from "./router";

import "ag-grid-community/dist/styles/ag-grid.css";
import "ag-grid-community/dist/styles/ag-theme-alpine.css";

createApp(App)
  .use(registerPlugins)
  .use(createPinia())
  .use(router)
  .mount("#app");
