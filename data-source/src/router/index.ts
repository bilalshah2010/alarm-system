import Vue from "vue";
import VueRouter, { RouteConfig } from "vue-router";
import Companies from "@/views/Companies/";
import Feed from "@/views/Feed";
import ErrorPage from "@/views/ErrorPage";
import NotFoundPage from "@/views/NotFoundPage";

Vue.use(VueRouter);

const routes: Array<RouteConfig> = [
  {
    path: "/",
    name: "Companies",
    component: Companies
  },
  {
    path: "/feed",
    name: "Feed",
    component: Feed
  },
  {
    path: "/error-page",
    name: "ErrorPage",
    component: ErrorPage
  },
  {
    path: "*",
    name: "NotFound",
    component: NotFoundPage
  }
];

const router = new VueRouter({
  routes
});

export default router;
