
import Vue from "vue"
import VueRouter from "vue-router"
import routes from "./routes"
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


export default new VueRouter({
  routes,
  mode:"history",
  // 路由跳转后，自动定位到最顶部
  scrollBehavior(to,from,savedPosition){
    // console.log(to,from,savedPosition)
    return {x:0,y:0}
  }
})