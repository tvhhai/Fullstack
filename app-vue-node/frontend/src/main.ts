import { createApp } from "vue";
import { createPinia } from "pinia";

// Plugins
import { registerPlugins } from "@/plugins";

import App from "./App.vue";
import router from "./router";

import "./assets/main.scss";

createApp(App)
  .use(registerPlugins)
  .use(createPinia())
  .use(router)
  .mount("#app");
