import Vue from "vue";
import { AxiosInstance } from "axios";

import App from "./App.vue";
import vuetify from "./plugins/vuetify";
import router from "./router";
import store from './store';

import { userAPI, todoAPI } from "@/utils";

Vue.config.productionTip = false;

Vue.prototype.$userAPI = userAPI;
Vue.prototype.$todoAPI = todoAPI;

declare module "vue/types/vue" {
  interface Vue {
    $userAPI: AxiosInstance;
    $todAPi: AxiosInstance;
  }
}

new Vue({
  store,
  router,
  vuetify,
  render: (h) => h(App)
}).$mount("#app");
