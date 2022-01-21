import Vue from 'vue'
import App from './App.vue'
import router from "@/router"
import store from "@/store"
import TypeNav from"./components/TypeNav/TypeNav.vue"
import Carousel from "@/components/Carousel/Carousel.vue"
import Pagination from "@/components/Pagination/Pagination.vue"
import "@/mock/mackServe.js"
import 'swiper/css/swiper.css'
// 注册全局组件
Vue.component("TypeNav",TypeNav)
Vue.component("Carousel",Carousel)
Vue.component("Pagination",Pagination)

// 阻止启动生产消息
Vue.config.productionTip = false

new Vue({
  render: h => h(App),
  router,
  store,
  beforeCreate(){
    // 配置事件总线
    Vue.prototype.$bus = this
  }
}).$mount('#app')
