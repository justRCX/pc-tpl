<script>
  import 'echarts/map/js/china.js';
  import { colorList } from './prinveColor';
  import moment from 'moment';
  import * as echarts from 'echarts/lib/echarts'
  const chinaData = echarts.getMap('china').geoJson.features
  export default {
    props: {
      title: {},
      uid: {},
      config: {}
    },
    name: "lsdDetail",
    data() {
      return {
        fontSize1: '',
        fontWidth: '',
        fontHeight: '',
        //中上
        time: "2019.01.01 00:00:00",     //当前时间
        timer: "",    //计时器id
        yesterday_order_fee: 0,
        yesterday_order_count: 0,
        today_order_fee: 0,

        pusher_sort: [],  //推客业绩排行
        order_region: [],  //区域分布
        order_time: [],    //订单实时
        sales_rate: [],    //销售额占比
        load: {},
        //地图
        mapChartOption: {
          grid: {
            right: 0,
            top: 0,
            bottom: 0,
            left: 0,
            width: '100%',
            height: '100%'
          },
          tooltip: {
            trigger: 'item',
            formatter: (p) => {
              let val = p.data && p.data.value[2];
              if (window.isNaN(val)) {
                val = 0;
              }
              let txtCon =
                "<div style='text-align:left'>" + p.name + ":<br />访问量：" + val + '</div>';
              return txtCon;
            }
          },
          geo: {
            map: 'china',
            label: {
              emphasis: {
                show: false
              }
            },
            layoutCenter: ['50%', '50%'],
            layoutSize: '100%',
            // right: 0,
            // left: 0
          },
          series: [
            {
              type: 'effectScatter',
              coordinateSystem: 'geo',
              data: [],
              label: {
                normal: {
                  formatter: '{b}',
                  position: 'right',
                  show: false
                },
                emphasis: {
                  show: true
                }
              },
              rippleEffect: {
                scale: 6
              },
              itemStyle: {
                normal: {
                  color: 'rgb(242,232,37)'
                }

              },
              symbolSize: this.fontSize1
            },
            {
              type: 'map',
              geoIndex: 0,
              aspectScale: 0.75, //长宽比
              showLegendSymbol: false, // 存在legend时显示
              label: {
                normal: {
                  show: true
                },
                emphasis: {
                  show: false,
                  textStyle: {
                    color: '#fff'
                  }
                }
              },
              roam: true,
              itemStyle: {
                normal: {
                  areaColor: '#031525',
                  borderColor: '#3B5077',
                },
                emphasis: {
                  areaColor: '#2B91B7'
                }
              },
              animation: false,
              data: []
            },
          ],
          visualMap: {
            show: true,
            min: 0,
            max: 0,
            left: 0,
            bottom: 0,
            text: ['高', '低'], // 文本，默认为数值文本
            calculable: true,
            seriesIndex: [1],
            itemWidth: this.fontWidth,
            itemHeight: this.fontHeight,
            inRange: {
              color: ['lightskyblue', 'yellow', 'orangered']
            },
            textStyle: {
              color: '#fff',
              fontSize: '11'
            }
          },
        },
      }
    },

    created() {
      let e = document.getElementsByTagName('html')[0].style.cssText;
      e = e.split('font-size:')[1]
      e = e.split('px')[0]
      this.fontSize1 = parseInt(e / 30)
      this.fontWidth = parseInt(e / 12)
      this.fontHeight = parseInt(e / 2.5)
    },
    mounted() {
      this.mapChartOption.series[0].symbolSize = parseInt(this.fontSize1)
      this.mapChartOption.visualMap.itemWidth = parseInt(this.fontWidth)
      this.mapChartOption.visualMap.itemHeight = parseInt(this.fontHeight)
      this.getDetail();
      this.getData();
      this.getScreenMonitor().then(res => {
        this.getMonitor();
      })
      this.caluHeight();  //计算一些容器的高度
      this.timer = setInterval(() => {
        this.time = moment(new Date()).format('YYYY.MM.DD HH:mm:ss');
      }, 1000);

      //socket
      if ("WebSocket" in window) {
        var ws = new WebSocket(this.config.socketUrl + "?uid=" + this.uid + "&tick=1");

        ws.open = () => {
        }
        ws.onmessage = (msg) => {
          if (msg.data.indexOf("type") > -1) {
            ws.send('success')
            let data = JSON.parse(msg.data);
            if (!data.msg_type) {
              switch (data.type) {
                case 1:
                  this.getDetail();
                  this.getData();
                  break;
                case 2:
                  // this.getMonitor();
                  break;
              }
            }
          }
        }

        ws.onclose = () => {
        }
      }
      else {
      }
    },
    destroyed() {            //清除定时器
      clearInterval(this.timer);
    },
    methods: {
      caluHeight() { },
      convertData(data) {   //处理地图经纬度
        let res = [];
        let geoCoordMap = {}
        chinaData.forEach(function (v) {
          // 地区名称
          var name = v.properties.name;
          // 地区经纬度
          geoCoordMap[name] = v.properties.cp;

        });
        for (var i = 0; i < data.length; i++) {
          var geoCoord = geoCoordMap[data[i].name];
          if (geoCoord) {
            res.push({
              name: data[i].name,
              value: geoCoord.concat(data[i].value)
            });
          }
        }
        return res;
      },
      dealLoadData(load) { },
      dealPvData(pv) { },
      dealRate(rate) { },       //处理销售额占比数据
      dealArea(area) { },       //处理区域分布数据
      dealTodayTotalFee() { },  //处理今日交易总额数据
      getDetail() {
        //中上 交易总额
        this.$pcTpl.axios({
          url: '/Statistics/screenDetail',
          method: 'post',
        }).then((res) => {
          this.yesterday_order_fee = res.data.yesterday_order_fee;
          this.yesterday_order_count = res.data.yesterday_order_count;
          this.today_order_fee = res.data.today_order_fee.toString();
          this.dealTodayTotalFee();
        });
      },
      getMonitor() {
        let clear = setTimeout(res => {
          this.getScreenMonitor().then(res => {
            this.getMonitor();
          }).catch(() => { })
        }, 10000);
        this.$once('hook:beforeDestroy', () => {
          clearTimeout(clear);
        })
      },
      getScreenMonitor() {
        return new Promise((resolve, reject) => {
          this.$pcTpl.axios({
            url: '/Statistics/screenMonitor',
            method: 'post',
          }).then((res) => {
            this.load = res.data.load;  //监控 防御攻击数
            this.mapChartOption.series[0].data = this.convertData(res.data.pv.pv);  //地图
            this.mapChartOption.series[1].data = this.convertData(res.data.pv.pv);  //地图
            this.mapChartOption.visualMap.min = res.data.pv.min
            this.mapChartOption.visualMap.max = res.data.pv.max
            this.dealLoadData(res.data.load);
            this.dealPvData(res.data.pv.pv);
            resolve()
          });
        })
      },
      getData() {
        this.$pcTpl.axios({
          url: '/Statistics/screenData',
          method: 'post',
        }).then((res) => {
          this.pusher_sort = res.data.pusher_sort;  //推客排行
          this.order_region = res.data.order_region;  //区域分布
          this.dealArea(res.data.order_region);
          this.order_time = res.data.order_time;   //订单实时
          this.sales_rate = res.data.sales_rate;   //销售额占比
          this.dealRate(res.data.sales_rate);
        });
      }
    }
  }
</script>