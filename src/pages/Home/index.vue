<template>
  <div>
    <TypeNav />
    <list-container :bannerList="bannerList" />
    <Recommend />
    <Rank />
    <Like />
    <floor v-for="(floor, index) in floorList" :key="floor.id" :list="floor" />
    <brand />
  </div>
</template>

<script>
import Rank from "./Rank/Rank.vue";
import ListContainer from "./ListContainer/ListContainer.vue";
import Recommend from "./Recommend/Recommend.vue";
import Like from "./Like/Like.vue";
import Floor from "./Floor/Floor.vue";
import Brand from "./Brand/Brand.vue";
import { mapState } from "vuex";
export default {
  name: "Home",
  components: { ListContainer, Recommend, Rank, Like, Floor, Brand },
  mounted() {
    // 挂载完后获取banner和floor，提醒仓库获取
    this.$store.dispatch("getBannerlist");
    // 提醒仓库获取floor数据
    this.$store.dispatch("getFloorList");
  },
  computed: {
    ...mapState({
      floorList: (state) => state.home.floorList,
      bannerList: (state) => state.home.bannerList,
    }),
  },
};
</script>

<style scoped lang="less">
</style>