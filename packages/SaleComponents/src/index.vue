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
      </el-form>
    </el-card>
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
          saleList: [],
          showHeadIcon: 1,
          headIconSrc: '',
          showHeadName: 1,
          headName: '限时抢购',
          showCountDown: 1,
          showMore: '',
          moreText: '更多',
          link: '',
        },
        ajaxing: false,
      };
    },
    props: ["belongIndex", "currentIndex", "isGroup", "content", "type"],
    components: {
      draggable: draggable,
      "sale-show": SaleShow,
    },
    methods: {
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
