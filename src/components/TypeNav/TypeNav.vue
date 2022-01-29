<template>
  <!-- 商品分类导航 -->
  <div class="type-nav">
    <div class="container" @mouseleave="leaveContainer">
      <h2 class="all" @mouseenter="enterContainer">全部商品分类</h2>
      <nav class="nav">
        <a href="###">服装城</a>
        <a href="###">美妆馆</a>
        <a href="###">尚品汇超市</a>
        <a href="###">全球购</a>
        <a href="###">闪购</a>
        <a href="###">团购</a>
        <a href="###">有趣</a>
        <a href="###">秒杀</a>
      </nav>

      <div class="sort">
        <!-- 增加动画效果 -->
        <transition name="sort">
          <div class="all-sort-list2" @click="searchGoods" v-show="isShow">
            <div
              class="item"
              v-for="(c1, index) in typeNavList"
              :key="c1.categoryId"
            >
              <h3>
                <a
                  :data-category1-id="c1.categoryId"
                  :data-category-name="c1.categoryName"
                  >{{ c1.categoryName }}</a
                >
              </h3>
              <div class="item-list clearfix">
                <div class="subitem">
                  <dl
                    class="fore"
                    v-for="(c2, index) in c1.categoryChild"
                    :key="c2.categoryId"
                  >
                    <dt>
                      <a
                        :data-category2-id="c2.categoryId"
                        :data-category-name="c2.categoryName"
                        >{{ c2.categoryName }}</a
                      >
                    </dt>
                    <dd>
                      <em
                        v-for="(c3, index) in c2.categoryChild"
                        :key="c3.categoryId"
                      >
                        <a
                          :data-category3-id="c3.categoryId"
                          :data-category-name="c3.categoryName"
                          >{{ c3.categoryName }}</a
                        >
                      </em>
                    </dd>
                  </dl>
                </div>
              </div>
            </div>
          </div>
        </transition>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";
export default {
  name: "TypeNav",
  data() {
    return {
      isShow: true,
    };
  },
  mounted() {
    // 挂载的时候判断path是不是home，不是home不现实二级目录
    if (this.$route.path !== "/home") {
      this.isShow = false;
    }
  },
  computed: {
    // 获取home仓库的数据
    ...mapState({
      // 只要调用改计算属性，就会指向后面的回调
      typeNavList: (state) => {
        return state.home.typeNavList;
      },
    }),
  },
  methods: {
    // 点击分类的三级标签跳转到search页面，并传参
    // 利用事件的委派，将click绑定在父元素上，性能优化
    searchGoods(event) {
      const { categoryName, category1Id, category2Id, category3Id } =
        event.target.dataset;
      if (categoryName) {
        const location = {
          name: "search",
        };
        const query = {
          categoryName,
        };
        if (category1Id) {
          query.category1Id = category1Id;
        } else if (category2Id) {
          query.category2Id = category2Id;
        } else {
          query.category3Id = category3Id;
        }
        // 合并params参数
        if (this.$route.params) {
          location.params = this.$route.params;
        }
        location.query = query;
        // console.log(location)
        this.$router.push(location);
      }
    },
    // 在非首页，鼠标进入或离开全部商品分类，展示或隐藏列表
    enterContainer() {
      if (this.$route.path !== "/home") {
        this.isShow = true;
      }
    },
    leaveContainer() {
      if (this.$route.path !== "/home") {
        this.isShow = false;
      }
    },
  },
};
</script>

<style scoped lang="less">
.type-nav {
  border-bottom: 2px solid #e1251b;

  .container {
    width: 1200px;
    margin: 0 auto;
    display: flex;
    position: relative;

    .all {
      width: 210px;
      height: 45px;
      background-color: #e1251b;
      line-height: 45px;
      text-align: center;
      color: #fff;
      font-size: 14px;
      font-weight: bold;
    }

    .nav {
      a {
        height: 45px;
        margin: 0 22px;
        line-height: 45px;
        font-size: 16px;
        color: #333;
      }
    }

    .sort-enter,
    .sort-leave-to {
      height: 0;
    }
    .sort-enter-to,
    .sort-leave {
      height: 461px;
    }
    .sort {
      position: absolute;
      left: 0;
      top: 45px;
      width: 210px;
      position: absolute;
      background: #fafafa;
      z-index: 999;

      .all-sort-list2 {
        transition: all 0.3s linear;
        overflow: hidden;
        .item:hover {
          background-color: rgb(255, 73, 103);
        }
        .item {
          h3 {
            line-height: 30px;
            font-size: 14px;
            font-weight: 400;
            overflow: hidden;
            padding: 0 20px;
            margin: 0;

            a {
              display: inline-block;
              width: 100%;
              height: 100%;
              color: #333;
            }
          }

          .item-list {
            display: none;
            position: absolute;
            width: 734px;
            min-height: 460px;
            background: #f7f7f7;
            left: 210px;
            border: 1px solid #ddd;
            top: 0;
            z-index: 9999 !important;

            .subitem {
              float: left;
              width: 650px;
              padding: 0 4px 0 8px;

              dl {
                border-top: 1px solid #eee;
                padding: 6px 0;
                overflow: hidden;
                zoom: 1;

                &.fore {
                  border-top: 0;
                }

                dt {
                  float: left;
                  width: 54px;
                  line-height: 22px;
                  text-align: right;
                  padding: 3px 6px 0 0;
                  font-weight: 700;
                }

                dd {
                  float: left;
                  width: 415px;
                  padding: 3px 0 0;
                  overflow: hidden;

                  em {
                    float: left;
                    height: 14px;
                    line-height: 14px;
                    padding: 0 8px;
                    margin-top: 5px;
                    border-left: 1px solid #ccc;
                  }
                }
              }
            }
          }

          &:hover {
            .item-list {
              display: block;
            }
          }
        }
      }
    }
  }
}
</style>