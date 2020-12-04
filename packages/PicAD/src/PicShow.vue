<template>
  <div v-show="temp9RightImg.length > 0  ||imgList.length > 0 ">
    <!--<<<<<<< HEAD-->
    <!--      <div v-if="type == 1" :style="{'backgroundColor':backgroundColor}" :class="temp9RightImg.length>0?'arrow-wap right-wrap':'arrow-wap'">-->
    <!--        <div class="arrow" v-if="config.dotSHow == 2" :style="{'color':config.dotColor}">-->
    <!--          <i class="iconfont icon-zuoyoujiantou"></i>-->
    <!--					<i class="iconfont icon-zuoyoujiantou2"></i>-->
    <!--        </div>-->
    <!--        <el-carousel class="temp1-swiper" :height="((320-100-(config.lrmargin/750*320))/width/(config.lineNum||1))*height+'px'" :style="{padding:'0 ' + '' + (config.lrmargin/750*320)+'px'}" indicator-position="none" :arrow="config.dotSHow == 1?'always':'never'">-->
    <!--=======-->
    <div
      v-if="type == 1"
      :style="{height:temp9RightImg.length > 0?secHeight+'px':'auto',padding:'0 ' + '' + (config.lrmargin/750*320)+'px','background':background,backgroundSize:'contain'}"
      :class="temp9RightImg.length>0?'arrow-wap right-wrap':'arrow-wap'"
    >
      <el-carousel
        class="temp1-swiper"
        :height="temp9RightImg.length > 0?'':((320-(config.lrmargin/750*320))/width/(config.lineNum||1))*height+'px'"
        indicator-position="none"
        arrow="never"
      >
        <el-carousel-item
          v-for="index in imgLengthItem"
          :key="index"
        >
          <div
            ref="swiper"
            class="carClass"
            v-for="(item,key) in imgList.slice((index-1)*(config.lineNum||1),index*(config.lineNum||1))"
            :key="key"
            :style="{width:100/(config.lineNum||1) + '%'}"
          >
            <div
              :style="{'background-image':'url(' + item.image_path + ')'}"
              class="myImg"
            >
              <!--                      <img :src="item.image_path" alt="">-->
            </div>
            <div
              class="bottomSty"
              v-if="item.title"
            >{{item.title}}</div>
          </div>
        </el-carousel-item>
        <!-- <div  class="arrow"  v-if="config.dotSHow != 0 && temp9RightImg.length > 0" :style="dotStyle">
              <i class="iconfont icon-zuoyoujiantou"></i>
              <i class="iconfont icon-zuoyoujiantou2"></i>
          </div> -->
      </el-carousel>
      <div
        class="arrow"
        v-if="config.dotSHow != 0"
        :style="dotStyle"
      >
        <i class="iconfont icon-zuoyoujiantou"></i>
        <i class="iconfont icon-zuoyoujiantou2"></i>
      </div>
      <div
        class="img"
        v-if="temp9RightImg.length>0"
        :style="{'background-image':'url('+temp9RightImg[0].image_path+')',marginLeft:imgMarginStyle,}"
      >
        <!--
          <img v-if="temp9RightImg.length>0" :src="temp9RightImg[0].image_path" alt="">-->
      </div>
    </div>
    <div
      v-if="type === 2||type===7"
      :style="{'background':background,backgroundSize:'contain'}"
    >
      <div
        :style="{padding:'0 ' + '' + (config.lrmargin/750*320)+'px','margin-bottom': 320/750*margin+'px'}"
        v-for="item in imgList"
        :key="item.image_id"
        class="one-line-item"
      >
        <img
          style="width:100%;"
          :src="item.image_path"
          alt="图片广告"
        >
        <p
          class="img-title"
          v-if="item.title"
        >{{item.title}}</p>
      </div>
    </div>
    <!-- <div v-if="type == 3" class="img-slide">
          <div class="img-wrapper" :style="{'margin-right': margin+'px'}" v-for="item in imgList" :key="item.image_id">
              <img style="height:187px;" :src="item.image_path" alt="图片广告">
              <p class="img-title" v-if="item.title">{{item.title}}</p>
          </div>
      </div> -->
    <div
      v-if="type == 3"
      class="img-slide"
      :style="{'height':(320/width)*height*0.87+20+'px','background':background,backgroundSize:'contain'}"
    >
      <div
        class="img-wrapper"
        v-if="isShowTips"
      >
        <img
          src="http://img.wkdao.com/image/65/2020/07/21/86495edd6ae68ee48da07a9549db0c03.png"
          alt=""
          class="show-tips"
        >
      </div>
      <div
        class="img-wrapper"
        :style="{'margin-right':  320/750*margin+'px'}"
        v-for="item in imgList"
        :key="item.image_id"
      >
        <img
          :src="item.image_path"
          alt="图片广告"
          :style="{'height':(320/width)*height*0.87+'px'}"
        >
        <p
          class="img-title"
          v-if="item.title"
        >{{item.title}}</p>
      </div>
    </div>
    <div
      v-if="type == 10"
      class="img-slide"
      :style="{'height':(320/width)*height*0.6+20+'px','background':background,backgroundSize:'contain',padding:'0 ' + '' + (config.lrmargin/750*320)+'px'}"
    >
      <div
        class="img-wrapper"
        v-if="isShowTips"
      >
        <img
          src="http://img.wkdao.com/image/65/2020/07/21/86495edd6ae68ee48da07a9549db0c03.png"
          alt=""
          class="show-tips"
        >
      </div>
      <div
        class="img-wrapper"
        :style="{'margin-right':  320/750*margin+'px'}"
        v-for="item in imgList"
        :key="item.image_id"
      >
        <img
          :src="item.image_path"
          alt="图片广告"
          :style="{'height':(320/width)*height*0.6+'px'}"
        >
        <p
          class="img-title"
          v-if="item.title"
        >{{item.title}}</p>
      </div>
    </div>
    <!-- <div v-if="type == 4" class="img-slide">
          <div class="img-wrapper" :style="{'margin-right':margin+'px'}" v-for="item in imgList" :key="item.image_id">
              <img style="height:85px;" :src="item.image_path" alt="图片广告">
              <p class="img-title" v-if="item.title">{{item.title}}</p>
          </div>
      </div> -->
    <div
      v-if="type == 4"
      class="img-slide"
      :style="{'height':(320/width)*height*0.4+20+'px','background':background,backgroundSize:'contain'}"
    >
      <div
        class="img-wrapper"
        v-if="isShowTips"
      >
        <img
          src="http://img.wkdao.com/image/65/2020/07/21/86495edd6ae68ee48da07a9549db0c03.png"
          alt=""
          class="show-tips"
        >
      </div>
      <div
        class="img-wrapper"
        :style="{'margin-right': 320/750*margin+'px'}"
        v-for="item in imgList"
        :key="item.image_id"
      >
        <img
          style="height:85px;"
          :src="item.image_path"
          alt="图片广告"
          :style="{'height':(320/width)*height*0.4+'px'}"
        >
        <p
          class="img-title"
          v-if="item.title"
        >{{item.title}}</p>
      </div>
    </div>

    <div
      v-if="type === 5"
      class="img-slide"
      :style="{'height':(320/width)*height*0.2+20+'px','background':background,backgroundSize:'contain'}"
    >
      <div
        class="img-wrapper"
        :style="{'margin-right':  320/750*margin+'px'}"
        v-for="item in imgList"
        :key="item.image_id"
      >
        <img
          style="height:39px;"
          :src="item.image_path"
          alt="图片广告"
          :style="{'height':(320/width)*height*0.2+'px'}"
        >
        <p
          class="img-title"
          v-if="item.title"
        >{{item.title}}</p>
      </div>
    </div>

    <div
      v-if="type == 6"
      class="img-slide"
      :style="{'height':(320/width)*height*0.3+20+'px','background':background,backgroundSize:'contain'}"
    >
      <div
        class="img-wrapper"
        :style="{'margin-right':  320/750*margin+'px'}"
        v-for="item in imgList"
        :key="item.image_id"
      >
        <img
          style="height:60px;"
          :src="item.image_path"
          alt="图片广告"
          :style="{'height':(320/width)*height*0.3+'px'}"
        >
        <p
          class="img-title"
          v-if="item.title"
        >{{item.title}}</p>
      </div>
    </div>
    <div
      v-if="type == 8"
      class="carousel-wrapper"
      :style="{'background':background,backgroundSize:'contain',padding:config.lrmargin/750*320 +'px'}"
    >
      <el-carousel
        :interval="4000"
        indicator-position="none"
        type="card"
        arrow="never"
        :height="((320-(config.lrmargin/750*320))/width)*height*0.4+10+'px'"
      >
        <el-carousel-item
          v-for="item in imgList"
          :key="item.image_id"
        >
          <div class="carClass">
            <div
              :style="{'background-image':'url(' + item.image_path + ')'}"
              class="myImg"
            ></div>s
            <div
              class="bottomSty"
              v-if="item.title"
            >{{item.title}}</div>
          </div>
        </el-carousel-item>
      </el-carousel>
    </div>
    <div
      v-if="type == 9"
      class="zhangbo1"
      :style="{'background':background,backgroundSize:'contain'}"
    >
      <el-carousel
        class="swiper"
        :height="200+'px'"
        :style="{padding:'0 ' + '' + (config.lrmargin/750*320)+'px;flex:1'}"
      >
        <el-carousel-item
          v-for="index in imgLengthItem"
          :key="index"
        >
          <div
            class="carClass"
            v-for="(item,key) in imgList.slice((index-1)*(config.lineNum||1),index*(config.lineNum||1))"
            :key="key"
            :style="{width:100/(config.lineNum||1) + '%'}"
          >
            <div
              :style="{'background-image':'url(' + item.image_path + ')'}"
              class="myImg"
            ></div>
            <div
              class="bottomSty"
              v-if="item.title"
            >{{item.title}}</div>
          </div>
        </el-carousel-item>
      </el-carousel>
      <div class="img">
        <img
          v-if="temp9RightImg.length>0"
          :src="temp9RightImg[0].image_path"
          alt=""
        >
      </div>
    </div>
  </div>
</template>

<script>
  // 图片广告展示
  export default {
    name: 'picSHow',
    props: [
      'imgList',
      'type',
      'margin',
      'count',
      'size',
      'backgroundColor',
      'config',
      'temp9RightImg',
      'bgImg',
      'isShowTips'
    ],
    data() {
      return {
        width: 0,
        height: 0,
        secHeight: 0

      }
    },
    computed: {
      imgLengthItem() {
        return (parseInt(this.imgList.length / parseFloat(this.config.lineNum)) + (this.imgList.length % parseFloat(this.config.lineNum > 0 ? 1 : 0)))
      },
      paddingStyle() {
        if (this.config.dotSHow == 1) {
          return `0 ${this.config.lrmargin / 750 * 320 + 5}px`;
        } else {
          return ''
        }
      },
      imgMarginStyle() {
        return `${this.config.margin / 750 * 320}px`;
      },
      dotStyle() {
        let dotSize = this.config.dotSize / 750 * 320;
        return `
          color: ${this.config.dotColor};
          font-weight: ${this.config.dotWeight};
          font-size: ${dotSize}px;
          top: ${this.config.dotLocation}%;
          padding: ${this.paddingStyle};
        `
      },
      background() {
        return this.bgImg ? `url('${this.bgImg}')` : this.backgroundColor
      }
    },
    watch: {
      "config.lrmargin":
      {
        handler(n, o) {
          this.getSwiperHeight()
        },
        immediate: true,
        deep: true
      },
      imgList() {
        if (this.imgList.length > 0) {
          this.width = this.imgList[0].image_meta.split('*')[0];
          this.height = this.imgList[0].image_meta.split('*')[1];
        }
      },
    },
    methods: {
      getSwiperHeight() {
        this.$nextTick(() => {
          if (this.temp9RightImg.length > 0) {
            let avg = this.width / this.height;
            let clientWidth = this.$refs.swiper[0].clientWidth;
            let height = clientWidth / avg;
            this.secHeight = height
          }
        })
      }

    },
    mounted() {
      this.getSwiperHeight()
    },
    created() {
      if (this.imgList.length > 0) {
        this.width = this.imgList[0].image_meta.split('*')[0];
        this.height = this.imgList[0].image_meta.split('*')[1];
      }
    }
  };
</script>

<style lang="scss" scoped>
  .right-wrap {
    /deep/ .el-carousel__container {
      height: 100% !important;
    }
    .carClass .myImg {
      background-size: 100%;
      background-position: top center !important;
    }
    display: flex;
    .temp1-swiper {
      flex: 1;
      overflow: hidden;
      height: 100%;
    }
    .img {
      width: 100px;
      /*height:100%;*/
      height: 100%;
      background-size: 100% 100%;
      background-repeat: no-repeat;
      background-position: center center;
      img {
        width: 100%;
      }
    }
  }
  .arrow-wap {
    position: relative;
    .arrow {
      width: 100%;
      color: #fff;
      position: absolute;
      top: 50%;
      left: 0;
      margin-top: -9px;
      display: flex;
      justify-content: space-between;
      z-index: 10;
      .iconfont {
        font-size: inherit;
      }
    }
  }
  .carClass {
    width: 100%;
    height: 100%;
    position: relative;
    display: inline-block;
    .myImg {
      width: 100%;
      height: 100%;
      background-size: 100%;
      background-repeat: no-repeat;
      background-position: center center;
    }
  }
  .img-title {
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
    padding: 0;
    z-index: 10;
    background-color: rgba(51, 51, 51, 0.8);
    color: #fff;
    font-size: 14px;
    height: 30px;
    line-height: 30px;
    text-align: left;
  }
  // 横向滑动样式
  .img-slide {
    width: 100%;
    overflow-x: scroll;
    overflow-y: hidden;
    white-space: nowrap;
    // padding-bottom: 100px;
    .img-wrapper {
      display: inline-block;
      height: 100%;
      position: relative;
      .img-title {
        text-align: center;
      }
      img {
        margin-top: 0px;
        height: 100%;
        margin-right: 0;
        margin-left: 0;
        &.show-tips {
          margin-right: 12px;
        }
      }
    }
    .img-wrapper:first-child {
      margin-left: 0px !important;
    }
    .img-wrapper:last-child {
      margin-right: 0px !important;
    }
  }
  selector::-webkit-scrollbar {
    height: 0;
  }
</style>

<style scoped lang="scss">
  .bottomSty {
    background: rgba(0, 0, 0, 0.4);
    position: absolute;
    bottom: 0;
    width: 100%;
    padding: 5px;
    color: white;
  }
  .carousel-wrapper {
    padding: 0 20px;
  }
  .zhangbo1 {
    height: 200px;
    display: flex;
    .img {
      width: 100px;
      height: 100%;
      img {
        width: 100px;
        height: 100%;
      }
    }
    .swiper {
      flex: 1;
      margin-right: 5px;
    }
  }
  /deep/ .el-carousel__arrow {
    background-color: transparent;
    .el-icon-arrow-right,
    .el-icon-arrow-left {
      font-size: 18px;
    }
    &:hover {
      background-color: transparent;
    }
  }
  .one-line-item {
    position: relative;
    overflow: hidden;
    &:last-child {
      margin-bottom: 0 !important;
    }
  }
</style>

