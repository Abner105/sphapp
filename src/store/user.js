import { getCode, register, login, getUserInfo, logOut } from "@/api"
const state = {
  token: localStorage.getItem("TOKEN") || sessionStorage.getItem("TOKEN"),
  userInfo: {}
}
const mutations = {
  // 修改token
  UPDATETOKEN(state, res) {
    state.token = res
  },
  // 用户信息
  GETUSER(state, res) {
    state.userInfo = res
  },
  // 退出登录，清空用户信息与token
  LOGOUTUSER() {
    state.userInfo = {}
    state.token = ""
  }
}
const actions = {
  // 获取验证码
  async getUserCode(context, phone) {
    let res = await getCode(phone)
    if (res.code == 200) {
      return res.data
    }
  },
  // 提交注册
  async registerUser(context, data) {
    let res = await register(data)
    if (res.code == 200) {
      return res.data
    } else {
      console.log(res.message)
      return Promise.reject(res.message)
    }
  },
  // 登录
  async loginUser({ commit }, { phone, password, isAuto }) {
    let res = await login({ phone, password })
    if (res.code == 200) {
      // 保存token到sessionStorage中
      // 是否自动登录，自动登录存本地缓存,非自动登录存session缓存
      if (isAuto) {
        localStorage.setItem("TOKEN", res.data.token)
      } else {
        sessionStorage.setItem("TOKEN", res.data.token)
      }
      commit("UPDATETOKEN", res.data.token)
      return res.data
    } else {
      return Promise.reject(res.message)
    }
  },
  // 获取用户信息
  async getUser({ commit }) {
    let res = await getUserInfo()
    if (res.code == 200) {
      commit("GETUSER", res.data)
      return res.data
    } else {
      return Promise.reject(res.message)
    }
  },
  // 退出登录
  async logOutUser({ commit }) {
    let res = await logOut()
    if (res.code == 200) {
      // 清空会话存储的token 与用户信息
      sessionStorage.removeItem("TOKEN")
      localStorage.removeItem("TOKEN")
      commit("LOGOUTUSER")
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