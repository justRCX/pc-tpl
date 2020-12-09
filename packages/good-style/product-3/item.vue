<template>
  <div
    class=" product"
    :class="{waterfall:waterfall}"
  >
    <div
      class="product-img"
      :style="background"
    >
      <div
        class="__sale-out"
        v-if="item.num == 0"
      ></div>
    </div>
    <div class="tag">
      <img :src="config.badge_path">
    </div>
    <div class="product-bottom">
      <div
        class="product-title"
        :class="waterfall?'__height-auto':''"
      >{{item.item_title}}</div>
      <div
        class="product-desc"
        v-if="waterfall && !item.selling_point"
      >{{item.selling_point}}</div>
      <div class="product-sale">
        <span>已售999件</span>
        <span>库存999件</span>
      </div>
      <div class="product-action">
        <div class="product-action-price">
          <span class="__current"><i>￥</i>66.66</span>
          <span class="before_price">￥88.88</span>
        </div>
        <div class="product-action-cart">
          <c-plus v-if="showCartNum"></c-plus>
          <template v-else>
            <span
              class="__cart"
              v-if="config.cart == 1"
            >
              <i class="iconfont icon-cartfill"></i>
            </span>
            <span
              class="__plus"
              v-if="config.cart == 2"
            >
              <i class="iconfont icon-add1"></i>
            </span>
          </template>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import CPlus from '../component/plus'
  export default {
    name: 'product-style-3',
    components: { CPlus },
    filters: {},
    directives: {},
    mixins: [],
    model: [],
    data() {
      return {
      }
    },
    computed: {
      background() {
        return ` background-image: url(${this.item.thumb_image_path})`;
      }
    },
    props: ['item', 'waterfall', 'showCartNum', 'config'],
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
  .product {
    border-radius: 12/2 * 1px;
    position: relative;
    width: calc(50% - 5px);
    margin-top: 10px;
    overflow: hidden;
    .tag {
      position: absolute;
      top: 10/2 * 1px;
      left: 0;
      width: 114/2 * 1px;
      height: 38/2 * 1px;
      z-index: 4;
      img {
        display: block;
        width: 100%;
      }
    }
    &.waterfall {
      width: calc(100% - 5px);
    }
    &-img {
      position: relative;
      border-radius: 12/2 * 1px 12/2 * 1px 0 0;
      overflow: hidden;
      padding-top: 100%;
      position: relative;
      background: no-repeat center center;
      background-size: cover;
    }
    .__sale-out {
      position: absolute;
      top: 0;
      left: 0;
      overflow: hidden;
      height: 100%;
      width: 100%;
      z-index: 3;
      margin: 0;
      opacity: 0.9;
      background: no-repeat center;
      background-size: cover;
      background-image: url("https://img.qianhuituan.cn/web/images/11_1569205880_Hh3hqHcUew.png");
    }
    &-bottom {
      padding: 20/1 * 1px;
      background: #fff;
    }
    &-title {
      height: 64/2 * 1px;
      font-size: 28/2 * 1px;
      font-weight: bold;
      color: #333333;
      line-height: 36/2 * 1px;
      overflow: hidden;
      text-overflow: ellipsis;
      display: -webkit-box;
      -webkit-line-clamp: 2;
      -webkit-box-orient: vertical;
      &.__height-auto {
        height: auto;
      }
    }
    &-desc {
      font-size: 24/2 * 1px;
      font-weight: 400;
      color: #999999;
      height: 36 * 1px;
      line-height: 36 * 1px;
      border-bottom: 1px solid #eeeeee;
      overflow: hidden;
      white-space: nowrap;
      text-overflow: ellipsis;
    }
    &-sale {
      display: flex;
      justify-content: space-between;
      font-size: 20/2 * 1px;
      font-weight: 400;
      color: #999999;
      line-height: 36/2 * 1px;
      margin-top: 18/2 * 1px;
      span {
        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;
      }
    }
    &-action {
      display: flex;
      justify-content: space-between;
      align-items: center;
      &-price {
        margin-top: 16/2 * 1px;
        line-height: 36/2 * 1px;
        font-weight: 400;
        .__current {
          font-size: 30/2 * 1px;
          color: #ff1947;
          display: block;
          i {
            font-size: 20/2 * 1px;
          }
        }
        .before_price {
          text-decoration: line-through;
          color: #999999;
          font-size: 20/2 * 1px;
          display: block;
        }
      }
      &-cart {
        .__cart {
          display: block;
          width: 100/2 * 1px;
          height: 46/2 * 1px;
          line-height: 46/2 * 1px;
          background: #ff1947;
          border-radius: 23/2 * 1px;
          text-align: center;
          color: #fff;
        }
        .__plus {
          background: #ff1947;
          height: 46/2 * 1px;
          line-height: 46/2 * 1px;
          width: 46/2 * 1px;
          text-align: center;
          color: #fff;
          border-radius: 50%;
          display: block;
        }
      }
    }
  }
</style>