<template>
  <div class="fixed">
    <div class="lsdDetail">
      <div class="content">
        <div class="title">{{title}}</div>
        <el-row class="row">
          <el-col class="leftCon">
            <div class="access">
              <div class="partTitle">访问分布</div>
              <div style="width:100%;height:2.45rem;padding:.06rem;">
                <v-chart
                  ref="mapChartId"
                  :options="mapChartOption"
                  style="width:100%;height:2.45rem"
                ></v-chart>
              </div>
              <div class="newBox">
                <div class="newTitle">
                  <span>订单实时信息</span>
                  <div class="devide"></div>
                </div>
                <div class="newList">
                  <div
                    v-for="(item,index) in order_time"
                    :key="index"
                  >
                    <div
                      class="orderItem"
                      v-if="index<7"
                    >
                      <div
                        style="font-size:.08rem"
                        class="time"
                      >{{item.time}}</div>
                      <div
                        style="font-size:.08rem"
                        class="name"
                      >{{item.nickname}}<span
                          v-show="item.mobile.length>0"
                          style="font-size:.08rem"
                        >（{{item.mobile}}）</span>下单</div>
                      <div
                        style="font-size:.08rem"
                        class="num"
                      >金额￥{{item.pay_fee}}元</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </el-col>
          <el-col style="width:3.19rem;">
            <div class="trans">
              <div
                class="transTitle"
                style="text-align:center"
              >今日交易总额</div>
              <div
                class="transTime"
                style="text-align:center"
              >{{time}}</div>
              <div
                class="money"
                style="text-align:center"
              >{{today_order_fee}}</div>
              <div
                class="submoney"
                style="text-align:center"
              >
                <div
                  class="moneyItem"
                  style="text-align:center"
                >
                  <p
                    class="moneyNum"
                    style="text-align:center"
                  >{{yesterday_order_fee}}</p>
                  <p
                    class="subTitle"
                    style="text-align:center"
                  >昨日交易金额</p>
                </div>
                <div
                  class="moneyItem"
                  style="text-align:center"
                >
                  <p
                    class="moneyNum"
                    style="text-align:center"
                  >{{yesterday_order_count}}</p>
                  <p
                    class="subTitle"
                    style="text-align:center"
                  >昨日交易笔数</p>
                </div>
              </div>
            </div>
            <div class="areaDistri">
              <div class="partTitle">订单区域分布top5</div>
              <div style="margin-top:.12rem;height: 1.2rem;">
                <v-chart
                  ref="areaChartId"
                  :options="areaChartOption"
                  style="height: 100%;width:3.19rem;"
                ></v-chart>
              </div>
            </div>
          </el-col>
          <el-col
            class="rightCon"
            style="width:2.99rem;height:4.79rem"
          >
            <div class="rate">
              <div class="partTitle">销售额占比</div>
              <div style="height:2.43rem;padding-top:.2rem">
                <v-chart
                  ref="rateChartId"
                  :options="rateChartOption"
                  style="width:100%;height: 100%;"
                ></v-chart>
              </div>
            </div>
            <div
              class="rank"
              style="height:2.1rem"
            >
              <div class="rankTitle">
                <div class="rankTitleInner">业绩排行</div>
                <div class="devide"></div>
              </div>
              <div class="rankList">
                <div
                  v-for="(item,index) in pusher_sort"
                  :key="index"
                >
                  <div
                    class="rankItem"
                    v-if="index<7"
                  >
                    <div
                      class="num"
                      style="font-size:.1rem"
                    >NO.{{index+1}}</div>
                    <div
                      class="money"
                      style="font-size:.08rem"
                    >{{item.achievement_fee}}元</div>
                    <div
                      class="name"
                      style="font-size:.08rem"
                    >{{item.nickname}}
                      <span
                        v-show="item.mobile.length>0"
                        style="font-size:.08rem"
                      >（{{item.mobile}}）</span>
                    </div>
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
  import { cylinBottomUrl, cylinMiddleUrl, echartfontSize } from "./cylinImgUrl.js";
  import ECharts from 'vue-echarts/components/ECharts.vue';
  import defaultVue from './defaultVue.vue';
  export default {
    extends: defaultVue,
    data() {
      return {
        top: 20,
        e: '',
        accessDis: [],  //访问分布数据
        //订单区域分布
        areaChartOption: {
          tooltip: {
            trigger: 'item',
            formatter: (params) => {
              if (!params.data) {
                return ''
              }
              return '占比: ' + params.data.rate + '%';
            }
          },
          grid: {
            right: 0,
            top: 0,
            bottom: 0,
            left: 0
          },
          xAxis: {
            data: [],
            axisTick: {
              show: false
            },
            axisLine: {
              show: false
            },
            axisLabel: {
              show: false,
              textStyle: {
                color: '#e54035'
              }
            }
          },
          yAxis: {
            splitLine: {
              show: false
            },
            axisTick: {
              show: false
            },
            axisLine: {
              show: false
            },
            axisLabel: {
              show: false
            }
          },
          series: [{
            type: 'pictorialBar',  //显示比例的圆柱
            data: [],
            label: {
              show: true,
              position: "top",
              formatter: (params) => {
                let count = '';
                let region = '';
                this.order_region.forEach((node, index) => {
                  if (index == params.dataIndex) {
                    region = node.region;
                    count = node.count
                  }
                })
                var arr = [
                  '{a|' + region + '}\n',
                  '{b|' + count + '单}'
                ]
                return arr.join('')
              },
              textStyle: {
                rich: {
                  a: {
                    color: '#11CAF9',
                    fontSize: 24,
                    fontWeight: "bold",
                    align: 'center',
                    lineHeight: 40,
                  },
                  b: {
                    fontSize: 24,
                    color: 'white',
                    align: 'center',
                  }
                }
              },
            }
          }, {
            type: 'bar',   //最底下的圆柱
            itemStyle: {
              barBorderRadius: 2,
              opacity: 0.5,
              color: new ECharts.graphic.LinearGradient(
                0, 0, 0, 1,
                [
                  { offset: 0, color: '#22d0e5' },
                  { offset: 1, color: '#00ffd4' }
                ]
              )
            },
            data: []
          },
          ],
          // symbolSize:['100%','100%']
        },
        //销售额占比
        rateChartOption: {
          color: ["#0278E7", "#6054FF", "#00C6FF", "#F19610", "#8A00E1", "#34D160", '#ff2424', '#e57242', '#553ffe', '#b36dfb'],
          tooltip: {
            trigger: 'item',
            formatter: "{b} :<br/> {c} ({d}%)"
          },
          legend: {
            type: 'scroll',
            pageIconColor: '#fff',
            pageIconInactiveColor: '#666',
            pageTextStyle: {
              color: '#fff'
            },
            orient: 'vertical',
            data: [],
            itemWidth: echartfontSize(0.07),
            itemHeight: echartfontSize(0.07),
            top: 'middle',
            right: echartfontSize(0.05),
            height: 260,
            textStyle: {
              rich: {
                a: {
                  fontSize: echartfontSize(0.08),
                  height: 20,
                  color: '#fff'
                },
                b: {
                  fontSize: echartfontSize(0.08),
                  height: 20,
                  fontWeight: "bold",
                  color: 'rgb(47,213,255)'
                }
              }
            },
            formatter: (name) => {
              let rate = '';
              let fee = '';
              for (var i = 0, l = this.rateChartOption.series[0].data.length; i < l; i++) {
                let data = this.rateChartOption.series[0].data[i];
                if (data.name == name) {
                  fee = data.fee;
                  rate = data.value;
                }
              };
              var arr = [
                '{a|' + name + '}' + '|',
                '{b|' + '￥' + fee + '}'
              ]
              return arr
            }
          },
          calculable: true,
          series: [
            {
              name: '销售额占比',
              type: 'pie',
              radius: [echartfontSize(0.2), echartfontSize(0.8)],
              center: ['30%', '50%'],
              roseType: 'radius',
              label: {
                normal: {
                  show: false
                },
                emphasis: {
                  show: false
                }
              },
              lableLine: {
                normal: {
                  show: false
                },
                emphasis: {
                  show: false
                }
              },
              data: []
            }
          ]
        }
      }
    },
    methods: {
      dealRate(rate) {
        let data = rate.map(item => ({ name: item.category, fee: item.sale_fee, value: item.rate }))
        this.rateChartOption.legend.data = data;
        this.rateChartOption.series[0].data = data;
      },
      dealPvData(pv) {
        this.accessDis = pv;
      },
      dealArea(area) {
        this.areaChartOption.series[0].data = area.map(item => ({
          value: 100,
          rate: item.rate,
          symbol: "image://" + cylinMiddleUrl
        }));

        this.areaChartOption.series[1].data = area.map(item => ({
          value: item.rate,
          rate: item.rate,
          // symbol: "image://" + cylinBottomUrl
        }));
      },
      resizeTheChart() {
        let arr = ['mapChartId', 'areaChartId', 'rateChartId']
        arr.forEach(item => {
          if (this.$refs && this.$refs[item]) {
            this.$refs[item].resize()
          }
        })
      }
    },
    created() {
      let e = document.getElementsByTagName('html')[0].style.cssText;
      e = e.split('font-size:')[1]
      e = e.split('px')[0]
      this.top = parseInt(e * .3)
      this.e = parseInt(e)
    },
    mounted() {
      this.areaChartOption.grid.top = this.top
      this.areaChartOption.grid.bottom = this.e * .1
      this.areaChartOption.series[0].label.textStyle.rich.a.fontSize = this.e * .09
      this.areaChartOption.series[0].label.textStyle.rich.a.lineHeight = this.e * .15
      this.areaChartOption.series[0].label.textStyle.rich.b.fontSize = this.e * .08
      window.addEventListener('resize', this.resizeTheChart)
    },
    beforeDestroy() {
      window.removeEventListener('resize', this.resizeTheChart)
    },
  }
</script>

<style lang="scss" scoped>
  .fixed {
    position: fixed;
    width: 100%;
    height: 100%;
    background: #000930;
    background: url("http://img.wkdao.com/image/65/2021/01/09/6ab29a2f40357d01254b0a008d455968.png")
      center no-repeat;
    background-repeat: no-repeat;
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
      overflow: auto;
      .content {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        .title {
          background: url("http://img.wkdao.com/image/65/2021/01/09/0a39d1d396d43f21afdaeb8ccc49efa5.png")
            center no-repeat;
          text-align: center;
          height: 0.46rem;
          color: white;
          box-sizing: border-box;
          font-size: 0.2rem;
          font-weight: bold;
          background-size: 100% 100%;
        }
        .row {
          margin: 0 0.14rem 0.14rem 0.14rem;
        }
        .trans {
          text-align: center;
          color: white;
          height: 3.12rem;
          padding-top: 0.8rem;
          margin-bottom: 0.09rem;
          .transTitle {
            font-size: 0.24rem;
            font-weight: bold;
          }
          .transTime {
            margin-top: 0.05rem;
            letter-spacing: 1px;
            font-weight: bold;
            font-size: 0.08rem;
          }
          .money {
            font-size: 0.36rem;
            font-weight: bold;
            color: rgba(0, 255, 212, 1);
            background: linear-gradient(
              0deg,
              rgba(44, 244, 209, 1) 0%,
              rgba(34, 208, 229, 1) 100%
            );
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
          }
          .submoney {
            display: flex;
            -webkit-display: flex;
            justify-content: space-between;
            -webkit-justify-content: space-between;
            width: 50%;
            margin: 0.05rem auto;
            .moneyItem {
              .moneyNum {
                font-size: 0.12rem;
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
              .subTitle {
                font-size: 0.08rem;
                letter-spacing: 2px;
              }
            }
          }
        }
        .leftCon {
          width: 2.97rem;
          height: 4.79rem;
          background: url("http://img.wkdao.com/image/65/2021/01/09/3155112460aaa14c6301045bb7193584.png");
          background-size: 100% 100%;
          box-sizing: border-box;
          margin-right: 0.02rem;
          .access {
            .newBox {
              background: url("http://img.wkdao.com/image/65/2021/01/09/e252cec9e1ce13349a341471e41e94ce.png")
                center no-repeat;
              background-size: 100% 40%;
              width: 100%;
              height: 0.17rem;
              margin-top: 0.17rem;
              .newTitle {
                font-size: 0.1rem;
                height: 0.18rem;
                color: #21e8ff;
                text-align: center;
                width: 0.67rem;
                margin: 0 auto;
                margin-bottom: 0.14rem;
                span {
                  font-weight: bold;
                  font-size: 0.1rem;
                  margin-bottom: 0.03rem;
                  display: block;
                }
                .devide {
                  width: 0.67rem;
                  height: 0.02rem;
                  background: linear-gradient(
                    90deg,
                    rgba(45, 119, 243, 1),
                    rgba(33, 232, 255, 1)
                  );
                }
              }

              .newList {
                padding: 0 0.15rem;
                .orderItem {
                  font-size: 0.08rem;
                  font-weight: 400;
                  color: rgba(255, 255, 255, 1);
                  margin-bottom: 0.12rem;
                  width: 100%;
                  position: relative;
                  .num {
                    display: inline-block;
                    font-size: 0.08rem;
                    position: absolute;
                    color: #2fd5ff;
                    text-align: right;
                    right: 0;
                  }
                  .time {
                    display: inline-block;
                    font-size: 0.08rem;
                    color: #2fd5ff;
                    width: 0.38rem;
                    white-space: nowrap;
                    margin-right: 0.4rem;
                  }
                  .name {
                    display: inline-block;
                    font-size: 0.08rem;
                  }
                }
              }
            }
          }
        }
        .areaDistri {
          background: url("http://img.wkdao.com/image/65/2021/01/09/a7902707c71cc41d8bd9f94b4a5b94e8.png");
          background-size: 100% 100%;
          box-sizing: border-box;
          margin-left: 0.07rem;
          width: 3.19rem;
          height: 1.59rem;
        }
        .partTitle {
          color: rgb(47, 213, 255);
          text-align: center;
          font-size: 0.1rem;
          letter-spacing: 1px;
          font-weight: bold;
          width: 1.48rem;
          height: 0.24rem;
          line-height: 0.24rem;
          margin: 0 auto;
          margin-top: 0.01rem;
          background: url("http://img.wkdao.com/image/65/2021/01/09/4159c1f7223985f154907484b82a1ae0.png");
          background-size: 100% 100%;
        }
        .rightCon {
          background: url("http://img.wkdao.com/image/65/2021/01/09/3155112460aaa14c6301045bb7193584.png");
          background-size: 100% 100%;
          margin-left: 0.15rem;
          .rank {
            overflow: hidden;
            .rankTitle {
              background: url("http://img.wkdao.com/image/65/2021/01/09/e252cec9e1ce13349a341471e41e94ce.png")
                center no-repeat;
              background-size: 100% 40%;
              margin-bottom: 0.14rem;
              height: 0.18rem;
              .rankTitleInner {
                font-size: 0.1rem;
                color: #21e8ff;
                text-align: center;
                width: 0.67rem;
                font-weight: bold;
                margin: 0 auto;
                margin-bottom: 0.03rem;
              }
              .devide {
                width: 0.67rem;
                margin: 0px auto;
                height: 0.015rem;
                background: linear-gradient(
                  90deg,
                  rgba(45, 119, 243, 1),
                  rgba(33, 232, 255, 1)
                );
              }
            }
            .rankList {
              padding: 0 0.15rem;
              .rankItem {
                margin-bottom: 0.1rem;
                color: white;
                .num {
                  color: rgb(132, 255, 195);
                  width: rgb(27, 126, 78);
                  display: inline-block;
                  font-size: 0.1rem;
                  white-space: nowrap;
                  margin-right: 0.5rem;
                }
                .money {
                  display: inline-block;
                  font-size: 0.08rem;
                }
                .name {
                  display: inline-block;
                  font-size: 0.08rem;
                  text-align: right;
                  width: 0.97rem;
                  position: absolute;
                  right: 0.2rem;
                  white-space: nowrap;
                  text-align: right;
                }
              }
            }
          }
        }
      }
    }
  }
</style>
