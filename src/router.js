import Vue from "vue";
import Router from "vue-router";

import App from "./App.vue";
import Spider from "./views/Spider.vue";
import Klondike from "./views/Klondike.vue";

Vue.use(Router);

let router = new Router({
  mode: "history",
  routes: [
    {
      path: "/",
      name: "App",
      component: App,
      children: [
        {
          path: "/",
          name: "Spider",
          component: Spider,
          props: {
            gameMode: "1"
          }
        },
        {
          path: "/spider/2",
          name: "Spider",
          component: Spider,
          props: {
            gameMode: "2"
          }
        },
        {
          path: "/klondike",
          name: "Klondike",
          component: Klondike
        }
      ]
    },
    {
      path: "*",
      redirect: "/spider/1"
    }
  ]
});

export default router;
