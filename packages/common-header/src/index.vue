<template>
  <div>
    <el-row>
      <div class="left common-header">
        <p>{{config.name}}</p>
      </div>
      <el-card
        class="edit-area"
        v-if="belongIndex === currentIndex"
      >
        <el-form
          :model="config"
          :rules="rules"
          ref="ruleForm"
          label-width="100px"
          class="demo-ruleForm"
          size="small"
        >
          <el-form-item
            label="页面名称:"
            prop="name"
          >
            <el-input v-model="config.name"></el-input>
          </el-form-item>
          <el-form-item label="页面背景色:">
            <el-color-picker
              v-model="config.color"
              @change="changeColor"
            ></el-color-picker>
          </el-form-item>
          <el-form-item label="页面背景图片:">
            <div
              class="img-box show"
              v-if="config.backgroundImg"
            >
              <i
                class="el-icon-close close-btn"
                @click="handleDeleteImage"
              ></i>
              <img
                :src="config.backgroundImg"
                alt="图片地址"
              />
            </div>
            <div
              class="card-add"
              @click="showGoodsModal"
              v-else
            >
              <i
                style="color:#409EFF"
                class="iconfont icon-add1"
              ></i>
            </div>
          </el-form-item>
          <el-form-item label="页面装修容器背景颜色:">
            <el-color-picker v-model="config.decsColor"></el-color-picker>
          </el-form-item>
          <template v-if="$route.query.type == 'Miniprogram'">
            <el-form-item label="小程序顶部导航条背景色:">
              <el-color-picker v-model="config.topBarBgColor"></el-color-picker>
            </el-form-item>
            <el-form-item label="小程序顶部导航条字体色:">
              <el-radio
                v-model="config.topBarColor"
                label="#000000"
              >黑色</el-radio>
              <el-radio
                v-model="config.topBarColor"
                label="#ffffff"
              >白色</el-radio>
            </el-form-item>
          </template>

          <el-form-item
            label="门店头显示"
            v-if="$pcTpl.from"
          >
            <el-radio-group
              v-model="config.store_show"
              @change="changeStoreShow"
            >
              <el-radio :label="1">是</el-radio>
              <el-radio :label="0">否</el-radio>
            </el-radio-group>
          </el-form-item>
        </el-form>
      </el-card>
    </el-row>
  </div>
</template>
<script>

  export default {
    name: "commonHeader",
    data() {
      return {
        config: {
          name: "店铺首页",
          color: "#f7f7f7",
          backgroundImg: "",
          decsColor: "",
          topBarBgColor: '',
          topBarColor: '#ffffff',
          store_show: 1
        },
        rules: {
          name: [
            { required: true, message: "请输入活动名称", trigger: "blur" },
            { min: 3, max: 5, message: "长度在 3 到 5 个字符", trigger: "blur" }
          ]
        }
      };
    },
    watch: {
      content(n) {
        this.init(n);
      },
      currentIndex: function (n) {
        if (n === -1) {
          this.$emit("update:content", this.config);
        }
      }
    },
    components: {},
    props: ["belongIndex", "currentIndex", "content"],
    methods: {
      changeColor() {
        if (this.config.color == null) {
          this.config.color = "";
        }
        this.$emit("changeColor", this.config.color);
      },
      changeStoreShow() {
        this.$emit("changeStoreShow", this.config.store_show);
      },
      init(n) {
        if (n) {
          this.config = Object.assign(
            {
              name: "店铺首页",
              color: "#f7f7f7",
              decsColor: "",
              topBarBgColor: '',
              topBarColor: '#ffffff',
              backgroundImg: "",
              store_show: 1
            },
            n
          );
        } else {
          this.config = {
            name: "店铺首页",
            color: "#f7f7f7",
            decsColor: "",
            topBarBgColor: '',
            topBarColor: '#ffffff',
            backgroundImg: "",
            store_show: 1
          };
        }
      },
      showGoodsModal() {
        this.$pcTpl.imgChoose.popup({
          picMax: 1
        }).then((img) => {
          if (img.length > 0) {
            this.config.backgroundImg = img[0].image_path;
            this.$emit("changeBackground", this.config.backgroundImg);
          }
        })
      },
      handleDeleteImage() {
        this.config.backgroundImg = null;
        this.$emit("changeBackground", "");
      }
    },
    created() {
      this.init(this.content);
    }
  };
</script>

<style lang="scss" scoped>
  .img-box,
  .card-add {
    width: 100px;
    height: 100px;
    position: relative;
    .el-icon-close {
      position: absolute;
      right: -8px;
      top: -8px;
    }
    img {
      width: 100%;
    }
  }
  .left {
    width: 320px;
    height: 60px;
    background: url("http://img.wkdao.com/image/65/2020/07/31/40b0409755c663631ea14509e9221ced.png");
    background-size: 100% 100%;
    p {
      color: #f7f7f7;
      font-size: 16px;
      text-align: center;
      padding-top: 30px;
    }
  }
</style>
