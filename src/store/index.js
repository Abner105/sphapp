import Vuex from "vuex";
import Vue from "vue";
import home from "./home.js"
import search from "./search.js"
import detail from "./detail"
Vue.use(Vuex)

export default new Vuex.Store({
  modules:{
    search,
    home,
    detail
  }
})