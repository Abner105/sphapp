import requests from "./requests";
import mockRequests from "./mockRequests";

// 获取三级菜单数据
export const getTypeNav = ()=> requests({url:"/product/getBaseCategoryList",method:"get"})
// 利用mock获取banner图
export const getBanner = ()=>mockRequests({url:"/banner",method:"get"})
// 获取floor数据
export const getFloor = ()=>mockRequests({url:"/floor",method:"GET"})
// 获取搜索页面的数据
export const getSearch = (params)=>requests({url:"/list",method:"POST",data:params})
// 获取商品详情页信息
export const getGood = (skuId)=>requests({url:`/item/${skuId}`,method:"GET"})
// 添加商品到购物车
export const addCart = (skuId,skuNum)=>requests({url:`/cart/addToCart/${skuId}/${skuNum}`,method:"post"})
// 获取购物车数据
export const getCart =()=>requests({url:"/cart/cartList",method:"GET"})
// 删除购物车数据
export const delGood=(skuId)=>requests({url:`/cart/deleteCart/${skuId}`,method:"delete"})
// 改变产品的勾选状态/api/cart/checkCart/{skuID}/{isChecked}
export const checkCart = (skuId,isChecked)=>requests({url:`/cart/checkCart/${skuId}/${isChecked}`,method:"get"})
// 获取验证码
export const getCode = (phone)=>requests({url:`/user/passport/sendCode/${phone}`,method:"get"})
// 提交注册
export const register = (data)=>requests({url:"/user/passport/register",method:"post",data})
// 登录
export const login = (data)=>requests({url:"/user/passport/login",method:"post",data})
// 使用token 获取用户信息http://182.92.128.115/api/user/passport/auth/getUserInfo
export const getUserInfo = ()=>requests({url:"/user/passport/auth/getUserInfo",method:"get"})
// 退出登录
export const logOut = ()=>requests({url:"/user/passport/logout",method:"get"})
// 获取地址信息
export const getAddress=()=>requests({url:"/user/userAddress/auth/findUserAddressList",method:"get"})
// 获取商品清单
export const getOrder=()=>requests({url:"/order/auth/trade",method:"get"})
// 提交订单
export const submit=(tradeNo,data)=>requests({url:`/order/auth/submitOrder?tradeNo=${tradeNo}`,method:"post",data})
// 获取订单页支付信息
export const getPay=(orderId)=>requests({url:`/payment/weixin/createNative/${orderId}`,method:"get"})
// 获取订单支付状态
export const getStatus=(orderId)=>requests({url:`/payment/weixin/queryPayStatus/${orderId}`,method:"get"})
// 获取我的订单详情
export const getCenter=(page,limit)=>requests({url:`/order/auth/${page}/${limit}`,method:"get"})

