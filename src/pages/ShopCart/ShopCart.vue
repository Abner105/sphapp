<template>
  <div class="cart">
    <h4>全部商品</h4>
    <div class="cart-main">
      <div class="cart-th">
        <div class="cart-th1">全部</div>
        <div class="cart-th2">商品</div>
        <div class="cart-th3">单价（元）</div>
        <div class="cart-th4">数量</div>
        <div class="cart-th5">小计（元）</div>
        <div class="cart-th6">操作</div>
      </div>
      <div class="cart-body">
        <ul class="cart-list" v-for="(good, index) in cartList" :key="index">
          <li class="cart-list-con1">
            <input type="checkbox" name="chk_list" :checked="good.isChecked" />
          </li>
          <li class="cart-list-con2">
            <img :src="good.imgUrl" />
            <div class="item-msg">{{ good.skuName }}</div>
          </li>
          <li class="cart-list-con4">
            <span class="price">{{ good.skuPrice }}</span>
          </li>
          <li class="cart-list-con5">
            <a @click="handlerNum('mins', index, good.skuId)" class="mins">-</a>
            <input
              autocomplete="off"
              type="number"
              :value="good.skuNum"
              minnum="1"
              class="itxt"
              @change="handlerNum('itxt', index, good.skuId)"
              ref="numInput"
            />
            <a @click="handlerNum('plus', index, good.skuId)" class="plus">+</a>
          </li>
          <li class="cart-list-con6">
            <span class="sum">{{ good.skuPrice * good.skuNum }}</span>
          </li>
          <li class="cart-list-con7">
            <a href="#none" class="sindelet">删除</a>
            <br />
            <a href="#none">移到收藏</a>
          </li>
        </ul>
      </div>
    </div>
    <div class="cart-tool">
      <div class="select-all">
        <input class="chooseAll" type="checkbox" :checked="isAllCheck" />
        <span>全选</span>
      </div>
      <div class="option">
        <a href="#none">删除选中的商品</a>
        <a href="#none">移到我的关注</a>
        <a href="#none">清除下柜商品</a>
      </div>
      <div class="money-box">
        <div class="chosed">
          已选择 <span>{{ cartList.length }}</span> 种商品
        </div>
        <div class="sumprice">
          <em>总价（不含运费） ：</em>
          <i class="summoney">{{ sumPrice }}</i>
          <em> 元</em>
        </div>
        <div class="sumbtn">
          <a class="sum-btn" href="###" target="_blank">结算</a>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import debounce from "@/utils/debounce";
import { mapState } from "vuex";
export default {
  name: "ShopCart",
  mounted() {
    this.$store.dispatch("getCartList");
  },
  computed: {
    ...mapState({
      cartList: (state) => state.shopCart.cartList,
    }),
    // 是否全选
    isAllCheck() {
      return this.cartList.every((item) => item.isChecked);
    },
    // 计算总价
    sumPrice() {
      return this.cartList.reduce((pre, item) => {
        if (item.isChecked) {
          return pre + item.skuPrice * item.skuNum;
        } else {
          return pre;
        }
      }, 0);
    },
  },
  methods: {
    // 处理购物车的添加减少数量
    handlerNum(type, index, skuId) {
      let value = this.$refs.numInput[index].value;
      switch (type) {
        // 点击减减数量
        case "mins":
          value > 1 && value--;
          let diffNum = value - this.cartList[index].skuNum;
          this.$refs.numInput[index].value = value;
          if (diffNum) this.debounceAlterNum(skuId, diffNum);
          break;
        // 点击加加数量
        case "plus":
          value++;
          diffNum = value - this.cartList[index].skuNum;
          this.$refs.numInput[index].value = value;
          if (diffNum) this.debounceAlterNum(skuId, diffNum);
          break;
        // 输入框输入数量
        case "itxt":
          value = parseInt(value);
          if (!value || value <= 0) {
            value = this.cartList[index].skuNum;
          }
          diffNum = value - this.cartList[index].skuNum;
          this.$refs.numInput[index].value = value;
          if (diffNum) this.alterNum(skuId, diffNum);
          break;
      }
    },
    // 发送请求，修改购物车商品数量
    alterNum(skuId, skuNum) {
      this.$store
        .dispatch("addShopCart", { skuId, skuNum })
        .then(() => {
          // 添加购物车成功后，获取购物车的商品数据
          this.$store.dispatch("getCartList");
        })
        .catch((err) => {
          console.log(err);
        });
    },
    // 添加购物车请求的防抖返回函数
    debounceAlterNum: debounce("alterNum"),
  },
};
</script>

<style lang="less" scoped>
.cart {
  width: 1200px;
  margin: 0 auto;

  h4 {
    margin: 9px 0;
    font-size: 14px;
    line-height: 21px;
  }

  .cart-main {
    .cart-th {
      background: #f5f5f5;
      border: 1px solid #ddd;
      padding: 10px;
      overflow: hidden;

      & > div {
        float: left;
      }

      .cart-th1 {
        width: 25%;

        input {
          vertical-align: middle;
        }

        span {
          vertical-align: middle;
        }
      }

      .cart-th2 {
        width: 25%;
      }

      .cart-th3,
      .cart-th4,
      .cart-th5,
      .cart-th6 {
        width: 12.5%;
      }
    }

    .cart-body {
      margin: 15px 0;
      border: 1px solid #ddd;

      .cart-list {
        padding: 10px;
        border-bottom: 1px solid #ddd;
        overflow: hidden;
        display: grid;
        grid-template-columns: 1.3fr 2.2fr 0.7fr 1.1fr 0.8fr 0.9fr;

        // &>li {
        //   float: left;
        // }

        .cart-list-con1 {
          // width: 4.1667%;
        }

        .cart-list-con2 {
          // width: 25%;

          img {
            width: 82px;
            height: 82px;
            float: left;
          }

          .item-msg {
            float: left;
            width: 150px;
            margin: 0 10px;
            line-height: 18px;
          }
        }

        .cart-list-con4 {
          // width: 12.5%;
        }

        .cart-list-con5 {
          // width: 12.5%;

          .mins {
            border: 1px solid #ddd;
            border-right: 0;
            float: left;
            color: #666;
            width: 6px;
            text-align: center;
            padding: 8px;
            cursor: default;
          }

          input {
            border: 1px solid #ddd;
            width: 40px;
            height: 32px;
            float: left;
            text-align: center;
            font-size: 14px;
          }
          /* 谷歌,去除type=number的加减键 */
          input::-webkit-outer-spin-button,
          input::-webkit-inner-spin-button {
            -webkit-appearance: none;
            appearance: none;
            margin: 0;
          }
          /* 火狐 */
          input {
            -moz-appearance: textfield;
          }

          .plus {
            border: 1px solid #ddd;
            border-left: 0;
            float: left;
            color: #666;
            width: 6px;
            text-align: center;
            padding: 8px;
            cursor: default;
          }
        }

        .cart-list-con6 {
          // width: 12.5%;

          .sum {
            font-size: 16px;
          }
        }

        .cart-list-con7 {
          // width: 12.5%;

          a {
            color: #666;
          }
        }
      }
    }
  }

  .cart-tool {
    overflow: hidden;
    border: 1px solid #ddd;

    .select-all {
      padding: 10px;
      overflow: hidden;
      float: left;

      span {
        vertical-align: middle;
      }

      input {
        vertical-align: middle;
      }
    }

    .option {
      padding: 10px;
      overflow: hidden;
      float: left;

      a {
        float: left;
        padding: 0 10px;
        color: #666;
      }
    }

    .money-box {
      float: right;

      .chosed {
        line-height: 26px;
        float: left;
        padding: 0 10px;
      }

      .sumprice {
        width: 200px;
        line-height: 22px;
        float: left;
        padding: 0 10px;

        .summoney {
          color: #c81623;
          font-size: 16px;
        }
      }

      .sumbtn {
        float: right;

        a {
          display: block;
          position: relative;
          width: 96px;
          height: 52px;
          line-height: 52px;
          color: #fff;
          text-align: center;
          font-size: 18px;
          font-family: "Microsoft YaHei";
          background: #e1251b;
          overflow: hidden;
        }
      }
    }
  }
}
</style>