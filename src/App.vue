<template>
  <div>
    <Header />
    <!-- <keep-alive> -->
      <router-view />
    <!-- </keep-alive> -->
    <Footer v-show="$route.meta.show" />
  </div>
</template>

<script>
import Header from "./components/header";
import Footer from "./components/footer";

export default {
  name: "App",
  components: {
    Header,
    Footer,
  },
  mounted(){
    // 挂载时提示仓库 请求三级目录的数据，这样只请求一次
    this.$store.dispatch("getTypeNavList");
        // 挂载完后获取banner和floor，提醒仓库获取
    this.$store.dispatch("getBannerlist")
  }
};
</script>

<style>
#nprogress .bar {
  background: rgb(255, 110, 110) !important;
}
</style>
