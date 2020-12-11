<template>
  <div class="goods-item">
    <div
      class="goods-item__img"
      :style="background"
    ></div>
    <p class="goods-item__title g-ellipsis-2">{{list.item_title}}</p>
    <div class="g-flex g-flex-sb g-flex-ac goods-item-foot">
      <div>
        <p class="goods-item-foot__price-current">
          <span class="__symbol">￥</span>
          <span class="__price">{{list.current_price}}</span>
        </p>
        <p class="goods-item-foot__price-line">￥{{list.current_price}}</p>
      </div>
      <div class="goods-item-buy">
        <p class="goods-item-buy__car g-flex g-flex-jc g-flex-ac">
          <i class="iconfont icon-cartfill"></i>
        </p>
        <p class="goods-item-buy__num">9</p>
      </div>
    </div>
  </div>
</template>
<script>
  export default {
    props: ['config', 'list'],
    data() {
      return {

      }
    },
    computed: {
      background() {
        return ` background-image: url(${this.list.thumb_image_path})`;
      }
    },
    mounted() {

    }
  }
</script>
<style scoped lang="scss">
  @import "../../util.scss";
  .goods-item {
    &__img {
      position: relative;
      padding-top: 100%;
      border-radius: to320(12);
      background-size: cover;
      background-repeat: no-repeat;
    }
    &__title {
      line-height: to320(36);
      font-size: to320(28);
      padding-top: to320(10);
      height: to320(70);
    }
    &-foot {
      padding: to320(10) 0;
      &__price-current {
        color: #ff1947;
        .__symbol {
          font-size: to320(20);
        }
        .__price {
          font-size: to320(30);
          font-weight: 700;
        }
      }
      &__price-line {
        color: #999;
        font-size: to320(20);
        text-decoration: line-through;
      }
      .goods-item-buy {
        position: relative;
        &__car {
          width: to320(50);
          height: to320(50);
          background: #ff1947;
          border-radius: 50%;
          .iconfont {
            font-size: to320(30);
            color: #fff;
            line-height: normal;
          }
        }
        &__num {
          position: absolute;
          right: 0;
          top: to320(-10);
          background: #fbe54d;
          border-radius: 50%;
          padding: 0 to320(6);
          font-size: to320(20);
          font-weight: 700;
        }
      }
    }
  }
</style>