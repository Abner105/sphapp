import { getCart } from "@/api"
const state={
  cartList : []
}
const mutations={
  GETCARTLIST(state,res){
    state.cartList = res || []
  }
}
const getters = {

}
const actions = {
  async getCartList({commit}){
    const res = await getCart()
    if (res.code == 200){
      if (res.data[0]){
        commit("GETCARTLIST",res.data[0].cartInfoList)
      }
    }
  }
}
export default {
  state,
  mutations,
  getters,
  actions
}