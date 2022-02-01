
// 使用懒加载引入组件
const Home = () => import("@/pages/Home")
const Login = () => import("@/pages/Login")
const Register = () => import("@/pages/Register")
const Search = () => import("@/pages/Search")
const GoodDetail = ()=>import("@/pages/GoodDetail/GoodDetail.vue")
const AddCartSuccess = ()=>import("@/pages/AddCartSuccess/AddCartSuccess.vue")
const ShopCart=()=>import("@/pages/ShopCart/ShopCart.vue")
const Trade=()=>import("@/pages/Trade")
const Pay=()=>import("@/pages/Pay")
const PaySuccess=()=>import("@/pages/PaySuccess")
const Center=()=>import("@/pages/Center")
const MyOrder=()=>import("@/pages/Center/children/MyOrder.vue")
const GroupOrder=()=>import("@/pages/Center/children/GroupOrder.vue")

// 配置路由
const routes = [
  // 路由元数据meta，show用于控制footer组件的显示
  {
    path: '',
    redirect: "/home",
  },
  {
    path: '/home',
    component: Home,
    // show 是否展示最下方的floor,canGo 未登录状态是否可以查看
    meta:{show:true,canGo:true}
  },
  {
    path: '/login',
    component: Login,
    meta:{show:false,canGo:true}
  },
  {
    path: '/register',
    component: Register,
    meta:{show:false,canGo:true}
  },
  // 路由传参的两种方式：params（需占位）与query,?表示可选
  {
    path: '/search/:keyword?',
    component: Search,
    name:"search",
    meta:{show:true,canGo:true},
    // 路由传props参数
    // 布尔值写法，只能传递params
    // props:true,
    // 对象写法，传递a
    // props:{a:1}
    // 函数写法，可以传递params与query（常用）
    // props:($route)=>({keyword:$route.params.keyword,k:$route.query.k})
  },
  {
    path:"/detail/:skuid?",
    component:GoodDetail,
    meta:{show:true,canGo:true},
    name:"detail"
  },
  {
    path:"/addcartsuccess",
    component:AddCartSuccess,
    meta:{show:true,canGo:true},
    beforeEnter(to,from,next){
      if(from.name=="detail"){
        next()
      }else{
        next(false)
      }
    }
  },
  {
    path:"/shopcart",
    component:ShopCart,
    meta:{show:true,canGo:true},
  },
  // 提交订单页面
  {
    path:"/trade",
    component:Trade,
    meta:{show:true,canGo:false},
    beforeEnter(to,from,next){
      if(from.path=="/shopcart"){
        next()
      }else{
        next(false)
      }
    }
  },
  {
    path:"/pay",
    component:Pay,
    meta:{show:true,canGo:false},
    beforeEnter(to,from,next){
      if(from.path=="/trade"){
        next()
      }else{
        next(false)
      }
    }
  },
  {
    path:"/paysuccess",
    component:PaySuccess,
    meta:{show:true,canGo:false}
  },
  // 我的订单
  {
    path:"/center",
    component:Center,
    meta:{show:true,canGo:false},
    children:[
      {
        path:"myorder",
        component:MyOrder
      },
      {
        path: "grouporder",
        component:GroupOrder
      },
      {
        path:"",
        redirect:"myorder"
      }
    ]
  },


]
export default routes