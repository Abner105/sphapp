import { getGood,addCart } from "@/api"
import {getUUID} from "@/utils/uuid_token"
const state={
  goodDetail:{},
  uuid_token:getUUID()
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
      return res.data
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