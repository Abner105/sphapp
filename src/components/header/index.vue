<template>
  <header class="header">
    <!-- 头部的第一行 -->
    <div class="top">
      <div class="container">
        <div class="loginList">
          <p>尚品汇欢迎您！</p>
          <p v-if="!username">
            <span>请</span>
            <router-link to="/login">登录</router-link>
            <router-link to="/register" class="register">免费注册</router-link>
          </p>
          <p v-else>
            <span>{{username}} </span>
            <span @click="logOut"> 退出登录</span>
          </p>
        </div>
        <div class="typeList">
          <router-link to="/center">我的订单</router-link>

          <router-link to="/shopcart">我的购物车</router-link>
          <a href="###">我的尚品汇</a>
          <a href="###">尚品汇会员</a>
          <a href="###">企业采购</a>
          <a href="###">关注尚品汇</a>
          <a href="###">合作招商</a>
          <a href="###">商家后台</a>
        </div>
      </div>
    </div>
    <!--头部第二行 搜索区域-->
    <div class="bottom">
      <h1 class="logoArea">
        <router-link class="logo" title="尚品汇" to="/home">
          <img src="./images/logo.png" alt="" />
        </router-link>
      </h1>
      <div class="searchArea">
        <div class="searchForm">
          <input
            type="text"
            id="autocomplete"
            class="input-error input-xxlarge"
            v-model="keyword"
            @keydown.enter="goSearch"
          />
          <button
            class="sui-btn btn-xlarge btn-danger"
            type="button"
            @click="goSearch"
          >
            搜索
          </button>
        </div>
      </div>
    </div>
  </header>
</template>

<script>
import {mapState} from "vuex"
export default {
  name: "Header",
  data() {
    return {
      keyword: "",
    };
  },
  computed:{
    ...mapState({
      username:(state)=>state.user.userInfo.loginName
    })
  },
  mounted() {
    // 监听输入框清除事件
    this.$bus.$on("clearInput", () => {
      this.keyword = "";
    });
  },
  methods: {
    goSearch() {
      // 路由传参：字符串传参
      // this.$router.push("/search/"+this.keyword+"?k="+this.keyword.toUpperCase());
      // 模板字符串传参
      // this.$router.push(`/search/${this.keyword}?k=${this.keyword.toUpperCase()}`)
      // 配置传参，需要改路由名称,
      this.keyword = this.keyword.trim();
      const location = {
        name: "search",
        params: {
          keyword: this.keyword || undefined, // 路由传参如果是空串会导致路径缺失，兼任处理
        },
      };
      if (this.$route.query) {
        location.query = this.$route.query;
      }

      this.$router.push(location);
    },
    // 退出登录
    logOut(){
      this.$store.dispatch("logOutUser")
    }
  },
};
</script>

<style scoped lang="less">
.header {
  & > .top {
    background-color: #eaeaea;
    height: 30px;
    line-height: 30px;

    .container {
      width: 1200px;
      margin: 0 auto;
      overflow: hidden;

      .loginList {
        float: left;
        cursor: pointer;
        p {
          float: left;
          margin-right: 10px;

          .register {
            border-left: 1px solid #b3aeae;
            padding: 0 5px;
            margin-left: 5px;
          }
        }
      }

      .typeList {
        float: right;

        a {
          padding: 0 10px;

          & + a {
            border-left: 1px solid #b3aeae;
          }
        }
      }
    }
  }

  & > .bottom {
    width: 1200px;
    margin: 0 auto;
    overflow: hidden;

    .logoArea {
      float: left;

      .logo {
        img {
          width: 175px;
          margin: 25px 45px;
        }
      }
    }

    .searchArea {
      float: right;
      margin-top: 35px;

      .searchForm {
        overflow: hidden;

        input {
          box-sizing: border-box;
          width: 490px;
          height: 32px;
          padding: 0px 4px;
          border: 2px solid #ea4a36;
          float: left;

          &:focus {
            outline: none;
          }
        }

        button {
          height: 32px;
          width: 68px;
          background-color: #ea4a36;
          border: none;
          color: #fff;
          float: left;
          cursor: pointer;

          &:focus {
            outline: none;
          }
        }
      }
    }
  }
}
</style>