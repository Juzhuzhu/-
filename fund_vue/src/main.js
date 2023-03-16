import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import axios from "axios";
import VueAxios from "vue-axios";
import * as echarts from 'echarts'

Vue.config.productionTip = false
Vue.prototype.$echarts = echarts
Vue.use(ElementUI);
Vue.use(VueAxios, axios)
Vue.prototype.$axios = axios //把axios挂载到vue的原型中，在vue中每个组件都可以使用axios发送请求
// Vue.prototype.HOME = '/api' //重要在于这里，Vue.prototype.HOME = '/api'是一个定值，默认指向localhost，所有修改指向路径为'/api'，配置文件index.js定义的可跨域路径
// 注意 在配置后一定要更改此处 否则跨域不生效


new Vue({
    router,
    store,
    render: h => h(App)
}).$mount('#app')
