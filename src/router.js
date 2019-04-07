import Vue from "vue";
import Router from "vue-router";

import App from "./App.vue";

import Menu from "./views/Menu.vue";
import Spider from "./views/Spider.vue";
import Klondike from "./views/Klondike.vue";

Vue.use(Router);

let router = new Router({
  mode: "history",
  routes: [
    {
      path: "/",
      component: App,
      children: [
        {
          path: "/",
          name: "Menu",
          component: Menu
        },
        {
          path: "/spider/1",
          name: "Spider1Suit",
          component: Spider,
          props: {
            gameMode: "1"
          }
        },
        {
          path: "/spider/2",
          name: "Spider4Suit",
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
      redirect: "/"
    }
  ]
});

export default router;
