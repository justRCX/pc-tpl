<template>
  <goods-component
    :config="config"
    :style="{marginLeft:config.lrmargin/2+'px',marginRight:config.lrmargin/2+'px',}"
  >
    <component
      :is="com"
      :config="config"
      :list="list"
      slot="goods-list"
    >
    </component>
  </goods-component>
</template>

<script>
  import product1 from './product-1/index.vue'
  import product2 from './product-2/index.vue'
  import product3 from './product-3/index.vue'
  import product4 from './product-4/index.vue'
  import product5 from './product-5/index.vue'
  import goodsComponent from './component/goods-component.vue'
  export default {
    name: 'product',
    components: { product1, product2, product3, product4, product5, goodsComponent },
    computed: {
      com() {
        return `product${this.listType}`
      }
    },
    props: ['listType', 'config', 'list'],
  }
</script>

<style scoped lang='scss'>
  .custom-title {
    padding: 10px 0;
  }
</style>
