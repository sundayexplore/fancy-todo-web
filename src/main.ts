import Vue from "vue";
import { AxiosInstance } from "axios";
import "material-design-icons-iconfont/dist/material-design-icons.css";

import App from "./App.vue";
import vuetify from "./plugins/vuetify";
import router from "./router";
import store from './store';

import { userAPI, todoAPI, User } from "@/utils";

Vue.config.productionTip = false;

Vue.prototype.$userAPI = userAPI;
Vue.prototype.$todoAPI = todoAPI;

declare module "vue/types/vue" {
  interface Vue {
    $userAPI: AxiosInstance;
    $todoAPI: AxiosInstance;
    currentUser: User;
  }
}

new Vue({
  store,
  router,
  vuetify,
  render: (h) => h(App)
}).$mount("#app");
