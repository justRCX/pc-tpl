<template>
  <div class="fixed">
    <div class="lsdDetail">
      <div class="content">
        <div class="title">{{title}}</div>
        <el-row class="row">
          <el-col style="width:4.37rem;margin-right:.13rem">
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
              <div class="transYes">
                <div class="rightItem">
                  <div class="rightImg">
                    <img src="http://img.wkdao.com/image/65/2021/01/09/b1519c1f20e29d8bba10d423b699b7d1.png">
                  </div>
                  <div>
                    <p class="num">{{yesterday_order_fee}}</p>
                    <p class="rightTitle">昨日交易金额</p>
                  </div>
                </div>
                <div class="rightItem">
                  <div class="rightImg">
                    <img src="http://img.wkdao.com/image/65/2021/01/09/de98025b655c6797aa7fa1dc8356274e.png">
                  </div>
                  <div>
                    <p class="num strokeNum">{{yesterday_order_count}}</p>
                    <p class="rightTitle">昨日交易笔数</p>
                  </div>
                </div>
              </div>
            </div>
            <el-row class="leftbottom">
              <el-col :span="11">
                <div class="orderInfo">
                  <div class="partTitle">订单实时信息</div>
                  <div class="orderItemCon">
                    <div
                      class="orderItem"
                      v-for="(item,index) in order_time"
                      :key="index"
                      v-show="index<5"
                    >
                      <div class="orderTime">{{item.time}}</div>
                      <div style="font-size:.08rem">{{item.nickname}}<span
                          v-show="item.mobile.length>0"
                          style="font-size:.08rem"
                        >（{{item.mobile}}）</span>下单金额￥{{item.pay_fee}}元</div>
                    </div>
                  </div>
                </div>
              </el-col>
              <el-col :span="13">
                <div class="rate">
                  <div class="partTitle">销售额占比</div>
                  <div style="margin-top:.2rem;">
                    <v-chart
                      :options="rateChartOption"
                      style="width:100%;height:0.98rem"
                    ></v-chart>
                  </div>
                  <div class="legend_custom">
                    <div
                      class="legendItem"
                      v-for="(item,index) in sales_rate"
                      :key="index"
                      v-show="index<8"
                    >
                      <span
                        class="circle"
                        :style="{'background':myColor[index]}"
                      ></span>
                      <span>{{item.category}}</span>
                      <span>|</span>
                      <!-- <span>{{item.rate}}%</span> -->
                      <span>￥{{item.sale_fee}}</span>
                    </div>
                  </div>
                </div>
              </el-col>
            </el-row>
          </el-col>
          <el-col style="width:4.9rem">
            <el-row class="rightTopCon">
              <el-col :span="12">
                <div class="area">
                  <div class="partTitle areaTitle">订单区域分布</div>
                  <div class="areaItemCon">
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
              </el-col>
              <el-col :span="12">
                <div class="access">
                  <div class="partTitle">访问分布</div>
                  <div style="margin-top:-.2rem">
                    <v-chart
                      :options="mapChartOption"
                      style="width:1.98rem;height:1.98rem"
                    ></v-chart>
                  </div>
                </div>
              </el-col>
            </el-row>
            <el-row style="margin-top:.1rem">
              <el-col style="width:2.11rem;height:2.53rem">
                <!-- :style="{'height':rankHeight+'px'}" -->
                <div class="middleBottom">
                  <div class="rank">
                    <div class="partTitle">业绩排行</div>
                    <div class="rankList">
                      <div
                        class="rankItem"
                        v-for="(item,index) in pusher_sort"
                        :key="index"
                        v-show="index<10"
                      >
                        <div class="num">NO.{{index+1}}</div>
                        <div class="money">{{item.achievement_fee}}元</div>
                        <div
                          class="name"
                          style="font-size:.08rem;"
                        >{{item.nickname}}
                          <span
                            v-show="item.mobile.length>0"
                            style="font-size:.08rem;"
                          >（{{item.mobile}}）</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </el-col>
              <el-col class="rightBottom">
                <div class="time">
                  <div class="partTitle">本月总防御攻击次数</div>
                  <div
                    class="timeItem"
                    style="margin-top:.15rem;margin-bottom:.1rem"
                  >
                    <div class="timeImg"><img src="http://img.wkdao.com/image/65/2021/01/09/00d41de3dccc105991852668fa12be33.png">
                    </div>
                    <div class="timeNum">
                      <span class="timeNums">{{load.defense_count}}</span>次
                    </div>
                  </div>
                  <div class="timeItem">
                    <div class="moniTitle">WEB负载监控</div>
                    <div class="moniRate">{{load.web_load}}%</div>
                    <div class="moniChart">
                      <v-chart
                        :options="webMonitorOption"
                        style="width:.37rem;height:.37rem;"
                      ></v-chart>
                    </div>
                  </div>
                  <div class="timeItem">
                    <div class="moniTitle">DB负载监控</div>
                    <div class="moniRate db">{{load.db_load}}%</div>
                    <div class="moniChart">
                      <v-chart
                        :options="dbMonitorOption"
                        style="width:.37rem;height:.37rem;"
                      ></v-chart>
                    </div>
                  </div>
                  <div class="timeItem">
                    <div class="moniTitle">流量负载监控</div>
                    <div class="moniRate flow">{{load.pv_load}}%</div>
                    <div class="moniChart">
                      <v-chart
                        :options="flowMonitorOption"
                        style="width:.37rem;height:.37rem;"
                      ></v-chart>
                    </div>
                  </div>
                </div>
              </el-col>
            </el-row>
          </el-col>
        </el-row>
      </div>
    </div>
  </div>
</template>
<script>
  import * as echarts from 'echarts/lib/echarts'
  import defaultVue from './defaultVue.vue';
  export default {
    extends: defaultVue,
    data() {
      return {
        e: '',//油表盘宽度
        width: '',//油表盘指针宽和高
        height: '',
        rankHeight: 0,    //业绩排行的高度
        myColor: ['#feb600', '#d94813', '#7aa32b', '#34a6d2', '#b83449', '#feb600', '#d94813', '#7aa32b', '#34a6d2', '#b83449'],
        //销售额占比
        rateChartOption: {
          tooltip: {
            trigger: 'axis',
            axisPointer: {            // 坐标轴指示器，坐标轴触发有效
              type: 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
            },
            formatter: (param) => {
              let temp = param[1].data;
              if (!temp) {
                return ''
              }
              return `${temp.category}<br />${temp.sale_fee}(${temp.rate}%)`
            }
          },
          grid: {
            top: "10%",
            left: '0',
            right: '4%',
            bottom: '3%',
            containLabel: true
          },
          xAxis: [
            {
              type: 'category',
              data: [],
              axisTick: {
                alignWithLabel: true,
                show: false
              },
              axisLine: {
                lineStyle: {
                  color: 'rgb(5,191,232,.3)'
                }
              },
              axisLabel: {
                show: false
              }
            }
          ],
          yAxis: [
            {
              type: 'value',
              splitLine: {
                lineStyle: {
                  color: 'rgba(255,255,255,.2)'
                }
              },
              axisLine: {
                lineStyle: {
                  color: 'rgb(5,191,232,.3)'
                }
              },
              axiTick: {
                length: 2
              },
              axisLabel: {
                color: 'white'
              },
            }
          ],
          series: [
            {
              data: [],
              type: 'line',
              smooth: true,
              symbol: 'none',
              areaStyle: {
                color: 'rgba(255,186,3,.4)'
              },
              lineStyle: {
                width: 0
              }
            },
            {
              type: 'bar',
              barWidth: '60%',
              data: [],
              itemStyle: {
                normal: {
                  color: (params) => {
                    var num = this.myColor.length;
                    return this.myColor[params.dataIndex % num]
                  },
                }
              },
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
              width: this.width,
              length: this.height
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
            "data": [{
              "value": 67
            }],
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
              width: this.width,
              length: this.height
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
            "data": [{
              "value": 67
            }],
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
              width: this.width,
              length: this.height
            },
            "detail": {
              show: false
            }
          }]
        },
      }
    },
    methods: {
      caluHeight() {
        console.log(document.body.clientHeight)
        this.rankHeight = document.body.clientHeight - 550;
      },
      dealRate(rate) {
        let category = rate.map(item => item.category); //分类名
        let rates = rate.map(item => {
          item.value = item.rate;
          return item;
        }); //值
        this.rateChartOption.xAxis[0].data = category;
        this.rateChartOption.series[0].data = rates;
        this.rateChartOption.series[1].data = rates;
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
      dealArea(area) {
        this.$nextTick(() => {
          setTimeout(() => {
            area.forEach((node, index) => {
              document.getElementsByClassName("progressBar")[index].style.width = node.rate + "%"
            })
          }, 300)
        })
      }
    },
    created() {
      let e = document.getElementsByTagName('html')[0].style.cssText;
      e = e.split('font-size:')[1]
      e = e.split('px')[0]
      this.e = parseInt(parseFloat(e) * 0.18)
      this.width = parseInt(parseFloat(e) * 0.02)
      this.height = parseInt(parseFloat(e) * 0.2)
    },
    mounted() {
      this.webMonitorOption.series[0].radius = this.e
      this.dbMonitorOption.series[0].radius = this.e
      this.flowMonitorOption.series[0].radius = this.e
      this.webMonitorOption.series[0].pointer.width = this.width
      this.webMonitorOption.series[0].pointer.length = this.height
      this.dbMonitorOption.series[0].pointer.width = this.width
      this.dbMonitorOption.series[0].pointer.length = this.height
      this.flowMonitorOption.series[0].pointer.width = this.width
      this.flowMonitorOption.series[0].pointer.length = this.height
    }
  }
</script>

<style lang="scss" scoped>
  .fixed {
    position: fixed;
    width: 100%;
    height: 100%;
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
      .borderOuter {
        padding: 30px;
        margin: 0 20px 20px 20px;
        border: solid 1px #f97301;
        .borderBottom {
          margin-bottom: -22px;
          img {
            height: 4px;
            width: 100%;
          }
        }
      }
      .partTitle {
        height: 0.14rem;
        line-height: 0.14rem;
        font-size: 0.12rem;
        font-weight: 500;
        color: white;
        letter-spacing: 2px;
        // margin-bottom:10px;
        padding-left: 0.08rem;
        border-left: solid 0.02rem white;
        text-shadow: 0.02rem 0.02rem 0.08rem #e5e20d;
      }
      .content {
        background: rgb(32, 32, 30);
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        .title {
          background: url("http://img.wkdao.com/image/65/2021/01/09/b258642b80ce1bc5ecd49ee80156548a.png")
            center no-repeat;
          text-align: center;
          height: 0.62rem;
          font-size: 0.25rem;
          font-weight: bold;
          color: rgba(255, 255, 255, 1);
          box-sizing: border-box;
          padding-top: 0.1rem;
          background-size: 100% 100%;
        }
        .row {
          // margin-top:-130px;
          margin: 0 0.1rem;
        }
        .rightBottom {
          background: url("http://img.wkdao.com/image/65/2021/01/09/0ed63c27579598d27882c6d6966396da.png");
          background-size: 100% 100%;
          // margin:20px 0 0 0;
          // padding:20px;
          width: 2.68rem;
          height: 2.54rem;
          margin-left: 0.11rem;
          box-sizing: border-box;
          padding: 0.12rem;
        }
        .time {
          // margin:0 20px;
          .timeItem {
            display: flex;
            -webkit-display: flex;
            margin-bottom: 0.15rem;
            .timeImg {
              width: 0.58rem;
              height: 0.55rem;
              img {
                width: 100%;
                height: 100%;
              }
            }
            .timeNum {
              color: white;
              font-size: 26px;
              .timeNums {
                // margin:20px 0 0 20px;
                margin-left: 0.25rem;
                font-size: 0.32rem;
                display: inline-block;
                margin-top: 0.1rem;
              }
            }
            .moniTitle {
              color: white;
              font-size: 0.12rem;
              line-height: 0.37rem;
              height: 0.37rem;
              margin-right: 0.1rem;
              width: 0.8rem;
            }
            .moniChart {
              width: 0.37rem;
              height: 0.37rem;
              overflow: hidden;
              margin-right: 0.1rem;
            }
            .moniRate {
              flex: 1;
              color: #ffdb79;
              font-size: 0.19rem;
              height: 0.37rem;
              line-height: 0.37rem;
            }
            .db {
              color: #54edb7;
            }
            .flow {
              color: #43fdff;
            }
          }
        }
        .middleBottom {
          background: url("http://img.wkdao.com/image/65/2021/01/09/2cb67fae041f6acf4fb3374b06751463.png");
          background-size: 100% 100%;
          // margin:20px 20px 0 0;
          // padding:20px 20px 20px 0;
          padding: 0.1rem;
          height: 2.53rem;
        }
        .rank {
          // margin:0 20px;
          .rankList {
            margin-top: 0.2rem;
            .rankItem {
              display: flex;
              -webkit-display: flex;
              // justify-content: space-between;
              // -webkit-justify-content:space-between;
              color: white;
              height: 0.1rem;
              line-height: 0.1rem;
              text-align: center;
              // font-size:14px;
              white-space: nowrap;
              margin-bottom: 0.11rem;
              position: relative;
              .num {
                color: #ff9f0d;
                // margin-right:10px;
                font-size: 0.08rem;
                font-weight: bold;
                margin-right: 0.1rem;
              }
              .money {
                // margin-right:10px;
                font-size: 0.08rem;
                width: 0.52rem;
              }
              .name {
                position: absolute;
                right: 0.1rem;
                text-align: right;
              }
            }
          }
        }
        .leftbottom {
          background: url("http://img.wkdao.com/image/65/2021/01/09/d8333a8893f557e3922720b6cb775597.png");
          background-size: 100% 100%;
          // margin:20px 20px 0 20px;
          padding: 0.1rem 0.12rem;
          margin-top: 0.18rem;
          height: 2.2rem;
        }
        .orderInfo {
          .orderItemCon {
            margin-top: 0.24rem;
          }
          .orderItem {
            // font-size:15px;
            font-weight: 400;
            color: rgba(255, 255, 255, 1);
            // margin-bottom:5px;
            border-left: solid 0.02rem #6fa010;
            padding-left: 0.09rem;
            margin-bottom: 0.14rem;
            height: 0.2rem;
            .orderTime {
              margin-bottom: 0.01rem;
              font-size: 0.07rem;
            }
          }
        }
        .rate {
          .legend_custom {
            overflow: hidden;
            margin-top: 0.12rem;
            .legendItem {
              float: left;
              width: 50%;
              white-space: nowrap;
              margin-bottom: 0.04rem;
              span {
                color: white;
                margin-right: 0.02rem;
                white-space: nowrap;
                font-size: 0.08rem;
              }
              .circle {
                display: inline-block;
                width: 0.03rem;
                height: 0.03rem;
                border-radius: 50%;
              }
            }
          }
        }
        .trans {
          height: 2.33rem;
          background: url("http://img.wkdao.com/image/65/2021/01/09/65cb78c7e8f718870f7d3c7fde4872e1.png");
          background-size: 100% 100%;
          // margin:0 20px 0 20px;
          // padding:20px 30px 30px 30px;
          padding: 0.22rem 0.25rem;
          .transTitle {
            display: flex;
            -webkit-display: flex;
            justify-content: space-between;
            -webkit-justify-content: space-between;
            height: 0.17rem;
            // font-size:20px;
            color: white;
            font-weight: bold;
            position: relative;
            margin-bottom: 0.17rem;
            .name {
              font-size: 0.15rem;
              letter-spacing: 3px;
            }
            .date {
              color: white;
              line-height: 0.17rem;
              letter-spacing: 0.01rem;
              // width:240px;
              text-align: right;
              font-size: 0.11rem;
              position: absolute;
              bottom: -0.05rem;
              right: 0.1rem;
            }
          }
          .numCon {
            display: flex;
            -webkit-display: flex;
            // margin-top:10px;
            .numSep {
              height: 0.5rem;
              line-height: 0.5rem;
              padding: 0 0.07rem;
              background: linear-gradient(
                0deg,
                rgba(248, 112, 1, 0.23),
                rgba(243, 206, 2, 0.23)
              );
              border: 1px solid rgba(248, 111, 1, 1);
              margin-right: 0.03rem;
              text-align: center;
              color: white;
              font-size: 0.26rem;
              font-weight: bold;
              &--symbol {
                padding: 0 0.01rem;
                background: none;
                border: none;
              }
            }
          }
          .transYes {
            display: flex;
            -webkit-display: flex;
            margin-top: 0.29rem;
            .rightItem {
              margin-right: 0.3rem;
              // width:48%;
              display: flex;
              -webkit-display: flex;
              // margin-top:20px;
              text-align: center;
              &:last-child {
                margin-right: 0;
              }
              .rightImg {
                width: 0.59rem;
                height: 0.59rem;
                margin-right: 0.15rem;
                img {
                  width: 100%;
                }
              }
              .num {
                text-align: center;
                margin-top: 0.05rem;
                font-size: 0.23rem;
                font-weight: bold;
                color: rgba(255, 255, 255, 1);
                background: linear-gradient(
                  0deg,
                  rgba(255, 72, 115, 1) 0%,
                  rgba(208, 79, 39, 1) 0%,
                  rgba(255, 159, 13, 1) 51.2939453125%,
                  rgba(251, 159, 16, 1) 95.60546875%
                );
                -webkit-background-clip: text;
                -webkit-text-fill-color: transparent;
                white-space: nowrap;
              }
              .strokeNum {
                background: linear-gradient(
                  0deg,
                  rgba(255, 72, 115, 1) 0%,
                  rgba(96, 147, 18, 1) 0%,
                  rgba(89, 159, 0, 1) 51.2939453125%,
                  rgba(188, 255, 8, 1) 95.60546875%
                );
                -webkit-background-clip: text;
                -webkit-text-fill-color: transparent;
              }
              .rightTitle {
                text-align: center;
                font-size: 0.15rem;
                color: rgba(255, 255, 255, 1);
                letter-spacing: 2px;
                white-space: nowrap;
              }
            }
          }
        }
        .rightTopCon {
          background: url("http://img.wkdao.com/image/65/2021/01/09/6ad95d30b0a429c734e23a7b120b6205.png");
          background-size: 100% 100%;
          // margin:0 20px 0 0;
          // padding:20px 20px 20px 0;
          padding-top: 0.1rem;
          padding-bottom: 0.1rem;
          height: 2.06rem;
          // position: relative;
          .area {
            border-right: solid 0.01rem #e46903;
            // position: absolute;
            // min-height:320px;
            // width: 49%;
            // height:100%;
            height: 1.85rem;
            .areaTitle {
              font-size: 0.14rem;
            }
            .areaItemCon {
              // margin-top:40px;
              // padding-left:20px;
              // height: 100%;
              margin-top: 0.3rem;
              padding-left: 0.14rem;
              padding-right: 0.18rem;
            }
            .areaItem {
              // padding:10px 0 0 0;
              margin-bottom: 0.06rem;
              .areaNum {
                white-space: nowrap;
                margin-bottom: 0.02rem;
                .sort {
                  color: #fdcd39;
                  font-size: 0.1rem;
                  margin-right: 0.2rem;
                  font-weight: 600;
                  display: inline-block;
                }
                .areaName {
                  color: white;
                  font-size: 0.1rem;
                  margin-right: 0.2rem;
                  width: 0.5rem;
                  display: inline-block;
                }
                .exactNum {
                  font-size: 0.1rem;
                  color: white;
                  display: inline-block;
                }
              }
              .progress {
                display: flex;
                -webkit-display: flex;
                .progressInner {
                  flex: 1;
                  .progressBar {
                    // width:30px;
                    height: 0.03rem;
                    background: linear-gradient(
                      96deg,
                      rgba(216, 77, 36, 1),
                      rgba(241, 153, 19, 1)
                    );
                    border-radius: 10px;
                    transition: width 2s;
                    -webkit-transition: width 2s; /* Safari and Chrome */
                  }
                }
                .progressNum {
                  // margin-left:5px;
                  // width:80px;
                  color: white;
                  font-size: 0.12rem;
                  margin-top: -0.1rem;
                }
              }
            }
          }
        }

        .access {
          padding-left: 20px;
        }
      }
    }
  }
</style>
