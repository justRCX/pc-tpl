<template>
  <div class="sale-config-box">
    <template v-if="config.showStyleType ==1">
      <coupon-list-show
        :list="couponList"
        :configs="config"
        :couponStatusStyle="couponStatusStyle"
        :couponStatus="couponStatus"
      ></coupon-list-show>
    </template>
    <template v-else>
      <c-style-one
        :list="couponList"
        :bodyBg='bodyBg'
        :configs="config"
        :couponStatus="couponStatus"
        :tplNum="config.showTemplateType"
      >
      </c-style-one>
    </template>
    <el-card
      header="优惠券"
      class="edit-area"
      v-if="belongIndex === currentIndex"
    >
      <el-form
        style="text-align:left;"
        label-width="120px"
      >
        <el-form-item label="添加方式">
          <el-radio-group
            v-model="config.chooseType"
            @change="changeChooseType"
          >
            <el-radio :label="1">手动获取</el-radio>
            <el-radio :label="2">自动获取</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="选择显示">
          <el-radio-group v-model="config.showStyleType">
            <el-radio :label="1">样式</el-radio>
            <el-radio :label="2">模板</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item
          label="模板"
          v-if="config.showStyleType == 2"
        >
          <el-radio-group v-model="config.showTemplateType">
            <el-radio :label="1">模板1</el-radio>
            <el-radio :label="2">模板2</el-radio>
            <el-radio :label="3">模板3</el-radio>
            <el-radio :label="4">模板4</el-radio>
          </el-radio-group>
        </el-form-item>
        <div class="edit-box">
          <div class="goods_flex show-config">
            <label>当前显示优惠券效果</label>
            <el-radio
              v-model="couponStatus"
              :label="1"
            >未领取</el-radio>
            <el-radio
              v-model="couponStatus"
              :label="2"
            >已领取</el-radio>
            <el-radio
              v-model="couponStatus"
              :label="3"
            >已失效</el-radio>
          </div>
          <div
            class="goods_flex"
            v-if="config.chooseType==1"
          >
            <draggable
              class="wrapper"
              v-model="config.goods"
              :options="{draggable:'.item'}"
            >
              <transition-group>
                <div
                  v-for="(item, index) in couponList"
                  :key="index+Math.random()"
                  class="flexs item"
                >
                  <i
                    class="el-icon-close close-btn"
                    @click="deleteGood(index)"
                  ></i>
                  <div class="card-coupon">优惠券:{{item.title}} ({{item.remark}},减{{item.value}})
                  </div>
                  <coupon-style-config
                    v-if="config.showStyleType == 1"
                    :styleConfig="config.couponStatusStyle[item.coupon_id]"
                    @changeConfig="e=>{changeConfig(item.coupon_id,e)}"
                  ></coupon-style-config>
                </div>
                <div
                  class="add-coupon"
                  @click="showCouponModal"
                  :key="Math.random()"
                  sortable
                >
                  <i
                    style="color:#409EFF"
                    class="iconfont icon-add1"
                  ></i>
                  添加优惠券
                </div>
              </transition-group>
            </draggable>
          </div>
          <div
            class="goods_flex"
            v-if="config.chooseType==2"
          >
            <el-form-item label="券活动数">
              <el-radio
                v-model="config.showNumType"
                :label="1"
              >全部（若优惠券超过10张显示最新10张）</el-radio>
              <el-radio
                v-model="config.showNumType"
                :label="2"
              >
                <el-input
                  v-model="config.showNum"
                  placeholder="请输入显示数量"
                  maxlength="10"
                ></el-input>
              </el-radio>
            </el-form-item>
            <el-form-item label="样式">
              <el-radio-group
                v-model="config.couponWay"
                @change="changeCouponWay"
              >
                <el-radio :label="1">横向滑动</el-radio>
                <el-radio :label="2">一行两个</el-radio>
                <el-radio
                  :label="3"
                  v-show='config.showStyleType == 2'
                >一行三个</el-radio>
              </el-radio-group>
            </el-form-item>
            <coupon-style-config
              v-if="config.showStyleType == 1"
              :styleConfig="config.couponStatusStyle['default']"
              @changeConfig="e=>{changeConfig('default',e)}"
            ></coupon-style-config>
          </div>
        </div>
        <el-form-item label="更多设置">
          <el-form-item label="左右留白:">
            <el-slider
              v-model="config.lrMargin"
              :max="500"
              show-input
            ></el-slider>
          </el-form-item>
          <el-form-item
            label="间距:"
            v-show="config.showStyleType == 1"
          >
            <el-slider
              v-model="config.contentMargin"
              :max="500"
              show-input
            ></el-slider>
          </el-form-item>
          <el-checkbox
            class="check-line check-sub"
            v-model="config.hideSellOutCoupon"
            :label="1"
          >隐藏已抢完券</el-checkbox>
        </el-form-item>
      </el-form>
    </el-card>
  </div>
</template>

<script >
  import draggable from "vuedraggable";
  import couponListChoose from "./CouponList.vue";
  import myDialog from '../../utils/popup'
  let couponPop = new myDialog(couponListChoose)
  import CouponListShow from "./CouponListShow.vue";
  import CouponStyleConfig from "./CouponStyleConfig.vue";
  import CStyleOne from "./couponTpl/style1.vue";
  import Config from "./config";
  export default {
    name: "couponList",
    data() {
      return {
        config: {
          showTemplateType: 1,
          showStyleType: 1,
          screenShowNum: 1,
          hideSellOutCoupon: 1,
          contentMargin: 8,
          lrMargin: 8,
          chooseType: 2,
          showNum: "",
          showNumType: 1,
          couponWay: 1,
          coupon_id: [],
          couponStatusStyle: {
            default: {
              couponStyle: 1
            }
          }
        },
        couponStatus: 1,
        couponList: [],
        ajaxing: false,
        configs: {
          title: {
            33: "秒杀",
            34: "拼团",
            35: "砍价"
          },
          toolIds: {
            33: 1,
            34: 3,
            35: 4
          },
          listTypes: [
            {
              key: 1,
              name: "大图"
            },
            {
              key: 2,
              name: "小图"
            },
            {
              key: 3,
              name: "详细列表"
            }
          ],
          itemTypes: [
            {
              key: 1,
              name: "样式1"
            },
            {
              key: 2,
              name: "样式2"
            }
          ],
          buyIcons: [
            {
              key: 1,
              name: "样式1"
            },
            {
              key: 2,
              name: "样式2"
            },
            {
              key: 3,
              name: "样式3"
            },
            {
              key: 4,
              name: "样式4"
            }
          ],
          hideEndingTypes: [
            {
              key: 1,
              name: "24小时后隐藏"
            },
            {
              key: 2,
              name: "立即隐藏"
            }
          ]
        },
        couponStatusStyle: {}
      };
    },
    props: [
      "belongIndex",
      "currentIndex",
      "isGroup",
      "content",
      "type",
      "bodyBg"
    ],
    components: {
      draggable: draggable,
      "coupon-list-show": CouponListShow,
      "coupon-style-config": CouponStyleConfig,
      CStyleOne
    },
    methods: {
      // 切换 自动获取/手动获取
      changeChooseType(v) {
        // 手动获取
        if (this.config.chooseType == 1) {
          this.couponList = [];
          this.config.couponStatusStyle = {};
          this.config.coupon_id = [];
          this.config.showStyleType = 1;
        } else {
          // 自动获取
          this.config.coupon_id = [];
          // 默认3张优惠券的数据
          this.couponList =
            this.config.couponWay == 2 ? Config.listData4 : Config.listData;
          this.config.couponStatusStyle = {
            default: {
              couponStyle: 1
            }
          };
        }
      },
      // 一行2个 切换
      changeCouponWay(value) {
        this.couponList = value == 2 ? Config.listData4 : Config.listData;
      },
      showCouponModal() {
        couponPop.popup().then(res => {
          this.multipleSelection(res)
        }).catch(() => { })
      },
      multipleSelection(coupons) {
        coupons.forEach(elem => {
          if (this.config.coupon_id.indexOf(elem.coupon_id) < 0) {
            this.config.coupon_id.push(elem.coupon_id);
            this.config.couponStatusStyle[elem.coupon_id] = Object.assign(
              {},
              { couponStyle: 1 }
            );
            this.couponList.push(elem);
          }
        });
      },
      deleteGood(index) {
        delete this.config.couponStatusStyle[this.config.coupon_id[index]];
        this.config.coupon_id.splice(index, 1);
        this.couponList.splice(index, 1);
      },
      getList() {
        if (this.ajaxing) {
          return;
        }
        this.ajaxing = true;
        let self = this;
        let sale = [];
        let params = {
          coupon_id: this.config.coupon_id
        };
        this.$pcTpl.axios({
          url: '/Marketing/couponList',
          mmethod: 'post',
          data: params
        }).then(res => {
          this.ajaxing = false;
          this.couponList = res.data || [];
        })
      },
      init(n) {
        if (n) {
          this.config = Object.assign({}, { ...this.config }, n);
        }
        if (this.config.coupon_id.length > 0) {
          this.getList();
        } else {
          if (this.config.chooseType == 1) {
            return;
          }
          // 默认3张优惠券的数据
          this.couponList =
            this.config.couponWay == 2 ? Config.listData4 : Config.listData;
        }
      },
      changeConfig(id, data) {
        this.$set(
          this.config.couponStatusStyle,
          id,
          JSON.parse(JSON.stringify(data))
        );
        this.config = { ...this.config };
      },

    },
    created() {
      this.init(this.content);
    },
    watch: {
      content(n) {
        // debugger
        this.init(n);
      },
      currentIndex: function (n) {
        if (n === -1) {
          this.$emit("update:content", this.config);
        }
      },
      config: {
        handler(newVal) {
          let couponStatusStyle = {};
          for (let i in newVal.couponStatusStyle) {
            if (newVal.couponStatusStyle[i].couponStyle != 3) {
              couponStatusStyle[i] = JSON.parse(
                JSON.stringify(
                  Object.assign(
                    {},
                    newVal.couponStatusStyle[i],
                    Config["style" + newVal.couponStatusStyle[i].couponStyle]
                  )
                )
              );
            } else {
              couponStatusStyle[i] = JSON.parse(
                JSON.stringify(Config["default"])
              );
              couponStatusStyle[i] = newVal.couponStatusStyle[i];
            }
          }

          this.couponStatusStyle = couponStatusStyle;
          // debugger
        },
        deep: true,
        immediate: true
      }
    }
  };
</script>
<style lang="scss" scoped>
  .edit-box {
    display: block;
    .show-config {
      width: 495px;
      padding-left: 40px;
      line-height: 30px;
      margin-bottom: 10px;
      label {
        margin-right: 10px;
      }
    }
  }

  .goods_flex {
    flex-wrap: wrap;
    .wrapper {
      span {
        flex-wrap: wrap;
      }
    }
    .flexs {
      position: relative;
      cursor: pointer;
      margin: 0 10px 10px 0;
      border: 1px dashed #ddd;
      background-color: #fff;
      width: 495px;
      line-height: 30px;
      .card-coupon {
        padding-left: 40px;
      }
      .coupon-style {
        padding-left: 40px;
      }
    }
    .add-coupon {
      color: rgb(64, 158, 255);
      cursor: pointer;
    }
  }
</style>
