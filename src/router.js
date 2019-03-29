import Vue from "vue";
import Router from "vue-router";
import App from "./App.vue";

Vue.use(Router);

export default new Router({
  history: true,
  routes: [
    {
      path: "/",
      name: "solitaire",
      component: App
    }
    // {
    //   path: '/about',
    //   name: 'about',
    //   // route level code-splitting
    //   // this generates a separate chunk (about.[hash].js) for this route
    //   // which is lazy-loaded when the route is visited.
    //   component: () => import(/* webpackChunkName: "about" */ './views/About.vue')
    // }
  ]
});
