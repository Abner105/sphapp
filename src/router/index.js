
import Vue from "vue"
import VueRouter from "vue-router"
Vue.use(VueRouter)
// 使用懒加载引入组件
const Home = () => import("@/pages/Home")
const Login = () => import("@/pages/Login")
const Register = () => import("@/pages/Register")
const Search = () => import("@/pages/Search")
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
  // 配置路由
  routes: [
    // 路由元数据meta，show用于控制footer组件的显示
    {
      path: '',
      redirect: "/home",
    },
    {
      path: '/home',
      component: Home,
      meta:{show:true}
    },
    {
      path: '/login',
      component: Login,
      meta:{show:false}
    },
    {
      path: '/register',
      component: Register,
      meta:{show:false}
    },
    // 路由传参的两种方式：params（需占位）与query,?表示可选
    {
      path: '/search/:keyword?',
      component: Search,
      name:"search",
      meta:{show:true},
      // 路由传props参数
      // 布尔值写法，只能传递params
      // props:true,
      // 对象写法，传递a
      // props:{a:1}
      // 函数写法，可以传递params与query（常用）
      // props:($route)=>({keyword:$route.params.keyword,k:$route.query.k})
    }
  ],
  mode:"history"
})