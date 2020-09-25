<template>
  <div class="sale-config-box">
    <sale-show
      :config="config"
      :list="saleList"
    ></sale-show>
    <el-card
      :header="configs.title[config.type]"
      class="edit-area"
      v-if="belongIndex === currentIndex"
    >
      <el-form
        style="text-align:left;"
        label-width="120px"
      >
        <div class="edit-box">
          <div class="edit-label">选择营销活动:</div>
          <div class="goods_flex">
            <draggable
              class="wrapper"
              v-model="saleList"
              :options="{draggable:'.item'}"
            >
              <transition-group>
                <div
                  v-for="(obj, index) in saleList"
                  :key="index"
                  class="flexs item"
                >
                  <div class="card-img">
                    <i
                      class="el-icon-close close-btn"
                      @click="deleteGood(index)"
                    ></i>
                    <img
                      style="width:100%;height:100%;"
                      :src="obj.item.length>0 && obj.item[0].thumb_image_path"
                      alt="商品图片"
                    />
                  </div>
                </div>
                <div
                  class="card-add"
                  @click="saleOnModelInstance"
                  :key="1234"
                  sortable
                >
                  <i
                    style="color:#409EFF"
                    class="iconfont icon-add1"
                  ></i>
                </div>
              </transition-group>
            </draggable>
          </div>
        </div>
        <div class="title">日期导航</div>
        <el-form-item label="日期">
          <el-radio
            v-for="item in configs.dateTypes"
            :key="item.key"
            v-model="config.dateType"
            :label="item.key"
          >{{item.name}}</el-radio>
        </el-form-item>
        <div v-show="config.dateType==1">
          <el-form-item label="分类日期">
            <div style="display:flex;">
              <el-form-item label-width="0px">
                已开抢
                <el-input
                  v-model="config.beforeDate"
                  placeholder="请输入过去天数"
                  size="small"
                  style="width: 80px;"
                ></el-input>&nbsp;&nbsp;天
              </el-form-item>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
              <el-form-item label-width="0px">
                即将开抢
                <el-input
                  v-model="config.afterDate"
                  placeholder="请输入未来天数"
                  size="small"
                  style="width: 80px;"
                ></el-input>&nbsp;&nbsp;天
              </el-form-item>
            </div>
            <div style="height: 20px;">
              <em style="position: absolute;top:35px;">建议最多配置4天</em>
            </div>
          </el-form-item>
          <el-form-item label="日期背景颜色">
            <div style="display:flex;">
              <el-color-picker v-model="config.dateBackgroundColor1"></el-color-picker>&nbsp; -
              &nbsp;
              <el-color-picker v-model="config.dateBackgroundColor2"></el-color-picker>
            </div>
          </el-form-item>
          <el-form-item label-width="0">
            <div style="display:flex;">
              <el-form-item label="选中文字颜色">
                <el-color-picker v-model="config.activeFontColor"></el-color-picker>
              </el-form-item>
              <el-form-item
                label="默认文字颜色"
                style="margin-left: 10px;"
              >
                <el-color-picker v-model="config.defaultFontColor"></el-color-picker>
              </el-form-item>
            </div>
          </el-form-item>
        </div>
        <div class="title">商品配置</div>
        <el-form-item label="列表样式">
          <el-radio
            v-for="item in configs.listTypes"
            :key="item.key"
            v-model="config.listType"
            :label="item.key"
            @change="changelistType"
          >{{item.name}}</el-radio>
        </el-form-item>
        <el-form-item
          label="大图风格"
          v-if="config.listType==1"
        >
          <el-radio
            v-for="item in configs.listStyles"
            :key="item.key"
            v-model="config.listStyle"
            :label="item.key"
          >{{item.name}}</el-radio>
        </el-form-item>
        <el-form-item label="营销遮罩颜色">
          <div style="display:flex;">
            <el-color-picker v-model="config.shadeColor1"></el-color-picker>&nbsp; - &nbsp;
            <el-color-picker v-model="config.shadeColor2"></el-color-picker>
          </div>
        </el-form-item>
        <el-form-item
          label="购买按钮"
          v-if="config.type!=35 && config.type!=34"
        >
          <div>
            <el-radio-group
              class="check-sub"
              v-model="config.buyIcon"
            >
              <el-radio
                v-for="item in configs.buyIcons"
                :label="item.key"
                :key="item.key"
              >{{item.name}}</el-radio>
            </el-radio-group>
            <el-input
              v-show="config.buyIcon === 3 || config.buyIcon === 4 || config.buyIcon === 5"
              v-model="config.buyText"
              placeholder="点击输入"
              maxlength="4"
            ></el-input>
          </div>
        </el-form-item>
        <el-form-item label="背景颜色">
          <el-color-picker v-model="config.backgroundColor"></el-color-picker>
        </el-form-item>
        <el-form-item label="更多设置">
          <el-checkbox
            v-model="config.hideSellOutGoods"
            :label="1"
          >隐藏已售罄商品</el-checkbox>
          <el-checkbox
            v-model="config.hideEndingGoods"
            class="check-line"
            :label="1"
          >隐藏活动结束商品</el-checkbox>
          <el-radio-group
            class="check-sub"
            v-show="config.hideEndingGoods==1"
            v-model="config.hideEndingGoodsType"
          >
            <el-radio
              v-for="item in configs.hideEndingTypes"
              :label="item.key"
              :key="item.key"
            >{{item.name}}</el-radio>
          </el-radio-group>
        </el-form-item>
      </el-form>
    </el-card>
    <!-- 商品弹窗 -->
    <!-- <sale-model
      :visible.sync="goodsForm.visible"
      @confirm="handleGoodsAddConfirm"
      :type="config.type"
    ></sale-model> -->
    <!-- <sale-limited-model
      :visible.sync="goodsFormlimited.visible"
      @confirm="handleGoodsAddConfirm"
    ></sale-limited-model> -->
  </div>
</template>

<script>
  import draggable from "vuedraggable";
  import { saleOnModelInstance } from "./sale-on-model.vue";
  import SaleShow from "./SaleShow.vue";
  export default {
    name: "SaleComponents",
    data() {
      return {
        config: {
          type: "",
          dateType: 1,
          beforeDate: 2,
          afterDate: 2,
          dateBackgroundColor1: "#FF5F4E",
          dateBackgroundColor2: "#FB003B",
          defaultFontColor: "#FECDD2",
          activeFontColor: "#FFFFFF",
          saleList: [],
          listType: 1,
          listStyle: 1,
          shadeColor1: "#FD227B",
          shadeColor2: "#FC7216",
          buyIcon: 1,
          hideSellOutGoods: true,
          hideEndingGoodsType: 2,
          hideEndingGoods: true,
        },
        saleList: [],
        ajaxing: false,
        configs: {
          title: {
            33: "秒杀",
            34: "拼团",
            35: "砍价",
            40: "限时购",
            43: "限时折扣",
          },
          toolIds: {
            33: 1,
            34: 3,
            35: 4,
            40: 0,
            43: 2,
          },
          dateTypes: [
            {
              key: 1,
              name: "范围",
            },
            {
              key: 2,
              name: "当天",
            },
          ],
          listTypes: [
            {
              key: 1,
              name: "大图",
            },
            {
              key: 2,
              name: "小图",
            },
            {
              key: 3,
              name: "详细列表",
            },
          ],
          listStyles: [
            {
              key: 1,
              name: "样式1",
            },
            {
              key: 2,
              name: "样式2",
            },
          ],
          itemTypes: [
            {
              key: 1,
              name: "样式1",
            },
            {
              key: 2,
              name: "样式2",
            },
          ],
          buyIcons: [
            {
              key: 1,
              name: "样式1",
            },
            {
              key: 2,
              name: "样式2",
            },
            {
              key: 3,
              name: "样式3",
            },
            {
              key: 4,
              name: "样式4",
            },
            {
              key: 5,
              name: "样式5",
            },
          ],
          hideEndingTypes: [
            {
              key: 1,
              name: "24小时后隐藏",
            },
            {
              key: 2,
              name: "立即隐藏",
            },
          ],
        },
        // goodsForm: {
        //   visible: false
        // },
        // goodsFormlimited: {
        //   visible: false
        // }
      };
    },
    props: ["belongIndex", "currentIndex", "isGroup", "content", "type"],
    components: {
      draggable: draggable,
      "sale-show": SaleShow,
    },
    methods: {
      changelistType() {
        this.config.listStyle = 1;
      },
      saleOnModelInstance() {
        let selectList;
        if (this.type != 40) {
          selectList = JSON.parse(JSON.stringify(this.saleList));
        } else {
          let arr = [];
          if (this.saleList.length > 0) {
            this.saleList.forEach((res) => {
              arr.push(res.item[0]);
            });
            selectList = JSON.parse(JSON.stringify(arr));
          }
        }
        saleOnModelInstance
          .popup({
            cacheList: selectList || [],
            isSingle: this.type == 40 ? true : false,
            type: this.type,
          })
          .then((goods) => {
            this.handleGoodsAddConfirm(goods, this.type);
          })
          .catch(() => { });
      },
      // showGoodsModal() {
      //   if (this.type != 40) {
      //     this.goodsForm.visible = true;
      //   } else {
      //     this.goodsFormlimited.visible = true;
      //   }
      // },
      handleGoodsAddConfirm(goods, type) {
        let sale_id = [],
          saleList = [];
        if (type !== 40) {
          goods.forEach((elem) => {
            sale_id.push(elem.sale_id);
            saleList.push(JSON.parse(JSON.stringify(elem)));
          });
          this.config.saleList = sale_id;
          this.saleList = saleList;
        } else {
          //限时购
          goods.forEach((elem) => {
            let item = {
              item: [
                {
                  current_price: elem.current_price,
                  item_id: elem.item_id,
                  item_title: elem.item_title,
                  sale_quantity: elem.sale_quantity,
                  thumb_image_path: elem.thumb_image_path,
                },
              ],
            };
            sale_id.push(elem.item_id);
            saleList.push(JSON.parse(JSON.stringify(item)));
          });
          this.config.saleList = sale_id;
          this.saleList = saleList;
        }
      },
      deleteGood(index) {
        this.config.saleList.splice(index, 1);
        this.saleList.splice(index, 1);
      },
      getList() {
        if (this.ajaxing) {
          return;
        }
        this.ajaxing = true;
        let self = this;
        let sale = [],
          params = {};
        if (this.config.type != 40) {
          this.config.saleList.forEach((item) => {
            sale.push({
              sale_id: item,
              tool_id: this.configs.toolIds[this.config.type],
            });
          });
          params = {
            sale: JSON.stringify(sale),
          };
          this.$pcTpl
            .axios({
              url: "/Marketing/getSaleWithItem",
              method: "post",
              data: params,
            })
            .then((res) => {
              if (res.status === 1) {
                this.ajaxing = false;
                this.saleList = [];
                self.config.saleList.forEach((item) => {
                  let info = {};
                  for (let i = 0; i < res.data.length; i++) {
                    if (res.data[i].sale_id == item) {
                      info = res.data[i];
                      break;
                    }
                  }
                  this.saleList.push(info);
                });
              } else {
                this.$message({
                  message: res.msg,
                  type: "error",
                });
              }
            });
        } else {
          //限时购
          this.config.saleList.forEach((item) => {
            sale.push(item);
          });
          params = {
            item_id: sale,
          };
          this.$pcTpl
            .axios({
              url: "/Item/getItemInfo",
              method: "post",
              data: params,
            })
            .then((res) => {
              if (res.status === 1) {
                this.ajaxing = false;
                let arr = [];
                res.data.forEach((ele) => {
                  let item = {
                    item: [
                      {
                        current_price: ele.current_price,
                        item_id: ele.item_id,
                        item_title: ele.item_title,
                        thumb_image_path: ele.thumb_image_path,
                      },
                    ],
                  };
                  arr.push(JSON.parse(JSON.stringify(item)));
                });
                this.saleList = arr || [];
              } else {
                this.$message({
                  message: res.msg,
                  type: "error",
                });
              }
            });
        }
      },
      init(n) {
        if (n) {
          this.config = Object.assign(
            {
              type: this.type,
              dateType: 1,
              beforeDate: 2,
              afterDate: 2,
              dateBackgroundColor1: "#FF5F4E",
              dateBackgroundColor2: "#FB003B",
              defaultFontColor: "#FECDD2",
              activeFontColor: "#FFFFFF",
              saleList: [],
              listType: 1,
              listStyle: 1,
              shadeColor1: "#FD227B",
              shadeColor2: "#FC7216",
              buyIcon: 1,
              hideSellOutGoods: true,
              hideEndingGoodsType: 2,
              hideEndingGoods: true,
            },
            n
          );
        } else {
          this.config = {
            type: this.type,
            dateType: 1,
            beforeDate: 2,
            afterDate: 2,
            dateBackgroundColor1: "#FF5F4E",
            dateBackgroundColor2: "#FB003B",
            defaultFontColor: "#FECDD2",
            activeFontColor: "#FFFFFF",
            saleList: [],
            listType: 1,
            listStyle: 1,
            shadeColor1: "#FD227B",
            shadeColor2: "#FC7216",
            buyIcon: 1,
            hideSellOutGoods: true,
            hideEndingGoodsType: 2,
            hideEndingGoods: true,
          };
        }
      },
    },
    created() {
      this.init(this.content);
      this.getList();
    },
    watch: {
      content(n) {
        this.init(n);
      },
      currentIndex: function (n) {
        if (n === -1) {
          if (this.config.type != 40) {
            this.config.saleList = this.saleList.map(item => item.sale_id)
          } else {
            this.config.saleList = this.saleList.map(item => {
              return item.item[0].item_id;
            })
          }
          // console.log(this.saleList, this.config.saleList, '保存')
          this.$emit("update:content", this.config);
        }
      },
      config: {
        handler(newVal) {
          if (newVal.saleList.length > 0) {
            // <!-- debugger -->
            // this.getList()
          }
          // this.saleList = newVal.saleList;
        },
        deep: true,
        immediate: true,
      },
    },
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
    }
    .flexs {
      display: flex;
    }
  }
</style>
