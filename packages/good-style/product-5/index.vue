<template>
  <div>
    <div class="goods-wapper">
      <div
        v-for="(item,index) in list"
        :key="index"
        class="goods-wapper-item"
      >
        <goods-item></goods-item>
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
    mounted() {

    }
  }
</script>
<style scoped lang="scss">
  @import "../../util.scss";
  .goods-wapper {
    display: flex;
    flex-wrap: wrap;
    background: #fff;
    &-item {
      width: to320(220);
      flex-shrink: 0;
    }
  }
</style>