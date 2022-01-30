import { getCart , delGood, checkCart} from "@/api"
const state={
  cartList : []
}
const mutations={
  GETCARTLIST(state,res){
    state.cartList = res.cartInfoList || []
  }
}
const getters = {

}
const actions = {
  // 获取购物车商品数据
  async getCartList({commit}){
    const res = await getCart()
    if (res.code == 200){
      commit("GETCARTLIST",res.data[0] || {})
    }
  },
  // 删除购物车单个商品
  async delGoodOne(context,skuId){
    let res= await delGood(skuId)
    if (res.code==200) {
      return res.data
    }else{
      return Promise.reject("删除购物车商品失败"+skuId)
    }
  },
  // 删除所有商品
  delGoodAll({dispatch,state}){
    let promiseList = []
    state.cartList.forEach(item => {
      if (item.isChecked){
        promiseList.push(dispatch("delGoodOne",item.skuId)) 
      }
    });
    return Promise.all(promiseList)
  },
  // 改变单个商品的选中状态
  async checkCartOne(context,{skuId,isChecked}){
    let res = await checkCart(skuId,isChecked)
    if (res.code==200){
      return res.data
    }else{
      return Promise.reject("修改购物车商品选中状态失败"+skuId)
    }
  },
  // 全选或全不选操作
  checkCartAll({dispatch,state},allCheck){
    let promiseList = []
    state.cartList.forEach(item=>{
      if (item.isChecked != allCheck){
        promiseList.push(dispatch("checkCartOne",{skuId:item.skuId,isChecked:allCheck})) 
      }
    })
    return Promise.all(promiseList)
  }
}
export default {
  state,
  mutations,
  getters,
  actions
}