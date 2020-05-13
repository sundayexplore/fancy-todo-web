/* eslint-disable */

import Vue from "vue";
import VueRouter from "vue-router";
import { AxiosResponse } from "axios";

import { HomePage, AboutPage, Dashboard } from "@/views";
import { SignInForm, SignUpForm } from "@/components";
import Store from "@/store";
import { userAPI } from "@/utils";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Home",
    component: HomePage,
    meta: {
      title: "Home"
    }
  },
  {
    path: "/about",
    name: "About",
    component: AboutPage,
    meta: {
      title: "About"
    }
  },
  {
    path: "/signin",
    name: "SignIn",
    component: SignInForm,
    meta: {
      title: "Sign In"
    }
  },
  {
    path: "/signup",
    name: "SignUp",
    component: SignUpForm,
    meta: {
      title: "Sign Up"
    }
  },
  {
    path: "/dashboard",
    name: "Dashboard",
    component: Dashboard,
    props: true,
    meta: {
      requiresAuth: true
    }
  }
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes
});

router.beforeEach(async (to, from, next) => {
  if (to.matched.some((record) => record.meta.requiresAuth)) {
    if (localStorage.getItem("user")) {
      Store.commit("SET_LOADING", true);
      try {
        const { data } = await userAPI.get("/sync");
        Store.dispatch("sync", data);
        Store.commit("SET_LOADING", false);
        next();
      } catch (err) {
        if (err.response.status == 401) {
          userAPI
            .post("/refresh")
            .then(() => {
              return userAPI.get("/sync");
            })
            .then((res: AxiosResponse) => {
              Store.dispatch("sync", res.data);
              Store.commit("SET_LOADING", false);
              next();
            })
            .catch(() => {
              const errMessage =
                "You are not signed in, please sign in again to continue!";
              Store.dispatch("setGeneralSnackbar", {
                event: "open",
                type: "info",
                message: errMessage
              });
              userAPI
                .post("/signout")
                .then()
                .catch();
              Store.dispatch("signOut");
              Store.commit("SET_LOADING", false);
              next({ path: "/signin" });
            });
        } else if (err.response.status == 500) {
          Store.dispatch("setGeneralSnackbar", {
            event: "open",
            message: err.response.data.message,
            type: "error"
          });
          Store.commit("SET_LOADING", false);
          next();
        }
      }
    } else {
      next({ path: "/signin" });
    }
  } else if (localStorage.getItem("user")) {
    next({ path: "/dashboard" });
  } else {
    next();
  }
});

router.beforeEach((to: any, from: any, next: any) => {
  if (to.matched.some((record: any) => record.meta.title)) {
    document.title = `${to.meta.title} | Fancy Todo`;
    next();
  } else {
    document.title = "Fancy Todo";
    next();
  }
});

export default router;
