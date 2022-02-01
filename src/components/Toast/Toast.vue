<template>
  <div class="toast" v-show="isShow">{{msg}}</div>
</template>

<script>
export default {
  name: "Toast",
  data() {
    return {
      msg: "",
      isShow: false,
    };
  },
  methods: {
    show(msg, delay = 1000) {
      this.msg = msg;
      this.isShow = true;
      setTimeout(() => {
        this.isShow = false;
      }, delay);
    },
  },
};
</script>

<style scoped lang="less">
.toast{
  position: fixed;
  z-index: 9999;
  top: 50%;
  left: 50%;
  width: 250px;
  height: 40px;
  background-color: rgba(0, 0, 0, .5);
  color: #fff;
  border-radius: 4px;
  line-height: 40px;
  font-size: 16px;
  text-align: center;
  transform: translateX(-50%) translateY(-50%);
}
</style>