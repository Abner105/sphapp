import { getAddress, getOrder } from "@/api/index"
const state = {
  addressList: [],
  orderInfo: {}
}
const mutations = {
  GETADDRESSLIST(state, res) {
    state.addressList = res
  },
  GETORDERINFO(state, res) {
    state.orderInfo = res
  }
}
const actions = {
  // 获取地址列表
  async getAddressList({ commit }) {
    let res = await getAddress()
    if (res.code == 200) {
      commit("GETADDRESSLIST", res.data)
    }
  },
  // 获取商品清单列表
  async getOrderInfo({ commit }) {
    let res = await getOrder()
    if (res.code == 200) {
      commit("GETORDERINFO", res.data)
    }
  }
}
const getters = {

}
export default {
  state,
  mutations,
  getters,
  actions
}