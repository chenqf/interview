import Vue from "vue";
import Vue2 from "vue/dist/vue.esm";
import App from "./App.vue";
import "./registerServiceWorker";
import ElementUI from "element-ui";
import "element-ui/lib/theme-chalk/index.css";
import router from "./router";
import store from "./store";
import Block from "./components/cc_block.vue";
import Block1 from "./components/block.vue";

Vue.config.productionTip = false;

Vue.use(ElementUI);

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");

Vue.component("cc-block", Block);
Vue.component("com-block", Block1);
// Vue2.component("my-component-name", {
//   props: ["name-value"],
//   template: `<div>--{{nameValue}}--</div>`
// });
// new Vue2({
//   data: {
//     a: 1,
//     aB: 10
//   },
//   el: "#app2"
// });
