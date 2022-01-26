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