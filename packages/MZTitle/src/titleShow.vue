<template>
  <div>
    <div :style="BlankStyle">
      <!-- 传统样式 -->
      <div
        class="mz-title-show"
        :style="{'backgroundColor':config.backgroundColor,'text-align':config.align}"
        v-if="config.templateId === 1"
      >
        <h2>
          {{config.title}}
          <span v-if="config.hasNav">
            <span v-if="config.nav.name">-</span>
            <a href="#">{{config.nav.name}}</a>
          </span>
        </h2>
        <p
          class="sub-title"
          v-show="config.subTitle? true:false"
        >{{config.subTitle}}</p>
      </div>
      <!-- 模仿微信图文页样式 -->
      <div
        class="mz-title-show"
        :style="{'text-align':config.align}"
        v-if="config.templateId === 2"
      >
        <h2>{{config.title}}</h2>
        <p class="sub-title">
          <span
            :class="{'nomargin':config.align=='right' && !config.wx.author && !config.wx.urlName}"
            v-if="config.wx.date"
          >{{config.wx.date}}</span>
          <span
            v-if="config.wx.author"
            :class="{'nomargin':config.align=='right' && !config.wx.urlName}"
          >{{config.wx.author}}</span>
          <a v-if="config.wx.urlName">{{config.wx.urlName}}</a>
        </p>
      </div>
      <!-- 个性样式 -->
      <div
        class="mz-title-show3"
        :style="backgroundStyle"
        v-if="config.templateId === 3"
      >
        <div class="title-wap">
          <img
            :src="config.personality.img"
            v-if="config.personality.img"
          />
          <p
            class="title"
            :style="{ color:config.personality.titleColor3 ,'fontWeight':config.personality.blod ? 700:'normal'}"
          >{{config.title}}</p>
          <p
            class="sub-title"
            v-if="config.subTitle"
            :style="{ color:config.personality.titleColor3 }"
          >{{config.subTitle}}</p>
        </div>
        <div
          class="btn-wap"
          :style="{ color:config.personality.wordColor3,background: config.personality.backgroundColorBtn }"
          v-if="config.personality.btnTitle"
        >
          <span class="btnTitle">{{config.personality.btnTitle}}</span>
          <span class="iconfont icon-arrow"></span>
        </div>
      </div>
      <!-- 滑动标题 -->
      <div
        class="fourContainer"
        v-if="config.templateId === 4"
        :style="fourContainerStyle"
      >
        <div
          class="title"
          :style="{ color: config.slide.titleColor}"
        >{{config.title}}</div>
        <div
          class="listItem"
          v-for="(item, index) in config.navList"
          :key="index"
          v-show="index<3"
        >
          <div class="box">
            <img
              :src="item.image_path"
              v-if="item.image_path"
            />
            <p
              class="word"
              :style="{'color': config.slide.slideTitleColor}"
            >{{item.name}}</p>
          </div>
        </div>
        <div
          class="arrow iconfont icon-zuoyoujiantou2"
          :style="{'color': config.slide.slideTitleColor}"
        ></div>
      </div>
      <!-- 滑动标题 -->
      <div
        class="fiveContainer"
        v-if="config.templateId === 5"
        :style="fiveContainerStyle"
      >
        <div class="fiveContainer_title">
          <p
            :style="{ color: config.slide.titleColor,background:config.slide.slideTitleColor }"
            class="fiveContainer_title_word"
            v-if="config.title"
          >
            {{config.title}}</p>
        </div>
        <div class="fiveContainer_content">
          <p
            v-for="(item, index) in config.navList"
            class="content_item"
            :style="{'color': config.slide.slideTitleColor}"
          >{{item.name}}</p>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
  export default {
    props: {
      config: {
        type: Object,
        default: () => { }
      }
    },
    data() {
      return {};
    },
    computed: {
      backgroundStyle() {
        let left = this.config.personality.backgroundColorLeft || "#FF4873";
        let right = this.config.personality.backgroundColorRight || "#FE7264";
        return `
          background-image: linear-gradient(to right,${left},${right});
          padding-left: ${this.config.personality.lrMargin}px;
          padding-right: ${this.config.personality.lrMargin}px;
        `;
      },
      BlankStyle() {
        let lrBlank = (this.config.lrBlank * 320) / 750 || 0;
        return `
          padding-left: ${lrBlank}px;
          padding-right: ${lrBlank}px;
        `;
      },
      fourContainerStyle() {
        return `
          background-color:${this.config.backgroundColor};
          padding-left: ${this.config.slide.lrPadding}px;
          padding-right: ${this.config.slide.lrPadding}px;
          margin-left: ${this.config.lrBlank}px;
          margin-right: ${this.config.lrBlank}px;
        `;
      },
      fiveContainerStyle() {
        return `
          background-color:${this.config.backgroundColor};
          margin-left: ${this.config.lrBlank}px;
          margin-right: ${this.config.lrBlank}px;
        `;
      }
    },
    methods: {}
  };
</script>
<style scoped lang="scss">
  @function upx($num) {
    @return $num * 318/750 + px;
  }
  .mz-title-show {
    padding: 10px;
    h2 {
      margin: 0;
      font-size: 18px;
      line-height: 22px;
      .custom-link {
        margin-left: 10px;
        color: #999;
        font-weight: normal;
        a {
          pointer-events: none;
          font-size: 12px;
          color: #07d;
          text-decoration: none;
        }
      }
    }
    p.sub-title {
      font-size: 12px;
      color: #8c8c8c;
      margin: 5px 0 0;
      span {
        margin-right: 10px;
      }
      a {
        color: #607fa6;
        pointer-events: none;
        text-decoration: none;
      }
    }
  }
  .nomargin {
    margin: 0px !important;
  }
  .img-box {
    margin-right: 10px;
    position: relative;
    width: 75px;
    img {
      width: 75px;
      height: 75px;
    }
    .change-img {
      color: #409eff;
      cursor: pointer;
    }
  }
  .line {
    display: flex;
  }
  .mz-title-show3 {
    display: flex;
    align-items: center;
    justify-content: space-between;
    height: (78 * 318/750 + px);
    border-radius: (20 * 318/750 + px) (20 * 318/750 + px) 0 0;
    .title-wap {
      display: flex;
      align-items: center;
      img {
        width: (24 * 318/750 + px);
        height: (29 * 318/750 + px);
        margin-right: (10 * 318/750 + px);
      }
      .title {
        font-size: (28 * 318/750 + px);
        color: #fff;
      }
      .sub-title {
        font-size: (22 * 318/750 + px);
        color: #fff;
        padding-left: (25 * 318/750 + px);
      }
    }
    .btn-wap {
      color: #ff4e71;
      background: #fff;
      padding-left: (20 * 318/750 + px);
      padding-right: (10 * 318/750 + px);
      border-radius: (20 * 318/750 + px);
      display: flex;
      align-items: center;
      justify-content: center;
      .btnTitle {
        font-size: (22 * 318/750 + px);
        line-height: (50 * 318/750 + px);
      }
      .icon-arrow {
        font-size: (22 * 318/750 + px);
      }
    }
  }
  // 滑动样式
  .fourContainer {
    display: flex;
    padding: (20 * 318/750 + px) 0;
    font-size: (24 * 318/750 + px);
    .title {
      color: #000;
      width: (150 * 318/750 + px);
      font-weight: 700;
    }
    .listItem {
      width: calc(calc(100% - 64px) / 3);
      color: #666;
      .box {
        display: flex;
        align-items: center;
        justify-content: flex-start;
        img {
          width: (34 * 318/750 + px);
          height: 100%;
        }
        .word {
          margin-left: (10 * 318/750 + px);
        }
      }
    }
    .arrow {
      width: (30 * 318/750 + px);
      font-size: (22 * 318/750 + px);
      display: flex;
      align-items: center;
    }
  }

  .fiveContainer {
    display: flex;
    align-items: center;
    padding: upx(24) 0;
    overflow: hidden;
    &_title {
      flex-shrink: 0;
      padding: 0 upx(24);
      &_word {
        padding: upx(8) upx(14);
        border-radius: upx(26);
        font-size: upx(28);
        font-weight: 700;
      }
    }
    &_content {
      width: 100%;
      white-space: nowrap;
      .content_item {
        display: inline-block;
        padding: 0 upx(24);
        font-size: upx(24);
        position: relative;
        &::before {
          content: "";
          display: inline-block;
          position: absolute;
          left: 0;
          top: 0;
          width: 1px;
          height: 100%;
          background: #ff9381;
        }
      }
    }
  }
</style>