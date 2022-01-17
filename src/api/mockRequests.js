// 封装axios，并设置拦截器
import axios from "axios";
// 引入进度条与样式
import nprogress from "nprogress";
import "nprogress/nprogress.css"

const mockRequests = axios.create({
  // 配置信息
  baseURL:"/mock"  ,
  timeout:5000
})
// 请求拦截
mockRequests.interceptors.request.use((config)=>{
  nprogress.start()
  return config
},err=>err)
// 响应拦截
mockRequests.interceptors.response.use((res)=>{
  nprogress.done()
  return res.data
})
export default mockRequests