import { getSearch } from "@/api"
const state={
  searchInfo:{}
}
const mutations={
  GETSEARCHINFO(state,res){
    state.searchInfo=res
  }
}
const getters = {
  attrsList(state){
    return state.searchInfo.attrsList || []
  },
  goodsList(state){
    return state.searchInfo.goodsList || []
  },
  trademarkList(state){
    return state.searchInfo.trademarkList || []
  }
}
const actions = {
  async getSearchInfo({commit},params){
    const res = await getSearch(params)
    // console.log(res)
    if (res.code == 200){
      commit("GETSEARCHINFO",res.data)
    }
  }
}
export default {
  state,
  mutations,
  getters,
  actions
}