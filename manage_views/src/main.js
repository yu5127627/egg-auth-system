import Vue from "vue";
import "normalize.css/normalize.css"; // A modern alternative to CSS resets
import "./plugins";
import "./filters";
import "./directive";

import "@/styles/index.scss"; // global css
import "@/assets/icons"; // icon
import "@/permission"; // permission control

import App from "./App";
import store from "./store";
import router from "./router";

Vue.config.productionTip = false;

new Vue({
  el: "#app",
  router,
  store,
  render: h => h(App)
});
