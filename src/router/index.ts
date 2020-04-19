import Vue from "vue";
import VueRouter from "vue-router";

import { HomePage, AboutPage, Dashboard } from "@/views";
import { SignInForm, SignUpForm, TodoList } from "@/components";
import { userAPI } from "@/utils";

Vue.use(VueRouter);

const beforeEnter = async (to: any, from: any, next: any) => {
  const token = localStorage.getItem("token");
  if (token) {
    try {
      await userAPI.get("/check", { headers: { token } });
      next({ path: from.path });
    } catch (err) {
      console.log(err.response);
    }
  } else {
    next();
  }
};

const routes = [
  {
    path: "/",
    name: "Home",
    component: HomePage
  },
  {
    path: "/about",
    name: "About",
    component: AboutPage
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
      title: "User"
    },
    children: [
      {
        path: "todos",
        name: "TodoList",
        component: TodoList,
        meta: {
          requiresAuth: true,
          title: "Todo List"
        }
      }
    ]
  }
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes
});

router.beforeEach( async (to, from, next) => {
  const token = localStorage.getItem("token");
  if (to.matched.some(record => record.meta.requiresAuth)) {
    if (token) {
      try {
        const { data } = await userAPI.get("/check", { headers: { token } });
        console.log(data.message);
        next();
      } catch (err) {
        console.log(err.response);
      }
    } else {
      next({ name: "SignIn" });
    }
  } else {
    next();
  }
});

export default router;
