<template>
  <div class="goods-container">
    <div v-for="(item,index) in list" :key="index" class="goods-item">
      <div class="goods-item-main g-flex">
        <div class="goods-imgs">
          <div :style="'background-image:url('+item.thumb_image_path+');'" class="goods-imgs__img"></div>
          <div class="goods-imgs__label" v-if="config.badge_path">
            <img :src="config.badge_path" alt="logo">
          </div>
        </div>
        <div class="goods-conetnt g-flex g-flex-sb">
          <div>
            <p class="goods-conetnt__title g-ellipsis-1">{{item.item_title}}</p>
            <p class="goods-conetnt__sub-title g-ellipsis-1">{{item.selling_point}}</p>
          </div>
          <div>
            <div class="opare-line g-flex g-flex-sb g-flex-ac">
              <span class="opare-line-label">团购价</span>
              <div class="opare-line-buy">
                <p class="opare-line-buy__car g-flex g-flex-jc g-flex-ac" v-if="config.cart==1">
                  <i class="iconfont icon-cartfill"></i>
                </p>
                <div class="__add-btn" v-if="config.cart == 2">
                  <i class="iconfont icon-add1"></i>
                </div>
                <!-- <p class="opare-line-buy__sku">选规格</p> -->
              </div>
            </div>
            <div class="g-flex g-flex-sb g-flex-ac opare-word">
              <p>
                <span class="opare-word__current-price">
                  <span class="__symbol">￥</span>
                  <span class="__integer">{{item.current_price | integer}}</span>
                  <span class="__floatNum">{{item.current_price | floatNum}}</span>
                </span>
                <span class="opare-word__line-price">{{item.current_price}}</span>
              </p>
              <p class="opare-word__num">剩{{item.num}}件/已售{{item.num}}</p>
            </div>
          </div>
        </div>
      </div>
      <div
        class="goods-item-foot g-flex g-flex-sb g-flex-ac"
        v-if="config.isShowBuyHis==1 || config.isShowCate == 1"
      >
        <div>
          <div
            class="goods-item-foot__btn g-flex g-flex-ac g-flex-jc"
            v-if="config.isShowCate == 1"
          >
            进入分类页<i class="iconfont icon-zuoyoujiantou2"></i>
          </div>
        </div>
        <div class="goods-customer g-flex g-flex-sb" v-if="config.isShowBuyHis==1">
          <div class="goods-customer-content">
            <div class="goods-customer__head avatar_i">
              <img :src="item.thumb_image_path" alt="头像">
            </div>
            <div class="goods-customer__head avatar_i">
              <img :src="item.thumb_image_path" alt="头像">
            </div>
            <div class="goods-customer__head avatar_i">
              <img :src="item.thumb_image_path" alt="头像">
            </div>
            <div class="goods-customer__head avatar_i">
              <img :src="item.thumb_image_path" alt="头像">
            </div>
            <div class="goods-customer__head avatar_i">
              <img :src="item.thumb_image_path" alt="头像">
            </div>
            <div class="goods-customer__more avatar_i"></div>
          </div>
          <p class="goods-customer__desc">购买了此商品</p>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
  export default {
    props:['config','list'],
    data() {
      return {

      }
    },
  }
</script>
<style scoped lang="scss">
 @import "./index.scss";
</style>