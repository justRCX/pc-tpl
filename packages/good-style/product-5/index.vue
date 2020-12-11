<template>
  <div class="container">
    <div class="goods-wapper">
      <div
        v-for="(item,index) in list"
        :key="index"
        class="goods-wapper-item"
      >
        <goods-item
          :item="item"
          :config="config"
        ></goods-item>
      </div>
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
  }
</script>
<style scoped lang="scss">
  @import "../../util.scss";
  .container {
    padding: 0 to320(20);
    background: #fff;
  }
  .goods-wapper {
    display: flex;
    overflow-x: auto;
    padding: to320(30) 0;
    &-item {
      width: to320(190);
      flex-shrink: 0;
      margin-right: to320(20);
      &:last-child {
        margin-right: 0;
      }
    }
  }
</style>