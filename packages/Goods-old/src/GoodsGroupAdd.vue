<template>
  <div class="u-goods-edit">
    <good-item :list="goodsList" :config="config"></good-item>
    <el-card
      :header="isEdit ? '编辑商品分组':'新建商品分组'"
      class="edit-area"
      v-show="belongIndex === currentIndex"
    >
      <el-form
        style="text-align:left;"
        ref="ruleForm"
        :model="config"
        :rules="rules"
        label-width="120px">
        <el-form-item label="分组名称" prop="title">
          <el-input size="mini" v-model="config.title" maxlength></el-input>
        </el-form-item>
        <el-form-item label="名称字体大小">
            <el-radio v-model="config.titleFontsize" label="18px">大</el-radio>
            <el-radio v-model="config.titleFontsize" label="16px">中</el-radio>
            <el-radio v-model="config.titleFontsize" label="14px">小</el-radio>
        </el-form-item>
        <el-form-item label="名称背景颜色">
            <el-color-picker v-model="config.titleBackgroundColor"></el-color-picker>
        </el-form-item>
        <el-form-item label="名称文字颜色">
            <el-color-picker v-model="config.titleColor"></el-color-picker>
        </el-form-item>
        <el-form-item label="名称显示位置">
            <el-radio v-model="config.titleAlign" label="left">居左</el-radio>
            <el-radio v-model="config.titleAlign" label="center">居中</el-radio>
            <el-radio v-model="config.titleAlign" label="right">局右</el-radio>
        </el-form-item>
        <el-form-item label="权限">
          <el-radio-group v-model="config.auth_type" @change="handleAuthTypeChange">
            <el-radio :label="1">全部会员</el-radio>
            <el-radio :label="2">推客</el-radio>
            <el-radio :label="3">渠道商</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item :label="config.rank_name">
          <el-select v-model="config.rank_id" placeholder="请选择等级">
            <el-option
              v-for="item in ranks"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="是否仅限等级">
          <el-radio-group v-model="config.is_rank_only">
            <el-radio :label="0">否</el-radio>
            <el-radio :label="1">是</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="列表样式">
          <el-radio
            @change="handleListTypeChange"
            v-for="item in configs.listTypes2"
            :key="item.key"
            v-model="config.listType"
            :label="item.key"
          >{{item.name}}</el-radio>
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
        <el-form-item label="显示内容">
          <el-checkbox-group v-model="config.content" :min="1">
            <el-checkbox class="check-line" :label="1" v-show="config.style !== 4">商品名称</el-checkbox>
            <el-checkbox class="check-line" :label="3" v-show="config.style !== 4">商品价格</el-checkbox>
            <el-checkbox class="check-line" :label="4">购买按钮</el-checkbox>
            <el-radio-group
              class="check-sub"
              v-show="config.style !== 1 && config.content.includes(4)"
              v-model="config.buyIcon"
            >
              <el-radio
                v-for="item in configs.buyIcons"
                :label="item.key"
                :key="item.key"
              >{{item.name}}</el-radio>
            </el-radio-group>
            <el-input
              v-show="config.buyIcon === 3 || config.buyIcon === 4"
              v-model="config.buyText"
              placeholder="点击输入"
              maxlength="4"
            ></el-input>
            <!-- <el-checkbox class="check-line" :label="5">商品角标</el-checkbox>
                        <el-radio-group class="check-sub" v-show="config.content.includes(5)" v-model="config.cornerIcon">
                            <el-radio v-for="item in configs.cornerIcons" :label="item.key" :key="item.key">{{item.name}}</el-radio>
            </el-radio-group>-->
          </el-checkbox-group>
        </el-form-item>
        <el-form-item label="商品标签简介">
          <div ref="editor"></div>
        </el-form-item>
      </el-form>
    </el-card>
  </div>
</template>

<script>
import E from "wangeditor";
import GoodItem from "./Item.vue";
import ConfigData from "./config.ts";
import GoodsService from "@/api/goods/goods";
const originImgUrl = require("../../assets/preview.png");
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
export default {
  name: "goodsGroupAdd",
  data() {
    return {
      goodsList: originGoodsList.slice(),
      config: {},
      configs: ConfigData,
      ranks: [],
      rules: {
        title: [
          { required: true, message: "请输入商品分组名称", trigger: "blur" }
        ]
      }
    };
  },
  props: ["belongIndex", "currentIndex", "isGroup", "content", "isEdit"],
  components: {
    "good-item": GoodItem
  },
  methods: {
    // 列表样式控制
    handleListTypeChange(e) {
      if (e === 5 || e === 6) {
        this.config.style = 1;
        this.configs.styles = [
          {
            key: 1,
            name: "极简"
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
    },
    handleAuthTypeChange(e) {
      this.config.rank_id = 0;
    }
  },
  created() {
    // todo 获取商品分组名称
    this.config = Object.assign(
      {
        title: "",
        auth_type: 1,
        titleFontsize:'18px',
        titleBackgroundColor:'#FFFFFF',
        titleColor:'#000000',
        titleAlign:'left',
        rank_id: 0,
        rank_name: "",
        is_rank_only: 0,
        listType: 1,
        fillType: 1,
        zoom: 2,
        style: 2,
        content: [1, 3, 4],
        buyIcon: 1,
        cornerIcon: 1,
        decorateHtml: "",
        buyText: "马上抢"
      },
      this.content
    );
    this.goodsList = originGoodsList.slice();
  },
  mounted: function() {
    this.editor = new E(this.$refs.editor);
    this.editor.customConfig.onchange = html => {
      this.config.decorateHtml = html;
    };
    this.editor.create();
    // 初始设置富文本编辑器
    this.editor.txt.html(this.config.decorateHtml);
  },

  watch: {
    currentIndex: function(n) {
      if (n === -1) {
        // this.isAll,this.value
        this.$emit("update:content", this.config);
      }
    },
    "config.auth_type": function(n) {
      switch (n) {
        case 2:
          this.config.rank_name = "推客等级";
          break;
        case 3:
          this.config.rank_name = "渠道商等级";
          break;
        default:
          this.config.rank_name = "会员等级";
          break;
      }
      GoodsService.groupRankList({ auth_type: n }).then(res => {
        if (res.data.code) {
          this.ranks = res.data.data;
        }
      });
    }
  }
};
</script>
