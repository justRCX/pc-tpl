<template>
  <div class="img-text-nav">
    <el-row>
      <div
        class="mz-text"
        :style="{'padding-right':config.urlType? '20px': '0px','backgroundColor':config.backgroundColor,}"
      >
        <p
          :class="{'styleType':config.style==1}"
          style="white-space:pre-line;padding-left:10px;"
          :style="{'color':config.color,'font-size':config.fontsize,'text-align':config.align,'border-color':config.color}"
        >{{config.content}}</p>
        <i
          class="el-icon-arrow-right icon-href"
          v-if="config.urlType"
        ></i>
      </div>
      <el-card
        header="文本"
        class="edit-area"
        v-show="belongIndex === currentIndex"
      >
        <el-form
          style="text-align:left;"
          label-width="120px"
        >
          <el-form-item label="文本:">
            <el-input
              type="textarea"
              :rows="4"
              placeholder="请输入要说明的文字, 最多100字"
              v-model="config.content"
              maxlength="100"
            >
            </el-input>
          </el-form-item>
          <el-form-item label="字体大小:">
            <el-radio
              v-model="config.fontsize"
              label="18px"
            >大</el-radio>
            <el-radio
              v-model="config.fontsize"
              label="16px"
            >中</el-radio>
            <el-radio
              v-model="config.fontsize"
              label="14px"
            >小</el-radio>
          </el-form-item>
          <el-form-item label="背景颜色:">
            <el-color-picker v-model="config.backgroundColor"></el-color-picker>
          </el-form-item>
          <el-form-item label="文字颜色:">
            <el-color-picker v-model="config.color"></el-color-picker>
          </el-form-item>
          <el-form-item label="样式:">
            <el-radio
              v-model="config.style"
              :label="0"
            >无</el-radio>
            <el-radio
              v-model="config.style"
              :label="1"
            >样式一</el-radio>
          </el-form-item>
          <el-form-item label="显示位置:">
            <el-radio
              v-model="config.align"
              label="left"
            >居左</el-radio>
            <el-radio
              v-model="config.align"
              label="center"
            >居中</el-radio>
            <el-radio
              v-model="config.align"
              label="right"
            >局右</el-radio>
          </el-form-item>
          <el-form-item label="链接">
            <page-link-select
              :ref="'pageLinkSelect'"
              :selectValue="config"
              @linkSelected="linkSelected"
            ></page-link-select>
          </el-form-item>
          <el-form-item label="更多设置:">
            <el-checkbox v-model="config.more">显示底部分割线</el-checkbox>
          </el-form-item>
        </el-form>
      </el-card>
    </el-row>
  </div>
</template>

<script>
  export default {
    name: 'MzText',
    data() {
      return {
        config: {
          content: '',
          fontsize: '18px',
          backgroundColor: '#fff',
          color: '#000',
          align: 'left',
          config: '',
          more: false,
          urlType: '',
          urlTitle: '',
          choose: null,
          style: 0
        }
      };
    },
    methods: {
      linkSelected(data) {
        this.config.urlType = data.urlType;
        this.config.urlTitle = data.urlTitle;
        this.config.choose = data.choose;
      },
      init(n) {
        if (n) {
          this.config = Object.assign({
            content: '',
            fontsize: '18px',
            backgroundColor: '#fff',
            color: '#000',
            align: 'left',
            config: '',
            more: false,
            urlType: '',
            urlTitle: '',
            choose: null,
            style: 0
          }, n);
        } else {
          this.config = {
            content: '',
            fontsize: '18px',
            backgroundColor: '#fff',
            color: '#000',
            align: 'left',
            config: '',
            more: false,
            urlType: '',
            urlTitle: '',
            choose: null,
            style: 0
          };
        }
      }
    },
    props: [
      'belongIndex',
      'currentIndex',
      'content'
    ],
    components: {
    },
    watch: {
      content(n) {
        this.init(n);
      },
      currentIndex: function (n) {
        if (n === -1) {
          this.$emit('update:content', this.config);
        }
      }
    },
    created() {
      this.init(this.content);
    }
  };
</script>

<style lang="scss" scoped>
  .styleType {
    // &::before{
    //     content: "";
    //     display: inline-block;
    //     width: 3px;
    //     height: 12px;
    //     position: relative;
    //     top: 1px;
    //     margin-right:5px;
    // }
    border-left-width: 3px;
    border-left-style: solid;
  }
  .mz-text {
    position: relative;
    padding-top: 10px;
    padding-bottom: 10px;
    font-size: 14px;
    //   padding: 10px 0;
    //   margin: 0 10px;
    //   line-height: 34px;
    .icon-href {
      position: absolute;
      top: 50%;
      right: 0;
      -webkit-transform: translateY(-50%);
      -moz-transform: translateY(-50%);
      -ms-transform: translateY(-50%);
      transform: translateY(-50%);
      font-size: 12px;
      color: #cbc9cc;
    }
  }
</style>
