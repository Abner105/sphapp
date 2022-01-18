<template>
  <div>
    <type-nav />
    <div class="main">
      <div class="py-container">
        <Bread />
        <!--selector-->
        <SearchSelector />
        <Detail />
      </div>
    </div>
  </div>
</template>
</template>

<script>
import SearchSelector from "./SearchSelector/SearchSelector";
import Detail from "./Detail/Detail.vue";
import Bread from "./Bread/Bread.vue";
import { mapState } from "vuex";
export default {
  name: "Search",
  data() {
    return {
      searchParams: {
        category1Id: "",
        category2Id: "",
        category3Id: "",
        categoryName: "",
        keyword: "",
        order: "",
        pageNo: 1,
        pageSize: 10,
        props: [],
        trademark: "",
      },
    };
  },
  components: {
    SearchSelector,
    Detail,
    Bread,
  },
  // beforeMount() {
  //   Object.assign(this.searchParams, this.$route.params, this.$route.query);
  //   // console.log(this.searchParams);
  // },
  // mounted() {
  //   this.$store.dispatch("getSearchInfo", this.searchParams);
  // },
  computed: {
    ...mapState({
      searchInfo: (state) => state.search.searchInfo,
    }),
  },
  watch: {
    // 监听路由发生变化时，就合并参数，并发送请求，获取商品信息
    $route: {
      handler(newVal, old) {
        console.log('1111')
        Object.assign(this.searchParams, newVal.params, newVal.query);
        this.$store.dispatch("getSearchInfo", this.searchParams);
        this.searchParams.category1Id = "";
        this.searchParams.category2Id = "";
        this.searchParams.category3Id = "";
      },
      immediate: true,
    },
  },
};
</script>

<style lang="less" scoped>
.main {
  margin: 10px 0;

  .py-container {
    width: 1200px;
    margin: 0 auto;
  }
}
</style>