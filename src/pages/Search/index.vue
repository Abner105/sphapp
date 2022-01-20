<template>
  <div>
    <type-nav />
    <div class="main">
      <div class="py-container">
        <Bread :breadList="breadList" @delBread="delBread" />
        <!--selector-->
        <SearchSelector @brand="brand" @attr="attr"/>
        <Detail :order="this.searchParams.order"/>
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
        category1Id: undefined,
        category2Id: undefined,
        category3Id: undefined,
        categoryName: undefined,
        keyword: undefined,
        order: "2:asc",
        pageNo: 1,
        pageSize: 10,
        props: [],
        trademark: undefined,
      },
      breadList: [],
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
  methods: {
    // 监听子组件的品牌点击查询时间，改变searchParams
    brand(brand) {
      // 单选
      this.breadList.splice(2, 1, brand.tmName);
      // Object.assign(this.searchParams, {
      //   trademark: `${brand.tmId}:${brand.tmName}`,
      // });
      this.searchParams.trademark = `${brand.tmId}:${brand.tmName}`;
    },
    // 添加属性事件被点击时
    attr(attr,item){
      let props = `${attr.attrId}:${item}:${attr.attrName}`
      // console.log(props)
      if (this.searchParams.props.indexOf(props)==-1){
        this.searchParams.props.push(props)
        this.breadList.push(item)
      }
    },
    // 删除面包屑方法
    delBread(index) {
      switch (index) {
        // 删除关键字
        case 0:
          // 清空路由
          this.searchParams.keyword = undefined;
          if (this.$route.query) {
            this.$router.push({
              name: "search",
              query: this.$route.query,
            });
          } else {
            this.$router.push("/search");
          }
          // 清空header组件的输入框
          this.$bus.$emit("clearInput");
          break;
        // 删除分类
        case 1:
          this.searchParams.categoryName = undefined;
          if (this.$route.params) {
            this.$router.push({
              name: "search",
              params: this.$route.params,
            });
          } else {
            this.$router.push("/search");
          }
          break;
        // 删除品牌
        case 2:
          this.searchParams.trademark = undefined;
          this.breadList.splice(2, 1, undefined);
          break;
        // 删除属性
        default:
          let i = index - 3
          this.breadList.splice(index,1)
          this.searchParams.props.splice(i,1)
          break
      }
    },
  },
  computed: {
    ...mapState({
      searchInfo: (state) => state.search.searchInfo,
    }),
  },
  watch: {
    // 监听路由发生变化时，就合并参数，并发送请求，获取商品信息
    $route: {
      handler(newVal, old) {
        this.searchParams.category1Id = undefined;
        this.searchParams.category2Id = undefined;
        this.searchParams.category3Id = undefined;
        Object.assign(this.searchParams, newVal.params, newVal.query);
        this.breadList.splice(
          0,
          3,
          this.searchParams.keyword,
          this.searchParams.categoryName,
          this.searchParams.trademark && this.searchParams.trademark.split(":")[1]
        );
        console.log(this.breadList)
      },
      immediate: true,
    },
    // searchParams发送变化，就发送请求
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