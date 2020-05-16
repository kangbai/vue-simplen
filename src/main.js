import Vue from 'vue'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import locale from 'element-ui/lib/locale/lang/en'
import App from './App.vue'
import router from './router/router'
import httpService from './utils/httpService'

Vue.use(ElementUI, { locale });
Vue.config.productionTip = false
Vue.prototype.$httpService = httpService // 挂在vue原型上

require('./utils/mock');

new Vue({
  router,
  render: h => h(App),
}).$mount('#app')
