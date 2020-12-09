<template>
  <component
    :is="com"
    :config="config"
    :list="list"
  ></component>
</template>

<script>
  import product1 from './product-1/index.vue'
  import product2 from './product-2/index.vue'
  import product3 from './product-3/index.vue'
  export default {
    name: 'product',
    components: { product1,product2,product3 },
    computed: {
      com() {
        return `product${this.listType}`
      }
    },
    props: ['listType', 'config', 'list'],
  }
</script>

<style scoped lang='scss'>
</style>
