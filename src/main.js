import Vue from 'vue'
import App from './App.vue'
import router from "@/router"
import store from "@/store"
import TypeNav from "./components/TypeNav/TypeNav.vue"
import Carousel from "@/components/Carousel/Carousel.vue"
import Pagination from "@/components/Pagination/Pagination.vue"
// 表单验证
import "@/utils/validate"
// 引入自定义的toast插件
import Toast from "@/components/Toast/index"
Vue.use(Toast)
//elementui的弹窗组件,表单组件
import {
  MessageBox
} from 'element-ui';
// Vue.use(Form)
// Vue.use(FormItem)
// Vue.use(Checkbox)
// import ElementUI from 'element-ui';
// import 'element-ui/lib/theme-chalk/index.css';
// Vue.use(ElementUI);



import * as API from "@/api"
import "@/mock/mackServe.js"
import 'swiper/css/swiper.css'
// 注册全局组件
Vue.component("TypeNav", TypeNav)
Vue.component("Carousel", Carousel)
Vue.component("Pagination", Pagination)

// 阻止启动生产消息
Vue.config.productionTip = false
// 弹窗组件
Vue.prototype.$msgbox = MessageBox;
Vue.prototype.$alert = MessageBox.alert;
// 图片懒加载
import VueLazyload from 'vue-lazyload'

// 使用图片懒加载插件
Vue.use(VueLazyload, {
  // 设置图片还未加载时的占位图
  loading: require('./assets/images/loading.gif'),
  // 加载失败时的图片
  error: require('./assets/images/fail.jpeg')
})

new Vue({
  render: h => h(App),
  router,
  store,
  beforeCreate() {
    // 配置事件总线
    Vue.prototype.$bus = this
    // 配置接口总线
    Vue.prototype.$API = API
  }
}).$mount('#app')
