import ElementUI from "element-ui";

import "../theme/index.css";
import App from "./App";
import router from "./router";
import store from "./store";

Vue.config.productionTip = false;
Vue.use(ElementUI);
window.vm = new Vue({
  el: "#app",
  router,
  store,
  components: { App },
  template: "<App/>"
});
