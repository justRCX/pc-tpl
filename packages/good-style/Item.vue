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
  import product4 from './product-4/index.vue'
  import product5 from './product-5/index.vue'
  export default {
    name: 'product',
    components: { product1, product2, product3, product4, product5 },
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
