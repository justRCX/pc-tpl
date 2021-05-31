<template>
  <div>
    <div
      class="goods-list"
      :class="{'listType2':config.listStyle==2}"
      :style="{'background':config.backgroundColor}"
    >
      <div
        class="goods-tab"
        v-if="config.dateType == 1"
        :style="{'background':'linear-gradient(90deg, '+(config.dateBackgroundColor1||config.dateBackgroundColor2)+','+ (config.dateBackgroundColor2||config.dateBackgroundColor1)+')'}"
      >
        <div
          class="tab-item"
          :style="{color:config.defaultFontColor}"
          v-for="i of parseInt(config.beforeDate>2?2:(config.beforeDate || 0))"
          :key="'before'+i"
        >
          {{formatFate((config.beforeDate>2?2:config.beforeDate)-i+1,0)}}
          <br />已开抢
        </div>
        <div
          class="tab-item"
          :style="{color:config.activeFontColor}"
        >
          {{formatFate(0,0)}}
          <br />正在疯抢
        </div>
        <div
          class="tab-item"
          :style="{color:config.defaultFontColor}"
          v-for="j of parseInt(config.afterDate>2?2:(config.afterDate || 0))"
          :key="'after'+j"
        >
          {{formatFate(j,1)}}
          <br />即将开抢
        </div>
      </div>
      <div
        v-if="config.dateType == 2"
        class="date_wapper"
      >
        <p class="date_wapper_name">{{getName}}中</p>
        <p class="date_wapper_time">{{formatFate(0,0)}}</p>
      </div>
      <div
        v-for="(goods,index) in list"
        :key="index"
      >
        <div
          class="goods-item-box"
          v-for="(item,i) in goods.item"
          :key="i"
          :class="classList"
        >
          <div
            class="goods-item__wrapper"
            v-if="config.listType==1"
          >
            <div class="img-square img-full">
              <div
                class="myImg"
                :style="{'background-image':'url(' + item.thumb_image_path + ')'}"
              ></div>
              <div
                class="sale-info"
                :style="{'background':'linear-gradient(90deg, '+(config.shadeColor1||config.shadeColor2)+','+ (config.shadeColor2||config.shadeColor1)+')'}"
              >
                <div class="info-left">
                  <div class="num_wappper">
                    <div class="buy-num">
                      已抢
                      <span class="already-purchased">xx件</span>
                    </div>
                    <!-- <div
                      class="buy-num"
                      v-if="config.type==34"
                    >
                      已参团
                      <span class="already-purchased">xxx人</span>
                    </div> -->
                  </div>
                  <div
                    class="buy-price"
                    v-if="config.listStyle == 1"
                  >
                    <span class="Identification">￥</span>
                    <span class="prices">{{item.current_price | integer}}</span>
                    <span class="point_prices">{{ item.current_price | floatNum}}</span>
                  </div>
                </div>
                <div class="info-right">
                  <img
                    :src="fontIcon"
                    class="font-icon"
                    v-if="config.listStyle == 1"
                  />
                  <div class="end-time">
                    距结束
                    <span class="time-style">xx</span>:
                    <span class="time-style">xx</span>:
                    <span class="time-style">xx</span>
                  </div>
                </div>
              </div>
            </div>
            <div class="item-content">
              <div
                class="card contentBox"
                :style="{'padding-bottom': config.listStyle==1?'40px':''}"
              >
                <h3>{{item.item_title}}</h3>
                <p
                  class="sub-title"
                  v-if="item.selling_point"
                >{{item.selling_point}}</p>
                <div
                  class="price_wapper"
                  v-if="config.listStyle == 2"
                >
                  <span class="Identification">￥</span>
                  <span class="prices">{{item.current_price | integer}}</span>
                  <span class="point_prices">{{ item.current_price | floatNum}}</span>
                  <span
                    class="line_price"
                    v-if="item.original_price"
                  >￥{{item.original_price}}</span>
                </div>
                <p></p>
                <div v-if="config.type!=35 && config.type!=34">
                  <div
                    class="buy-icon1"
                    v-if="config.buyIcon === 1"
                  >
                    <div class="global_car">
                      <i class="iconfont icon-shopcar"></i>
                    </div>
                  </div>
                  <img
                    src="http://img.wkdao.com/image/65/2020/09/14/adb0ca94c2b37e513e96d983d37920f5.png"
                    v-if="config.buyIcon === 2"
                    class="buy-icon1"
                  />
                  <span
                    v-if="config.buyIcon === 3"
                    class="buy-text"
                  >{{config.buyText}}</span>
                  <span
                    v-if="config.buyIcon === 4"
                    class="buy-text1"
                  >{{config.buyText}}</span>
                  <span
                    v-if="config.buyIcon === 5"
                    class="buy-text5"
                  >{{config.buyText}}</span>
                </div>
              </div>
            </div>
          </div>
          <div
            class="goods-item__wrapper"
            v-if="config.listType==2"
          >
            <div class="img-square img-middle">
              <div
                class="myImg"
                :style="{'background-image':'url(' + item.thumb_image_path + ')'}"
              ></div>
              <div
                class="sale-info"
                :style="{'background':'linear-gradient(90deg, '+(config.shadeColor1||config.shadeColor2)+','+ (config.shadeColor2||config.shadeColor1)+')'}"
              >
                <div class="info-left">
                  <div class="buy-num">已售xx</div>
                </div>
                <div class="info-right">
                  <div class="end-time">
                    距结束
                    <span class="time-style">xx</span>:
                    <span class="time-style">xx</span>:
                    <span class="time-style">xx</span>
                  </div>
                </div>
              </div>
            </div>
            <div class="item-content">
              <div class="card contentBox">
                <h3>{{item.item_title}}</h3>
                <p class="sub-title">{{item.selling_point}}</p>
                <div class="buy-price">
                  <span class="Identification">￥</span>
                  <span class="prices">{{item.current_price | integer}}</span>
                  <span class="point_prices">{{ item.current_price | floatNum}}</span>
                </div>
                <div v-if="config.type!=35 && config.type!=34">
                  <div
                    class="buy-icon1"
                    v-if="config.buyIcon === 1"
                  >
                    <div class="global_car">
                      <i class="iconfont icon-shopcar"></i>
                    </div>
                  </div>
                  <img
                    src="http://img.wkdao.com/image/65/2020/09/14/adb0ca94c2b37e513e96d983d37920f5.png"
                    v-if="config.buyIcon === 2"
                    class="buy-icon1"
                  />
                  <span
                    v-if="config.buyIcon === 3"
                    class="buy-text"
                  >{{config.buyText}}</span>
                  <span
                    v-if="config.buyIcon === 4"
                    class="buy-text1"
                  >{{config.buyText}}</span>
                  <span
                    v-if="config.buyIcon === 5"
                    class="buy-text5"
                  >{{config.buyText}}</span>
                </div>
              </div>
            </div>
          </div>
          <div
            class="goods-item__wrapper"
            v-if="config.listType==3"
          >
            <div class="img-square img-detail">
              <div
                class="myImg"
                :style="{'background-image':'url(' + item.thumb_image_path + ')'}"
              ></div>
              <div
                class="sale-info"
                :style="{'background':'linear-gradient(90deg, '+(config.shadeColor1||config.shadeColor2)+','+ (config.shadeColor2||config.shadeColor1)+')'}"
              >
                <div class="info-right">
                  <div class="end-time">
                    距结束
                    <span class="time-style">xx</span>:
                    <span class="time-style">xx</span>:
                    <span class="time-style">xx</span>
                  </div>
                </div>
              </div>
            </div>
            <div class="item-content">
              <div class="card contentBox">
                <h3>{{item.item_title}}</h3>
                <p class="sub-title">{{item.selling_point}}</p>
                <div class="slider"></div>
                <!-- <div
                  class="joinNum"
                  v-if="config.type==34"
                >已参团：xxx 人</div> -->
                <div class="buy-price">
                  <span class="Identification">￥</span>
                  <span class="prices">{{item.current_price | integer}}</span>
                  <span class="point_prices">{{ item.current_price | floatNum}}</span>
                </div>
                <div v-if="config.type!=35 && config.type!=34">
                  <div
                    class="buy-icon1"
                    v-if="config.buyIcon === 1"
                  >
                    <div class="global_car">
                      <i class="iconfont icon-shopcar"></i>
                    </div>
                  </div>
                  <img
                    src="http://img.wkdao.com/image/65/2020/09/14/adb0ca94c2b37e513e96d983d37920f5.png"
                    v-if="config.buyIcon === 2"
                    class="buy-icon1"
                  />
                  <span
                    v-if="config.buyIcon === 3"
                    class="buy-text"
                  >{{config.buyText}}</span>
                  <span
                    v-if="config.buyIcon === 4"
                    class="buy-text1"
                  >{{config.buyText}}</span>
                  <span
                    v-if="config.buyIcon === 5"
                    class="buy-text5"
                  >{{config.buyText}}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: "SaleShow",
    props: ["list", "config"],
    data() {
      return {
        nowDate: new Date().getTime(),
      };
    },
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
      fontIcon() {
        switch (this.config.type) {
          case 33: return 'http://img.wkdao.com/image/65/2020/09/14/a709dfe2ee6d70f042fa3f2127c91e59.png';
            break;
          case 34: return 'http://img.wkdao.com/image/65/2020/09/14/c780dfb762da90c0f6f66d4b38f1e95b.png';
            break;
          case 35: return 'http://img.wkdao.com/image/65/2020/09/14/3fd00a0dc1736c66b64326d43273808f.png';
            break;
          case 40: return 'http://img.wkdao.com/image/65/2020/09/14/8cf8e80b25f51fdeea5551058b46ff9e.png';
            break;
          case 43: return 'http://img.wkdao.com/image/65/2020/09/14/233a46e4e70487f9bda689875368757f.png';
            break;
        }
      },
      getName() {
        switch (this.config.type) {
          case 33: return '秒杀';
            break;
          case 34: return '拼团';
            break;
          case 35: return '砍价';
            break;
          case 40: return '限时购';
            break;
          case 43: return '限时折扣';
            break;
        }
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
            str += "detail-list";
            break;
        }
        return str;
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
      }
    },
    methods: {
      formatFate(num, type) {
        let date;
        //type 0 前  1 后
        switch (type) {
          case 0:
            date = new Date(this.nowDate - num * 60 * 60 * 24 * 1000).format(
              "MM月dd日"
            );
            break;
          case 1:
            date = new Date(this.nowDate + num * 60 * 60 * 24 * 1000).format(
              "MM月dd日"
            );
            break;
          default:
            date = new Date(this.nowDate - num * 60 * 60 * 24 * 1000).format(
              "MM月dd日"
            );
            break;
        }

        return date;
      }
    }
  };
</script>

<style lang="scss" scoped>
  @function upx($num) {
    @return $num * 318/750 + px;
  }
  .goods-list {
    padding: 5px;
    .goods-tab {
      display: flex;
      height: 47.78px;
      align-items: center;
      justify-content: space-around;
      .tab-item {
        text-align: center;
      }
    }
    .goods-item-box {
      width: 100%;
      padding: 5px;
      .goods-item__wrapper {
        background: #fff;
        width: 100%;
        position: relative;
        padding: 0px;
        // padding-bottom: 10px;
        border-radius: 10px;
        border-radius: 10px;
        .img-square {
          width: 70%;
          position: relative;
          padding-bottom: 70%;
          height: 0px;
          &.img-full {
            width: 297.648px;
            position: relative;
            padding-bottom: 66.67%;
            height: 297.648px;
            .sale-info {
              height: 59.35px;
              .info-left {
                margin-left: 10.176px;
                .num_wappper {
                  display: flex;
                  align-items: center;
                }
                .buy-num {
                  font-size: 10px;
                  margin-top: 10.176px;
                  margin-right: 5px;
                  .already-purchased {
                    line-height: 14.416px;
                    height: 14.416px;
                    padding: 0 2.12px;
                    background: rgba(231, 21, 70, 1);
                    border-radius: 7.208px;
                    font-size: 10px;
                  }
                }
                .buy-price {
                  margin-top: 0.48px;
                  .Identification {
                    font-size: 15.264px;
                  }
                  .prices {
                    font-size: 22.896px;
                  }
                  .point_prices {
                    font-size: 17.808px;
                  }
                }
              }
              .info-right {
                float: right;
                text-align: right;
                margin-right: 10.176px;
                .font-icon {
                  width: 40px;
                  margin-top: 9.752px;
                  height: 20px;
                }
                .end-time {
                  color: #fff;
                  .time-style {
                    width: 12.72px;
                    height: 12.72px;
                    line-height: 12.72px;
                    text-align: center;
                    background-color: #fff;
                    color: #fc133f;
                  }
                }
              }
            }
          }
          &.img-middle {
            width: 145.008px;
            position: relative;
            padding-bottom: 66.67%;
            height: 145.008px;
            .sale-info {
              height: 20.352px;
              line-height: 20.352px;

              .info-left {
                margin-left: 4.24px;
              }
              .info-right {
                margin-right: 4.24px;
              }
            }
          }
          &.img-detail {
            width: 100px;
            height: 100px;
            float: left;
            padding: 0;
            .sale-info {
              height: 20.352px;
              line-height: 20.352px;
              border-bottom-left-radius: 10px;
              border-bottom-right-radius: 10px;
              .info-left {
                margin-left: 4.24px;
              }
              .info-right {
                margin-right: 4.24px;
              }
            }
          }
          .myImg {
            position: absolute;
            width: 100%;
            height: 100%;
            background-size: 100% 100%;
            background-repeat: no-repeat;
            background-position: center center;
            border-top-left-radius: 10px;
            border-top-right-radius: 10px;
          }
          .sale-info {
            position: absolute;
            bottom: 0;
            width: 100%;
            .info-left {
              float: left;
              color: #ffffff;
            }
            .info-right {
              float: right;
              text-align: right;
              .end-time {
                color: #fff;
                .time-style {
                  width: 12.72px;
                  height: 12.72px;
                  line-height: 12.72px;
                  text-align: center;
                  background-color: #fff;
                  color: #fc133f;
                  border-radius: 1.696px;
                }
              }
            }
          }
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
            right: 10px;
            bottom: 10px;
          }
          .buy-text {
            position: absolute;
            right: 10px;
            bottom: 10px;
            background: #ff4873;
            color: #fff;
            padding: 2px 8px;
            border-radius: 15px;
          }
          .buy-text5 {
            padding: upx(10) upx(20);
            position: absolute;
            right: 10px;
            bottom: 10px;
            background: linear-gradient(90deg, #ff3639, #ff8453);
            border-radius: upx(28);
            color: #fff;
            font-size: upx(26);
          }
          .buy-text1 {
            position: absolute;
            right: 10px;
            bottom: 10px;
            color: #ff4873;
            padding: 2px 8px;
            border: 1px solid #ff4873;
            border-radius: 5px;
          }
          h3 {
            font-size: 13px;
            height: 34px;
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
            margin-bottom: upx(30);
          }
          .card_right_price_integral {
            margin-top: 5px !important;
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
          .buy-text {
            right: 5px;
          }
          .buy-text1 {
            right: 5px;
          }
          .buy-text5 {
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
    .detail-list {
      // display: flex;
      background: #fff;
      margin-bottom: 10px;
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
            height: 16.96px;
            word-break: break-all;
            white-space: pre-wrap;
            overflow: hidden;
            text-overflow: ellipsis;
            display: -webkit-box;
            -webkit-box-orient: vertical;
            // line-height:20px;
          }
          .slider {
            width: 101.76px;
            height: 11.024px;
            background: url(http://img.wkdao.com/image/65/2020/09/14/7af69f21b41e80dba7ed5a1ececc4d78.png)
              no-repeat;
            background-size: contain;
            border-radius: 5.512px;
            font-size: 8.056px;
            padding-left: 5.088px;
            color: #fff;
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
          .buy-text1,
          .buy-text5 {
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
  .card_right_price_integral {
    color: #ff1f19;
    font-size: 16px !important;
    .Identification {
      font-size: 12px !important;
    }
    .prices {
      font-weight: bold;
      font-size: 15px;
    }
    .point_prices {
      font-size: 12px !important;
    }
  }
  .purchased {
    font-size: 12px;
    font-weight: 400;
    color: #bbbdc0;
    margin-top: 10px;
    margin-left: 2px;
  }
  .date_wapper {
    color: #f3333d;
    font-weight: 700;
    text-align: center;
    background: url("http://img.wkdao.com/image/65/2020/09/11/1b77329deb415e3ec90649660bee88db.png")
      no-repeat;
    background-size: 100%;
    &_name {
      font-size: upx(32);
    }
    &_time {
      font-size: upx(28);
      background: #fe4144;
      padding: upx(4) upx(10);
      display: inline-block;
      color: #fff;
      border-radius: upx(4);
      margin-bottom: upx(10);
    }
  }
  .listType2 {
    .goods-item-box .item-content .contentBox .sub-title {
      color: #ff0133;
      background: #ffebee;
      padding: upx(6) upx(14);
      display: inline-block;
      border-radius: upx(20);
      font-size: upx(26);
    }
    .goods-item-box .goods-item__wrapper .img-square.img-full .sale-info {
      height: upx(70);
      display: flex;
      align-items: center;
      justify-content: space-between;
      .info-left .buy-num {
        margin-top: 0;
      }
    }
    .price_wapper {
      .Identification {
        font-size: upx(36);
        color: #f72e38;
      }
      .prices {
        font-size: upx(60);
        color: #f72e38;
        font-weight: 700;
      }
      .point_prices {
        font-size: upx(36);
        color: #f72e38;
        font-weight: 700;
      }
      .line_price {
        color: #999999;
        text-decoration: line-through;
        font-size: upx(26);
        margin-left: upx(10);
      }
    }
  }
  .joinNum {
    color: #666;
    font-size: upx(24);
    margin-top: upx(12);
  }
</style>
