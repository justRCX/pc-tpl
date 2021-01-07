<template>
  <div class="u-goods-edit">
    <good-item
      v-if="!isGroup"
      :list="goodsList"
      :config="config"
      :group="false"
    ></good-item>
    <goods-group
      v-if="isGroup"
      :group-list="groups"
      :config="config"
      :group="true"
    ></goods-group>
    <el-card
      :header="isGroup ? '商品分组' : '商品'"
      class="edit-area"
      v-if="belongIndex === currentIndex"
    >
      <el-form
        style="text-align:left;"
        label-width="120px"
      >
        <!-- 商品分组 -->
        <el-form-item
          v-if="isGroup"
          label="选择模版"
        >
          <el-radio
            v-model="config.templateId"
            :label="1"
          >顶部菜单</el-radio>
          <el-radio
            v-model="config.templateId"
            :label="2"
          >左侧菜单</el-radio>
        </el-form-item>
        <div
          class="edit-box multi-line"
          v-for="(item, index) in config.goodsGroups"
          :key="item.id"
        >
          <div class="edit-item">
            <div class="edit-label">商品来源:</div>
            <span class="active-span">{{item.group_title}}</span>
            <span
              style="float:right;margin-left:10px;"
              class="active-span"
              @click="deleteGoodsGroup(index)"
            >删除</span>
            <span
              style="float:right"
              class="active-span"
              @click="changeGoodsGroup(index)"
            >修改</span>
          </div>
          <div class="edit-item">
            <div class="edit-label">菜单名称1:</div>
            <el-input
              class="edit-input"
              v-model="item.group_title"
              style="width:80px"
              max="50"
              type="text"
              size="small"
            ></el-input>
          </div>
          <div class="edit-item">
            <div class="edit-label">显示数量:</div>
            <el-input
              class="edit-input"
              v-model="item.showCount"
              style="width:80px"
              max="50"
              type="number"
              size="small"
            ></el-input>
            <el-radio
              v-model="item.showCount"
              :label="''"
            >全部</el-radio>
          </div>
        </div>
        <div
          class="edit-box multi-line"
          v-if="isGroup"
        >
          <div
            class="edit-item"
            @click="showGoodsGroupModal(2)"
          >
            <div
              class="edit-label"
              style="color:#38f"
            >
              <i class="iconfont icon-add1"></i>
            </div>
            <span class="active-span">添加商品分组</span>
          </div>
        </div>
        <el-form-item
          v-if="!isGroup"
          label="商品来源"
        >
          <el-radio-group
            v-model="config.source"
            @change="clearSource"
          >
            <el-radio :label="1">商品</el-radio>
            <el-radio :label="2">商品分组</el-radio>
          </el-radio-group>
        </el-form-item>
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
                      @click="deleteGood(index)"
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
                  @click="showGoodsModal"
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
              @click="showGoodsGroupModal(1)"
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
        <template v-if="isGroup && config.templateId === 1">
          <el-form-item label="头部风格">
            <el-radio
              v-for="item in configs.tabStyles"
              :key="item.key"
              v-model="config.tabStyle"
              :label="item.key"
            >{{item.name}}</el-radio>
          </el-form-item>

          <el-form-item
            label="菜单样式"
            v-if="config.tabStyle == 1 "
          >
            <div class="line">
              <el-radio
                v-for="item in configs.menuStyles"
                :key="item.key"
                v-model="config.menuStyle"
                :label="item.key"
              >{{item.name}}</el-radio>
              颜色：<el-color-picker v-model="config.menuColor"></el-color-picker>
            </div>
          </el-form-item>
          <el-form-item
            label="顶部菜单位置"
            v-if="config.tabStyle == 1"
          >
            <el-radio
              v-for="item in configs.topStickys"
              :key="item.key"
              v-model="config.topSticky"
              :label="item.key"
            >{{item.name}}</el-radio>
          </el-form-item>
        </template>
        <template v-if="config.templateId !== 2 || !isGroup">
          <el-form-item label="列表样式">
            <el-radio
              @change="handleListTypeChange"
              v-for="item in configs.listTypes"
              :key="item.key"
              v-model="config.listType"
              :label="item.key"
            >{{item.name}}</el-radio>
          </el-form-item>
          <el-form-item
            label="整体风格"
            v-if="config.listType == 4 && isGroup"
          >
            <el-radio
              v-for="item in configs.listStyles"
              :key="item.key"
              v-model="config.listStyle"
              :label="item.key"
            >{{item.name}}</el-radio>
          </el-form-item>
          <el-form-item label="图片填充方式">
            <el-radio
              v-for="item in configs.fillTypes"
              :key="item.key"
              v-model="config.fillType"
              :label="item.key"
            >{{item.name}}</el-radio>
          </el-form-item>
          <el-form-item
            label="留白间距"
            v-show="config.fillType == 1"
          >
            <el-slider
              v-model="config.borderWidth"
              :max="30"
              show-input
            >
            </el-slider>
          </el-form-item>
          <el-form-item label="背景颜色">
            <el-color-picker
              v-model="config.bgColor"
              show-alpha
            ></el-color-picker>
          </el-form-item>
          <el-form-item
            label="图片距离底部距离"
            v-if="config.listType !== 4"
          >
            <el-slider
              v-model="config.picMb"
              :max="30"
              show-input
            >
            </el-slider>
          </el-form-item>
          <el-form-item label="显示比例">
            <el-radio
              v-for="item in configs.zooms"
              :key="item.key"
              v-model="config.zoom"
              :label="item.key"
            >{{item.name}}</el-radio>
          </el-form-item>
          <el-form-item label="显示样式">
            <el-radio
              v-for="item in configs.styles"
              :key="item.key"
              v-model="config.style"
              :label="item.key"
            >{{item.name}}</el-radio>
          </el-form-item>
          <el-form-item
            label="左右间距:"
            v-if="config.listType === 5 && !isGroup"
          >
            <el-slider
              v-model="config.lrMargin"
              :max="30"
              show-input
            >
            </el-slider>
          </el-form-item>
          <el-form-item label="下间距:">
            <el-slider
              v-model="config.BMargin"
              :max="40"
              show-input
            >
            </el-slider>
          </el-form-item>
          <el-form-item label="上间距:">
            <el-slider
              v-model="config.TMargin"
              :max="40"
              :min="-100"
              show-input
            >
            </el-slider>
          </el-form-item>
          <el-form-item label="圆弧程度:">
            <el-slider
              v-model="config.borderRadius"
              :max="30"
              show-input
            >
            </el-slider>
          </el-form-item>
          <el-form-item label="显示内容">
            <el-checkbox-group
              v-model="config.content"
              :min="1"
            >
              <el-checkbox
                class="check-line"
                :label="1"
              >商品名称</el-checkbox>
              <el-radio-group
                class="check-sub"
                v-show="config.listType === 2 && config.content.includes(1)"
                v-model="config.lineCount"
              >

                <el-radio :label="1">单行显示</el-radio>
                <el-radio :label="2">两行显示</el-radio>
              </el-radio-group>
              <el-form-item label="名称颜色">
                <el-color-picker v-model="config.nameColor"></el-color-picker>
              </el-form-item>
              <el-form-item label="名称字体大小">
                <el-input-number
                  :precision="0"
                  v-model="config.nameSize"
                  :controls="false"
                  placeholder="请输入字体大小"
                ></el-input-number>
              </el-form-item>
              <el-checkbox
                class="check-line check-sub"
                v-show="config.content.includes(1)"
                :label="2"
              >商品简介</el-checkbox>
              <el-form-item label="简介颜色">
                <el-color-picker v-model="config.subNameColor"></el-color-picker>
              </el-form-item>
              <el-form-item label="简介字体大小">
                <el-input-number
                  :precision="0"
                  v-model="config.subNameSize"
                  :controls="false"
                  placeholder="请输入字体大小"
                ></el-input-number>
              </el-form-item>
              <el-checkbox
                class="check-line"
                :label="3"
              >商品价格</el-checkbox>
              <el-form-item label="价格距离顶部距离:">
                <el-slider
                  v-model="config.priceMt"
                  :max="30"
                  show-input
                >
                </el-slider>
              </el-form-item>
              <el-form-item label="价格颜色">
                <el-color-picker v-model="config.priceColor"></el-color-picker>
              </el-form-item>
              <el-form-item
                label="价格前置文案"
                class="g-mb-10"
              >
                <el-input
                  v-model="config.beforeText"
                  placeholder="字体大小默认与￥大小保持一致"
                ></el-input>
              </el-form-item>
              <el-form-item
                label="￥字体大小"
                class="g-mb-10"
              >
                <el-input-number
                  :precision="0"
                  v-model="config.priceSymbolSize"
                  :controls="false"
                  placeholder="如￥16.12中的￥"
                ></el-input-number>
              </el-form-item>
              <el-form-item
                label="价格字体大小"
                class="g-mb-10"
              >
                <el-input-number
                  :precision="0"
                  v-model="config.priceSize"
                  :controls="false"
                  placeholder="如16.12中的16"
                ></el-input-number>
              </el-form-item>
              <el-form-item label="价格点字体大小">
                <el-input-number
                  :precision="0"
                  v-model="config.pointSize"
                  :controls="false"
                  placeholder="如16.12中的12"
                ></el-input-number>
              </el-form-item>
              <el-form-item label="价格点字体加粗">
                <el-radio-group
                  class="check-sub"
                  v-model="config.priceBlod"
                >

                  <el-radio :label="0">否</el-radio>
                  <el-radio :label="1">是</el-radio>
                </el-radio-group>
              </el-form-item>
              <el-checkbox
                class="check-line"
                :label="8"
                v-if="config.listType == 1 || config.listType == 4"
              >商品划线价</el-checkbox>
              <el-checkbox
                class="check-line"
                :label="7"
                v-if="config.listType == 2 || config.listType == 3 ||config.listType == 4 || config.listType == 5"
              >商品销量</el-checkbox>
              <!-- <el-checkbox
                class="check-line"
                :label="10"
                v-if="config.listType == 2 || config.listType == 3 ||config.listType == 4 || config.listType == 5"
              >商品购买量</el-checkbox> -->
              <el-checkbox
                v-show="config.style !== 1 || config.listType === 4"
                class="check-line"
                :label="4"
              >购买按钮</el-checkbox>
              <div v-show="config.style !== 1 || config.listType === 4">
                <el-radio-group
                  class="check-sub"
                  v-show="config.style !== 1 && config.content.includes(4)"
                  v-model="config.buyIcon"
                >
                  <span
                    v-for="item in configs.buyIcons"
                    :key="item.key"
                  >
                    <el-radio
                      :label="item.key"
                      v-show="!(config.listType == 5 && item.key>2)"
                    >{{item.name}}</el-radio>
                  </span>
                </el-radio-group>
                <div v-if="config.buyIcon === 6">
                  <el-form-item label="修改图片">
                    <span
                      style="display:block;width:48px;height:48px;border:1px dashed #ccc;text-align:center;"
                      @click="handleChooseImg"
                      v-if="!config.carImg"
                    >
                      <i
                        class="el-icon-plus"
                        style="font-size:26px;color:#999;margin-top:10px;"
                      ></i>
                    </span>
                    <div v-if="config.carImg">
                      <img
                        :src="config.carImg"
                        style="width:48px;height:48px;"
                      />
                      <a
                        @click="handleChooseImg"
                        href="javascript:;"
                      >修改图片</a>
                    </div>
                  </el-form-item>
                  <el-form-item label="图片大小">
                    <el-slider
                      v-model="config.buyIconSize"
                      :max="100"
                      show-input
                    >
                    </el-slider>
                  </el-form-item>
                  <el-form-item label="图片基于主图底部的位置">
                    <el-slider
                      v-model="config.carImgTop"
                      :max="100"
                      :min="-100"
                      show-input
                    >
                    </el-slider>
                  </el-form-item>
                </div>
                <el-input
                  v-show="config.buyIcon === 3 || config.buyIcon === 4 || config.buyIcon === 5"
                  v-model="config.buyText"
                  placeholder="点击输入"
                  maxlength="4"
                ></el-input>
              </div>
              <el-checkbox
                class="check-line"
                :label="5"
              >商品角标</el-checkbox>
              <el-radio-group
                class="check-sub"
                v-show="config.content.includes(5)"
                v-model="config.cornerIcon"
              >
                <el-radio
                  v-for="item in configs.cornerIcons"
                  :label="item.key"
                  :key="item.key"
                >{{item.name}}</el-radio>
              </el-radio-group>
              <div v-show="config.cornerIcon === 5 && config.content.includes(5)">
                <span
                  style="display:block;width:48px;height:48px;border:1px dashed #ccc;text-align:center;"
                  @click.stop="handleImg"
                  v-if="!config.cornerImg"
                >
                  <i
                    class="el-icon-plus"
                    style="font-size:26px;color:#999;margin-top:10px;"
                  ></i>
                </span>
                <div v-if="config.cornerImg">
                  <img
                    :src="config.cornerImg"
                    style="width:48px;height:48px;"
                  />
                  <a
                    @click.stop="handleImg"
                    style="cursor:pointer"
                  >修改图片</a>
                </div>
              </div>
              <div v-show="config.cornerIcon === 6 && config.content.includes(5)">
                <el-input v-model="config.cornerText"></el-input>
              </div>
              <el-checkbox
                class="check-line"
                :label="6"
                @change="handleCheckChange"
              >查看更多</el-checkbox>
              <div v-if="config.content.includes(6)">
                <el-form-item label="文案">
                  <el-input
                    v-model="config.viewMoreText"
                    size="small"
                  ></el-input>
                </el-form-item>
                <el-form-item label="颜色">
                  <el-color-picker v-model="config.viewMoreColor"></el-color-picker>
                </el-form-item>
                <el-form-item label="跳转至">
                  <page-link-select
                    ref="pageLinkSelect"
                    :selectValue="config.showMoreLink||{}"
                    @linkSelected="(e)=>{linkSelected(e)}"
                  ></page-link-select>
                </el-form-item>
                <el-form-item label="样式风格">
                  <el-radio-group v-model="config.viewMoreStyle">
                    <el-radio :label="0">默认风格</el-radio>
                    <el-radio :label="1">风格1</el-radio>
                    <el-radio :label="2">风格2</el-radio>
                    <el-radio :label="3">风格3</el-radio>
                  </el-radio-group>
                </el-form-item>
              </div>
            </el-checkbox-group>
          </el-form-item>
          <div class="line">
            <el-form-item label="背景颜色">
              <el-color-picker v-model="config.backgroundColor"></el-color-picker>
            </el-form-item>
            <el-form-item
              label="边框颜色"
              v-if="!isGroup"
            >
              <el-color-picker v-model="config.borderColor"></el-color-picker>
            </el-form-item>
          </div>

        </template>
        <el-form-item label="左右间距">
          <el-slider
            v-model="config.bigLrMargin"
            :max="30"
            show-input
          ></el-slider>
        </el-form-item>
      </el-form>
    </el-card>
    <!-- 商品弹窗 -->
    <goods-group-form
      :visible.sync="goodsGroupForm.visible"
      :type="type"
      @confirm="handleGoodsGroupAddConfirm"
    ></goods-group-form>
  </div>
</template>

<script>
  import draggable from "vuedraggable";
  // import { goodsOnShelvesInstance } from "../../choose-list/src/goods";
  import GoodsGroupForm from "./GroupForm.vue";
  import GoodItem from "./Item.vue";
  import GoodsGroup from "./GoodsGroup.vue";
  import ConfigData from "./config";
  const originImgUrl =
    "http://img.wkdao.com/image/65/2020/08/03/0aac7e6e9aaaeb10863cd82e67a771e0.png";

  const originGoodsList = [
    {
      item_id: 1,
      thumb_image_path: originImgUrl,
      current_price: "0.00",
      selling_point: "",
      item_title: "标题"
    },
    {
      item_id: 2,
      thumb_image_path: originImgUrl,
      current_price: "0.00",
      selling_point: "",
      item_title: "标题"
    },
    {
      item_id: 3,
      thumb_image_path: originImgUrl,
      current_price: "0.00",
      selling_point: "",
      item_title: "标题"
    },
    {
      item_id: 4,
      thumb_image_path: originImgUrl,
      current_price: "0.00",
      selling_point: "",
      item_title: "标题"
    }
  ];
  // 默认预览分组信息
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
        goodsList: originGoodsList.slice(),
        config: {
          listType: 1,
          fillType: 2,
          zoom: 2,
          style: 2,
          backgroundColor: null,
          lrMargin: 0,
          picMb: 20,
          borderRadius: 10,
          borderColor: null,
          content: [1, 3, 4, 7],
          buyIcon: 1,
          cornerIcon: 1,
          cornerImg: "",
          carImg: "",
          buyIconSize: 79,
          carImgTop: -33,
          cornerText: "",
          viewMoreStyle: 0,
          buyText: "马上抢",
          showCount: 6,
          goods: [],
          goodsGroupId: "",
          goodsGroupName: "",
          // 分组参数
          templateId: 1,
          goodsGroups: [],
          beforeText: "",
          priceMt: 10,
          menuStyle: 1,
          menuColor: "#FF4873",
          bgColor: "rgba(255,255,255,1)",
          borderWidth: 0,
          nameColor: "#333",
          nameSize: "28",
          subNameColor: "#999999",
          subNameSize: "22",
          priceColor: "#FF4873",
          priceSymbolSize: "",
          priceSize: "",
          pointSize: "",
          tabStyle: 1,
          listStyle: 1,
          topSticky: 0,
          priceBlod: 0,
          TMargin: 40,
          BMargin: 40,
          source: 1,
          bigLrMargin: 0,
          viewMoreText: "更多",
          viewMoreColor: "#FF4E71",
          lineCount: 2
        },
        configs: ConfigData,
        goodsForm: {
          visible: false
        },
        goodsGroupForm: {
          visible: false,
          index: "" // 缓存商品分组修改index
        },
        // 分组
        groups: originGroups.slice()
      };
    },
    props: ["belongIndex", "currentIndex", "isGroup", "content"],
    components: {
      "good-item": GoodItem,
      "goods-group": GoodsGroup,
      "goods-group-form": GoodsGroupForm,
      draggable: draggable
    },
    methods: {
      clearSource() {
        this.config.goods = [];
        this.config.goodsGroupId = '';
        this.config.goodsGroupName = '';
      },
      handleCheckChange(v) {
        if (!v) {
          this.config.viewMoreText = "";
        }
      },
      handleChooseImg() {
        this.$pcTpl.imgChoose
          .popup({
            picMax: 1
          })
          .then(img => {
            if (img.length > 0) {
              this.config.carImg = img[0].image_path;
            }
          });
      },

      showGoodsModal() {
        let selectList = JSON.parse(JSON.stringify(this.config.goods));
        this.$pcTpl.goodsOnShelvesInstance
          .popup({
            cacheList: selectList || []
          })
          .then(goods => {
            this.config.goods = [...goods];
            this.goodsList = this.config.goods.slice();
          })
          .catch(() => { });
      },
      deleteGood(index) {
        this.config.goods.splice(index, 1);
        this.goodsList.slice();
        if (this.config.goods.length === 0) {
          this.goodsList = originGoodsList;
        }
      },
      linkSelected(data) {
        this.config.showMoreLink = {};
        Object.assign(this.config.showMoreLink, data);
      },
      showGoodsGroupModal(type) {
        this.type = type;
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
              this.goodsList = res.data;
            }
          });
        }
      },
      removeGoodsGroup() {
        this.config.goodsGroupId = "";
        this.config.goodsGroupName = "";
        this.config.goods = [];
        this.goodsList = [];
        if (this.config.goods.length === 0) {
          this.goodsList = originGoodsList;
        }
      },
      changeGoodsGroup(index) {
        // 修改商品分组
        this.goodsGroupForm.visible = true;
        this.goodsGroupForm.index = index;
      },
      deleteGoodsGroup(index) {
        this.config.goodsGroups.splice(index, 1);
        this.groups = this.config.goodsGroups.slice();
      },
      // 列表样式控制
      handleListTypeChange(e) {
        this.config.listStyle = 1;
        this.config.lineCount = 2;
        if (e === 6) {
          this.config.style = 1;
          this.configs.styles = [
            {
              key: 1,
              name: "极简"
            }
          ];
        } else if (e === 4) {
          this.config.style = 2;
          this.configs.styles = [
            {
              key: 2,
              name: "卡片"
            }
          ];
        } else {
          this.configs.styles = [
            {
              key: 1,
              name: "极简"
            },
            {
              key: 2,
              name: "卡片"
            }
          ];
        }
        if (e === 1) {
          this.config.zoom = 1;
          this.configs.zooms = [
            {
              key: 1,
              name: "3:2"
            },
            {
              key: 2,
              name: "1:1"
            }
          ];
        } else {
          // 显示比例
          this.config.zoom = 2;
          this.configs.zooms = [
            {
              key: 2,
              name: "1:1"
            }
          ];
        }
      },
      init(n) {
        if (n) {
          this.config = Object.assign(
            {
              listType: 1,
              fillType: 2,
              zoom: 2,
              style: 2,
              backgroundColor: null,
              lrMargin: 0,
              borderRadius: 10,
              borderColor: null,
              content: [1, 3, 4],
              buyIcon: 1,
              cornerIcon: 1,
              cornerImg: "",
              buyText: "马上抢",
              beforeText: "",
              priceMt: 10,
              showCount: 6,
              buyIconSize: 79,
              viewMoreStyle: 0,
              carImgTop: 0,
              carImg: "",
              priceColor: "#FF4873",
              priceSymbolSize: "",
              priceSize: "",
              pointSize: "",
              goods: [],
              goodsGroupId: "",
              TMargin: 40,
              BMargin: 40,
              priceBlod: 0,
              goodsGroupName: "",
              // 分组参数
              templateId: 1,
              goodsGroups: [],
              menuStyle: 1,
              menuColor: "#FF4873",
              tabStyle: 1,
              listStyle: 1,
              topSticky: 0,
              source: 1,
              showMoreLink: {},
              bigLrMargin: 0,
              picMb: 20,
              viewMoreText: "更多",
              viewMoreColor: "#FF4E71",
              lineCount: 2,
              borderWidth: 0,
              nameSize: "28",
              bgColor: "rgba(255,255,255,1)"
            },
            n
          );

          if (this.config.goods && this.config.goods.length > 0) {
            this.goodsList = this.config.goods.slice();
          } else {
            this.goodsList = originGoodsList.slice();
          }
          if (this.config.goodsGroups && this.config.goodsGroups.length > 0) {
            this.groups = this.config.goodsGroups.slice();
          } else {
            this.groups = originGroups.slice();
          }
        } else {
          this.config = {
            listType: 1,
            fillType: 2,
            zoom: 2,
            style: 2,
            backgroundColor: null,
            lrMargin: 0,
            borderRadius: 10,
            borderColor: null,
            content: [1, 3, 4],
            TMargin: 40,
            TBMargin: 40,
            buyIcon: 1,
            priceBlod: 0,
            picMb: 20,
            borderWidth: 0,
            bgColor: "rgba(255,255,255,1)",
            cornerIcon: 1,
            cornerImg: "",
            buyText: "马上抢",
            beforeText: "",
            priceMt: 10,
            showCount: 6,
            goods: [],
            goodsGroupId: "",
            goodsGroupName: "",
            // 分组参数
            templateId: 1,
            goodsGroups: [],
            menuStyle: 1,
            menuColor: "#FF4873",
            tabStyle: 1,
            listStyle: 1,
            topSticky: 0,
            carImg: "",
            buyIconSize: 79,
            viewMoreStyle: 0,
            carImgTop: 0,
            source: 1,
            showMoreLink: {},
            bigLrMargin: 0,
            lineCount: 2,
            nameSize: "28"
          };
          this.goodsList = originGoodsList.slice();
          this.groups = originGroups.slice();
        }
        if (!this.isGroup && this.config.source == 1) {
          this.config.goodsGroupId = '';
          this.config.goodsGroupName = '';
        }
      },
      handleImg() {
        this.$pcTpl.imgChoose
          .popup({
            picMax: 15
          })
          .then(imgs => {
            if (imgs.length > 0) {
              this.imageChoose(imgs);
            }
          });
      },
      imageChoose(imgArray) {
        if (imgArray.length > 0) {
          const that = this;
          imgArray.forEach(item => {
            // 这里的this指向前面对象的this
            that.config.cornerImg = item.image_path;
          });
        }
      }
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
          this.$emit("update:content", this.config);
        }
      },
      config: {
        handler(newVal) {
          if (newVal.templateId == 2) {
            this.config.menuStyle = 1;
          }
          this.goodsList = newVal.goods;
          if (this.config.listType === 6) {
            this.config.style = 1;
            this.configs.styles = [
              {
                key: 1,
                name: "极简"
              }
            ];
          } else if (this.config.listType === 4) {
            this.config.style = 2;
            this.configs.styles = [
              {
                key: 2,
                name: "卡片"
              }
            ];
          } else {
            this.configs.styles = [
              {
                key: 1,
                name: "极简"
              },
              {
                key: 2,
                name: "卡片"
              }
            ];
          }
          if (this.config.listType === 1) {
            // this.config.zoom = 1
            this.configs.zooms = [
              {
                key: 1,
                name: "3:2"
              },
              {
                key: 2,
                name: "1:1"
              }
            ];
          } else {
            this.config.zoom = 2;
            this.configs.zooms = [
              {
                key: 2,
                name: "1:1"
              }
            ];
          }
          this.$emit("changeConfig", this.config);
        },
        deep: true,
        immediate: true
      }
    }
  };
</script>
<style lang="scss" scoped>
  .u-goods-edit {
    min-height: 50px;
  }
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
  .line {
    display: flex;
    align-items: center;
  }
</style>
