<template>
  <div>
    <div class="goods-wapper">
      <div
        v-for="(item,index) in list"
        :key="index"
        class="goods-wapper-item"
      >
        <goods-item
          :list="item"
          :config="config"
        ></goods-item>
      </div>
      <div
        class="goods-wapper-item"
        v-if="mLength != 0"
      ></div>
      <div
        class="goods-wapper-item"
        v-if="mLength == 1"
      ></div>
    </div>
  </div>
</template>
<script>
  import GoodsItem from '../component/goods-item'
  export default {
    components: {
      GoodsItem
    },
    props: ['config', 'list'],
    data() {
      return {

      }
    },
    computed: {
      mLength() {
        return parseInt(this.list.length % 3);
      }
    }
  }
</script>
<style scoped lang="scss">
  @import "../../util.scss";
  .goods-wapper {
    display: flex;
    justify-content: space-evenly;
    flex-wrap: wrap;
    background: #fff;
    padding-top: to320(20);
    &-item {
      width: to320(220);
      flex-shrink: 0;
      margin-bottom: to320(20);
    }
  }
</style>