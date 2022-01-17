import { getBanner, getFloor, getTypeNav } from "@/api/index.js"

const state = {
  // 三级分类数据
  typeNavList: [],
  // 轮播图
  bannerList: [],
  // floor数据
  floorList:[]
}
const mutations = {
  // 修改三级分类的数据
  GETTYPENAVLIST(state, res) {
    state.typeNavList = res
  },
  // 修改轮播图数据
  GETBANNERLIST(state, res) {
    state.bannerList = res
  },
  // 修改floor数据
  GETFLOORLIST(state,res){
    state.floorList = res
  }
}

const getters = {}

const actions = {
  // 获取三级分类的数据
  async getTypeNavList({ commit }) {
    const res = await getTypeNav()
    // console.log(res)
    if (res.code == 200) {
      commit("GETTYPENAVLIST", res.data)
    }
  },
  // 获取banner图的数据
   async getBannerlist({ commit }) {
    const res = await getBanner()
    // console.log(res)
    if (res.code == 200) {
      commit("GETBANNERLIST", res.data)
    }
  },
  // 获取floor数据
  async getFloorList({commit}){
    const res = await getFloor()
    console.log(res)
    if (res.code == 200){
      commit("GETFLOORLIST",res.data)
    }
  }
}
export default {
  state,
  mutations,
  getters,
  actions
}