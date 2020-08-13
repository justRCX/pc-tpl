<template>
  <div class="mz-white">
    <el-row>
      <div :style="style">
      </div>
      <el-card
        header="辅助空白"
        class="edit-area"
        v-if="belongIndex === currentIndex"
      >
        <el-form
          style="text-align:left;"
          label-width="120px"
        >
          <el-form-item label="高度:">
            <el-slider
              v-model="config.height"
              :max="700"
              show-input
            >
            </el-slider>
          </el-form-item>
          <el-form-item label="背景颜色:">
            <el-color-picker
              show-alpha
              v-model="config.backgroundColor"
            ></el-color-picker>
          </el-form-item>
          <el-form-item label="背景图片:">
            <c-img
              v-model="config.bgImg"
              number="1"
            ></c-img>
          </el-form-item>
        </el-form>
      </el-card>
    </el-row>
  </div>
</template>

<script >
  import CImg from "../../img-upload/c-img.vue"
  export default {
    name: "mzWhite",
    data() {
      return {
        config: {
          bgImg: ""
        }
      };
    },
    components: { CImg },
    methods: {
      init(n) {
        if (n) {
          this.config = Object.assign(
            {
              height: 30,
              backgroundColor: null,
              bgImg: ""
            },
            n
          );
        } else {
          this.config = {
            height: 30,
            backgroundColor: null,
            bgImg: ""
          };
        }
      }
    },
    computed: {
      style() {
        let bg = this.config.bgImg
          ? `url('${this.config.bgImg}')`
          : this.config.backgroundColor;
        return {
          height: (320 / 750) * this.config.height + "px",
          'background': bg,
          'background-size': "cover"
        };
      }
    },
    props: ["belongIndex", "currentIndex", "content"],
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
    created() {
      this.init(this.content);
    }
  };
</script>

<style lang="scss" scoped>
</style>
