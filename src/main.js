import Vue from 'vue'
import App from './App.vue'
import router from "@/router"
import store from "@/store"
import TypeNav from"./components/TypeNav/TypeNav.vue"
import "@/mock/mackServe.js"
import 'swiper/css/swiper.css'
import Carousel from "@/components/Carousel/Carousel.vue"
// 注册全局组件
Vue.component("TypeNav",TypeNav)
Vue.component("Carousel",Carousel)


Vue.config.productionTip = false

new Vue({
  render: h => h(App),
  router,
  store
}).$mount('#app')
