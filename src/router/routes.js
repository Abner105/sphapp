
// 使用懒加载引入组件
const Home = () => import("@/pages/Home")
const Login = () => import("@/pages/Login")
const Register = () => import("@/pages/Register")
const Search = () => import("@/pages/Search")
const GoodDetail = ()=>import("@/pages/GoodDetail/GoodDetail.vue")
const AddCartSuccess = ()=>import("@/pages/AddCartSuccess/AddCartSuccess.vue")
const ShopCart=()=>import("@/pages/ShopCart/ShopCart.vue")
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
  },
  {
    path:"/detail/:skuid?",
    component:GoodDetail,
    meta:{show:true},
    name:"detail"
  },
  {
    path:"/addcartsuccess",
    component:AddCartSuccess,
    meta:{show:true},
  },
  {
    path:"/shopcart",
    component:ShopCart,
    meta:{show:true},
  }
]
export default routes