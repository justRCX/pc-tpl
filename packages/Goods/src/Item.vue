<template>
  <component
    :is="com"
    :config="config"
  ></component>
</template>

<script>
  import procuct3 from './product-3'
  export default {
    name: 'product',
    components: { procuct3 },
    computed: {
      com() {
        return `procuct${this.listType}`
      }
    },
    props: ['listType', 'config'],
  }
</script>

<style scoped lang='scss'>
</style>