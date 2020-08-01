<template>
  <div class="coupon-style">
    <el-form>
      <el-form-item label="样式">
        <el-radio-group
          v-model="couponStyle.couponStyle"
          @change="changeCouponStyle"
        >
          <el-radio :label="1">样式1</el-radio>
          <el-radio :label="2">样式2</el-radio>
          <el-radio :label="4">样式3</el-radio>
          <el-radio :label="5">样式4</el-radio>
          <el-radio :label="6">样式5</el-radio>
          <el-radio :label="7">样式6</el-radio>
          <el-radio :label="8">样式7</el-radio>
          <el-radio :label="9">样式8</el-radio>
          <el-radio :label="3">自定义</el-radio>
        </el-radio-group>
      </el-form-item>
      <div v-if="couponStyle.couponStyle==3">
        <el-tabs v-model="activeStatueName">
          <el-tab-pane
            :label="item.name"
            :name="item.name"
            v-for="(item,index) in couponStatusStyle"
            :key="index"
          >
            <div
              class="card-img"
              v-if="couponStyle[item.key].backUrl"
            >
              <i
                class="el-icon-close close-btn"
                @click="deleteGood(item.key,'backUrl')"
              ></i>
              <img
                style="width:100%;height:100%;"
                :src="couponStyle[item.key].backUrl"
                alt="优惠券图片"
              />
            </div>
            <div
              class="card-add"
              @click="showGoodsModal(item.key,'backUrl')"
              v-if="!couponStyle[item.key].backUrl"
            >
              <i
                style="color:#409EFF"
                class="iconfont icon-add1"
              ></i>
            </div>
            <div>
              <span class="span-item">宽度：</span>
              <el-slider
                class="slider-item"
                v-model="couponStyle[item.key].backWidth"
                :min="0"
                :max="750"
                show-input
              ></el-slider>
            </div>
            <el-tabs v-model="activeName">
              <el-tab-pane
                :label="type.name"
                :name="item.name+'_'+type.name"
                v-for="(type, key) in fontType"
                :key="key"
              >
                <el-form-item label="是否显示">
                  <el-radio
                    v-model="couponStyle[item.key][type.key].is_show"
                    :label="1"
                  >是</el-radio>
                  <el-radio
                    v-model="couponStyle[item.key][type.key].is_show"
                    :label="0"
                  >否</el-radio>
                </el-form-item>
                <el-form-item label="字体大小">
                  <el-input
                    class="input-width"
                    v-model="couponStyle[item.key][type.key].fontSize"
                    placeholder="请输入字体大小"
                    type="number"
                  ></el-input>
                </el-form-item>
                <el-form-item
                  label="增加自定义文本"
                  v-if="type.key=='currency'|| type.key=='couponBtn'|| type.key=='price'"
                >
                  <el-input
                    class="input-width"
                    v-model="couponStyle[item.key][type.key].content"
                    placeholder="请输入文本"
                  ></el-input>
                </el-form-item>
                <el-form-item
                  label="自定义文本字体大小"
                  v-if="type.key=='price'"
                >
                  <el-input
                    class="input-width"
                    v-model="couponStyle[item.key][type.key].CompanyFontSize"
                    placeholder="请输入字体大小"
                  ></el-input>
                </el-form-item>
                <el-form-item
                  label="自定义文本字体加粗"
                  v-if="type.key=='price'"
                >
                  <el-radio
                    v-model="couponStyle[item.key][type.key].CompanyBold"
                    :label="700"
                  >是</el-radio>
                  <el-radio
                    v-model="couponStyle[item.key][type.key].CompanyBold"
                    :label="400"
                  >否</el-radio>
                </el-form-item>
                <el-form-item
                  label="自定义文本定位"
                  v-if="type.key=='price'"
                >
                  <el-radio
                    v-model="couponStyle[item.key][type.key].position"
                    :label="1"
                  >前置</el-radio>
                  <el-radio
                    v-model="couponStyle[item.key][type.key].position"
                    :label="2"
                  >后置</el-radio>
                </el-form-item>
                <el-form-item
                  label="字体加粗"
                  v-if="type.key=='price'"
                >
                  <el-radio
                    v-model="couponStyle[item.key][type.key].bold"
                    :label="700"
                  >是</el-radio>
                  <el-radio
                    v-model="couponStyle[item.key][type.key].bold"
                    :label="400"
                  >否</el-radio>
                </el-form-item>
                <div>
                  <span class="span-item">文本宽度：</span>
                  <el-slider
                    class="slider-item"
                    v-model="couponStyle[item.key][type.key].width"
                    :min="0"
                    :max="100"
                    show-input
                  ></el-slider>
                  <span class="company">%</span>
                </div>
                <el-form-item label="文本位置">
                  <el-radio
                    v-model="couponStyle[item.key][type.key].align"
                    label="left"
                  >居左</el-radio>
                  <el-radio
                    v-model="couponStyle[item.key][type.key].align"
                    label="center"
                  >居中</el-radio>
                  <el-radio
                    v-model="couponStyle[item.key][type.key].align"
                    label="right"
                  >居右</el-radio>
                </el-form-item>
                <el-form-item label="文字颜色">
                  <el-color-picker v-model="couponStyle[item.key][type.key].color">
                  </el-color-picker>
                </el-form-item>
                <div>
                  <label>定位</label>
                  <div>
                    <span class="span-item sub-title">左：</span>
                    <div>
                      <el-slider
                        class="slider-item"
                        v-model="couponStyle[item.key][type.key].left"
                        :min="0"
                        :max="750"
                        show-input
                      ></el-slider>
                    </div>
                    <div>
                      <span class="span-item sub-title">上：</span>
                      <el-slider
                        class="slider-item"
                        v-model="couponStyle[item.key][type.key].top"
                        :min="0"
                        :max="750"
                        show-input
                      ></el-slider>
                    </div>
                  </div>
                </div>
              </el-tab-pane>
              <el-tab-pane
                label="印章"
                :name="item.name+'_印章'"
              >
                <el-form-item label="是否显示">
                  <el-radio
                    v-model="couponStyle[item.key]['minimgUrl'].is_show"
                    :label="1"
                  >是</el-radio>
                  <el-radio
                    v-model="couponStyle[item.key]['minimgUrl'].is_show"
                    :label="0"
                  >否</el-radio>
                </el-form-item>
                <div
                  class="card-img"
                  v-if="couponStyle[item.key]['minimgUrl'].content"
                >
                  <i
                    class="el-icon-close close-btn"
                    @click="deleteGood('minimgUrl','content',item.key)"
                  ></i>
                  <img
                    style="width:100%;height:100%;"
                    :src="couponStyle[item.key]['minimgUrl'].content"
                    alt="优惠券图片"
                  />
                </div>
                <div
                  class="card-add"
                  @click="showGoodsModal('minimgUrl','content',item.key)"
                  v-if="!couponStyle[item.key]['minimgUrl'].content"
                >
                  <i
                    style="color:#409EFF"
                    class="iconfont icon-add1"
                  ></i>
                </div>
                <div>
                  <span class="span-item">宽度：</span>
                  <el-slider
                    class="slider-item"
                    v-model="couponStyle[item.key]['minimgUrl'].width"
                    :min="0"
                    :max="100"
                    show-input
                  ></el-slider>
                  <span class="company">%</span>
                </div>
                <div>
                  <label>定位</label>
                  <div>
                    <span class="span-item sub-title">左：</span>
                    <div>
                      <el-slider
                        class="slider-item"
                        v-model="couponStyle[item.key]['minimgUrl'].left"
                        :min="0"
                        :max="750"
                        show-input
                      ></el-slider>
                    </div>
                    <div>
                      <span class="span-item sub-title">上：</span>
                      <el-slider
                        class="slider-item"
                        v-model="couponStyle[item.key]['minimgUrl'].top"
                        :min="0"
                        :max="750"
                        show-input
                      ></el-slider>
                    </div>
                  </div>
                </div>
                <el-form-item></el-form-item>
              </el-tab-pane>
            </el-tabs>
          </el-tab-pane>
        </el-tabs>
      </div>
    </el-form>
  </div>
</template>
<script>
  import draggable from "vuedraggable";
  import { isEqual } from "../../utils/common";
  import CouponListShow from "./CouponListShow.vue";
  import Config from "./config";
  export default {
    name: "CouponStyleConfig",
    data() {
      return {
        // couponStyle: Object.assign(Config.default, { couponStyle: 1 }),
        couponStyle: Object.assign(Config.default, {}),
        couponStatusStyle: [
          { name: "未领取", key: "waitReceive" },
          { name: "已领取", key: "hasReceive" },
          { name: "已失效", key: "overdue" }
        ],
        fontType: [
          { name: "价格", key: "price" },
          { name: "单位", key: "currency" },
          { name: "标题", key: "title" },
          { name: "条件", key: "condition" },
          { name: "按钮", key: "couponBtn" }
        ],
        activeName: "未领取_价格",
        activeStatueName: "未领取"
      };
    },
    props: ["styleConfig"],
    components: {},
    computed: {
      config() {
        return JSON.parse(JSON.stringify(this.couponStyle));
      }
    },
    methods: {
      init(n) {
        if (n) {
          if (n.couponStyle == 1) {
            this.couponStyle = JSON.parse(
              JSON.stringify(Object.assign({}, Config.style1, n))
            );
          }
          if (n.couponStyle == 2) {
            this.couponStyle = JSON.parse(
              JSON.stringify(Object.assign({}, Config.style2, n))
            );
          }
          if (n.couponStyle == 3) {
            this.couponStyle = JSON.parse(
              JSON.stringify(Object.assign({}, Config.default, n))
            );
          }
          if (n.couponStyle == 4) {
            this.couponStyle = JSON.parse(
              JSON.stringify(Object.assign({}, Config.style4, n))
            );
          }
          if (n.couponStyle == 5) {
            this.couponStyle = JSON.parse(
              JSON.stringify(Object.assign({}, Config.style5, n))
            );
          }
          if (n.couponStyle == 6) {
            this.couponStyle = JSON.parse(
              JSON.stringify(Object.assign({}, Config.style6, n))
            );
          }
          if (n.couponStyle == 7) {
            this.couponStyle = JSON.parse(
              JSON.stringify(Object.assign({}, Config.style7, n))
            );
          }
          if (n.couponStyle == 8) {
            this.couponStyle = JSON.parse(
              JSON.stringify(Object.assign({}, Config.style8, n))
            );
          }
          if (n.couponStyle == 9) {
            this.couponStyle = JSON.parse(
              JSON.stringify(Object.assign({}, Config.style9, n))
            );
          }
        }
      },
      showGoodsModal(key, type, key1) {
        if (key1) {
          this.selectedImg = [key, type, key1];
        } else {
          this.selectedImg = [key, type];
        }
        this.$pcTpl.imgChoose.popup().then(res => {
          this.imageChooseConfirm(res);
        });
      },
      imageChooseConfirm(obj) {
        if (this.selectedImg.length == 3) {
          this.couponStyle[this.selectedImg[2]][this.selectedImg[0]][
            this.selectedImg[1]
          ] = obj[0].image_path;
        } else {
          this.couponStyle[this.selectedImg[0]][this.selectedImg[1]] =
            obj[0].image_path;
        }
      },
      handleClick() { },
      changeCouponStyle(value) {
        if (value == 3) {
          this.couponStyle = Object.assign({}, Config.default, this.styleConfig);
          this.couponStyle.couponStyle = 3;
        } else {
          // debugger
          this.couponStyle = Object.assign({}, this.couponStyle);
          this.couponStyle.couponStyle = value;
          this.$forceUpdate();
        }
      },
      deleteGood(key, type, key1) {
        if (key1) {
          this.couponStyle[key1][key][type] = "";
        } else {
          this.couponStyle[key][type] = "";
        }
      },
      linkSelected(data, key1, key2) {
        this.couponStyle[key1][key2].link.urlType = data.urlType;
        this.couponStyle[key1][key2].link.urlTitle = data.urlTitle;
        this.couponStyle[key1][key2].link.choose = data.choose;
        this.couponStyle[key1][key2].link.HttpType = data.HttpType || 1;
      }
    },
    created() { },
    watch: {
      styleConfig: {
        handler(n) {
          this.init(n);
        },
        deep: true,
        immediate: true
      },
      config: {
        handler(newVal, oldVal) {
          if (!isEqual(newVal, oldVal)) {
            this.$emit("changeConfig", JSON.parse(JSON.stringify(newVal)));
          }
        },
        deep: true
      }
    }
  };
</script>
<style lang="scss" scoped>
  .goods_flex {
    display: flex;
    flex-wrap: wrap;
    .wrapper {
      span {
        max-width: 400px;
        display: flex;
        flex-wrap: wrap;
      }
      .slider-item {
        display: inline-block;
        width: 370px;
      }
      .span-item {
        float: left;
        line-height: 38px;
        &.sub-title {
          margin-left: 20px;
        }
      }
      .input-width {
        width: 300px;
        float: right;
        margin-right: 10px;
      }
      .company {
        float: right;
        line-height: 38px;
        margin-right: 10px;
      }
    }
    .flexs {
      display: flex;
    }
  }
</style>
