import { getGood,addCart } from "@/api"
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
  },
  //添加商品到购物车
  async addShopCart(context,{skuId,skuNum}){
    const res = await addCart(skuId,skuNum)
    // console.log(res)
    if (res.code==200){
      return "添加购物车成功"
    }else{
      return Promise.reject("添加购物车失败")
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