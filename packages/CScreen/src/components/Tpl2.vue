<template>
  <div class="fixed">
    <div class="lsdDetail">
      <div class="content">
        <div class="title">{{title}}</div>
        <el-row style="padding:0 .1rem .1rem .1rem;margin-top:.1rem;">
          <el-col style="width:2.6rem">
            <div class="area borderOuter">
              <div class="partTitle">
                <img src="http://img.wkdao.com/image/65/2021/01/09/1bd59d5ea29b52662ed5520b2ddfeb53.png">
                <div class="headTitle">订单区域分布</div>
              </div>
              <div>
                <div
                  class="areaItem"
                  v-for="(item,index) in order_region"
                  :key="index"
                  v-show="index<5"
                >
                  <div class="areaNum">
                    <span class="sort">NO.{{index+1}}</span>
                    <span class="areaName">{{item.region}}</span>
                    <span class="exactNum">{{item.count}}单</span>
                  </div>
                  <div class="progress">
                    <div class="progressInner">
                      <div class="progressBar"></div>
                    </div>
                    <div class="progressNum">{{item.rate}}%</div>
                  </div>
                </div>
              </div>
            </div>
            <div class="access borderOuter">
              <div class="partTitle">
                <img src="http://img.wkdao.com/image/65/2021/01/09/5573c41faae8fffa0fe474e44153fbfb.png">
                <div style="font-size:.08rem">访问分布</div>
              </div>
              <div style="margin-top:-.35rem;margin-left:.13rem">
                <v-chart
                  ref="mapChartId"
                  :options="mapChartOption"
                  style="width:2.17rem;height:1.94rem"
                ></v-chart>
              </div>
            </div>
          </el-col>
          <el-col style="width:3.7rem;margin-left:.25rem;margin-right:.25rem;">
            <div class="trans">
              <div class="transTitle">
                <div class="name">今日交易总额</div>
                <div class="date">{{time}}</div>
              </div>
              <div class="numCon">
                <div
                  class="numSep"
                  :class="{'numSep--symbol':item === ','}"
                  v-for="(item,index) in today_order_fee"
                  :key="index"
                >
                  {{item}}
                </div>
              </div>
              <div class="middle">
                <div class="earthImg">
                  <img src="http://img.wkdao.com/image/65/2021/01/09/04310c6a13e1655a27523adb05e84629.png">
                </div>
                <div class="right">
                  <div class="money middleBorder">
                    <div class="rightItem">
                      <div class="rightImg">
                        <img src="http://img.wkdao.com/image/65/2021/01/09/7feb990cc95e2523f002f72d803dd0f0.png">
                      </div>
                      <div class="rightText">
                        <p class="num">{{yesterday_order_fee}}</p>
                        <p class="rightTitle">昨日交易金额</p>
                      </div>
                    </div>
                    <div
                      class="rightItem"
                      style="margin-top:.14rem;"
                    >
                      <div class="rightImg">
                        <img src="http://img.wkdao.com/image/65/2021/01/09/ca8e933000fdbcd211e9d689b8674574.png">
                      </div>
                      <div class="rightText">
                        <p class="num">{{yesterday_order_count}}</p>
                        <p class="rightTitle">昨日交易笔数</p>
                      </div>
                    </div>
                  </div>
                  <div class="time middleBorder">
                    <div class="rightSubTitle">本月总防御攻击次数</div>
                    <div class="rightItem">
                      <div class="rightImg">
                        <img src="http://img.wkdao.com/image/65/2021/01/09/3b372a4d4be199c9ebb506440307535c.png">
                      </div>
                      <div class="timeNum">{{load.defense_count}}</div>
                    </div>
                  </div>
                </div>
              </div>
              <div class="orderInfo borderOuter">
                <div class="partTitle">
                  <img src="http://img.wkdao.com/image/65/2021/01/09/7006c539e3d5e49d25552906552ef7c7.png">
                  <div style="font-size:.08rem">订单实时信息</div>
                </div>
                <div
                  v-for="(item,index) in order_time"
                  :key="index"
                >
                  <div
                    class="orderItem"
                    v-if="index<4"
                  >
                    <div style="font-size:.08rem">{{item.time}}</div>
                    <div style="font-size:.08rem">{{item.nickname}}<span
                        v-show="item.mobile.length>0"
                        style="font-size:.08rem"
                      >（{{item.mobile}}）</span></div>
                    <div style="font-size:.08rem">下单金额￥{{item.pay_fee}}元</div>
                  </div>
                </div>
                <!-- <div class="borderBottom">
                                    <img src="../../../../assets/lsdDeail/templa2/border.png">
                                </div> -->
              </div>
            </div>
          </el-col>
          <el-col style="width:2.6rem;">
            <div class="rank borderOuter">
              <div class="borderTop">
                <img src="http://img.wkdao.com/image/65/2021/01/09/9eb8638e3daa9b70f7fa3b43bab7343c.png">
              </div>
              <div class="partTitle">
                <img src="http://img.wkdao.com/image/65/2021/01/09/f128324eab70330329795e04f7d2e606.png">
                <div style="font-size:.08rem">业绩排行</div>
              </div>
              <div class="rankList">
                <div
                  class="rankItem"
                  v-for="(item,index) in pusher_sort"
                  :key="index"
                  v-show="index<7"
                >
                  <div class="num">NO.{{index+1}}</div>
                  <div class="money">{{item.achievement_fee}}元</div>
                  <div class="name">{{item.nickname}}
                    <span v-show="item.mobile.length>0">（{{item.mobile}}）</span>
                  </div>
                </div>
              </div>
              <!-- <div class="borderBottom">
                                <img src="../../../../assets/lsdDeail/templa2/border.png">
                            </div> -->
            </div>
            <div class="rate borderOuter">
              <!-- <div class="borderTop">
                                <img src="../../../../assets/lsdDeail/templa2/border.png">
                            </div> -->
              <div class="partTitle">
                <img src="http://img.wkdao.com/image/65/2021/01/09/d08d90bdfc4f2fca37c07190513f428c.png">
                <div style="font-size:.08rem;">销售额占比</div>
              </div>
              <div class="rateList">
                <div
                  class="rateItem middleBorder"
                  v-for="(item,index) in sales_rate"
                  :key="index"
                  v-show="index<6"
                >
                  <div class="rateName">{{item.category}}</div>
                  <div class="rateNum">
                    <div class="rateNum__rate">{{item.rate}}%</div>
                    <div class="rateNum__fee">￥{{item.sale_fee}}</div>
                  </div>
                </div>
              </div>
            </div>
          </el-col>
        </el-row>
      </div>
    </div>
  </div>
</template>
<script>
  import defaultVue from './defaultVue.vue';
  import { colorList } from './prinveColor';
  export default {
    extends: defaultVue,
    data() {
      return {
        areaHeight: 0,    //订单区域分布
      }
    },
    mounted() {
      window.addEventListener('resize', this.resizeTheChart)
    },
    beforeDestroy() {
      window.removeEventListener('resize', this.resizeTheChart)
    },
    methods: {
      caluHeight() {
        console.log(document.body.clientHeight)
        this.areaHeight = document.body.clientHeight - 650;
      },
      dealTodayTotalFee() {  //不满10位前面补0
        let remainLength = 10 - this.today_order_fee.length;  //需要补0的位数
        let tempFee = "";
        for (let i = 0; i < remainLength; i++) {
          tempFee += "0"
        }
        tempFee += this.today_order_fee;
        this.today_order_fee = tempFee;
      },
      dealArea(area) {
        this.$nextTick(() => {
          setTimeout(() => {
            area.forEach((node, index) => {
              document.getElementsByClassName("progressBar")[index].style.width = node.rate + "%"
            })
          }, 300)
        })
      },
      resizeTheChart() {
        let arr = ['mapChartId']
        arr.forEach(item => {
          if (this.$refs && this.$refs[item]) {
            this.$refs[item].resize()
          }
        })
      }
    }
  }
</script>

<style lang="scss" scoped>
  .fixed {
    position: fixed;
    width: 100%;
    height: 100%;
    // background-color: #000930;
    background: url("http://img.wkdao.com/image/65/2021/01/09/d382d1aec033442caaca459f73a2924f.png")
      center no-repeat;
    background-size: 100% 100%;
    ::-webkit-scrollbar {
      /*隐藏滚轮*/
      display: none;
    }
    .lsdDetail {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      min-height: 100%;
      // background: #084550;
      overflow: auto;
      .middleBorder {
        // padding:0 10px 20px 10px;
        width: 100%;
        background: rgba(0, 255, 246, 0.1);
        border: 0.01rem solid rgba(0, 255, 246, 1);
        //box-shadow: 0 0 15px rgba(0,255,246,1);
        border-radius: 0.1rem;
      }
      .borderOuter {
        border: 0.02rem solid rgba(9, 187, 181, 1);
        border-radius: 0.1rem;
        // padding:15px;
        position: relative;
        background: url("http://img.wkdao.com/image/65/2021/01/09/5feaeaeea2dd07a7c9f120a06c25352b.png")
          center no-repeat;
        background-size: 100% 100%;
        .borderTop {
          // margin-top:-.08rem;
          img {
            // height:4px;
            width: 100%;
          }
        }
        .borderBottom {
          // position:absolute;
          // bottom:-8px;
          // width:100%;
          // left:0;
          img {
            // height:4px;
            // width:100%;
          }
        }
        .partTitle {
          // height:.2rem;
          line-height: 0.12rem;
          font-size: 0.08rem;
          font-weight: 400;
          color: rgba(0, 255, 246, 1);
          display: flex;
          -webkit-display: flex;
          margin-bottom: 0.1rem;
          img {
            // margin-top:5px;
            display: block;
            margin-right: 0.09rem;
            width: 0.12rem;
            height: 0.12rem;
          }
          .headTitle {
            font-size: 0.08rem;
          }
        }
      }
      .content {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        // background:url("../../../../assets/lsdDeail/templa2/bac.png") center no-repeat;
        .title {
          background: url("http://img.wkdao.com/image/65/2021/01/09/5940ff2163d04fcedfe148c15c4a3d50.png")
            center no-repeat;
          text-align: center;
          // height: 0.73rem;
          font-size: 0.21rem;
          line-height: 0.65rem;
          font-weight: bold;
          color: rgba(0, 255, 246, 1);
          background-size: 100% 100%;
        }
        .trans {
          margin-top: 0.04rem;
          .transTitle {
            display: flex;
            -webkit-display: flex;
            justify-content: space-between;
            -webkit-justify-content: space-between;
            font-size: 22px;
            .name {
              color: #00fff6;
              letter-spacing: 2px;
              font-size: 0.08rem;
            }
            .date {
              color: white;
              letter-spacing: 1px;
              // width:240px;
              text-align: right;
              font-size: 0.13rem;
            }
          }
          .numCon {
            display: flex;
            -webkit-display: flex;
            justify-content: flex-end;
            -webkit-justify-content: flex-end;
            margin-top: 0.1rem;
            .numSep {
              height: 0.6rem;
              line-height: 0.55rem;
              padding: 0 0.08rem;
              background: url("http://img.wkdao.com/image/65/2021/01/09/9f8cd4fc11ee3f7f8b16c934befbabf4.png")
                center no-repeat;
              background-size: 100% 100%;
              text-align: center;
              color: white;
              font-size: 0.3rem;
              font-weight: bold;
              &--symbol {
                padding: 0 0.005rem;
                background: none;
              }
            }
          }
          .middle {
            overflow: hidden;
            .earthImg {
              width: 5.07rem;
              height: 2.86rem;
              position: absolute;
              left: 1.38rem;
              top: 0.8rem;
              // display: none;
              img {
                width: 100%;
              }
            }
            .right {
              float: right;
              margin-top: 0.3rem;
              .time {
                box-shadow: 0px 0px 0.15rem 0px rgba(0, 0, 0, 0.35);
                padding: 0.12rem 0.1rem;
                width: 1.15rem;
                height: 0.93rem;
                margin-top: 0.1rem;
                position: relative;
                .rightSubTitle {
                  // margin-top:15px;
                  font-size: 0.08rem;
                  font-weight: 400;
                  color: rgba(0, 255, 246, 1);
                  white-space: nowrap;
                }
                .rightItem {
                  // padding:10px 0;
                  display: block;
                  height: 0.3rem;
                  width: 0.5rem;
                  .rightImg {
                    width: 0.42rem;
                    height: 0.39rem;
                    position: absolute;
                    left: 0.1rem;
                    bottom: 0.12rem;
                    img {
                      width: 0.42rem;
                      height: 0.39rem;
                    }
                  }
                  .timeNum {
                    font-size: 0.15rem;
                    font-weight: bold;
                    color: rgba(255, 255, 255, 1);
                    position: absolute;
                    right: 0.1rem;
                    bottom: 0.22rem;
                    white-space: nowrap;
                  }
                }
              }
              .money {
                box-shadow: 0px 0px 0.15rem 0px rgba(0, 0, 0, 0.35);
                padding: 0.15rem 0.11rem;
                width: 1.15rem;
                height: 1.07rem;
                .rightItem {
                  // margin-top:.1rem;
                  // display: flex;
                  // -webkit-display:flex;
                  position: relative;
                  .rightImg {
                    display: inline-block;
                    width: 0.3rem;
                    height: 0.3rem;
                    margin-right: 0.1rem;
                    img {
                      width: 100%;
                    }
                  }
                  .rightText {
                    display: inline-block;
                    width: 0.5rem;
                    // height: .3rem;
                    position: absolute;
                    top: 0;
                    .num {
                      text-align: center;
                      // margin-top:5px;
                      font-size: 0.11rem;
                      font-weight: bold;
                      color: rgba(255, 255, 255, 1);
                      background: linear-gradient(
                        0deg,
                        rgba(255, 72, 115, 1) 0%,
                        rgba(9, 122, 244, 1) 0%,
                        rgba(106, 252, 255, 1) 51.2939453125%,
                        rgba(166, 253, 255, 1) 95.60546875%
                      );
                      -webkit-background-clip: text;
                      -webkit-text-fill-color: transparent;
                    }
                    .rightTitle {
                      text-align: center;
                      font-size: 0.08rem;
                      font-weight: 500;
                      color: rgba(255, 255, 255, 1);
                      white-space: nowrap;
                    }
                  }
                }
              }
              // .rightItem{
              //     // margin-top:.1rem;
              //     display: flex;
              //     -webkit-display:flex;
              //     .rightImg{
              //         width:.3rem;
              //         height:.3rem;
              //         margin-right:.1rem;
              //         img{
              //             width:100%;
              //         }
              //     }

              //     .num{
              //         text-align: center;
              //         // margin-top:5px;
              //         font-size:.11rem;
              //         font-weight:bold;
              //         color:rgba(255,255,255,1);
              //         background:linear-gradient(0deg,rgba(255,72,115,1) 0%, rgba(9,122,244,1) 0%, rgba(106,252,255,1) 51.2939453125%, rgba(166,253,255,1) 95.60546875%);
              //         -webkit-background-clip:text;
              //         -webkit-text-fill-color:transparent;
              //     }
              //     .rightTitle{
              //         text-align: center;
              //         font-size:.08rem;
              //         font-weight:500;
              //         color:rgba(255,255,255,1);
              //         white-space: nowrap;
              //     }
              // }
            }
          }
          .orderInfo {
            margin-top: 0.2rem;
            width: 3.7rem;
            height: 0.99rem;
            padding: 0.1rem;
            .orderItem {
              display: flex;
              -webkit-display: flex;
              justify-content: space-between;
              -webkit-justify-content: space-between;
              font-size: 0.08rem;
              font-weight: 400;
              color: rgba(255, 255, 255, 1);
              margin-bottom: 0.05rem;
            }
          }
        }
        .rank {
          // margin:0 20px 20px 20px;
          // min-height:340px;
          // width:2.5rem;
          height: 2.17rem;
          padding: 0.1rem;
          overflow: hidden;
          .borderTop {
            margin-top: -0.08rem;
          }
          .rankList {
            max-height: 100%;

            .rankItem {
              color: white;
              height: 0.2rem;
              line-height: 0.2rem;
              font-size: 0.08rem;
              overflow: hidden;
              background: linear-gradient(
                90deg,
                rgba(0, 255, 246, 0) 0%,
                rgba(0, 255, 246, 0.2) 100%
              );
              margin-bottom: 10px;
              box-sizing: border-box;
              padding-right: 0.2rem;
              white-space: nowrap;
              margin-right: -0.1rem;
              position: relative;
              .num {
                color: rgb(132, 255, 195);
                // margin-right:10px;
                width: 0.25rem;
                display: inline-block;
                font-size: 0.1rem;
                white-space: nowrap;
                margin-right: 0.25rem;
              }
              .money {
                // margin-right:10px;
                display: inline-block;
                font-size: 0.08rem;
                // margin-right:.53rem;
              }
              .name {
                display: inline-block;
                font-size: 0.08rem;
                text-align: right;
                width: 0.97rem;
                // width:2rem;
                position: absolute;
                right: 0.2rem;
                white-space: nowrap;
                text-align: right;
              }
            }
          }
        }
        .rate {
          // margin:0 20px 20px 20px;
          height: 2.2rem;
          margin-top: 0.14rem;
          padding: 0.1rem;
          .partTitle {
            margin-bottom: 0.05rem !important;
          }
          .borderTop {
            margin-top: -0.18rem;
          }
          .rateList {
            // overflow: hidden;
            display: flex;
            -webkit-display: flex;
            justify-content: space-between;
            -webkit-justify-content: space-between;
            white-space: normal;
            flex-wrap: wrap;
            .rateItem {
              margin-top: 0.05rem;
              // flex:1;
              // background-color:linear-gradient(0deg,rgba(86,217,255,1) 0%,rgba(140,178,255,1) 100%);
              float: left;
              width: 1.15rem;
              height: 0.56rem;
              // margin-bottom:10px;
              // padding:20px;
              padding: 0.08rem;
              background: #0a3c4e
                url("http://img.wkdao.com/image/65/2021/01/09/bce54034c73d52c2434ea0ebfddba3a0.png")
                no-repeat;
              background-position: 95% 98%;
              background-size: 70px 70px;
              // margin-right:4%;
              &:nth-child(2n) {
                margin-right: 0;
              }
              .rateName {
                color: white;
                font-weight: 600;
                font-size: 0.08rem;
              }
              .rateNum {
                margin-top: 0.02rem;
                color: white;
                font-weight: 500;
                &__rate {
                  font-size: 0.1rem;
                  text-align: center;
                }
                &__fee {
                  font-size: 0.1rem;
                  margin-top: 0.01rem;
                  text-align: center;
                }
              }
            }
          }
        }
        .area {
          // margin:0 20px 20px 20px;
          height: 2.4rem;
          padding: 0.1rem;
          .areaItem {
            background: rgba(13, 78, 99, 0.2);
            margin-bottom: 0.09rem;
            padding: 0 0.12rem;
            // height:.34rem;
            border-bottom: solid 0.01rem rgba(255, 255, 255, 0.3);
            border-top: solid 0.01rem rgba(255, 255, 255, 0.3);
            .areaNum {
              margin-bottom: 0.04rem;
              margin-top: 0.04rem;
              .sort {
                color: #fdcd39;
                font-size: 0.1rem;
                margin-right: 0.22rem;
                font-weight: bold;
                width: 0.26rem;
                white-space: nowrap;
              }
              .areaName {
                color: white;
                font-size: 0.1rem;
                margin-right: 0.32rem;
                width: 0.26rem;
                white-space: nowrap;
                display: inline-block;
              }
              .exactNum {
                font-size: 0.1rem;
                color: white;
                width: 0.55rem;
                white-space: nowrap;
              }
            }
            .progress {
              position: relative;
              display: flex;
              -webkit-display: flex;
              // width:1.69rem;
              height: 0.04rem;
              margin-bottom: 0.05rem;
              .progressInner {
                flex: 1;
                // width:1.69rem;
                height: 0.04rem;
                margin-right: 0.17rem;
                .progressBar {
                  // width:30px;
                  height: 0.04rem;
                  background: linear-gradient(
                    96deg,
                    rgba(5, 151, 250, 1),
                    rgba(12, 239, 246, 1)
                  );
                  border-radius: 10px;
                  transition: width 2s;
                  -webkit-transition: width 2s; /* Safari and Chrome */
                  &:hover {
                    // width:220px
                  }
                }
              }
              .progressNum {
                // margin-left:5px;
                // width:80px;
                color: white;
                font-size: 0.12rem;
                // margin-top:-.06rem;
                margin-top: -0.1rem;
              }
            }
          }
        }
        .access {
          // margin:0 20px 20px 20px;
          padding: 0.1rem;
          height: 1.96rem;
          margin-top: 0.14rem;
        }
      }
    }
  }
</style>
