<template>
  <div>
    <div v-if="couponStyle !=2 && couponStyle !=5">
      <img
        :src="getBackUrl"
        :style="{width:singleCoupon.backWidth+'px'}"
      />
      <div
        class="currency"
        v-if="singleCoupon.currency.is_show == 1"
        :style="currencyStyle1(list.coupon_id)"
      >{{singleCoupon.currency.content}}</div>
      <div
        class="price"
        v-if="singleCoupon.price.is_show == 1"
        :style="priceStyle1(list.coupon_id)"
      >
        <span
          v-if=" singleCoupon.price.position==1 &&  singleCoupon.price.content"
          :style="priceCompanyStyle1(list.coupon_id)"
        >{{ singleCoupon.price.content}}</span>
        <span
          :style="`font-size: ${ singleCoupon.price.fontSize/375*318}px;`">{{couponStyle !==2?parseInt(list.value):list.value}}</span>
        <span
          v-if="singleCoupon.price.position==2 &&  singleCoupon.price.content"
          :style="priceCompanyStyle1(list.coupon_id)"
        >{{ singleCoupon.price.content}}</span>
      </div>
      <div
        class="title"
        v-if=" singleCoupon.title.is_show == 1"
        :style="titleStyle1(list.coupon_id)"
      >{{list.title}}1</div>
      <div
        class="condition"
        v-if=" singleCoupon.condition.is_show == 1"
        :style="conditionStyle1(list.coupon_id)"
      >{{list.at_least!="0.00"?`满${list.at_least}元使用`:'无门槛使用'}}</div>
      <div
        class="couponBtn"
        v-if=" singleCoupon.couponBtn.is_show == 1"
        :style="couponBtnStyle1(list.coupon_id)"
      >{{ singleCoupon.couponBtn.content}}</div>
      <img
        :src=" singleCoupon.minimgUrl.content"
        class="minimgUrl"
        v-if=" singleCoupon.minimgUrl.is_show == 1"
        :style="minimgUrlStyle1(list.coupon_id)"
      />
    </div>
    <div v-if="couponStyle ==2">
      <img
        :src="singleCoupon.backUrl"
        :style="{width:singleCoupon.backWidth  +'px'}"
      />
      <div class="cont-wrap">
        <div class="left-wrap">
          <div
            class="currency"
            v-if="singleCoupon.currency.is_show == 1"
            :style="currencyStyle1(list.coupon_id)"
          >{{singleCoupon.currency.content}}</div>
          <div
            class="price"
            v-if="singleCoupon.price.is_show == 1"
            :style="priceStyle1(list.coupon_id)"
          >
            <span
              v-if=" singleCoupon.price.position==1 &&  singleCoupon.price.content"
              :style="priceCompanyStyle1(list.coupon_id)"
            >{{ singleCoupon.price.content}}</span>
            <span
              :style="`font-size: ${ singleCoupon.price.fontSize/375*318}px;`">{{list.value}}</span>
            <span
              v-if=" singleCoupon.price.position==2 &&  singleCoupon.price.content"
              :style="priceCompanyStyle1(list.coupon_id)"
            >{{ singleCoupon.price.content}}</span>
          </div>
          <div
            class="title"
            v-if=" singleCoupon.title.is_show == 1"
            :style="titleStyle1(list.coupon_id)"
          >{{list.title}}1</div>
          <div
            class="condition"
            v-if=" singleCoupon.condition.is_show == 1"
            :style="conditionStyle1(list.coupon_id)"
          >{{list.at_least!="0.00"?`满${list.at_least}元使用`:'无门槛使用'}}</div>
        </div>
        <div
          class="couponBtn"
          v-if="singleCoupon.couponBtn.is_show == 1"
          :style="couponBtnStyle1(list.coupon_id)"
          v-html="singleCoupon.couponBtn.content"
        ></div>
      </div>
    </div>
    <div
      v-if="couponStyle == 5"
      class="style5"
    >
      <div
        class="content"
        :style="getStyle5Color(index)"
      >
        <div class="prices">
          <div class="dollar">￥</div>
          <div class="num">10</div>
        </div>
        <div class="txt">
          <div class="txt1">优惠券</div>
          <div class="txt2">满100使用</div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
  export default {
    // list:优惠券数据；singleCoupon：单张优惠券配置；couponStyle：第几套默认样式；index：第几张；couponStatus：领取过期状态
    props: ["list", "singleCoupon", "couponStyle", "index", "couponStatus"],
    data() {
      return {};
    },
    computed: {
      getBackUrl() {
        // 样式8特殊
        if (this.couponStyle != 9 || this.couponStatus != 1) {
          return this.singleCoupon.backUrl;
        }
        if (this.index % 4 === 0) {
          return `http://img.wkdao.com/image/65/2020/05/21/6589bec531d966c08ffd1b6fdc8c763e.png`;
        } else if (this.index % 3 === 0) {
          return `http://img.wkdao.com/image/65/2020/05/21/57cbdac12ebffa9252aab3216fe682f9.png`;
        } else if (this.index % 2 === 0) {
          return `http://img.wkdao.com/image/65/2020/05/21/419419f54cfa295a2d2cb4caedf8a1fe.png`;
        } else {
          return `http://img.wkdao.com/image/65/2020/05/21/ecdd16f0c18847f259a90d6523dde954.png`;
        }
      }
    },
    methods: {
      // 样式5特殊样式
      getStyle5Color($i) {
        let i = ++$i;
        if (i % 3 === 0) {
          return `background: #A9D5CA`;
        } else if (i % 2 === 0) {
          return `background: #D8B59F`;
        } else {
          return `background: #FDB3B2`;
        }
      },
      currencyStyle1(id) {
        return `
				color: ${this.singleCoupon.currency.color};
				font-size: ${(this.singleCoupon.currency.fontSize / 375) * 318}px;
				left: ${(this.singleCoupon.currency.left / 375) * 318}px;
        top: ${(this.singleCoupon.currency.top / 375) * 318}px;
        font-weight: ${(this.singleCoupon.currency.bold / 375) * 318};
			`;
      },
      priceStyle1(id) {
        return `
				color: ${this.singleCoupon.price.color};
				font-size: ${(this.singleCoupon.price.fontSize / 375) * 318}px;
				left: ${(this.singleCoupon.price.left / 375) * 318}px;
        top: ${(this.singleCoupon.price.top / 375) * 318}px;
        font-weight: ${this.singleCoupon.price.bold};
        width: ${this.singleCoupon.price.width}%;
        text-align:${this.singleCoupon.price.align}
			`;
      },
      priceCompanyStyle1(id) {
        return `
				font-size: ${(this.singleCoupon.price.CompanyFontSize / 375) * 318}px;
        font-weight: ${this.singleCoupon.price.CompanyBold};
			`;
      },
      companyStyle1(id) {
        return `
				color: ${this.singleCoupon.company.color};
				font-size: ${(this.singleCoupon.company.fontSize / 375) * 318}px;
				left: ${(this.singleCoupon.company.left / 375) * 318}px;
				top: ${(this.singleCoupon.company.top / 375) * 318}px;
			`;
      },
      titleStyle1(id) {
        return `
				color: ${this.singleCoupon.title.color};
				font-size: ${(this.singleCoupon.title.fontSize / 375) * 318}px;
				left: ${(this.singleCoupon.title.left / 375) * 318}px;
				top: ${(this.singleCoupon.title.top / 375) * 318}px;
			`;
      },
      conditionStyle1(id) {
        return `
				color: ${this.singleCoupon.condition.color};
				font-size: ${(this.singleCoupon.condition.fontSize / 375) * 318}px;
				left: ${(this.singleCoupon.condition.left / 375) * 318}px;
        top: ${(this.singleCoupon.condition.top / 375) * 318}px;
        width: ${this.singleCoupon.condition.width}%;
        text-align:${this.singleCoupon.condition.align};
			`;
      },
      couponBtnStyle1(id) {
        let couponBtn = this.singleCoupon.couponBtn;
        return `
          color: ${couponBtn.color};
          font-size: ${(couponBtn.fontSize / 375) * 318}px;
          left: ${(couponBtn.left / 375) * 318}px;
          top: ${(couponBtn.top / 375) * 318}px;
          width: ${couponBtn.width}%;
          text-align:${couponBtn.align};
          white-space: ${
          couponBtn.direction == "vertical" ? "normal" : "inherit"
          };
          line-height: ${couponBtn.direction == "vertical" ? "1.2" : "1"};
          border: ${
          this.couponStyle == 7 ? "1px solid" + couponBtn.color : "none"
          };
        `;
      },
      minimgUrlStyle1(id) {
        return `
				left: ${(this.singleCoupon.minimgUrl.left / 375) * 318}px;
				top: ${(this.singleCoupon.minimgUrl.top / 375) * 318}px;
        width: ${(this.singleCoupon.minimgUrl.width / 375) * 318}px;
			`;
      }
    }
  };
</script>

<style scoped lang="scss">
  .style5 {
    width: 223 * 320/750 + px;
    height: 98 * 320/750 + px;
    background: rgba(253, 179, 178, 1);
    border-radius: 40 * 320/750 + px;
    display: inline-block;
    .content {
      width: 100%;
      height: 100%;
      display: flex;
      justify-content: center;
      align-items: center;
      border-radius: 40 * 320/750 + px;

      .prices {
        width: 70 * 320/750 + px;
        margin-right: 5px;
        .num {
          font-size: 52 * 320/750 + px;
          font-family: PingFang SC;
          font-weight: bold;
          color: rgba(255, 255, 255, 1);
          display: inline-block;
          margin-left: -12 * 320/750 + px;
        }
        .dollar {
          display: inline-block;
          font-size: 28 * 320/750 + px;
          font-family: PingFang SC;
          font-weight: bold;
          color: rgba(255, 255, 255, 1);
        }
      }
      .txt {
        .txt1 {
          text-align: center;
          margin-bottom: 6 * 320/750 + px;
          font-size: 22 * 320/750 + px;
          font-family: PingFang SC;
          font-weight: bold;
          color: rgba(255, 255, 255, 1);
        }
        .txt2 {
          font-size: 24 * 320/750 + px;
          font-family: PingFang SC;
          font-weight: bold;
          color: rgba(255, 255, 255, 1);
        }
      }
    }
  }
  // .normal {
  //   position: relative;
  //   display: inline-block;
  //   overflow: hidden;
  //   width: 90px;
  //   vertical-align: middle;
  .cont-wrap {
    height: 100%;
    width: 100%;
    position: absolute;
    left: 0;
    top: 0;
    display: flex;
    justify-content: space-between;
    .left-wrap {
      position: relative;
      width: 105px;
    }
    .price {
      top: 19px;
    }
    .condition {
      padding-top: 8px;
    }
    .couponBtn {
      align-self: center;
      width: 35px !important;
      position: initial !important;
    }
  }

  img {
    width: 90px;
    vertical-align: middle;
  }
  // &:last-child {
  //   margin-right: 0 !important;
  // }
  .currency {
    position: absolute;
    top: 0;
  }
  .price {
    position: absolute;
    top: 0;
    overflow: hidden;
  }
  .company {
    position: absolute;
    top: 0;
  }
  .title {
    position: absolute;
    top: 0;
  }
  .condition {
    position: absolute;
    top: 0;
  }
  .coupon-btn {
    position: absolute;
    top: 0;
  }
  .couponBtn {
    position: absolute;
    top: 0;
    left: 0;
  }
  .minimgUrl {
    position: absolute;
    top: 0;
    left: 0;
  }
  // }
</style>
