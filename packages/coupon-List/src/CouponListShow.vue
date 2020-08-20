<template>
  <div>
    <div
      :class="configs.couponWay == 1?'scroll-coupon':'two-coupon'"
      :style="`margin:0 ${configs.lrMargin/750*318}px;`"
    >
      <!-- 待领取 -->
      <div
        class="normal"
        v-for="(item,index) in list"
        :key="Math.random()+index"
        :style="normal_Style(item.coupon_id,index,list.length)"
      >
        <coupon-list-show-item
          :list="item"
          :singleCoupon="singleCoupon(item.coupon_id)"
          :couponStyle="couponStyle(item.coupon_id)"
          :index="index"
          :couponStatus="couponStatus"
        ></coupon-list-show-item>
      </div>
    </div>
  </div>
</template>
<script>
  import CouponListShowItem from "./CouponListShowItem";
  export default {
    props: ["configs", "list", "couponStatus", "couponStatusStyle"],
    data() {
      return {
        couponData: [],
        couponStatusList: { 1: "waitReceive", 2: "hasReceive", 3: "overdue" }
      };
    },
    components: {
      CouponListShowItem
    },
    computed: {
      config() {
        return JSON.parse(JSON.stringify(this.couponStatusStyle));
      }
    },
    methods: {
      singleCoupon(id) {
        return (
          this.config[id] &&
          this.config[id][this.couponStatusList[this.couponStatus]]
        );
      },
      couponStyle(id) {
        return this.config[id] ? this.config[id].couponStyle : null;
      },
      normal_Style(id, index, length) {
        if (this.configs.couponWay == 2) {
          if (index % 2 === 0) {
            return `
            margin-right: ${((this.configs.contentMargin / 375) * 318) / 2}px;
            width: ${this.singleCoupon(id).backWidth}px;
          `;
          } else {
            return `
              margin-left: ${((this.configs.contentMargin / 375) * 318) / 2}px;
              width: ${this.singleCoupon(id).backWidth}px;
            `;
          }
        }
        if (index == 0) {
          return `
          margin-right: ${((this.configs.contentMargin / 375) * 318) / 2}px;
          width: ${this.singleCoupon(id).backWidth}px;
        `;
        } else if (index == length) {
          return `
          margin-left: ${((this.configs.contentMargin / 375) * 318) / 2}px;
          width: ${this.singleCoupon(id).backWidth}px;
        `;
        } else {
          return `
          margin: 0 ${((this.configs.contentMargin / 375) * 318) / 2}px;
          width: ${this.singleCoupon(id).backWidth}px;
        `;
        }
      }
    }
  };
</script>

<style scoped lang="scss">
  .scroll-coupon {
    overflow: hidden;
    white-space: nowrap;
    min-height: 20px;
  }
  .two-coupon {
    border-radius: 0 0 10px 10px;
    overflow: hidden;
    min-height: 20px;
    .normal {
      margin-top: 1px;
      &:nth-of-type(1) {
        margin-top: 0;
      }
      &:nth-of-type(2) {
        margin-top: 0;
      }
    }
  }
  .normal {
    position: relative;
    display: inline-block;
    overflow: hidden;
    width: 90px;
    vertical-align: middle;
    &:last-child {
      margin-right: 0 !important;
    }
  }
</style>
