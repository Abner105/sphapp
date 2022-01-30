
import Vue from "vue"
import VueRouter from "vue-router"
import routes from "./routes"
// 引入user信息，包括token，name等
import store from "@/store"
let user = store.state.user
Vue.use(VueRouter)
// 解决NavigationDuplicated报错，多次push或replace到同一路径就会报这个错
const originPush = VueRouter.prototype.push
const originReplace = VueRouter.prototype.replace

// 重写push与replace方法
VueRouter.prototype.push = function(location,resolve,reject){
  if (resolve||reject) return  originPush.call(this,location,resolve,reject)   // 使用call改变this指向，原指向window，现在指向router
  return  originPush.call(this,location).catch(()=>{})
}
VueRouter.prototype.replace = function(location,resolve,reject){
  if (resolve||reject) return  originReplace.call(this,location,resolve,reject)   // 使用call改变this指向，原指向window，现在指向router
  return  originReplace.call(this,location).catch(()=>{})
}

const router =new VueRouter({
  routes,
  mode:"history",
  // 路由跳转后，自动定位到最顶部
  scrollBehavior(to,from,savedPosition){
    // console.log(to,from,savedPosition)
    return {x:0,y:0}
  }
})
// 路由导航首位
router.beforeEach((to,from,next)=>{
  // 已登录情况下，不能再跳转登录和注册页面
  if (user.token){
    if (to.path=="/login" || to.path=="/register"){
      next("/")
    }else{
      if(user.userInfo.name){
        next()
      }else{ // 如果vuex中的name信息不存在，重新获取用户信息
        store.dispatch("getUser").then(()=>{
          next()
        }).catch((err)=>{ // token失效,退出登录，并跳到登录页面
          console.log(err)
          store.dispatch("logOutUser")
          next('/login')
        })
      }
    }
  }else{
    next()
  }
})
export default router 