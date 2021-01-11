<template>
  <div class="fixed">
    <div class="lsdDetail">
      <div class="content">
        <div class="title">
          <div style="text-align:center">{{title}}</div>
        </div>
        <el-row class="row">
          <el-col style="width:2.74rem">
            <div
              class="area borderOuter"
              style="width:2.49rem;height:2.22rem"
            >
              <div class="partTitle">订单区域分布</div>
              <div style="white-space:nowrap">
                <div
                  v-for="(item,index) in order_region"
                  :key="index"
                  v-show="index<5"
                >
                  <div class="areaItem">
                    <div class="areaNum">
                      <div class="sort">NO.{{index+1}}</div>
                      <div class="areaName">{{item.region}}</div>
                      <div class="exactNum">{{item.count}}单</div>
                    </div>
                    <div class="progress">
                      <div class="progressInner">
                        <!-- item.rate+ -->
                        <div
                          class="progressBar"
                          :style="{'width':'100%'}"
                        ></div>
                      </div>
                      <div class="progressNum">{{item.rate}}%</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div
              class="access borderOuter"
              style="width:2.49rem;height:2.22rem"
            >
              <div class="partTitle">访问分布</div>
              <div>
                <v-chart
                  ref="mapChartId"
                  :options="mapChartOption"
                  style="width:100%;height:1.9rem;margin-top:-.3rem"
                ></v-chart>
              </div>
            </div>
          </el-col>
          <el-col style="width:4.1rem">
            <div class="trans borderOuter">
              <div class="transTitle">
                <div class="name">今日交易总额</div>
                <div class="date">{{time}}</div>
              </div>
              <div class="numCon">
                <div class="numInnerCon">
                  <div
                    class="numSep"
                    :class="{'numSep--symbol':item === ','}"
                    v-for="(item,index) in today_order_fee"
                    :key="index"
                  >
                    {{item}}
                  </div>
                </div>
              </div>
              <div class="transYes">
                <div class="rightItem">
                  <div class="rightImg">
                    <img src="http://img.wkdao.com/image/65/2021/01/09/a3747d099714923b1f5bc1825b8115e7.png">
                  </div>
                  <div class="rightText">
                    <p class="num">{{yesterday_order_fee}}</p>
                    <p class="rightTitle">昨日交易金额</p>
                  </div>
                </div>
                <div class="rightItem">
                  <div class="rightImg">
                    <img src="http://img.wkdao.com/image/65/2021/01/09/24c7db0496119499f1e1575b1447588c.png">
                  </div>
                  <div style="width:1.3rem">
                    <p class="num">{{yesterday_order_count}}</p>
                    <p class="rightTitle">昨日交易笔数</p>
                  </div>
                </div>
              </div>
            </div>
            <el-row>
              <el-col style="width:2.17rem;height:2.52rem;">
                <div
                  class="orderInfo borderOuter"
                  style="width:2.17rem;height:2.52rem;"
                >
                  <div class="partTitle">订单实时信息</div>
                  <div class="orderItemCon">
                    <div
                      v-for="(item,index) in order_time"
                      :key="index"
                      style="font-size:.08rem"
                    >
                      <div
                        class="orderItem"
                        v-if="index<7"
                      >
                        <div
                          class="orderTime"
                          style=";font-size:.08rem"
                        >{{item.time}}</div>
                        <div style="white-space: nowrap;font-size:.08rem">{{item.nickname}}<span
                            v-show="item.mobile.length>0"
                            style="font-size:.08rem"
                          >（{{item.mobile}}）</span>下单&nbsp;&nbsp;,&nbsp;&nbsp;金额￥{{item.pay_fee}}元
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </el-col>
              <el-col style="width:1.84rem;height:2.52rem">
                <div class="time borderOuter">
                  <div class="partTitle">本月总防御攻击次数</div>
                  <div
                    class="timeItem"
                    style="margin-bottom:.1rem;height:.55rem;line-height:.55rem;white-sapce:nowrap"
                  >
                    <div class="timeImg"><img src="http://img.wkdao.com/image/65/2021/01/09/00d41de3dccc105991852668fa12be33.png">
                    </div>
                    <div
                      class="timeNum"
                      style="white-sapce:nowrap"
                    >
                      <span :class="parseFloat(load.defense_count)<100000?'timeNums':'timeNums1'">{{load.defense_count}}</span>
                      次
                    </div>
                  </div>
                  <div class="timeItem">
                    <div class="moniTitle">WEB负载监控</div>
                    <div class="moniRate">{{load.web_load}}%</div>
                    <div class="moniChart">
                      <v-chart
                        ref="webMonitorId"
                        :options="webMonitorOption"
                        style="width:.35rem;height:.35rem;"
                      ></v-chart>
                    </div>
                  </div>
                  <div class="timeItem">
                    <div class="moniTitle">DB负载监控</div>
                    <div class="moniRate db">{{load.db_load}}%</div>
                    <div class="moniChart">
                      <v-chart
                        ref="dbMonitorId"
                        :options="dbMonitorOption"
                        style="width:.35rem;height:.35rem;"
                      ></v-chart>
                    </div>
                  </div>
                  <div class="timeItem">
                    <div class="moniTitle">流量负载监控</div>
                    <div class="moniRate flow">{{load.pv_load}}%</div>
                    <div class="moniChart">
                      <v-chart
                        ref="flowMonitorId"
                        :options="flowMonitorOption"
                        style="width:.35rem;height:.35rem;"
                      ></v-chart>
                    </div>
                  </div>
                </div>
              </el-col>
            </el-row>
          </el-col>
          <el-col style="width:2.6rem;margin-left:.15rem">
            <div class="rank borderOuter">
              <div class="borderTop"></div>
              <div class="partTitle">业绩排行</div>
              <div
                class="rankList"
                style="white-space: nowrap;"
              >
                <div
                  v-for="(item,index) in pusher_sort"
                  :key="index"
                >
                  <div
                    class="rankItem"
                    v-if="index<11"
                  >
                    <div class="num">NO.{{index+1}}</div>
                    <div class="money">{{item.achievement_fee}}元</div>
                    <div
                      class="name"
                      style="text-align:right"
                    >{{item.nickname}}
                      <span
                        v-show="item.mobile.length>0"
                        style="font-size:.08rem"
                      >（{{item.mobile}}）</span>
                    </div>
                  </div>
                </div>
              </div>
              <!-- <div class="borderBottom">
                                <img src="../../../../assets/lsdDeail/templa2/border.png">
                            </div> -->
            </div>
            <div class="rate borderOuter">
              <div class="partTitle">销售额占比</div>
              <div class="rateChart">
                <v-chart
                  ref="rateChartId"
                  :options="rateChartOption"
                  style="height: 1.3rem;width:100%;"
                ></v-chart>
              </div>
            </div>
          </el-col>
        </el-row>
      </div>
    </div>
  </div>
</template>
<script>
  import * as echarts from 'echarts/lib/echarts'
  import defaultVue from './defaultVue.vue'
  export default {
    extends: defaultVue,
    data() {
      return {
        e: '',
        fontSize: '',
        //销售额占比
        rateChartOption: {
          color: [
            'rgb(244,109,251)',
            'rgb(63,232,254)',
            'rgb(21,213,120)',
            'rgb(249,210,85)',
            'rgb(239,101,124)',
            'rgb(15,192,245)',
            '#ff2424',
            '#e57242',
            '#553ffe',
            '#b36dfb'
          ],
          tooltip: {
            trigger: 'item',
            formatter: (param) => {
              let temp = param.data;
              if (!temp) {
                return ''
              }
              return `${temp.name}<br/>${temp.rate}(${temp.value}%)`
            }
          },
          legend: {
            type: 'scroll',
            pageIconColor: '#fff',
            pageIconInactiveColor: '#666',
            pageTextStyle: {
              color: '#fff'
            },
            orient: 'vertical',
            top: "middle",
            right: "0",
            height: 155,
            textStyle: {
              color: 'white',
              rich: {
                a: {
                  fontSize: 13,
                  height: 17,
                },
                b: {
                  fontSize: 13,
                  height: 17,
                },
                c: {
                  fontSize: 13,
                  height: 17,
                }
              }
            },
            icon: 'circle',
            data: [],
            formatter: (name) => {
              let value = '';
              let rate = '';
              for (var i = 0, l = this.rateChartOption.series[0].data.length; i < l; i++) {
                let data = this.rateChartOption.series[0].data[i];
                if (data.name == name) {
                  value = data.value;
                  rate = data.rate;
                }
              };
              // '{b|' + value + '% } ',
              var arr = [
                '{a|' + name + ' | ' + '} ',
                '{c|￥' + rate + '}'
              ]
              return arr.join('')
            }
          },
          series: [
            // 主要展示层的
            {
              name: '销售额占比',
              itemStyle: { //图形样式
                normal: {
                  borderColor: 'rgba(0,0,0,0)',
                  borderWidth: 30,
                },
              },
              radius: ['40%', '60%'],
              center: ['24%', '50%'],
              type: 'pie',
              label: {
                normal: {
                  show: false
                }
              },
              data: [],
            }
          ]
        },
        //负载监控
        webMonitorOption: {
          "series": [{
            "type": "gauge",
            "center": ["45%", "50%"],
            startAngle: 150,
            endAngle: -150,
            "radius": this.e,
            "data": [],
            "splitNumber": 1,
            "axisLabel": {
              "show": false
            },
            splitLine: {
              show: false
            },
            axisTick: {   //刻度线
              show: false
            },
            "axisLine": {
              "lineStyle": {
                "color": [
                  [1, new echarts.graphic.LinearGradient(0, 0, 1, 0, [{
                    offset: 0,
                    color: "#E16742"
                  },
                  {
                    offset: 1,
                    color: "#F9A843"
                  }
                  ])]
                ],
                width: 8
              }
            },
            itemStyle: {  //指针颜色
              color: "red"
            },
            pointer: { //指针宽度 长度
              width: 3,
              length: 40
            },
            "detail": {
              show: false
            }
          }]
        },
        dbMonitorOption: {
          "series": [{
            "type": "gauge",
            "center": ["45%", "50%"],
            startAngle: 150,
            endAngle: -150,
            "radius": this.e,
            "data": [],
            "splitNumber": 1,
            "axisLabel": {
              "show": false
            },
            splitLine: {
              show: false
            },
            axisTick: {   //刻度线
              show: false
            },
            "axisLine": {
              "lineStyle": {
                "color": [
                  [1, new echarts.graphic.LinearGradient(0, 0, 1, 0, [{
                    offset: 0,
                    color: "#04B972"
                  },
                  {
                    offset: 1,
                    color: "#3DEFA7"
                  }
                  ])]
                ],
                width: 8
              }
            },
            itemStyle: {  //指针颜色
              color: "red"
            },
            pointer: { //指针宽度 长度
              width: 3,
              length: 40
            },
            "detail": {
              show: false
            }
          }]
        },
        flowMonitorOption: {
          "series": [{
            "type": "gauge",
            "center": ["45%", "50%"],
            startAngle: 150,
            endAngle: -150,
            "radius": this.e,
            "data": [],
            "splitNumber": 1,
            "axisLabel": {
              "show": false
            },
            splitLine: {
              show: false
            },
            axisTick: {   //刻度线
              show: false
            },
            "axisLine": {
              "lineStyle": {
                "color": [
                  [1, new echarts.graphic.LinearGradient(0, 0, 1, 0, [{
                    offset: 0,
                    color: "#008FF6"
                  },
                  {
                    offset: 1,
                    color: "#0CEFF6"
                  }
                  ])]
                ],
                width: 8
              }
            },
            itemStyle: {  //指针颜色
              color: "red"
            },
            pointer: { //指针宽度 长度
              width: 3,
              length: 40
            },
            "detail": {
              show: false
            }
          }]
        },
      }
    },
    methods: {
      dealRate(rate) {
        let data = rate.map(item => ({ name: item.category, rate: item.rate, value: item.sale_fee }))
        this.rateChartOption.legend.data = []
        data.forEach((item, index) => {
          // if (index < 8) {
          this.rateChartOption.legend.data.push(item.name)
          // }
        })
        this.rateChartOption.series[0].data = data.map(item => ({ name: item.name, rate: item.value, value: item.rate }));
      },
      dealLoadData(load) {
        this.webMonitorOption.series[0].data = [{ value: load.web_load }];
        this.dbMonitorOption.series[0].data = [{ value: load.db_load }];
        this.flowMonitorOption.series[0].data = [{ value: load.pv_load }];
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
      resizeTheChart() {
        let arr = ['mapChartId', 'webMonitorId', 'dbMonitorId', 'flowMonitorId', 'rateChartId']
        arr.forEach(item => {
          if (this.$refs && this.$refs[item]) {
            this.$refs[item].resize()
          }
        })
      }
    },
    created() {
      this.e = parseFloat(document.getElementsByTagName('html')[0].style.cssText) * 0.45
      let e = document.getElementsByTagName('html')[0].style.cssText;
      e = e.split('font-size:')[1]
      e = e.split('px')[0]
      this.e = parseInt(parseFloat(e) * 0.15)
      this.fontSize = parseInt(parseFloat(e) * 0.08)
    },
    mounted() {
      this.webMonitorOption.series[0].radius = this.e
      this.dbMonitorOption.series[0].radius = this.e
      this.flowMonitorOption.series[0].radius = this.e
      this.rateChartOption.legend.textStyle.rich.a.fontSize = this.fontSize
      this.rateChartOption.legend.textStyle.rich.b.fontSize = this.fontSize
      this.rateChartOption.legend.textStyle.rich.c.fontSize = this.fontSize
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
    background: url("http://img.wkdao.com/image/65/2021/01/09/61ff9d190b030c3ac647a596270eb3ae.png")
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
      height: 100%;
      // background: #000930;
      overflow: auto;
      .borderOuter {
        box-shadow: inset 0px 6px 34px 0px rgba(180, 231, 255, 0.23);
        padding: 0.15rem;
        background: linear-gradient(to left, rgb(70, 161, 192), rgb(70, 161, 192))
            left top no-repeat,
          linear-gradient(to bottom, rgb(70, 161, 192), rgb(70, 161, 192)) left
            top no-repeat,
          linear-gradient(to left, rgb(70, 161, 192), rgb(70, 161, 192)) right top
            no-repeat,
          linear-gradient(to bottom, rgb(70, 161, 192), rgb(70, 161, 192)) right
            top no-repeat,
          linear-gradient(to left, rgb(70, 161, 192), rgb(70, 161, 192)) left
            bottom no-repeat,
          linear-gradient(to bottom, rgb(70, 161, 192), rgb(70, 161, 192)) left
            bottom no-repeat,
          linear-gradient(to left, rgb(70, 161, 192), rgb(70, 161, 192)) right
            bottom no-repeat,
          linear-gradient(to left, rgb(70, 161, 192), rgb(70, 161, 192)) right
            bottom no-repeat;
        background-size: 2px 20px, 20px 2px, 2px 20px, 20px 2px;
        .borderBottom {
          margin-bottom: -22px;
          img {
            height: 4px;
            width: 100%;
          }
        }
        .partTitle {
          // height:30px;
          // line-height:30px;
          font-size: 0.12rem;
          font-weight: 500;
          color: white;
          letter-spacing: 3px;
          // margin-bottom:10px;
          margin-bottom: 0.18rem;
        }
      }
      .content {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;

        .row {
          // margin-top:-160px;
        }
        .title {
          // margin-top:-80px;
          background: url("http://img.wkdao.com/image/65/2021/01/09/db8efe23af3821f7b72f91cf3b7f62e2.png")
            center no-repeat;
          text-align: center;
          height: 0.65rem;
          // line-height:0.71rem;
          font-size: 0.29rem;
          font-weight: bold;
          box-sizing: border-box;
          // margin-top:.19rem;
          // background-size:100%;
          background-repeat: no-repeat;
          background-size: 100% 100%;
          div {
            font-size: 0.29rem;
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
        }
        .orderInfo {
          // margin-right:20px;
          width: 100%;
          margin: 0.15rem 0.09rem 0rem 0rem;
          padding: 0.12rem 0.15rem;
          .partTitle {
            margin-bottom: 0.12rem;
          }
          // .orderItemCon{
          //     margin-top:30px
          // }
          .orderItem {
            height: 0.2rem;
            // font-size:.08rem;
            // font-weight:400;
            color: rgba(255, 255, 255, 1);
            margin-bottom: 0.1rem;
            border-left: solid 0.02rem rgb(255, 199, 47);
            padding-left: 0.1rem;
            .orderTime {
              margin-bottom: 0.03rem;
              font-size: 0.08rem;
            }
          }
        }
        .rank {
          height: 2.77rem;
          // margin:0 20px 20px 0;
          margin-right: 0.11rem;
          padding: 0.18rem;
          .partTitle {
            margin-bottom: 0.15rem;
          }
          .rankList {
            .rankItem {
              display: flex;
              -webkit-display: flex;
              justify-content: space-between;
              -webkit-justify-content: space-between;
              color: white;
              // height:40px;
              // line-height: 40px;
              text-align: center;
              font-size: 0.08rem;
              margin-bottom: 0.065rem;
              .num {
                color: rgb(132, 255, 195);
                margin-right: 10px;
                font-size: 0.1rem;
                width: 0.45rem;
              }
              .money {
                margin-right: 10px;
                width: 0.6rem;
                font-size: 0.08rem;
              }
              .name {
                width: 1rem;
                font-size: 0.08rem;
              }
            }
          }
        }
        .rate {
          // margin-right:20px;
          margin-right: 0.11rem;
          margin-top: 0.15rem;
          height: 1.64rem;
          padding: 0.14rem;
          .partTitle {
            margin-bottom: 0.14rem;
          }
          .rateChart {
            margin-top: -0.1rem;
          }
          // .rateList{
          //     overflow: hidden;
          //     .rateItem{
          //         float:left;
          //         width:50%;
          //         margin-bottom:10px;
          //         padding:20px;
          //         background: url("../../../../assets/lsdDeail/templa2/bac.png") no-repeat;
          //         background-position:95% 98%;
          //         background-size:70px 70px;
          //         .rateName{
          //             color:white;
          //             font-weight:600;
          //             font-size:14px;
          //         }
          //         .rateNum{
          //             margin-top:15px;
          //             color:white;
          //             font-weight:500;
          //             font-size:24px;
          //             display:flex;
          //             -webkit-display:flex;
          //             justify-content: space-between;
          //             -webkit-justify-content:space-between;
          //         }
          //     }
          // }
        }
        .time {
          // margin-right:20px;
          width: 100%;
          height: 100%;
          margin-top: 0.15rem;
          margin-left: 0.09rem;
          padding: 0.12rem 0.15rem;
          .partTitle {
            margin-bottom: 0.12rem;
          }
          .timeItem {
            display: flex;
            -webkit-display: flex;
            margin-bottom: 0.15rem;
            height: 0.35rem;
            line-height: 0.35rem;
            .timeImg {
              width: 0.58rem;
              height: 0.55rem;
              img {
                width: 100%;
              }
            }
            .timeNum {
              color: white;
              font-size: 0.09rem;
              .timeNums {
                text-align: center;
                // margin-top:.14rem;
                // margin:20px 0 0 20px;
                // font-size:.32rem;
                font-size: 0.25rem;
                display: inline-block;
              }
              .timeNums1 {
                text-align: center;
                // margin-top:.14rem;
                font-size: 0.25rem;
                display: inline-block;
              }
            }
            .moniTitle {
              color: white;
              font-size: 0.09rem;
              // line-height:80px;
              width: 0.6rem;
              white-space: nowrap;
              overflow: hidden;
            }
            .moniChart {
              width: 0.35rem;
              height: 0.35rem;
              overflow: hidden;
            }
            .moniRate {
              flex: 1;
              color: #ffdb79;
              font-size: 0.14rem;
              // line-height:80px;
            }
            .db {
              color: #54edb7;
            }
            .flow {
              color: #43fdff;
            }
          }
        }
        .trans {
          // margin:0 20px 20px 0;
          // padding: 20px 0;
          height: 1.9rem;
          padding: 0.28rem 0.22rem 0 0.22rem;
          .transTitle {
            // display: flex;
            // -webkit-display:flex;
            // justify-content: space-between;
            // -webkit-justify-content:space-between;
            position: relative;
            font-size: 0.17rem;
            color: white;
            height: 0.29rem;
            // padding:0 40px;
            // margin-top:30px;
            .name {
              font-size: 0.17rem;
              position: absolute;
            }
            .date {
              position: absolute;
              color: white;
              // line-height:50px;
              height: 0.09rem;
              width: 1.38rem;
              text-align: right;
              font-size: 0.11rem;
              right: 0px;
              bottom: 0.1rem;
            }
          }
          .numCon {
            .numInnerCon {
              display: flex;
              justify-content: center;
              // background: url("../../../../assets/lsdDeail/templa3/numBac.png")
              //   center no-repeat;
              // background-size: 100% 100%;
              width: 100%;
              margin: 0 auto;
              height: 0.52rem;
              position: relative;
              &::before {
                content: "";
                display: block;
                position: absolute;
                background: url("http://img.wkdao.com/image/65/2021/01/09/9d9946a78363ceecfd548759cb7e3be0.png")
                  center no-repeat;
                background-size: 100% 100%;
                height: 0.52rem;
                width: 600px;
                right: -0.5rem;
                top: -0.26rem;
              }
              &::after {
                content: "";
                display: block;
                position: absolute;
                background: url("http://img.wkdao.com/image/65/2021/01/09/9d9946a78363ceecfd548759cb7e3be0.png")
                  center no-repeat;
                background-size: 100% 100%;
                height: 0.52rem;
                width: 600px;
                left: -0.5rem;
                bottom: -0.26rem;
              }
              .numSep {
                padding: 0 0.045rem;
                text-align: center;
                color: white;
                font-size: 0.29rem;
                font-weight: bold;
                background: #1d2b5c;
                border: 1px solid #4887f9;
                margin: 10px 2px;
                &--symbol {
                  padding: 0 0.01rem;
                  background: none;
                  border: none;
                }
              }
            }
          }
          .transYes {
            // padding:0 40px;
            display: flex;
            -webkit-display: flex;
            .rightItem {
              &:last-child {
                margin-right: 0;
              }
              // margin-right: 0.55rem;
              // flex:0 0 45%;
              // -webkit-flex:0 0 45%;
              display: flex;
              -webkit-display: flex;
              margin-top: 0.15rem;
              text-align: center;
              .rightImg {
                width: 0.52rem;
                // margin-right: 0.15rem;
                img {
                  width: 100%;
                }
              }
              .rightText {
                // width: 0.85rem;
                width: 1.5rem;
              }
              .num {
                text-align: center;
                margin-top: 0.06rem;
                font-size: 0.2rem;
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
                font-size: 0.13rem;
                font-weight: 500;
                color: rgba(255, 255, 255, 1);
              }
            }
          }
        }
        .access {
          // margin:0 20px;
          margin: 0 0.14rem 0.14rem 0.11rem;
        }
        .area {
          // margin:0 20px 20px 20px;
          margin: 0 0.14rem 0.14rem 0.11rem;
          .areaItem {
            // padding:10px 0 15px 0;
            margin-bottom: 0.12rem;
            .areaNum {
              display: flex;
              margin-bottom: 0.02rem;
              .sort {
                color: #fdcd39;
                font-size: 0.1rem;
                margin-right: 0.22rem;
                font-weight: 600;
              }
              .areaName {
                display: inline-block;
                color: white;
                width: 0.6rem;
                overflow: hidden;
                font-size: 0.1rem;
                // margin-right:.19rem;
              }
              .exactNum {
                font-size: 0.1rem;
                color: white;
              }
            }
            .progress {
              display: flex;
              -webkit-display: flex;
              .progressInner {
                // flex:1;
                height: 0.05rem;
                width: 1.69rem;
                .progressBar {
                  // width:30px;
                  height: 0.05rem;
                  background: linear-gradient(
                    96deg,
                    rgba(5, 151, 250, 1),
                    rgba(12, 239, 246, 1)
                  );
                  border-radius: 10px;
                  transition: width 2s;
                  -webkit-transition: width 2s; /* Safari and Chrome */
                }
              }
              .progressNum {
                margin-left: 0.17rem;
                // width:80px;
                color: white;
                font-size: 0.12rem;
                margin-top: -0.052rem;
                height: 0.1rem;
              }
            }
          }
        }
      }
      &::after {
        clear: both;
        display: block;
      }
    }
  }
</style>
