<template>
  <div class="product-three">
    <template v-if="!config.waterfall">
      <c-item
        v-for="(item,index) in list"
        :item="item"
        :key="index"
        :show-cart-num="index == 1"
        :config="config"
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
          :config="config"
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
    data() {
      return {
      }
    },
    computed: {
      waterFallList() {
        let xx = this.list.map((i, index) => {
          let item = {};
          if (index % 2 == 0) {
            item.right = true;
          } else {
            item.right = false;
          }
          return item
        })
        let left = xx.filter(item => !item.right)
        let right = xx.filter(item => item.right)
        return [left, right]
      }
    },
    props: ['list', 'config'],
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