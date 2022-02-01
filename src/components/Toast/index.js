import Toast from "./Toast.vue"
const obj={}
obj.install = function(Vue){
  // 创建组件构造器
  const ToastConstructor = Vue.extend(Toast)
  // 实例化
  const toast = new ToastConstructor()
  // 挂载到div上
  toast.$mount(document.createElement("div"))
  // 挂载到body上
  document.body.appendChild(toast.$el)
  // 在vue原型上添加toast对象
  Vue.prototype.$toast = toast
}
export default obj