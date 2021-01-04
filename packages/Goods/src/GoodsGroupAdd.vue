<template>
  <div class="u-goods-edit">
    <good-item
      :list="goodsList"
      :config="config"
      :listType="config.listType"
    >
    </good-item>
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
        label-width="120px"
      >
        <edit-panel :config="config">
          <el-form-item
            label="分组名称"
            prop="title"
          >
            <el-input
              size="mini"
              v-model="config.title"
              maxlength
            ></el-input>
          </el-form-item>
          <el-form-item label="名称字体大小">
            <el-radio
              v-model="config.titleFontsize"
              label="18px"
            >大</el-radio>
            <el-radio
              v-model="config.titleFontsize"
              label="16px"
            >中</el-radio>
            <el-radio
              v-model="config.titleFontsize"
              label="14px"
            >小</el-radio>
          </el-form-item>
          <el-form-item label="名称背景颜色">
            <el-color-picker v-model="config.titleBackgroundColor"></el-color-picker>
          </el-form-item>
          <el-form-item label="名称文字颜色">
            <el-color-picker v-model="config.titleColor"></el-color-picker>
          </el-form-item>
          <el-form-item label="名称显示位置">
            <el-radio
              v-model="config.titleAlign"
              label="left"
            >居左</el-radio>
            <el-radio
              v-model="config.titleAlign"
              label="center"
            >居中</el-radio>
            <el-radio
              v-model="config.titleAlign"
              label="right"
            >局右</el-radio>
          </el-form-item>
          <el-form-item label="权限">
            <el-radio-group
              v-model="config.auth_type"
              @change="handleAuthTypeChange"
            >
              <el-radio :label="1">全部会员</el-radio>
              <el-radio :label="2">推客</el-radio>
              <el-radio :label="3">渠道商</el-radio>
            </el-radio-group>
          </el-form-item>
          <el-form-item :label="config.rank_name">
            <el-select
              v-model="config.rank_id"
              placeholder="请选择等级"
            >
              <el-option
                v-for="item in config.ranks"
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
        </edit-panel>
        <el-form-item label="商品标签简介">
          <rich-text v-model="config.decorateHtml"></rich-text>
        </el-form-item>
      </el-form>
    </el-card>
  </div>
</template>

<script>
  import GoodItem from "../../good-style/Item.vue";
  import ConfigData from "./config";
  // import GoodsService from "@/api/goods/goods";
  import EditPanel from '../../good-style/component/edit-panel.vue';
  import goodsStyleConfig from '../../good-style/config'
  const originImgUrl = 'http://img.qianshetuan.cn/image/65/2020/12/31/d577c439e4abf20e9638b82bab50f30e.png';
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
    name: "GoodsGroupAdd",
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
      "good-item": GoodItem,
      'edit-panel': EditPanel,

    },
    methods: {
      handleAuthTypeChange(e) {
        this.config.rank_id = 0;
      }
    },
    created() {
      // todo 获取商品分组名称
      this.config = Object.assign(
        {
          title: "",  //之前老的字段
          auth_type: 1,
          titleFontsize: '18px',
          titleBackgroundColor: '#FFFFFF',
          titleColor: '#000000',
          titleAlign: 'left',
          rank_id: 0,
          rank_name: "",
          is_rank_only: 0,
          content: [1, 3, 4], //这个不知道干嘛的
          decorateHtml: "",
          ranks: [],
          ...goodsStyleConfig
        },
        this.content
      );
      this.goodsList = originGoodsList.slice();
    },
    watch: {
      currentIndex: function (n) {
        if (n === -1) {
          // this.isAll,this.value
          this.$emit("update:content", this.config);
        }
      },
      "config.auth_type": function (n) {
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
        // GoodsService.groupRankList({ auth_type: n }).then(res => {
        //   if (res.data.code) {
        //     this.config.ranks = res.data.data;
        //   }
        // });
        this.$pcTpl.axios({
          url: '/Item/groupRankList',
          method: 'post',
          data: {
            auth_type: n
          }
        }).then(res => {
          this.config.ranks = res.data.data;
        })
      }
    }
  };
</script>
