import requests from "./requests";
import mockRequests from "./mockRequests";

// 获取三级菜单数据
export const getTypeNav = ()=> requests({url:"/product/getBaseCategoryList",method:"get"})
// 利用mock获取banner图
export const getBanner = ()=>mockRequests({url:"/banner",method:"get"})
// 获取floor数据
export const getFloor = ()=>mockRequests({url:"/floor",method:"GET"})