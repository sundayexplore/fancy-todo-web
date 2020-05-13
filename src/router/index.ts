/* eslint-disable */

import Vue from "vue";
import VueRouter from "vue-router";

import { HomePage, AboutPage, Dashboard } from "@/views";
import { SignInForm, SignUpForm } from "@/components";
import Store from "@/store";
import { userAPI } from "@/utils";

Vue.use(VueRouter);

const beforeEnter = async (to: any, from: any, next: any) => {
  try {
    const { data } = await userAPI.get("/sync");
    Store.dispatch("sync", data);
    next({ path: from.path });
  } catch (err) {
    Store.dispatch("setGeneralError", err.response.data.message);
    next();
  }
};

const beforeEnterGeneral = async (to: any, from: any, next: any) => {
  try {
    const { data } = await userAPI.get("/sync");
    Store.dispatch("sync", data);
    next({ name: "Dashboard" });
  } catch (err) {
    Store.dispatch("setGeneralError", err.response.data.message);
    next();
  }
};

const routes = [
  {
    path: "/",
    name: "Home",
    component: HomePage,
    meta: {
      title: "Home"
    },
    beforeEnter: beforeEnterGeneral
  },
  {
    path: "/about",
    name: "About",
    component: AboutPage,
    meta: {
      title: "About"
    },
    beforeEnter: beforeEnterGeneral
  },
  {
    path: "/signin",
    name: "SignIn",
    component: SignInForm,
    meta: {
      title: "Sign In"
    },
    beforeEnter
  },
  {
    path: "/signup",
    name: "SignUp",
    component: SignUpForm,
    meta: {
      title: "Sign Up"
    },
    beforeEnter
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

router.beforeEach(async (to: any, from: any, next: any) => {
  if (to.matched.some((record: any) => record.meta.requiresAuth)) {
    try {
      const { data } = await userAPI.get("/sync");
      Store.dispatch("sync", data);
      next();
    } catch (err) {
      Store.dispatch("setGeneralError", err.response.data.message);
      next({ name: "SignIn" });
    }
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
