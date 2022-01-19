<template>
  <div>
    <type-nav />
    <div class="main">
      <div class="py-container">
        <Bread :breadList="breadList" />
        <!--selector-->
        <SearchSelector @brand="brand"/>
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
  //   // let temParams = {};
  //   Object.assign(this.searchParams, this.$route.params, this.$route.query);
  //   // Object.assign(this.searchParams, temParams);
  //   // console.log(temParams);
  // },
  methods:{
    brand(brand){
      this.breadList.splice(2,1,brand)
      console.log(this.breadList)
    }
  },
  computed: {
    ...mapState({
      searchInfo: (state) => state.search.searchInfo,
    }),
    breadList() {
      let list = [this.searchParams.keyword, this.searchParams.categoryName];
      return list;
    },
  },
  watch: {
    // 监听路由发生变化时，就合并参数，并发送请求，获取商品信息
    $route: {
      handler(newVal, old) {
        this.searchParams.category1Id = undefined;
        this.searchParams.category2Id = undefined;
        this.searchParams.category3Id = undefined;
        Object.assign(this.searchParams, newVal.params, newVal.query);
      },
      immediate: true,
    },
    searchParams: {
      handler(newVal, old) {
        // console.log(this.searchParams);
        this.$store.dispatch("getSearchInfo", newVal);
      },
      immediate: true,
      deep: true,
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