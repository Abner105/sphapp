// 封装axios，并设置拦截器
import axios from "axios";
// 引入进度条与样式
import nprogress from "nprogress";
import "nprogress/nprogress.css"
// 引入detail仓库中的uuid
import detail from "@/store/detail"

const requests = axios.create({
  // 配置信息
  baseURL:"http://39.98.123.211/api"  ,
  timeout:5000
})
// 请求拦截
requests.interceptors.request.use((config)=>{
  // 请求加载进度条
  nprogress.start()
  // 请求头添加uuid(游客id)
  config.headers.userTempId = detail.state.uuid_token
  return config
},err=>err)
// 响应拦截
requests.interceptors.response.use((res)=>{
  nprogress.done()
  return res.data
})
export default requests