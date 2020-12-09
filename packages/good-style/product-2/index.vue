<template>
  <div class="goods-container">
    <div v-for="(item,index) in list" :key="index" class="goods-item">
      <div class="goods-imgs">
        <div :style="'background-image:url('+item.thumb_image_path+');'" class="goods-imgs__img"></div>
        <div class="goods-imgs__label" v-if="config.badge_path">
          <img :src="config.badge_path" alt="logo">
        </div>
      </div>
      <div class="goods-conetnt">
        <div class="goods-conetnt-titles">
          <p class="goods-conetnt__title g-ellipsis-2">{{item.item_title}}</p>
          <p class="goods-conetnt__sub-title g-ellipsis-1">{{item.selling_point}}</p>
        </div>
        <div class="g-flex g-flex-sb goods-conetnt-sales">
          <div class="__color-yellow">
            <p>预售时间：03月05日</p>
            <p>提货时间：03月05日</p>
          </div>
          <div>
            <p>已售<span class="__color-red">{{item.num}}</span>件</p>
            <p class="__color-yellow">库存{{item.num}}件</p>
          </div>
        </div>
        <div class="opare-word g-flex g-flex-sb g-flex-ac">
          <div>
            <span class="opare-word__current-price">
              <span class="__symbol">￥</span>
              <span class="__integer">{{item.current_price | integer}}</span>
              <span class="__floatNum">{{item.current_price | floatNum}}</span>
            </span>
            <span class="opare-word__line-price">{{item.current_price}}</span>
          </div>
          <template v-if="config.isShowCate != 1">
              <div class="opare-word__add" v-if="config.cart == 1">加入购物车</div>
              <!-- <c-plus v-if="config.cart == 2" size="large"></c-plus> -->
              <div class="__add-btn" v-if="config.cart == 2">
                <i class="iconfont icon-add1"></i>
              </div>
          </template>
        </div>
      </div>
      <div class="goods-conetnt-btn g-flex g-flex-sb g-flex-ac" v-if="config.isShowCate == 1">
          <div class="goods-conetnt-btn__goin __btn">进入分类页</div>
          <div class="goods-conetnt-btn__add __btn" v-if="config.cart == 1">加入购物车</div>
          <!-- <c-plus v-if="config.cart == 2" size="large"></c-plus> -->
          <div class="__add-btn" v-if="config.cart == 2">
            <i class="iconfont icon-add1"></i>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
  import CPlus from '../component/plus'
  export default {
    props:['config','list'],
    components: {
      CPlus
    },
    data() {
      return {

      }
    },
    mounted() {

    }
  }
</script>
<style scoped lang="scss">
 @import "./index.scss";
</style>