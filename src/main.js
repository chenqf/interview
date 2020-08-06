import Vue from "vue";
import Vue2 from "vue/dist/vue.esm";
import App from "./App.vue";
import "./registerServiceWorker";
import router from "./router";
import store from "./store";

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");

Vue2.component("my-component-name", {
  props: ["name-value"],
  template: `<div>--{{nameValue}}--</div>`
});
// new Vue2({
//   data: {
//     a: 1,
//     aB: 10
//   },
//   el: "#app2"
// });
