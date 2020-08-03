<template>
  <div
    class="box-wap"
    :style="{paddingLeft: !is_class?(320/750*config.bigLrMargin+'px'): 0,paddingRight: !is_class?(320/750*config.bigLrMargin+'px'):0}"
  >
    <!-- 商品分组展示区域 -->
    <div
      v-if="config.title"
      class="group-title"
    >
      <div
        class="custom-title"
        :style="{'background':config.titleBackgroundColor,'color':config.titleColor,'text-align':config.titleAlign}"
      >
        <span
          class="title"
          :style="{'font-size':config.titleFontsize}"
        >{{config.title}}</span>
      </div>
      <!-- 商品简介区域 -->
      <div v-html="config.decorateHtml"></div>
    </div>
    <div
      class="goods-list"
      :class="{'overList':config.listType == 6,'is_class':is_class}"
      :style="goodsListStyle"
    >
      <div
        class="goods-item-box"
        v-for="(item,index) in list"
        :key="item.id"
        :class="classList"
        v-if="config.source == 2 ? index < config.showCount:true"
      >
        <div
          class="goods-item__wrapper"
          :class="classList1"
          :style="wrapperStyle"
        >
          <div
            class="img-square"
            :class="classList2"
          >
            <div
              class="myImg"
              :style="{'background-image':'url(' + item.thumb_image_path + ')', 'border-radius': config.borderRadius+'px'}"
            ></div>
          </div>
          <div
            v-if="config.cornerIcon === 1 && config.content.includes(5)"
            class="corner-ctn good-new"
          >新品</div>
          <div
            v-if="config.cornerIcon === 2 && config.content.includes(5)"
            class="corner-ctn good-hot"
          >热卖</div>
          <div
            v-if="config.cornerIcon === 3 && config.content.includes(5)"
            class="corner-ctn good-new"
          >NEW</div>
          <div
            v-if="config.cornerIcon === 4 && config.content.includes(5)"
            class="corner-ctn good-hot"
          >HOT</div>
          <img
            v-if="config.cornerIcon === 5 && config.content.includes(5)"
            :src="config.cornerImg"
            class="corner-ctn-img"
          />
          <div
            v-if="config.cornerIcon === 6 && config.content.includes(5)"
            class="corner-ctn good-hot"
          >{{config.cornerText}}</div>
        </div>
        <div
          class="item-content"
          :style="{background:config.bgColor}"
        >
          <div
            class="card contentBox"
            v-if="config.style != 1"
          >
            <h3
              v-if="config.content.includes(1)"
              :style="{
                fontSize:config.nameSize/2+'px',
                lineHeight:(config.nameSize/2 + 4)+'px',
                color:config.nameColor
              }"
              :class="config.lineCount == 1?'oneLine':'h3'"
            >{{item.item_title}}</h3>
            <!-- <p class="sub-title" v-if="config.content.includes(2)">{{item.selling_point}}</p> -->
            <p
              class="sub-title"
              v-if="config.content.includes(2) && config.listType !== 4"
              :style="{
                fontSize:config.subNameSize/2+'px',
                color:config.subNameColor
              }"
            >{{item.selling_point}}</p>
            <!-- <span v-if="config.content.includes(3)" class="price">￥ {{item.current_price}}</span> -->
            <!-- <div> -->
            <p
              class="card_right_price_integral"
              :style="priceStyle"
              v-if="config.content.includes(3)"
            >
              <span
                class="Identification"
                v-if="config.beforeText"
                :style="priceSymbolSize"
              >
                {{config.beforeText}}
              </span>
              <span
                class="Identification"
                :style="priceSymbolSize"
              >￥</span>
              <span
                class="prices"
                :style="pricesFz"
              >{{item.current_price | integer}}</span>
              <span
                class="point_prices"
                :style="pointSize"
              >{{ item.current_price | floatNum}}</span>
            </p>
            <p
              class="card_right_price_original"
              v-if="config.content.includes(8) && (config.listType == 1 ||config.listType == 4)"
            >
              <span class="Identification">￥</span>
              <span class="prices">100.</span>
              <span class="point_prices">00</span>
            </p>
            <!-- </div> -->
            <p
              class="sub-title"
              v-if="config.content.includes(2) && config.listType == 4"
              :style="{
                fontSize:config.subNameSize/2+'px',
                color:config.subNameColor
              }"
            >{{item.selling_point}}</p>
            <p
              v-if="config.content.includes(7) && (config.listType == 2 || config.listType == 3 || config.listType == 4 || config.listType == 5)"
              class="purchased"
            >X人付款</p>
            <!-- <img src="../../assets/Shopping Cart.png" alt="" class="buy-icon1" v-if="config.content.includes(4) && config.buyIcon === 1"/> -->
            <div
              class="buy-icon1"
              v-if="config.content.includes(4) && config.buyIcon === 1"
            >
              <div class="global_car">
                <i class="iconfont icon-shopcar"></i>
              </div>
            </div>
            <!-- <i v-if="config.content.includes(4) && config.buyIcon === 2" class="buy-icon1 buy-icon iconfont"></i> -->
            <img
              src="http://img.wkdao.com/image/65/2020/08/03/7bf793a65465a807832f90e93c6dacc5.png"
              v-if="config.content.includes(4) && config.buyIcon === 2"
              class="buy-icon1"
            />
            <span
              v-if="config.content.includes(4) && config.buyIcon === 3"
              class="buy-text"
            >{{config.buyText}}</span>
            <span
              v-if="config.content.includes(4) && config.buyIcon === 4"
              class="buy-text1"
            >{{config.buyText}}</span>
            <span
              v-if="config.content.includes(4) && config.buyIcon === 5"
              class="buy-icon5"
            >{{config.buyText}}</span>
            <span
              v-if="config.content.includes(4) && config.buyIcon === 7"
              class="buy-icon7"
            >{{config.buyText}}</span>
            <span
              v-if="config.content.includes(4) && config.buyIcon === 8"
              class="buy-icon8 iconfont icon-gouwuche1"
            ></span>
            <img
              :src="config.carImg"
              :style="iconBuyStyle"
              class="buy-icon-self"
              v-if="config.content.includes(4) && config.buyIcon === 6"
              alt=""
            >
          </div>
          <div
            v-if="config.style === 1"
            class="simple contentBox"
          >
            <h3
              :class="config.lineCount == 1?'oneLine':'h3'"
              v-if="config.content.includes(1)"
              :style="{
                fontSize:config.nameSize/2+'px',
                lineHeight:config.nameSize/2 + 4+'px',
                color:config.nameColor
              }"
            >{{item.item_title}}</h3>
            <p
              class="sub-title"
              v-if="config.content.includes(2)"
              :style="{
                fontSize:config.subNameSize/2+'px',
                color:config.subNameColor
              }"
            >{{item.selling_point}}</p>
            <!-- <span v-if="config.content.includes(3)" class="price price_change">￥ {{item.current_price}}</span> -->
            <p
              class="card_right_price_integral"
              v-if="config.content.includes(3)"
              :style="priceStyle"
            >
              <span
                class="Identification"
                v-if="config.beforeText"
                :style="priceSymbolSize"
              >
                {{config.beforeText}}
              </span>
              <span
                class="Identification"
                :style="priceSymbolSize"
              >￥</span>
              <span
                class="prices"
                :style="pricesFz"
              >{{item.current_price | integer}}</span>
              <span
                class="point_prices"
                :style="pointSize"
              >{{ item.current_price | floatNum}}</span>
            </p>
            <p
              v-if="(config.listType == 2 || config.listType == 3 ||  config.listType == 5) && config.content.includes(7)"
              class="purchased"
            >1X人付款</p>
          </div>
        </div>
      </div>
      <div
        class="show-more"
        :class="[config.listType == 6?'vertical-layout':'',viewMoreType?viewMoreType:'']"
        :style="viewMore"
        v-if="config.content.includes(6) && config.listType == 6"
      >
        {{config.viewMoreText}}
        <i
          class="iconfont icon-gengduo1"
          v-if="!config.viewMoreStyle"
        ></i>
      </div>
    </div>
    <div
      class="show-more"
      :class="[config.listType == 6?'vertical-layout':'',viewMoreType?viewMoreType:'']"
      :style="viewMore"
      v-if="config.content.includes(6) && config.listType != 6"
    >
      {{config.viewMoreText}}
      <i
        class="iconfont icon-gengduo1"
        v-if="!config.viewMoreStyle"
      ></i>
    </div>
  </div>
</template>

<script>
  export default {
    name: "GoodsItem",
    // is_class -- 知识分类组件使用
    props: ["list", "config", 'is_class'],
    filters: {
      integer: function (value) {
        //包括小数点和小数点之前的整数值
        if (value.indexOf(".") > -1) {
          return value.slice(0, value.indexOf(".") + 1);
        }
        return value;
      },
      floatNum: function (value) {
        //小数点后面的数值
        if (value.indexOf(".") > -1) {
          return value.slice(value.indexOf(".") + 1);
        }
        return "";
      }
    },
    computed: {
      wrapperStyle() {
        let style = { background: this.config.bgColor, paddingBottom: this.config.picMb / 2 + 'px' }
        if (this.config.fillType == 1) {
          style.padding = `${this.config.borderWidth / 2 || 10}px`
        }
        return style
      },
      viewMore() {
        let style = {
        };

        if (this.config.viewMoreStyle == 1 || this.config.viewMoreStyle == 2) {
          style.borderCOlot = this.config.viewMoreColor
        }
        style.color = this.config.viewMoreColor;
        return style
      },
      viewMoreType() {
        return `view-more-type-${this.config.viewMoreStyle}`
      },
      classList() {
        let str = " ";
        switch (this.config.listType) {
          case 1:
            str += "big-img";
            break;
          case 2:
            str += "small-img";
            break;
          case 3:
            str += "one-two";
            break;
          case 4:
            str += "detail-list";
            break;
          case 5:
            str += "three-part";
            break;
          case 6:
            str += "overflow";
            break;
        }
        return str;
      },
      iconBuyStyle() {
        return {
          width: `${this.config.buyIconSize / 2 * 1}px`,
          position: 'absolute',
          right: 0,
          top: `${this.config.carImgTop / 2 * 1}px`
        }
      },
      priceStyle() {
        let fz = this.config.priceSize || 32;
        return `font-size:${fz / 2}px;
        line-height:${fz / 2 + 4}px;
                color:${this.config.priceColor || '#ff1f19'};
                margin-top:${this.config.priceMt / 2}px`
      },
      priceSymbolSize() {
        let fz = this.config.priceSymbolSize || 22;
        return `font-size:${fz / 2}px;`
      },
      pricesFz() {
        let fz = this.config.priceSize || 32;
        return `font-size:${fz / 2}px;`
      },
      pointSize() {
        let fz = this.config.pointSize || 24;
        return `font-size:${fz / 2}px;fontWeight:${this.config.priceBlod ? 'blod' : 'normal'}`
      },
      classList1() {
        let str = " ";
        // fillType 1：留白 2：填充
        if (this.config.fillType === 1) {
          str += " img-white";
        } else {
          str += " img-full";
        }
        return str;
      },
      classList2() {
        let str = " ";
        // zooms显示比例 3:2, 1:1
        if (this.config.zoom === 2) {
          str += " average";
        } else {
          str += " average1";
        }
        return str;
      },
      goodsListStyle() {
        if (this.config.listType == 5) {
          return `
          background: ${320 / 750 * this.config.backgroundColor};
          border-color: ${320 / 750 * this.config.borderColor};
          padding-right: ${320 / 750 * this.config.lrMargin}px;
          padding-left: ${320 / 750 * this.config.lrMargin}px;
          margin-top:${320 / 750 * this.config.TMargin}px;
          margin-bottom:${320 / 750 * this.config.BMargin}px
        `
        } else {
          return `
          background: ${this.config.backgroundColor};
          border-color: ${this.config.borderColor};
          margin-top:${320 / 750 * this.config.TMargin}px;
          margin-bottom:${320 / 750 * this.config.BMargin}px
        `
        }
      },
      borderRadius() {
        return `
        border-radius: ${this.config.borderRadius};
      `
      }
    }
  };
</script>

<style lang="scss" scoped>
  h3 {
    margin: 0;
  }
  .buy-icon-self {
    position: absolute;
    right: 10px;
    max-width: 100px;
  }
  .custom-title {
    padding: 10px 0;
  }

  .show-more {
    height: 24px;
    font-size: 10px;
    width: 100%;
    text-align: center;
    color: #999999;
    display: flex;
    align-items: center;
    justify-content: center;
    margin: 0 auto;
    .iconfont {
      font-size: 10px;
      margin-left: 5px;
    }
    &.vertical-layout {
      display: inline-block;
      width: 12px;
      height: 78px;
      padding: 0 30px;
      white-space: normal;
      vertical-align: top;
      margin-top: 14px;
      .iconfont {
        margin-top: 5px;
        margin-left: 0;
      }
    }
  }
  .view-more-type-1,
  .view-more-type-2 {
    border: 1px solid #ccc;
    height: 25px;
    line-height: 25px;
    margin-top: 25px !important;
    width: 240px;
    height: 23px;
    line-height: 23px;
    margin-bottom: 15px;
  }
  .view-more-type-2 {
    width: 180px;
    border: 1px solid #000;
    color: #000;
  }
  .view-more-type-3 {
    // margin: 0 24/2 * 1px;
    width: 600/2 * 1px;
    height: 56/2 * 1px;
    background: rgba(255, 255, 255, 1);
    border-radius: 20/2 * 1px;
    color: #333333;
    margin-top: 20upx;
    font-size: 22/2 * 1px;
    margin-bottom: 15px;
  }
  .goods-list {
    padding: 0px 5px;
    &.is_class {
      padding: 0;
    }
    .goods-item-box {
      // background:#f7f7f7;
      margin-bottom: 10px;
      width: 100%;
      padding: 0 5px;
      .goods-item__wrapper {
        background: #fff;
        width: 100%;
        display: flex;
        justify-content: center;
        padding: 10px;
        .img-square {
          width: 70%;
          position: relative;
          padding-bottom: 70%;
          height: 0px;
          .myImg {
            position: absolute;
            width: 100%;
            height: 100%;
            background-size: 100% 100%;
            background-repeat: no-repeat;
            background-position: center center;
            border-top-left-radius: 10px;
            border-top-right-radius: 10px;
            border-bottom-left-radius: 10px;
            border-bottom-right-radius: 10px;
          }
        }
        .corner-ctn {
          position: absolute;
          background: #ff4873;
          left: 0;
          top: 0;
          color: #fff;
          border-radius: 5px;
          z-index: 999;
          font-size: 12px;
          padding: 2px 8px;
        }
        .corner-ctn-img {
          position: absolute;
          left: 0;
          top: 0;
          width: 40px;
        }
      }
      .item-content {
        background: #fff;
        border-bottom-left-radius: 10px;
        border-bottom-right-radius: 10px;
        margin: 10upx;
        .contentBox {
          .buy-icon1 {
            width: 25px;
            position: absolute;
            right: 20px;
            bottom: 10px;
          }
          .buy-icon5 {
            background: linear-gradient(
              -4deg,
              rgba(255, 102, 0, 1),
              rgba(255, 174, 0, 1)
            );
            position: absolute;
            right: 0px;
            bottom: 10px;
            color: #ffffff;
            padding: 2px 8px;
            border-radius: 10px;
          }
          .buy-icon7 {
            background: #f8d25f;
            position: absolute;
            right: 0px;
            bottom: 10px;
            color: #333;
            padding: 2px 8px;
            border-radius: 10px;
          }
          .buy-icon8 {
            background: #ffe55a;
            position: absolute;
            right: 0px;
            bottom: 10px;
            color: #333;
            border-radius: 24px;
            width: 24px;
            height: 24px;
            line-height: 24px;
            text-align: center;
          }
          .buy-text {
            position: absolute;
            right: 20px;
            bottom: 10px;
            background: #ff4873;
            color: #fff;
            padding: 2px 8px;
            border-radius: 15px;
          }
          .buy-text1 {
            position: absolute;
            right: 20px;
            bottom: 10px;
            color: #ff4873;
            padding: 2px 8px;
            border: 1px solid #ff4873;
            border-radius: 5px;
          }
          .h3 {
            font-size: 13px;
            // height: 34px;
            height: 40px !important;
            line-height: 1.5;
            margin-top: 0px;
            margin-bottom: 0px;
            font-weight: 400;
            text-overflow: -o-ellipsis-lastline;
            overflow: hidden;
            text-overflow: ellipsis;
            display: -webkit-box;
            -webkit-line-clamp: 2;
            line-clamp: 2;
            -webkit-box-orient: vertical;
          }
          .oneLine {
            margin-top: 0px;
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
            font-weight: 400;
          }
          .price {
            display: block;
            color: #ff4873;
            font-size: 16px;
            font-weight: bold;
            margin-top: 5px;
          }
          .price_change {
            margin-left: -12px;
            font-size: 13px;
          }
          .sub-title {
            line-height: 15px;
            height: 15px;
            margin-top: 5px;
            color: #999999;
            white-space: nowrap;
            overflow: hidden;
            text-overflow: ellipsis;
          }
          .card_right_price_integral {
            // margin-top: 5px !important;
          }
        }
        .card {
          padding: 0px 20px 10px 10px;
          position: relative;
        }
        .simple {
          padding: 0px 20px 10px 10px;
          // text-align: center;
        }
      }
      .img-white {
        position: relative;
        .img-square {
          width: 100%;
          position: relative;
          padding-bottom: 100%;
          height: 0px;
        }
        .average1 {
          width: 100%;
          position: relative;
          padding-bottom: 66.7%;
          height: 0px;
        }
      }
      .img-full {
        position: relative;
        padding: 0px;
        padding-bottom: 10px;
        border-top-left-radius: 10px;
        border-top-right-radius: 10px;
        .img-square {
          width: 100%;
          position: relative;
          padding-bottom: 100%;
          height: 0px;
          // margin-bottom: 10px;
        }
        .average1 {
          width: 100%;
          position: relative;
          padding-bottom: 66.67%;
          height: 0px;
        }
      }
    }
    .small-img {
      width: 50%;
      float: left;
      .item-content {
        .contentBox {
          .buy-icon1 {
            width: 25px;
            position: absolute;
            right: 10px;
            bottom: 10px;
          }
          .price {
            font-size: 14px;
          }
          .buy-text,
          .buy-icon5,
          .buy-icon7,
          .buy-icon8 {
            right: 5px;
          }
          .buy-text1 {
            right: 5px;
          }
        }
        .card {
          padding: 0px 10px 10px 10px;
          position: relative;
        }
        .simple {
          padding: 0px 10px 10px 10px;
          // text-align: center;
        }
      }
    }
    .one-two {
      &:nth-child(3n + 1) {
        width: 100%;
      }
      &:nth-child(3n + 2) {
        width: 50%;
        float: left;
        .item-content {
          .contentBox {
            .buy-icon1 {
              width: 25px;
              position: absolute;
              right: 10px;
              bottom: 10px;
            }
            .price {
              font-size: 14px;
            }
            .buy-text,
            .buy-icon5,
            .buy-icon7,
            .buy-icon8 {
              right: 5px;
            }
            .buy-text1 {
              right: 5px;
            }
          }
          .card {
            padding: 0px 10px 10px 10px;
            position: relative;
          }
          .simple {
            padding: 0px 10px 10px 10px;
            // text-align: center;
          }
        }
      }
      &:nth-child(3n) {
        width: 50%;
        float: left;
        .item-content {
          .contentBox {
            .buy-icon1 {
              width: 25px;
              position: absolute;
              right: 10px;
              bottom: 10px;
            }
            .price {
              font-size: 14px;
            }
            .buy-text,
            .buy-icon5,
            .buy-icon7,
            .buy-icon8 {
              right: 5px;
            }
            .buy-text1 {
              right: 5px;
            }
          }
          .card {
            padding: 0px 10px 10px 10px;
            position: relative;
          }
          .simple {
            padding: 0px 10px 10px 10px;
            // text-align: center;
          }
        }
      }
    }
    .three-part {
      width: 33.33%;
      float: left;
      .item-content {
        .contentBox {
          .buy-icon1 {
            width: 25px;
            position: absolute;
            right: 10px;
            bottom: 10px;
          }
          h3 {
            // line-height: 30px;
            height: 22px !important;
            font-size: 14px;
            // padding-top:10px;
            margin-bottom: 0px;
            margin-top: 0px;
            white-space: nowrap;
            overflow: hidden;
            text-overflow: ellipsis;
            display: block;
          }
          .price {
            display: block;
            color: #ff4873;
            font-size: 14px;
            font-weight: bold;
            margin-top: 0px;
          }
          p {
            // margin-bottom:10px;
            line-height: 15px;
            height: 15px;
            overflow: hidden;
          }
        }
        .card {
          padding: 0px 10px 10px 10px;
          position: relative;
        }
        .simple {
          padding: 0px 10px 10px 10px;
          // text-align: center;
        }
      }
    }
    .detail-list {
      // display: flex;
      background: #fff;
      margin-bottom: 10px;
      .goods-item__wrapper {
        width: 100px;
        height: 100px;
        padding: 0px;
        float: left;
        .img-square {
          width: 100%;
          height: 100%;
          .myImg {
            border-radius: 10px;
          }
        }
      }
      .item-content {
        // flex:1;
        height: 100px;
        float: left;
        width: calc(100% - 100px);
        .card {
          height: 100%;
          width: 100%;
          position: relative;
          display: flex;
          flex-direction: column;
          justify-content: space-evenly;
          h3 {
            height: 34px;
            word-break: break-all;
            white-space: pre-wrap;
            overflow: hidden;
            text-overflow: ellipsis;
            display: -webkit-box;
            -webkit-line-clamp: 2;
            -webkit-box-orient: vertical;
            // line-height:20px;
          }
          .price {
            display: block;
            position: absolute;
            bottom: 5px;
          }
          .sub-title {
            margin-top: 0;
          }
          .purchased {
            margin-top: 0;
          }
          .buy-icon1 {
            bottom: 5px;
            right: 10px;
          }
          .buy-text {
            right: 5px;
            bottom: 5px;
          }
          .buy-text1 {
            right: 5px;
            bottom: 5px;
          }
        }
      }
      &::after {
        clear: both;
        display: block;
        content: "";
      }
    }
    &::after {
      clear: both;
      display: block;
      content: "";
    }
  }
  .overList {
    overflow-y: hidden;
    overflow-x: auto;
    white-space: nowrap;
    .overflow {
      width: 30%;
      position: relative;
      display: inline-block;
      &:last-child {
        margin-right: 5px;
      }
    }
    .goods-item-box {
      .item-content {
        .contentBox {
          h3 {
            display: block;
            height: 18px !important;
            white-space: nowrap;
            overflow: hidden;
            text-overflow: ellipsis;
          }
        }
      }
    }
  }
  .card_right_price_integral,
  .card_right_price_original {
    color: #ff1f19;
    font-size: 16px;
    display: inline-block;
    .Identification {
      font-size: 12px;
    }
    .prices {
      font-weight: bold;
      font-size: 15px;
    }
    .point_prices {
      font-size: 12px;
    }
  }
  .card_right_price_original {
    color: #999;
    font-size: 16px;
    text-decoration: line-through;
    .Identification {
      font-size: 12px;
    }
    .prices {
      font-weight: bold;
      font-size: 15px;
    }
    .point_prices {
      font-size: 12px;
    }
  }
  .purchased {
    font-size: 12px;
    font-weight: 400;
    color: #bbbdc0;
    margin-top: 10px;
    margin-left: 2px;
  }
</style>
