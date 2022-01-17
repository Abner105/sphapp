// 封装axios，并设置拦截器
import axios from "axios";
// 引入进度条与样式
import nprogress from "nprogress";
import "nprogress/nprogress.css"

const requests = axios.create({
  // 配置信息
  baseURL:"http://39.98.123.211/api"  ,
  timeout:5000
})
// 请求拦截
requests.interceptors.request.use((config)=>{
  nprogress.start()
  return config
},err=>err)
// 响应拦截
requests.interceptors.response.use((res)=>{
  nprogress.done()
  return res.data
})
export default requests