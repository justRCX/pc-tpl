<template>
  <div class="product-three">
    <template v-if="!config.waterfall">
      <c-item
        v-for="(item,index) in list"
        :item="item"
        :key="index"
        :show-cart-num="index == 2"
      ></c-item>
    </template>
    <template v-else>
      <div
        v-for="(item,index) in waterFallList"
        class="waterFall-wrapper"
        :key="index"
        :class="index == 0? 'right':'left'"
      >
        <c-item
          v-for="subItem in item"
          :item="subItem"
          :waterfall="config.waterfall"
          :show-cart-num="index == 1"
        ></c-item>
      </div>
    </template>

  </div>
</template>

<script>
  import CItem from './item.vue'
  export default {
    name: 'product-style-3',
    components: { CItem },
    filters: {},
    directives: {},
    mixins: [],
    model: [],
    data() {
      return {
      }
    },
    computed: {
      waterFallList() {
        let arr = new Array(10).fill(1)
        let xx = arr.map((i, index) => {
          let item = {};
          if (index % 2 == 0) {
            item.right = true;
            item.title = '这是商品标题这是商品标题这是商品标题这是商品标题这是商品标题这是商品标题这是商品标题这是商品标题这是商品标题这是商品标题这是商品标题这是商品标题这是商品标题'
          } else {
            item.right = false;
            item.title = '这是商品标题'
          }
          return item
        })
        let left = xx.filter(item => !item.right)
        let right = xx.filter(item => item.right)
        return [left, right]
      }
    },
    props: ['list', 'config'],
    watch: {},
    beforeRouteEnter(to, from, next) { },
    beforeRouteUpdate(to, from, next) { },
    beforeRouteLeave(to, from, next) { },
    beforeCreate() { },
    created() { },
    beforeMount() { },
    mounted() { },
    beforeUpdate() { },
    updated() { },
    beforeDestroy() { },
    destroyed() { },
    activated() { },
    deactivated() { },
    errorCaptured() { },
    methods: {}
  }
</script>

<style scoped lang='scss'>
  .product-three {
    display: flex;
    overflow: hidden;
    flex-wrap: wrap;
    justify-content: space-between;
    padding: 0 10px;
  }
  .waterFall-wrapper {
    width: 50%;
  }
</style>