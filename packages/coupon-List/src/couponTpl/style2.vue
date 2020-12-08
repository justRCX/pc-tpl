<template>
  <div :class="styleClass">
    <div
      class="coupon__wrapper-style"
      :class="'coupon__wrapper-style-row-'+configs.couponWay"
      :style="flex"
    >
      <div
        class="coupon__wrapper-style-item"
        v-for="item in list"
        :style="flexBasic"
        :class="{
        'coupon__wrapper-style-item__disable':couponStatus == 3,
        'coupon__wrapper-style-item__has':couponStatus == 2
        }"
      >
        <p class="title">500元红包券</p>
        <p class="desc">{{item.remark}}</p>
        <p class="action">立即领取 <i class="iconfont icon-gengduo1"></i></p>
      </div>
    </div>
  </div>
</template>

<script>
  let rate = 320 / 750;
  export default {
    name: 'coupon-style',
    data() {
      return {
      }
    },
    computed: {
      styleClass() {
        return `coupon__wrapper-style-${this.tplNum}`
      },
      flex() {
        let style = {};
        if (this.configs.couponWay == 1 || this.configs.chooseType == 1) {
          style['flex-wrap'] = 'nowrap'
          style['overflow-x'] = 'auto'
        } else {
          style['flex-wrap'] = 'wrap'
          style['overflow-x'] = 'hidden'
        }
        let margin =
          style['margin'] = `0 ${Math.floor(this.configs.lrMargin * rate)}px`
        return style
      },
      flexBasic() {
        let width = '33%';
        if (this.configs.couponWay > 1) {
          width = 100 / this.configs.couponWay + '%'
        }
        return {
          'flex-basis': width
        }
      },
      bg() {
        return {
          background: this.bodyBg
        }
      }
    },
    props: ['list', 'configs', 'couponStatus', 'bodyBg', 'tplNum'],
    methods: {}
  }
</script>

<style scoped lang='scss'>
  .coupon__wrapper-style-5,
  .coupon__wrapper-style-5 {
    .coupon__wrapper-style-row-1 {
      border-left: none !important;
    }
    .coupon__wrapper-style-row-2 {
      .coupon__wrapper-style-item {
        border-bottom: 1px #e9e9e9 solid;
        &:nth-child(even) {
          border-left: 1px #e9e9e9 solid;
          padding-right: 0;
          background-position: 12px 5px;
          padding-left: 72px;
        }
        &:nth-child(3),
        &:nth-child(4) {
          border-bottom: none;
        }
      }
    }
  }
  @import "./style5.scss";
</style>