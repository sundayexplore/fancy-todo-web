import Vue from "vue";
import VueRouter from "vue-router";

import { HomePage, AboutPage, Dashboard } from "@/views";
import { SignInForm, SignUpForm } from "@/components";
import Store from "@/store";
import { userAPI } from "@/utils";

Vue.use(VueRouter);

const beforeEnter = async (to: any, from: any, next: any) => {
  const token = localStorage.getItem("token");
  if (token) {
    try {
      await userAPI.get("/check", { headers: { token } });
      next({ path: from.path });
    } catch (err) {
      Store.commit("setGeneralError", err.response.data.message);
    }
  } else {
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
    path: "/:username",
    name: "Dashboard",
    component: Dashboard,
    props: true,
    meta: {
      requiresAuth: true,
      title: (route: any) => route.params.username
    }
  }
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes
});

router.beforeEach(async (to: any, from: any, next: any) => {
  const token = localStorage.getItem("token");
  if (to.matched.some((record: any) => record.meta.requiresAuth)) {
    if (token) {
      try {
        await userAPI.get("/check", { headers: { token } });
        next();
      } catch (err) {
        Store.commit("setGeneralError", err.response.data.message);
        next({ name: "SignIn" });
      }
    } else {
      next({ name: "SignIn" });
    }
  } else {
    next();
  }
});

router.beforeEach((to: any, from: any, next: any) => {
  document.title = `${to.meta.title} | Fancy Todo` || "Fancy Todo";
  next();
});

export default router;
