<template>
  <div class="goods-tuan">
    <!-- <good-item
      :config="config"
      :list="config.goods"
      :listType="config.listType"
      :group="false"
    ></good-item> -->
    <div>商品分组</div>
    <el-card
      v-if="belongIndex === currentIndex"
      class="edit-area"
      header="商品分组"
    >
      <edit-panel :config='config'>
        <div
          slot="goods"
          v-if="templateId == 1"
        ></div>
        <el-form-item label="商品来源： ">
          <el-radio-group v-model="config.templateId">
            <el-radio :label="1">顶部菜单</el-radio>
            <el-radio :label="2">左侧菜单</el-radio>
          </el-radio-group>
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
              @click="removeGoodsGroup(index)"
            >删除</span>
            <span
              style="float:right"
              class="active-span"
              @click="changeGoodsGroup(index,item.group_id)"
            >修改</span>
          </div>
          <div class="edit-item">
            <div class="edit-label">菜单名称:</div>
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
          class="edit-box"
          @click="onClick_showGoodsGroupPop(2)"
        >
          <div
            class="edit-label"
            style="color:#38f"
          >
            <i class="iconfont icon-add1"></i>
          </div>
          <span class="active-span">添加商品分组</span>
        </div>
        <el-form-item
          label="样式："
          @change="handleStyleChange"
        >
          <el-radio-group v-model="config.style">
            <el-radio :label="1">样式1</el-radio>
            <el-radio :label="2">样式2</el-radio>
            <el-radio :label="3">样式3</el-radio>
            <el-radio :label="4">样式4</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item
          label="颜色："
          v-show="config.style != 4"
        >
          <el-color-picker v-model="config.menuColor"></el-color-picker>
        </el-form-item>
      </edit-panel>
    </el-card>
  </div>
</template>

<script>
  import draggable from "vuedraggable";
  import { goodsGroupFormDialog } from "../../Goods/component/GroupForm.vue";
  import GoodItem from "../../good-style/Item.vue";
  import EditPanel from '../../good-style/component/edit-panel.vue';
  import goodsStyleConfig from '../../good-style/config'
  export default {
    name: "goodsGroup",
    data() {
      return {
        // 传进去的参数
        config: {
          ...goodsStyleConfig,
          showCount: 6,
          style: 1,
          templateId: 1,
          menuColor: '',
          // 分组参数
          goodsGroups: [],
        },
        goodsForm: {
          visible: false
        },
        goodsGroupForm: {
          visible: false,
          index: "" // 缓存商品分组修改index
        },
        // 分组
        goodsList: [{ "item_id": 5150, "item_type": 1, "item_title": "快递商品", "selling_point": "", "thumb_image_path": "https://cbu01.alicdn.com/img/ibank/2020/053/860/17218068350_609132103.jpg", "current_price": "12.00", "num": 79, "create_time": "2020-05-26 17:34:34", "shelf_time": "2020-11-27 10:45:45", "shelf_off_time": "", "_item_type": "实物商品" }, { "item_id": 5130, "item_type": 1, "item_title": "3333", "selling_point": "", "thumb_image_path": "http://5b0988e595225.cdn.sohucs.com/q_70,c_zoom,w_640/images/20180829/5c52764eeb0246ec8887e669374fc16e.jpeg", "current_price": "11.00", "num": 78, "create_time": "2020-05-23 10:17:36", "shelf_time": "2020-10-14 21:09:29", "shelf_off_time": "", "_item_type": "实物商品" }, { "item_id": 5126, "item_type": 1, "item_title": "平邮商品", "selling_point": "", "thumb_image_path": "http://5b0988e595225.cdn.sohucs.com/q_70,c_zoom,w_640/images/20180829/5c52764eeb0246ec8887e669374fc16e.jpeg", "current_price": "90.00", "num": 1396, "create_time": "2020-05-20 10:35:18", "shelf_time": "2020-12-05 16:42:57", "shelf_off_time": "", "_item_type": "实物商品" }, { "item_id": 7035, "item_type": 1, "item_title": "贡献值测试（勿删）", "selling_point": "", "thumb_image_path": "http://img.wkdao.com/image/65/2020/12/03/94456288f8844e4abd7f67b1eef3540f.png", "current_price": "200.00", "num": 93, "create_time": "2020-12-09 10:09:06", "shelf_time": "2020-12-09 13:23:54", "shelf_off_time": "", "_item_type": "实物商品" }, { "item_id": 7034, "item_type": 1, "item_title": "贡献值测试（倪克松专用）", "selling_point": "43124313", "thumb_image_path": "http://img.alicdn.com/imgextra/i1/595412874/O1CN01Qwle3X1X6Kr4HCqCs_!!595412874.jpg", "current_price": "100.00", "num": 1243, "create_time": "2020-12-08 16:10:22", "shelf_time": "2020-12-09 11:19:53", "shelf_off_time": "", "_item_type": "实物商品" }, { "item_id": 7033, "item_type": 1, "item_title": "供应商商品", "selling_point": "", "thumb_image_path": "http://img.wkdao.com/image/65/2020/11/13/8b51f92a808a8174e20bfca51fa98da5.jpg", "current_price": "60.00", "num": 137, "create_time": "2020-12-04 10:28:00", "shelf_time": "2020-12-08 14:24:18", "shelf_off_time": "", "_item_type": "实物商品" }, { "item_id": 7028, "item_type": 4, "item_title": "酒店测试", "selling_point": "", "thumb_image_path": "http://img.wkdao.com/image/65/2020/11/03/904da7ac885fc2344e2f0683bfbd9b42.png", "current_price": "100.00", "num": 900, "create_time": "2020-11-21 10:11:59", "shelf_time": "2020-12-07 15:05:07", "shelf_off_time": "", "_item_type": "酒店商品" }, { "item_id": 7012, "item_type": 1, "item_title": "湛江特产食神牌水晶凤爪冰公主子6包实惠装180g零食送泡沫箱包邮", "selling_point": "我是卖点我是卖点我是卖点我是卖点我是卖点", "thumb_image_path": "https://img.alicdn.com/imgextra/i4/2372362463/O1CN01S8d9uD1U4652AB2tI_!!2372362463.jpg", "current_price": "39.80", "num": 75550, "create_time": "2020-11-15 15:54:29", "shelf_time": "2020-12-09 11:43:53", "shelf_off_time": "", "_item_type": "实物商品" }][{ "item_id": 5150, "item_type": 1, "item_title": "快递商品", "selling_point": "", "thumb_image_path": "https://cbu01.alicdn.com/img/ibank/2020/053/860/17218068350_609132103.jpg", "current_price": "12.00", "num": 79, "create_time": "2020-05-26 17:34:34", "shelf_time": "2020-11-27 10:45:45", "shelf_off_time": "", "_item_type": "实物商品" }, { "item_id": 5130, "item_type": 1, "item_title": "3333", "selling_point": "", "thumb_image_path": "http://5b0988e595225.cdn.sohucs.com/q_70,c_zoom,w_640/images/20180829/5c52764eeb0246ec8887e669374fc16e.jpeg", "current_price": "11.00", "num": 78, "create_time": "2020-05-23 10:17:36", "shelf_time": "2020-10-14 21:09:29", "shelf_off_time": "", "_item_type": "实物商品" }, { "item_id": 5126, "item_type": 1, "item_title": "平邮商品", "selling_point": "", "thumb_image_path": "http://5b0988e595225.cdn.sohucs.com/q_70,c_zoom,w_640/images/20180829/5c52764eeb0246ec8887e669374fc16e.jpeg", "current_price": "90.00", "num": 1396, "create_time": "2020-05-20 10:35:18", "shelf_time": "2020-12-05 16:42:57", "shelf_off_time": "", "_item_type": "实物商品" }, { "item_id": 7035, "item_type": 1, "item_title": "贡献值测试（勿删）", "selling_point": "", "thumb_image_path": "http://img.wkdao.com/image/65/2020/12/03/94456288f8844e4abd7f67b1eef3540f.png", "current_price": "200.00", "num": 93, "create_time": "2020-12-09 10:09:06", "shelf_time": "2020-12-09 13:23:54", "shelf_off_time": "", "_item_type": "实物商品" }, { "item_id": 7034, "item_type": 1, "item_title": "贡献值测试（倪克松专用）", "selling_point": "43124313", "thumb_image_path": "http://img.alicdn.com/imgextra/i1/595412874/O1CN01Qwle3X1X6Kr4HCqCs_!!595412874.jpg", "current_price": "100.00", "num": 1243, "create_time": "2020-12-08 16:10:22", "shelf_time": "2020-12-09 11:19:53", "shelf_off_time": "", "_item_type": "实物商品" }, { "item_id": 7033, "item_type": 1, "item_title": "供应商商品", "selling_point": "", "thumb_image_path": "http://img.wkdao.com/image/65/2020/11/13/8b51f92a808a8174e20bfca51fa98da5.jpg", "current_price": "60.00", "num": 137, "create_time": "2020-12-04 10:28:00", "shelf_time": "2020-12-08 14:24:18", "shelf_off_time": "", "_item_type": "实物商品" }, { "item_id": 7028, "item_type": 4, "item_title": "酒店测试", "selling_point": "", "thumb_image_path": "http://img.wkdao.com/image/65/2020/11/03/904da7ac885fc2344e2f0683bfbd9b42.png", "current_price": "100.00", "num": 900, "create_time": "2020-11-21 10:11:59", "shelf_time": "2020-12-07 15:05:07", "shelf_off_time": "", "_item_type": "酒店商品" }, { "item_id": 7012, "item_type": 1, "item_title": "湛江特产食神牌水晶凤爪冰公主子6包实惠装180g零食送泡沫箱包邮", "selling_point": "我是卖点我是卖点我是卖点我是卖点我是卖点", "thumb_image_path": "https://img.alicdn.com/imgextra/i4/2372362463/O1CN01S8d9uD1U4652AB2tI_!!2372362463.jpg", "current_price": "39.80", "num": 75550, "create_time": "2020-11-15 15:54:29", "shelf_time": "2020-12-09 11:43:53", "shelf_off_time": "", "_item_type": "实物商品" }],
        group_good_list: [],

      }
    },
    props: ["belongIndex", "currentIndex", "content"],
    components: {
      "good-item": GoodItem,
      draggable: draggable,
      'edit-panel': EditPanel
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
      }
    },
    created() {
      trace(this.content, 'created')
      this.init(this.content);
    },
    methods: {
      handleStyleChange(val) {
        this.config.menuColor = ''
      },
      init($data) {
        // this.config = __merge(this.config,n, true)
        __merge(this.config, $data, true)
      },
      onClick_showGoodsGroupPop($id) {
        goodsGroupFormDialog.popup({
          chooseId: $id || ''
        }).then(res => {
          this.config.goodsGroups.push({ ...res })
        })
        // this.goodsGroupForm.visible = true;
      },
      removeGoodsGroup(index) {
        this.config.goodsGroups.splice(index, 1)
      },
      changeGoodsGroup(index, goup_id) {
        console.log(index, goup_id)
        goodsGroupFormDialog.popup({
          chooseId: goup_id
        }).then(res => {
          this.config.goodsGroups.splice(index, 1, { ...res })
        })
      }
    }
  }
</script>

<style lang="scss" scoped>
  .edit-box .goods_flex {
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
  .goods-tuan {
    min-height: 100px;
  }
</style>
