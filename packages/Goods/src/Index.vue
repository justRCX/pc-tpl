<template>
  <div class="goods-tuan">
    <good-item
      v-if="!isGroup"
      :config="config"
      :listType="config.listType"
      :group="false"
    ></good-item>
    <el-card
      v-if="belongIndex === currentIndex"
      class="edit-area"
      header="商品"
    >
      <el-form
        label-width="120px"
        style="text-align:left;"
      >
        <!--                商品来源-->
        <div class="goods-origin-wrap">
          <el-form-item
            v-if="!isGroup"
            label="商品来源： "
          >
            <el-radio-group v-model="config.source">
              <el-radio :label="1">商品</el-radio>
              <el-radio :label="2">商品分组</el-radio>
            </el-radio-group>
          </el-form-item>
          <!--                    复制黏贴过来的-->
          <div
            class="edit-box"
            v-show="!isGroup && config.source === 1"
          >
            <div class="edit-label">商品:</div>
            <div class="goods_flex">
              <draggable
                class="wrapper"
                v-model="config.goods"
                :options="{draggable:'.item'}"
              >
                <transition-group>
                  <div
                    v-for="(obj, index) in config.goods"
                    :key="index+Math.random()+Math.random()"
                    class="flexs item"
                  >
                    <div class="card-img">
                      <i
                        class="el-icon-close close-btn"
                        @click="onClick_deleteGood(index)"
                      ></i>
                      <img
                        style="width:100%;height:100%;"
                        :src="obj.thumb_image_path"
                        alt="商品图片"
                      />
                    </div>
                  </div>
                  <div
                    class="card-add"
                    @click="onClick_showGoodsPop"
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
          <div
            class="edit-box multi-line"
            v-show="!isGroup && config.source === 2"
          >
            <div class="edit-item">
              <div class="edit-label">商品分组:</div>
              <el-tag
                size="medium"
                v-show="config.goodsGroupId !== ''"
                @close="removeGoodsGroup"
                closable
              >
                <span>商品标签|</span>
                <span>{{config.goodsGroupName}}</span>
              </el-tag>
              <span
                v-show="config.goodsGroupId === ''"
                class="active-span"
                @click="onClick_showGoodsGroupPop(1)"
              >从商品分组中选择</span>
            </div>
            <div class="edit-item">
              <div class="edit-label">显示数量:</div>
              <el-input
                v-model="config.showCount"
                style="width:80px"
                max="50"
                type="number"
                size="small"
              ></el-input>
              <span class="grey-span">最多显示10</span>
            </div>
          </div>
        </div>
        <el-form-item label="列表样式： ">
          <el-radio
            v-for="item in listTypes"
            :key="item.key"
            v-model="config.listType"
            :label="item.key"
          >{{item.name}}</el-radio>
        </el-form-item>
        <div class="badge-wrap">
          <el-form-item label="商品角标： ">
            <el-radio
              v-for="item in badgeList"
              :key="item.key"
              v-model="config.badge"
              :label="item.key"
            >{{item.name}}</el-radio>
          </el-form-item>
          <el-form-item
            v-if="config.badge === 5"
            label=""
          >
            <c-img
              v-model="config.customBadge"
              :number="1"
            ></c-img>
          </el-form-item>
        </div>
        <el-form-item label="加购物车样式： ">
          <el-radio
            v-for="item in cartList"
            :key="item.key"
            v-model="config.cart"
            :label="item.key"
          >{{item.name}}</el-radio>
        </el-form-item>
        <el-form-item label="快捷进入分类： ">
          <el-radio
            v-for="item in booleanOption"
            :key="item.key"
            v-model="config.isshowCate"
            :label="item.key"
          >{{item.name}}</el-radio>
        </el-form-item>
        <el-form-item label="购买记录： ">
          <el-radio
            v-for="item in booleanOption"
            :key="item.key"
            v-model="config.isshowBuyHis"
            :label="item.key"
          >{{item.name}}</el-radio>
        </el-form-item>
      </el-form>
    </el-card>
    <!--        商品分组弹窗组件-->
    <goods-group-form
      :visible.sync="goodsGroupForm.visible"
      :type="type"
      @confirm="handleGoodsGroupAddConfirm"
    ></goods-group-form>
  </div>
</template>

<script>
  import draggable from "vuedraggable";
  import GoodsGroupForm from "./GroupForm.vue";
  import GoodItem from "./Item.vue";
  import GoodsGroup from "./GoodsGroup.vue";
  const originGroups = [
    {
      group_id: "1",
      group_title: "分组1"
    },
    {
      group_id: "2",
      group_title: "分组2"
    }
  ];
  export default {
    name: "goodsEdit",
    data() {
      return {
        type: 1,
        // 传进去的参数
        config: {
          // TBMargin: 0, //商品组件上下边距
          // isHeader: 1, // 是否要头部
          // isShowIco: 1, //是否显示头部图标
          // isDefaultIco: 1, //是否使用默认头部图标
          // defaultIco: '', //默认头部图标url
          // customIco: '', //自定义ico
          isGroup: 0,  //是不是商品分组
          listType: 1,  //商品样式
          cart: 1, //加购物车样式
          badge: 0, //角标
          customBadge: '', //自定义角标
          isshowCate: 1, //是否展示快捷进入分类
          isshowBuyHis: 1, //是否显示购买记录
          showCount: 6,
          goods: [], //商品列表
          goodsGroupId: "",
          goodsGroupName: "",
          // 分组参数
          templateId: 1,
          goodsGroups: [],
          source: 1,
        },
        goodsForm: {
          visible: false
        },
        goodsGroupForm: {
          visible: false,
          index: "" // 缓存商品分组修改index
        },
        // 分组
        groups: originGroups.slice(),
        goodsList: [],
        booleanOption: [
          {
            key: 1,
            name: '显示'
          },
          {
            key: 0,
            name: '隐藏'
          },
        ],
        cartList: [
          {
            key: 1,
            name: '购物车图标'
          },
          {
            key: 2,
            name: '加号'
          },
        ],
        badgeList: [
          {
            key: 0,
            name: '无'
          },
          {
            key: 1,
            name: '新品'
          },
          {
            key: 2,
            name: '热卖'
          },
          {
            key: 3,
            name: 'NEW'
          },
          {
            key: 4,
            name: 'HOT'
          },
          {
            key: 5,
            name: '自定义上传'
          },
        ],
        listTypes: [
          {
            key: 1,
            name: '样式一'
          },
          {
            key: 2,
            name: '样式二'
          },
          {
            key: 3,
            name: '样式三'
          },
          {
            key: 4,
            name: '样式四'
          },
        ],
      }
    },
    props: ["belongIndex", "currentIndex", "isGroup", "content"],
    components: {
      "good-item": GoodItem,
      draggable: draggable,
      "goods-group": GoodsGroup,
      "goods-group-form": GoodsGroupForm,
    },
    watch: {
      content(n) {
        trace(n, 'content')
        this.init(n);
      },
      currentIndex: function (n) {
        if (n === -1) {
          this.$emit("update:content", this.config);
        }
      },
      config: {
        handler(newVal) {
          trace(this.content, 'watch config')
          this.$emit("changeConfig", this.config);
        },
        deep: true,
        immediate: true
      }
    },
    created() {
      trace(this.content, 'created')
      this.init(this.content);
    },
    methods: {
      init($data) {
        // this.config = __merge(this.config,n, true)
        __merge(this.config, $data, true)
      },
      onClick_deleteGood($index) {
        this.config.goods.splice($index, 1);
      },
      onClick_showGoodsGroupPop($type) {
        this.type = $type;
        this.goodsGroupForm.visible = true;
      },
      handleGoodsGroupAddConfirm(groups) {
        if (this.isGroup) {
          // 判断是否是商品修改
          if (this.goodsGroupForm.index !== "") {
            // 修改
            this.config.goodsGroups.splice(
              Number.parseInt(this.goodsGroupForm.index),
              1,
              groups
            );
            this.goodsGroupForm.index = "";
          } else {
            // 新增
            this.config.goodsGroups.push(groups);
          }
          this.groups = this.config.goodsGroups.slice();
        } else {
          this.config.goodsGroupId = groups.group_id;
          this.config.goodsGroupName = groups.group_title;
          this.$pcTpl.axios({
            url: '/Item/itemListWithGroup',
            method: 'get',
            params: {
              group_id: groups.group_id
            }
          }).then(res => {
            if (res.status == 1) {
              this.config.goods = res.data;
            }
          });
        }
      },
      removeGoodsGroup() {
        this.config.goodsGroupId = "";
        this.config.goodsGroupName = "";
        this.config.goods = [];
      },
      onClick_showGoodsPop() {
        let selectList = JSON.parse(JSON.stringify(this.config.goods));
        this.$pcTpl.goodsOnShelvesInstance
          .popup({
            cacheList: selectList || []
          })
          .then(goods => {
            this.config.goods = [...goods];
          })
          .catch(() => { });
      }
    }
  }
</script>

<style scoped>
</style>
