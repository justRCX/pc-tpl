<template>
  <div class="sale-config-box">
    <sale-show
      :config="config"
      :list="config.saleList"
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
              v-model="config.saleList"
              :options="{draggable:'.item'}"
            >
              <transition-group>
                <div
                  v-for="(obj, index) in config.saleList"
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
                      :src="obj.thumb_image_path || (obj.item && obj.item.length>0 && obj.item[0].thumb_image_path)"
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
        <div class="discount-option">
          <div class="edit-header">
            <el-form-item label="模块头部样式： ">
              <el-radio-group v-model="config.isShowHead">
                <el-radio :label="1">有头部</el-radio>
                <el-radio :label="0">无头部</el-radio>
              </el-radio-group>
            </el-form-item>
            <div
              class="head-content"
              v-if="config.isShowHead"
            >
              <div class="head-icon">
                <el-form-item label="头部图标： ">
                  <el-radio-group v-model="config.isShowHeadIco">
                    <el-radio :label="1">展示</el-radio>
                    <el-radio :label="0">不展示</el-radio>
                  </el-radio-group>
                </el-form-item>
                <div v-if="config.isShowHeadIco">
                  <el-form-item label="图标： ">
                    <el-radio-group
                      @change="onchange_headIcon"
                      v-model="config.isDefHeadIco"
                    >
                      <el-radio :label="1">默认</el-radio>
                      <el-radio :label="2">自定义</el-radio>
                    </el-radio-group>
                  </el-form-item>
                  <el-form-item>
                    <div class="img-wrap">
                      <div
                        class="img"
                        v-if="config.isDefHeadIco == 1"
                      >
                        <img
                          :src="config.defIconUrl"
                          alt=""
                        >
                      </div>
                      <c-img
                        v-if="config.isDefHeadIco == 2"
                        v-model="config.headIconUrl"
                        :number="1"
                      ></c-img>
                    </div>
                    <div class="txt-limit-tip">建议上传8px*28px的png图片</div>
                  </el-form-item>
                </div>
              </div>
              <el-form-item label="标题名称： ">
                <el-radio-group v-model="config.isShowHeadName">
                  <el-radio :label="1">展示</el-radio>
                  <el-radio :label="0">不展示</el-radio>
                </el-radio-group>
                <div v-if="config.isShowHeadName">
                  <el-input
                    style="width:250px"
                    size="mini"
                    v-model="config.headName"
                    maxlength
                  ></el-input>
                  <div class="txt-limit-tip">建议最多4个字以内</div>
                </div>
              </el-form-item>
              <el-form-item label="背景颜色: ">
                <el-color-picker
                  v-model="config.bgColor"
                  show-alpha
                ></el-color-picker>
              </el-form-item>
              <el-form-item label="倒计时模块： ">
                <el-radio-group v-model="config.isShowCD">
                  <el-radio :label="1">展示</el-radio>
                  <el-radio :label="0">不展示</el-radio>
                </el-radio-group>
              </el-form-item>
              <div class="head-more">
                <el-form-item label="更多模块： ">
                  <el-radio-group v-model="config.isShowMore">
                    <el-radio :label="1">展示</el-radio>
                    <el-radio :label="0">不展示</el-radio>
                  </el-radio-group>
                </el-form-item>
                <div v-if="config.isShowMore">
                  <el-form-item label=" ">
                    <el-input
                      style="width:250px"
                      size="mini"
                      v-model="config.moreText"
                      maxlength
                    ></el-input>
                    <div class="txt-limit-tip">建议最多4个字以内</div>
                  </el-form-item>
                  <el-form-item label="链接到：">
                    <page-link-select
                      :ref="'pageLinkSelect'"
                      :selectValue="config.moreLink"
                      @linkSelected="(e)=>{linkSelected(e)}"
                    ></page-link-select>
                  </el-form-item>
                </div>
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
  import SaleOption from './Sale-option.vue';
  import goodsStyleConfig from '../../good-style/config'

  export default {
    name: "DiscountComponent",
    data() {
      return {
        tileLimitTip: "建议最多4个字以内",
        config: {
          type: this.type,
          saleList: [],
          isShowHeadIco: 1, //是否默认头部ico
          headIconUrl: 'http://img.wkdao.com/image/65/2020/12/28/8a00d4b9b086a3c0b73de91fcb593126.png', //头部图标
          defIconUrl: "http://img.wkdao.com/image/65/2020/12/28/8a00d4b9b086a3c0b73de91fcb593126.png", //默认头部图标
          isDefHeadIco: 1,  //是否默认头部ico
          isShowHeadName: 1, //是否显示头部名称
          headName: '限时抢购', //头部名称
          isShowCD: 1, //是否显示倒计时
          isShowMore: 1, //是否显示更多
          moreText: '更多', //更多文案
          bgColor: '#fff',
          moreLink: {
            origin_id: '',
            urlType: "",
            urlTitle: "",
            choose: null,
          }, //更多链接
          isShowHead: 1, //是否显示头部
          ...goodsStyleConfig
        },
        ajaxing: false,
      };
    },
    props: ["belongIndex", "currentIndex", "isGroup", "content", "type"],
    components: {
      draggable: draggable,
      "sale-show": SaleShow,
      'edit-panel': EditPanel,
      'sale-option': SaleOption,
    },
    methods: {
      onchange_headIcon($val) {
        if ($val == 2) this.config.headIconUrl = "";
        if ($val == 1) this.config.headIconUrl = this.config.defIconUrl;
      },
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
            defaultNum: 1
          })
          .then((goods) => {
            this.handleGoodsAddConfirm(goods, this.type);
          })
          .catch(() => { });
      },
      handleGoodsAddConfirm(goods, type) {
        // let saleList = [];
        // goods.forEach((elem) => {
        //   saleList.push(JSON.parse(JSON.stringify(elem)));
        // });
        console.log(goods, /goods/)
        this.config.saleList = goods;
      },
      deleteGood(index) {
        this.config.saleList.splice(index, 1);
      },
      init(n) {
        if (n) {
          this.config = n;
        }
      },
    },
    created() {
      this.init(this.content);
    },
    watch: {
      content(n) {
        this.init(n);
      },
      currentIndex: function (n) {
        if (n === -1) {
          // if (this.config.type != 40) {
          //   this.config.saleList = this.saleList.map(item => item.sale_id)
          // } else {
          //   this.config.saleList = this.saleList.map(item => {
          //     return item.item[0].item_id;
          //   })
          // }
          console.log(this.config, '保存')
          this.$emit("update:content", this.config);
        }
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
    .txt-limit-tip {
      line-height: 1;
      color: rgb(153, 153, 153);
    }
    .head-icon {
      .img-wrap {
        padding-bottom: 5px;
        .img {
          width: 80px;
          height: 80px;
          background: #fff;
          border: 1px solid #c0ccda;
          margin-top: 10px;
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
  }
</style>
