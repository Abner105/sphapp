<template>
  <div>
    Search
    <div>params:{{$route.params.keyword}}==={{keyword}}==={{a}}</div>
    <div>query:{{$route.query.k}}===={{k}}</div>

  </div>
</template>

<script>
export default {
  name:"Search",
  // props可以接收路由传参，前提需要配置路由的props
  props:["keyword","a","k"]
};
</script>

<style scoped lang="less">
</style>