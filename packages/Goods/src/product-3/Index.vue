<template>
  <div class="product-three">
    <!-- <c-item
      v-for="item in list"
      :item="item"
    ></c-item> -->
    <div
      v-for="(item,index) in waterFallList"
      class="waterFall-wrapper"
      :class="index == 0? 'right':'left'"
    >
      <c-item
        v-for="subItem in item"
        :item="subItem"
        :waterfall="true"
      ></c-item>
    </div>
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
      list() {
        let arr = new Array(10).fill(1)
        let xx = arr.map((i, index) => {
          let item = {};
          if (index == 5) {
            item.title = '这是商品标题这是商品标题这是商品标题这是商品标题这是商品标题这是商品标题这是商品标题这是商品标题这是商品标题这是商品标题这是商品标题这是商品标题这是商品标题'
          } else {
            item.title = '这是商品标题'
          }
          return item
        })
        return xx
      },
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
    props: ['waterFall'],
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