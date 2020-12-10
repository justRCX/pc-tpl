<template>
  <div class="sale-config-box">
    <sale-show
      :config="config"
      :list="saleList"
    ></sale-show>
    <el-card
      class="edit-area"
      :header="config.headName"
    v-if="belongIndex === currentIndex"
    >


        <edit-panel :config='config'>
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
          <div class="edit-header">
            <el-form-item
                label="模块头部样式： "
            >
              <el-radio-group
                  v-model="config.isShowHead"
              >
                <el-radio :label="1">有头部</el-radio>
                <el-radio :label="0">无头部</el-radio>
              </el-radio-group>
            </el-form-item>
            <div class="head-content" v-if="config.isShowHead">
              <div class="head-icon">
                <el-form-item
                    label="头部图标： "
                >
                  <el-radio-group
                      v-model="config.isShowHeadIco"
                  >
                    <el-radio :label="1">展示</el-radio>
                    <el-radio :label="0">不展示</el-radio>
                  </el-radio-group>
                </el-form-item>
                <el-form-item
                    label="图标： "
                >
                  <el-radio-group
                      v-model="config.isDefHeadIco"
                  >
                    <el-radio :label="1">默认</el-radio>
                    <el-radio :label="2">自定义</el-radio>
                  </el-radio-group>
                </el-form-item>
                <el-form-item>
                  <div class="img" v-if="config.isDefHeadIco == 1">
                    <img :src="config.defIconUrl" alt="">
                  </div>
                  <c-img
                      v-if="config.isDefHeadIco == 2"
                      v-model="config.headIconUrl"
                      :number="1"
                  ></c-img>
                </el-form-item>
              </div>
              <el-form-item
                  label="标题名称： "
              >
                <el-radio-group
                    v-model="config.isShowHeadName"
                >
                  <el-radio :label="1">展示</el-radio>
                  <el-radio :label="0">不展示</el-radio>
                </el-radio-group>
                <el-input style="width:250px" size="mini"  v-if="config.isShowHeadName"  v-model="config.headName" maxlength></el-input>
              </el-form-item>
              <el-form-item
                  label="倒计时模块： "
              >
                <el-radio-group
                    v-model="config.isShowCD"
                >
                  <el-radio :label="1">展示</el-radio>
                  <el-radio :label="0">不展示</el-radio>
                </el-radio-group>
              </el-form-item>
              <div class="head-more">
                <el-form-item
                    label="更多模块： "
                >
                  <el-radio-group
                      v-model="config.isShowMore"
                  >
                    <el-radio :label="1">展示</el-radio>
                    <el-radio :label="0">不展示</el-radio>
                  </el-radio-group>
                </el-form-item>
                <div v-if="config.isShowMore">
                  <el-form-item label=" ">
                    <el-input style="width:250px" size="mini"  v-model="config.moreText" maxlength></el-input>
                  </el-form-item>
                  <el-form-item label="链接：">
                    <page-link-select
                        :ref="'pageLinkSelect'"
                        :selectValue="moreLink"
                        @linkSelected="(e)=>{linkSelected(e)}"
                    ></page-link-select>
                  </el-form-item>
                </div>
              </div>
            </div>
          </div>
        </edit-panel>
    </el-card>
  </div>
</template>

<script>
  import draggable from "vuedraggable";
  import { saleOnModelInstance } from "./sale-on-model.vue";
  import SaleShow from "./SaleShow.vue";
  import EditPanel from '../../good-style/component/edit-panel.vue';

  export default {
    name: "SaleComponents",
    data() {
      return {
        config: {
          saleList: [],
          isShowHeadIco: 1, //是否默认头部ico
          headIconUrl: 'https://img.qianhuituan.cn/uploads/images/202006/29/FAiaT2Bxw79LRpvkN8N8EpkrCtTDWRckt6EX3D5a.png', //头部图标
          defIconUrl:"https://img.qianhuituan.cn/uploads/images/202006/29/FAiaT2Bxw79LRpvkN8N8EpkrCtTDWRckt6EX3D5a.png", //默认头部图标
          isDefHeadIco: 1,  //是否默认头部ico
          isShowHeadName: 1, //是否显示头部名称
          headName: '限时抢购', //头部名称
          isShowCD: 1, //是否显示倒计时
          isShowMore: 1, //是否显示更多
          moreText: '更多', //更多文案
          moreLink: {
            origin_id: '',
            urlType: "",
            urlTitle: "",
            choose: null,
          }, //更多链接
          isShowHead: 1, //是否显示头部
          listType: 1,  //商品样式
          cart: 1, //加购物车样式
          badge_id: 0, //角标
          badge_path: '', //选中的角标路径
          customBadge: '', //自定义角标
          isShowCate: 1, //是否展示快捷进入分类
          isShowBuyHis: 1, //是否显示购买记录
        },
        ajaxing: false,
      };
    },
    props: ["belongIndex", "currentIndex", "isGroup", "content", "type"],
    components: {
      draggable: draggable,
      "sale-show": SaleShow,
      'edit-panel': EditPanel
    },
    methods: {
      linkSelected($data) {
        this.config.moreLink = $data
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
      },
      init(n) {
        if (n) {
          this.config = n;
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
          if (newVal.isDefHeadIco == 2) {
            this.config.headIconUrl = ""
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

  .edit-header {
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
        }
      }
    }
  }
</style>
