import Vue from 'vue'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import App from './App.vue'
import router from './router/router'
import httpService from './utils/httpService'
import store from './store'

Vue.use(ElementUI);
Vue.config.productionTip = false
Vue.prototype.$httpService = httpService // 挂在vue原型上

if (process.env.NODE_ENV != 'production') { // 根据环境来开启mock服务
  require('./utils/mock');
}

new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app')
