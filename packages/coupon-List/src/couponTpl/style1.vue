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
        <div class="coupon__wrapper-style-item-price">
          <span
            class="__icon"
            v-if="item.type != 1"
          >￥</span>
          <span>10</span>
          <span
            v-if="item.type == 1"
            class="__count"
          >折</span>
        </div>
        <div class="coupon__wrapper-style-item-up">{{item.remark}}</div>
        <div class="coupon__wrapper-style-item-btn">{{
        ['','点击领取','去看看','已失效'][couponStatus]
      }}</div>
        <span
          class="coupon__wrapper-style-circle coupon__wrapper-style-circle__left"
          :style="bg"
        ></span>
        <span
          class="coupon__wrapper-style-circle coupon__wrapper-style-circle__right"
          :style="bg"
        ></span>
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
        return `coupon__wrapper-style-${this.configs.showTemplateType}`
      },
      flex() {
        let style = {};
        if (this.configs.couponWay == 1) {
          style['flex-wrap'] = 'nowrap'
          style['overflow-x'] = 'auto'
        } else {
          style['flex-wrap'] = 'wrap'
          style['overflow-x'] = 'hidden'
        }
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
      couponStatus() {
        return this.configs.couponStatus
      },
      bg() {
        return {
          background: this.bodyBg
        }
      }
    },
    props: ['list', 'configs', 'bodyBg'],
    methods: {}
  }
</script>

<style scoped lang='scss'>
  .coupon__wrapper-style-1,
  .coupon__wrapper-style-2 {
    .coupon__wrapper-style-item {
      &:first-child {
        border-left: none !important;
      }
    }

    .coupon__wrapper-style-row-2 {
      .coupon__wrapper-style-item {
        &:nth-child(odd) {
          border-left: none !important;
        }
      }
    }

    .coupon__wrapper-style-row-3 {
      .coupon__wrapper-style-item {
        &:nth-child(3n + 1) {
          border-left: none !important;
        }
      }
    }
  }
  @import "./style1.scss";
  @import "./style2.scss";
  @import "./style3.scss";
  @import "./style4.scss";
</style>