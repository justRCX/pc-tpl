<template>
  <div class="sale-config-box">
    <!-- <coupon-list-show
      :list="couponList"
      :configs="config"
    ></coupon-list-show> -->
    <el-card
      header="优惠券"
      class="edit-area"
      v-if="belongIndex === currentIndex"
    >
      <el-form label-width="120px">
        <el-form-item label="添加优惠券">
          <el-radio-group
            v-model="config.chooseType"
            size="small"
            @change="handleChooseType"
          >
            <el-radio label="1">手动获取</el-radio>
            <el-radio label="2">自动获取</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item
          label=""
          v-show="config.chooseType == 1"
        >
          <div
            v-if="couponList.length>0"
            class="coupon-wapper"
          >
            <div
              v-for="(item,index) in couponList"
              :key="index+'coupon'"
              class="coupon-editor"
            >
              <i class="coupon-editor__drag"></i>
              <span>{{item.title}}({{item.remark}})</span>
              <i
                class="iconfont icon-small_close"
                @click="deleteGood(index)"
              ></i>
            </div>
          </div>
          <el-button
            type="ghost"
            class="g-mt-10"
            size="small"
            @click="showCouponModal"
          >选择优惠券</el-button>
        </el-form-item>
        <el-form-item v-show="config.chooseType != 1">
          <el-input
            v-model="config.showNum"
            placeholder="请输入显示优惠券的数量"
            maxlength="10"
            size="small"
          ></el-input>
          <span class="g-tips ">
            如果不填则默认为全部（优惠券超过10张显示最新10张）
          </span>
        </el-form-item>
        <el-form-item label="优惠券样式">
          <el-radio-group
            v-model="config.showTemplateType"
            size="small"
          >
            <el-radio
              :label="item.value"
              v-for="item in editList.TemplateTypeList"
              :key="item.value"
            >{{item.label}}</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="排列样式">
          <el-radio-group
            v-model="config.couponWay"
            size="small"
          >
            <el-radio
              :label="item.value"
              v-for="item in editList.couponWayList"
              :key="item.value"
            >{{item.label}}</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="当前优惠券效果">
          <el-radio-group
            v-model="config.couponStatus"
            size="small"
          >
            <el-radio
              :label="item.value"
              v-for="item in editList.couponStatusList"
              :key="item.value"
            >{{item.label}}</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item
          label="隐藏已抢完及失效的券"
          class="__width"
        >
          <el-checkbox
            v-model="config.hideSellOutCoupon"
            true-label="1"
            false-label="0"
          ></el-checkbox>
        </el-form-item>
      </el-form>
    </el-card>
  </div>
</template>

<script >
  import draggable from "vuedraggable";
  import couponListModal from "./couponListModal.vue";
  import myDialog from '../../utils/popup'
  let couponPop = new myDialog(couponListModal)
  import editList from "./config";
  export default {
    name: "couponList",
    components: {
      draggable: draggable,
    },
    props: [
      "belongIndex",
      "currentIndex",
      "isGroup",
      "content",
      "type",
      "bodyBg"
    ],
    data() {
      return {
        editList: editList,
        config: {
          coupon_id: [],
          style: 1,
          // 1 横向滑动 2一行两个 3 一行三个
          couponWay: 1,
          hideSellOutCoupon: 0,
          couponStatus: 1,
          showTemplateType: 1,
          chooseType: 1,
          showNum: '',
        },
        couponList: [],
        ajaxing: false,
      };
    },
    methods: {
      // 切换 自动获取/手动获取
      handleChooseType() {
        this.couponList = [];
        this.config.showNum = '';
      },
      showCouponModal() {
        couponPop.popup({
          cacheList: this.couponList
        }).then(res => {
          this.couponList = JSON.parse(JSON.stringify(res));
        }).catch(() => { })
      },
      deleteGood(index) {
        this.couponList.splice(index, 1);
      },
      getList() {
        if (this.ajaxing) {
          return;
        }
        this.ajaxing = true;
        let params = {
          coupon_id: this.config.coupon_id
        };
        this.$pcTpl.axios({
          url: '/Marketing/couponList',
          method: 'post',
          data: params
        }).then(res => {
          this.ajaxing = false;
          this.couponList = res.data || [];
        })
      },
      init(n) {
        if (n) {
          this.config = Object.assign({}, { ...this.config }, n);
        }
        if (this.config.coupon_id.length > 0) {
          this.getList();
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
          this.config.coupon_id = this.config.couponList.map(item => item.coupon_id);
          this.$emit("update:content", this.config);
        }
      }
    }
  };
</script>
<style lang="scss" scoped>
  /deep/.el-radio-group {
    margin-top: 0 !important;
  }
  .__width /deep/.el-form-item__label {
    width: auto !important;
  }
  .coupon-wapper {
    background: #fff;
    padding: 10px;
    .coupon-editor {
      box-shadow: 0 0 4px 0 rgba(10, 42, 97, 0.2);
      padding: 0 10px;
      margin-bottom: 10px;
      background: #fff;
      position: relative;
      .coupon-editor__drag {
        display: inline-block;
        margin-right: 5px;
        background-position: 50%;
        background-size: cover;
        width: 20px;
        height: 20px;
        vertical-align: middle;
        background-image: url(https://img.yzcdn.cn/public_files/2019/02/11/6c383209a91d0cba0c46b906f3d027d2.png);
      }
      .iconfont {
        display: none;
        position: absolute;
        right: 0;
        top: 0;
      }
      &:hover {
        .iconfont {
          display: inline-block;
        }
      }
    }
  }
</style>
