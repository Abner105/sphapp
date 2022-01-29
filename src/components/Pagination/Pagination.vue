<template>
  <div class="pagination">
    <button :disabled="pageNo == 1" @click="changePage(pageNo - 1)" >
      上一页
    </button>
    <button v-show="starAndEnd.start > 1" @click="changePage(1)" :class="{active:pageNo==1}">1</button>
    <button v-show="starAndEnd.start > 2" disabled>···</button>

    <button
      v-for="(n, i) in medialPages"
      :key="i"
      @click="changePage(n + starAndEnd.start - 1)"
      :class="{active:pageNo==( n + starAndEnd.start - 1)}"
    >
      {{ n + starAndEnd.start - 1 }}
    </button>

    <button v-show="starAndEnd.end < totalPages - 1" disabled>···</button>
    <button
      v-show="starAndEnd.end < totalPages"
      @click="changePage(totalPages)"
      :class="{active:pageNo==totalPages}"
    >
      {{ totalPages }}
    </button>
    <button :disabled="pageNo == totalPages" @click="changePage(pageNo + 1)">
      下一页
    </button>

    <button style="margin-left: 30px">共 {{ totalPages }} 页</button>

  </div>
</template>

<script>
export default {
  name: "Pagination",
  props: ["total", "pageOne", "pageNo", "continues"],
  methods: {
    changePage(index) {
      this.$emit("changePages",index)
    },
  },
  computed: {
    totalPages() {
      return Math.ceil(this.total / this.pageOne);
    },
    medialPages(){
      if(this.totalPages <= this.continues){
        return this.totalPages
      }else{
        return this.continues
      }
    },
    starAndEnd() {
      const { totalPages, continues, pageNo } = this;
      let start = 1,
        end = 1;
      if (totalPages <= continues) {
        start = 1;
        end = continues;
      } else {
        start = pageNo - parseInt(continues / 2);
        end = start + continues - 1;
        if (start < 1) {
          start = 1;
          end = continues;
        }
        if (end > totalPages) {
          end = totalPages;
          start = end - continues + 1;
        }
      }
      return { start, end };
    },
  },
};
</script>

<style lang="less" scoped>
.pagination {
  display: flex;
  justify-content: center;
  button {
    margin: 0 5px;
    background-color: #f4f4f5;
    color: #606266;
    outline: none;
    border-radius: 2px;
    padding: 0 4px;
    vertical-align: top;
    display: inline-block;
    font-size: 13px;
    min-width: 35.5px;
    height: 28px;
    line-height: 28px;
    cursor: pointer;
    box-sizing: border-box;
    text-align: center;
    border: 0;

    &[disabled] {
      color: #c0c4cc;
      cursor: not-allowed;
    }

    &.active {
      cursor: not-allowed;
      background-color: rgb(233, 27, 27);
      color: #fff;
    }
  }
}
</style>