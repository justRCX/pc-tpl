<template>
  <div class="sale-config-box">
    <second-kill-show
      :config="config"
      :list="config.saleList"
    ></second-kill-show>
    <el-card
      class="edit-area"
      header="秒杀组件"
      v-if="belongIndex === currentIndex"
    >
<!--      <div class="edit-box">-->
<!--        <div class="edit-label">选择营销活动:</div>-->
<!--        <div class="goods_flex">-->
<!--          <draggable-->
<!--              class="wrapper"-->
<!--              v-model="config.saleList"-->
<!--              :options="{draggable:'.item'}"-->
<!--          >-->
<!--            <transition-group>-->
<!--              <div-->
<!--                  v-for="(obj, index) in config.saleList"-->
<!--                  :key="index"-->
<!--                  class="flexs item"-->
<!--              >-->
<!--                <div class="card-img">-->
<!--                  <i-->
<!--                      class="el-icon-close close-btn"-->
<!--                      @click="deleteGood(index)"-->
<!--                  ></i>-->
<!--                  <img-->
<!--                      style="width:100%;height:100%;"-->
<!--                      :src="obj.item.length>0 && obj.item[0].thumb_image_path"-->
<!--                      alt="商品图片"-->
<!--                  />-->
<!--                </div>-->
<!--              </div>-->
<!--              <div-->
<!--                  class="card-add"-->
<!--                  @click="saleOnModelInstance"-->
<!--                  :key="1234"-->
<!--                  sortable-->
<!--              >-->
<!--                <i-->
<!--                    style="color:#409EFF"-->
<!--                    class="iconfont icon-add1"-->
<!--                ></i>-->
<!--              </div>-->
<!--            </transition-group>-->
<!--          </draggable>-->
<!--        </div>-->
<!--      </div>-->
      <el-form
          label-width="120px"
          style="text-align:left;"
      >
        <div class="second-kill">
          <div class="empty-image" >
            <div class="head-icon">
              <el-form-item
                  label="商品售罄图片： "
              >
                <el-radio-group
                    v-model="config.isShowSellOut"
                >
                  <el-radio :label="1">展示</el-radio>
                  <el-radio :label="0">隐藏</el-radio>
                </el-radio-group>
              </el-form-item>
              <div v-if="config.isShowSellOut">
                <el-form-item
                    label="售罄图片： "
                >
                  <el-radio-group
                      @change="onchange_Icon"
                      v-model="config.isDefSellOut"
                  >
                    <el-radio :label="1">默认</el-radio>
                    <el-radio :label="2">自定义</el-radio>
                  </el-radio-group>
                </el-form-item>
                <el-form-item>
                  <div class="img" v-if="config.isDefSellOut == 1">
                    <img :src="config.defSellOutUrl" alt="">
                  </div>
                  <c-img
                      v-if="config.isDefSellOut == 2"
                      v-model="config.sellOutUrl"
                      :number="1"
                  ></c-img>
                </el-form-item>
              </div>
            </div>
          </div>
        </div>
      </el-form>
    </el-card>
  </div>
</template>

<script>
  import draggable from "vuedraggable";
  import { saleOnModelInstance } from "./sale-on-model.vue";
  import SaleShow from "./SaleShow.vue";
  import EditPanel from '../../good-style/component/edit-panel.vue';
  import SecondKillShow from '../../good-style/second-kill/index.vue'

  export default {
    name: "SecondKill",
    data() {
      return {
        config: {
          type: this.type,
          saleList: [
            {
              create_time: "2020-12-10 17:01:11",
              current_price: "200.00",
              item_id: 7040,
              item_title: "供货价测试",
              item_type: 1,
              num: 140,
              selling_point: "123",
              shelf_off_time: "",
              shelf_time: "2020-12-15 11:09:27",
              thumb_image_path: "http://img.wkdao.com/image/65/2020/12/03/94456288f8844e4abd7f67b1eef3540f.png",
              _item_type: "实物商品"
            },
            {
              create_time: "2020-12-10 16:58:35",
              current_price: "200.00",
              item_id: 7038,
              item_title: "11111",
              item_type: 1,
              num: 20,
              selling_point: "",
              shelf_off_time: "",
              shelf_time: "2020-12-10 17:06:44",
              thumb_image_path: "http://img.wkdao.com/image/65/2020/07/31/e83d205f3e6540724a20a43cb50d3a18.png",
              _item_type: "实物商品"
            },
            {
              thumb_image_path: "http://img.wkdao.com/image/65/2020/12/03/94456288f8844e4abd7f67b1eef3540f.png"
            }
          ],
          sellOutUrl: 'https://img.kemanyun.com/qianhuituan/2019-09-23/11_1569205880_Hh3hqHcUew.png',
          defSellOutUrl: "https://img.kemanyun.com/qianhuituan/2019-09-23/11_1569205880_Hh3hqHcUew.png",
          isDefSellOut: 1,
          isShowSellOut: 1,
          headName: '秒杀组件'
        },
        ajaxing: false,
      };
    },
    props: ["belongIndex", "currentIndex", "isGroup", "content", "type"],
    components: {
      draggable: draggable,
      "sale-show": SaleShow,
      'edit-panel': EditPanel,
      'second-kill-show': SecondKillShow
    },
    methods: {
      onchange_Icon($val) {
        if ($val == 2) this.config.sellOutUrl = "";
        if ($val == 1) this.config.sellOutUrl = this.config.defSellOutUrl
      },
      saleOnModelInstance() {
        let selectList = JSON.parse(JSON.stringify(this.config.saleList));
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
      handleGoodsAddConfirm(goods, type) {
        debugger
        let saleList = [];
        goods.forEach((elem) => {
          saleList.push(JSON.parse(JSON.stringify(elem)));
        });
        this.config.saleList = saleList;
      },
      deleteGood(index) {
        this.config.saleList.splice(index, 1);
      },
      getList() {
        if (this.ajaxing) {
          return;
        }
        this.ajaxing = true;
        let self = this;
        let sale = [],
          params = {};
        this.config.saleList.forEach((item) => {
          sale.push({
            sale_id: item,
            tool_id: 1,
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
              this.config.saleList = [];
              self.config.saleList.forEach((item) => {
                let info = {};
                for (let i = 0; i < res.data.length; i++) {
                  if (res.data[i].sale_id == item) {
                    info = res.data[i];
                    break;
                  }
                }
                this.config.saleList.push(info);
              });
            } else {
              this.$message({
                message: res.msg,
                type: "error",
              });
            }
          });
      },
      init(n) {
        if (n) {
          this.config = n;
        }
      },
    },
    created() {
      this.init(this.content);
      // this.getList();
    },
    watch: {
      content(n) {
        this.init(n);
      },
      currentIndex: function (n) {
        if (n === -1) {
          // if (this.config.type != 40) {
          //   this.config.saleList = this.config.saleList.map(item => item.sale_id)
          // } else {
          //   this.config.saleList = this.config.saleList.map(item => {
          //     return item.item[0].item_id;
          //   })
          // }
          // console.log(this.saleList, this.config.saleList, '保存')
          this.$emit("update:content", this.config);
        }
      },
      config: {
        handler(newVal, oldVal) {
          if (newVal.saleList.length > 0) {
            // <!-- debugger -->
            // this.getList()
          }
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
    .head-icon {
      .img{
        width: 80px;
        height: 80px;
        background: #fff;
        border: 1px solid #c0ccda;
        margin: 5px;
        overflow: hidden;
        vertical-align: top;
        border-radius: 6px;
        display: flex;
        justify-content: center;
        align-items: center;
        img {
          width: 100%;
        }
      }
    }
</style>
