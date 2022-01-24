import { getGood } from "@/api"
const state={
  goodDetail:{}
}
const mutations ={
  GETGOODDETAIL(state,res){
    state.goodDetail = res
  }
}
const actions={
  async getGoodDetail({commit},skuId){
    const res = await getGood(skuId)
    if (res.code == 200){
      commit("GETGOODDETAIL",res.data)
    }
  }
}
const getters ={
  categoryView(state){
    return state.goodDetail.categoryView || {}
  },
  skuInfo(){
    return state.goodDetail.skuInfo || {}
  },
  spuSaleAttrList(){
    return state.goodDetail.spuSaleAttrList || []
  }
}
export default {
  state,
  mutations,
  getters,
  actions
}