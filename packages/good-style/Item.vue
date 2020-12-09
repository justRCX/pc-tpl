<template>
  <component
    :is="com"
    :config="config"
    :list="list"
  ></component>
</template>

<script>
  import product3 from './product-3/index.vue'
  export default {
    name: 'product',
    components: { product3 },
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