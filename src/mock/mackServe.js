import Mock from "mockjs";
import banner from "./banner.json"
import floor from "./floor.json"

// console.log(banner)
Mock.mock("/mock/banner","get",{code: 200, message: '成功', "data":banner})
Mock.mock("/mock/floor","get",{code: 200, message: '成功', "data":floor})


