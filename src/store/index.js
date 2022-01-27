import Vuex from "vuex";
import Vue from "vue";
import home from "./home.js"
import search from "./search.js"
import detail from "./detail"
import shopCart from "./shopCart"
Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    search,
    home,
    detail,
    shopCart
  }
})