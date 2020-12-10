<template>
  <div
    class="gooods-group-ctn"
    :class="{'left-ctn': config.templateId === 2,'column-ctn': config.templateId === 1,'listStyle':config.listStyle==2}"
  >
    <div
      class="u-tabs"
      :class="{'column1':config.templateId === 2}"
    >
      <ul v-if="config.style != 4  || config.templateId === 2">
        <li
          :class="groupTabClass(index)"
          v-for="(item,index) in groupList"
          :key="item.group_id"
        >
          <div
            v-if="index == 0"
            :style="config.templateId === 1 ? firstOneStyle :''"
          >{{item.group_title}}</div>
          <div v-if="index > 0">{{item.group_title}}</div>
        </li>
      </ul>
      <div
        v-if="config.style == 4 && config.templateId === 1"
        class="tabStyle"
      >
        <div class="goods">
          <div
            v-for="item in groupList.slice(0,3)"
            :key="item.group_id"
            class="item-goods"
          >{{item.group_title}}</div>
        </div>
        <!-- <div
          class="more"
          v-if="config.content.includes(6)"
        >更多 ></div> -->
      </div>
      <div
        v-if="config.tabStyle == 3 && config.templateId === 1"
        class="tabStyle3"
      >
        <ul>
          <li
            v-for="(item,index) in groupList.slice(0,4)"
            :key="item.group_id"
          >
            <div v-if="index == 0">{{item.group_title}}</div>
            <div v-if="index > 0">{{item.group_title}}</div>
          </li>
        </ul>
        <!-- <div
          class="more"
          v-if="config.content.includes(6)"
          :style="{color:config.viewMoreColor?config.viewMoreColor:'#ff4e71'}"
        >{{config.viewMoreText || '更多'}} ></div> -->
      </div>
    </div>
    <div
      v-if="config.templateId === 1"
      class="goods-list"
      :class="{'overList':config.listType == 6}"
      :style="{'background':config.backgroundColor}"
    >
      <good-item
        :config="config"
        :list="list"
        :listType="config.listType"
      ></good-item>
    </div>
    <div
      class="group-list"
      v-if="config.templateId === 2"
    >
      <div
        class="group-box"
        v-for="goods in groupList"
        :key="goods.id"
      >
        <div class="group-title">{{goods.group_title}}</div>
        <div
          class="goods-item-box"
          v-for="(item,index) in list"
          :key="item.id"
        >
          <div
            class="goods-item__wrapper"
            style="margin-bottom:5px;"
            v-if="index<10"
          >

          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
  const originImgUrl = 'http://img.wkdao.com/image/65/2020/08/03/0aac7e6e9aaaeb10863cd82e67a771e0.png';
  import GoodItem from "../../good-style/Item.vue";
  export default {
    name: "GoodsGroup",
    data() {
      return {
        list: [
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
        ]
      };
    },
    components: { GoodItem },
    props: ["config", "group"],
    created() { },
    methods: {
      groupTabClass(index) {
        if (index > 0) {
          return "";
        }
        let str = "";
        if (this.config.style === 1 || this.config.templateId == 1) {
          str = "current";
        } else if (this.config.style === 2) {
          str = "current2";
        } else if (this.config.style === 3) {
          str = "current3";
        }
        return str;
      }
    },
    computed: {
      groupList() {
        let __list = this.config.goodsGroups
        return __list.length > 0 ? __list : [{
          group_title: '分组1'
        }, {
          group_title: '分组2'
        }]
      },
      firstOneStyle() {
        if (this.config.style == 1) {
          return {
            color: this.config.menuColor,
            borderBottom: '2px solid ' + this.config.menuColor
          }
        } else {
          return {
            background: this.config.menuColor
          }
        }
      }
    }
  };
</script>

<style lang="scss" scoped>
  .g-flex {
    font-size: 10px;
    font-weight: 400;
    color: rgba(153, 153, 153, 1);
    line-height: 45px;
    p.__buy {
      margin-left: 10px;
    }
  }
  .goods-list {
    padding: 10px;
    //   background:#f7f7f7;
    .goods-item-box {
      // background:#fff;
      // margin-bottom:10px;
      width: 100%;
      padding: 5px;
      .goods-item__wrapper {
        background: #fff;
        width: 100%;
        display: flex;
        justify-content: center;
        padding: 10px;
        .img-square {
          width: 70%;
          position: relative;
          padding-bottom: 70%;
          height: 0px;
          .myImg {
            position: absolute;
            width: 100%;
            height: 100%;
            background-size: 100%;
            background-repeat: no-repeat;
            background-position: center center;
            border-top-left-radius: 10px;
            border-top-right-radius: 10px;
          }
        }
        .corner-ctn {
          position: absolute;
          background: #ff4873;
          left: 0;
          top: 0;
          color: #fff;
          border-radius: 5px;
          z-index: 999;
          font-size: 12px;
          padding: 2px 8px;
        }
        .corner-ctn-img {
          position: absolute;
          left: 0;
          top: 0;
          width: 40px;
        }
      }
      .item-content {
        background: #fff;
        .contentBox {
          .buy-icon1 {
            width: 25px;
            position: absolute;
            right: 20px;
            bottom: 10px;
          }
          .buy-text {
            position: absolute;
            right: 20px;
            bottom: 10px;
            // background: #FF4873;
            background: linear-gradient(
              90deg,
              rgba(255, 72, 115, 1),
              rgba(254, 114, 100, 1)
            );
            color: #fff;
            padding: 2px 8px;
            border-radius: 15px;
          }
          .buy-text1 {
            position: absolute;
            right: 20px;
            bottom: 10px;
            color: #ff4873;
            padding: 2px 8px;
            border: 1px solid #ff4873;
            border-radius: 5px;
          }
          h3 {
            font-size: 13px;
            height: 34px;
            margin-top: 0px;
            margin-bottom: 0px;
            font-weight: 400;
            text-overflow: -o-ellipsis-lastline;
            overflow: hidden;
            text-overflow: ellipsis;
            display: -webkit-box;
            -webkit-line-clamp: 2;
            line-clamp: 2;
            -webkit-box-orient: vertical;
          }
          .price {
            display: block;
            color: #ff4873;
            font-size: 16px;
            font-weight: bold;
            margin-top: 5px;
          }
          p {
            line-height: 15px;
            height: 15px;
            white-space: nowrap;
            overflow: hidden;
            text-overflow: ellipsis;
          }
          .sub-title {
            line-height: 15px;
            height: 15px;
            margin-top: 5px;
            color: #999999;
            white-space: nowrap;
            overflow: hidden;
            text-overflow: ellipsis;
          }
          .card_right_price_integral {
            position: relative;
            margin-top: 5px !important;
          }
        }
        .card {
          padding: 0px 20px 10px 10px;
          position: relative;
        }
        .simple {
          padding: 0px 20px 10px 10px;
          // text-align: center;
        }
      }
      .img-white {
        position: relative;
        .img-square {
          width: 100%;
          position: relative;
          padding-bottom: 100%;
          height: 0px;
        }
        .average1 {
          width: 100%;
          position: relative;
          padding-bottom: 66.67%;
          height: 0px;
        }
      }
      .img-full {
        position: relative;
        padding: 0px;
        .img-square {
          width: 100%;
          position: relative;
          padding-bottom: 100%;
          height: 0px;
        }
        .average1 {
          width: 100%;
          position: relative;
          padding-bottom: 66.67%;
          height: 0px;
        }
      }
    }
    .small-img {
      width: 50%;
      float: left;
      .item-content {
        .contentBox {
          .buy-icon1 {
            width: 25px;
            position: absolute;
            right: 10px;
            bottom: 10px;
          }
          .price {
            font-size: 14px;
          }
          .buy-text {
            right: 5px;
          }
          .buy-text1 {
            right: 5px;
          }
        }
        .card {
          padding: 0px 10px 10px 10px;
          position: relative;
        }
        .simple {
          padding: 0px 10px 10px 10px;
          // text-align: center;
        }
      }
    }
    .one-two {
      &:nth-child(3n + 1) {
        width: 100%;
      }
      &:nth-child(3n + 2) {
        width: 50%;
        float: left;
        .item-content {
          .contentBox {
            .buy-icon1 {
              width: 25px;
              position: absolute;
              right: 10px;
              bottom: 10px;
            }
            .price {
              font-size: 14px;
            }
            .buy-text {
              right: 5px;
            }
            .buy-text1 {
              right: 5px;
            }
          }
          .card {
            padding: 0px 10px 10px 10px;
            position: relative;
          }
          .simple {
            padding: 0px 10px 10px 10px;
            // text-align: center;
          }
        }
      }
      &:nth-child(3n) {
        width: 50%;
        float: left;
        .item-content {
          .contentBox {
            .buy-icon1 {
              width: 25px;
              position: absolute;
              right: 10px;
              bottom: 10px;
            }
            .price {
              font-size: 14px;
            }
            .buy-text {
              right: 5px;
            }
            .buy-text1 {
              right: 5px;
            }
          }
          .card {
            padding: 0px 10px 10px 10px;
            position: relative;
          }
          .simple {
            padding: 0px 10px 10px 10px;
            // text-align: center;
          }
        }
      }
    }
    .three-part {
      width: 33.33%;
      float: left;
      .item-content {
        .contentBox {
          .buy-icon1 {
            width: 25px;
            position: absolute;
            right: 10px;
            bottom: 10px;
          }
          h3 {
            line-height: 30px;
            font-size: 14px;
            // padding-top:10px;
            margin-bottom: 0px;
            margin-top: 0px;
            white-space: nowrap;
            overflow: hidden;
            text-overflow: ellipsis;
          }
          .price {
            display: block;
            color: #ff4873;
            font-size: 14px;
            font-weight: bold;
            margin-top: 0px;
          }
          p {
            // margin-bottom:10px;
            line-height: 15px;
            height: 15px;
            overflow: hidden;
          }
        }
        .card {
          padding: 0px 10px 10px 10px;
          position: relative;
        }
        .simple {
          padding: 0px 10px 10px 10px;
          // text-align: center;
        }
      }
    }
    .detail-list {
      // display: flex;
      // background: #fff;
      margin-bottom: 10px;
      .goods-item__wrapper {
        width: 100px;
        height: 100px;
        padding: 0px;
        float: left;
        .img-square {
          width: 100%;
          height: 100%;
          .myImg {
            border-radius: 10px;
          }
        }
      }
      .item-content {
        // flex:1;
        height: 100px;
        float: left;
        width: calc(100% - 100px);
        .card {
          height: 100%;
          width: 100%;
          position: relative;
          h3 {
            word-break: break-all;
            white-space: pre-wrap;
            overflow: hidden;
            text-overflow: ellipsis;
            display: -webkit-box;
            -webkit-line-clamp: 2;
            -webkit-box-orient: vertical;
            line-height: 20px;
          }
          .price {
            display: block;
            position: absolute;
            bottom: 5px;
          }
          .buy-icon1 {
            bottom: 5px;
            right: 10px;
          }
          .buy-text {
            right: 5px;
            bottom: 5px;
          }
          .buy-text1 {
            right: 5px;
            bottom: 5px;
          }
        }
      }
      &::after {
        clear: both;
        display: block;
        content: "";
      }
    }
    &::after {
      clear: both;
      display: block;
      content: "";
    }
  }
  .overList {
    overflow-y: hidden;
    overflow-x: auto;
    white-space: nowrap;
    .overflow {
      width: 40%;
      position: relative;
      display: inline-block;
    }
  }
</style>
<style scoped lang="scss">
  .gooods-group-ctn::after {
    clear: both;
    content: "";
    display: block;
  }
  .column1 {
    background-color: #f8f8f8;
    border-right: 1px solid #e5e5e5;
    float: left;
    width: 80px;
    white-space: normal;
    height: 794px;
    ul {
      flex-direction: column;
      background-color: #f8f8f8;
      width: 80px;
      white-space: normal;
      li {
        background-color: #f8f8f8;
        // width: 80px;
        height: auto !important;
        white-space: normal;
        word-break: break-all;
        font-size: 12px;
        border-bottom: 1px solid #e5e5e5;
        padding: 10px 5px;
        div {
          overflow: inherit !important;
          height: auto !important;
        }
        &:first-child {
          // border-bottom: 1px solid #e5e5e5;
          background-color: #fff;
          border-left: 2px solid #ff4873;
          font-weight: 700;
          color: #333;
        }
      }
    }
  }
  .group-list {
    padding-left: 10px;
    width: calc(100% - 80px);
    float: left;
    background: #fff;
    .group-box {
      .goods-item__wrapper {
        width: 100%;
        height: 85px;
        position: relative;
        .img-square {
          float: left;
          img {
            width: 80px;
            height: 80px;
            border-radius: 10px;
          }
        }
        .item-content {
          float: left;
          padding-left: 5px;
          h3 {
            margin: 0;
            height: 24px;
          }
          .purchased {
            margin-top: 5px;
          }
          .sub-title {
            margin-top: 5px;
            color: #999999;
          }
          .price {
            color: #ff4873;
            font-size: 14px;
            margin-top: 20px;
            display: inline-block;
          }
          .buy-icon1 {
            width: 20px;
            position: absolute;
            right: 10px;
            bottom: 10px;
          }
        }
      }
      &::after {
        clear: both;
      }
    }
  }
  .group-title {
    // height: 35px;
    // line-height: 35px;
    word-break: break-all;
    padding: 8px 5px !important;
    background: #fff;
    margin-bottom: 5px;
  }
  .card_right_price_integral,
  .card_right_price_original {
    color: #ff1f19;
    font-size: 16px !important;
    display: inline-block;
    .Identification {
      font-size: 12px !important;
    }
    .prices {
      font-weight: bold;
      font-size: 15px;
    }
    .point_prices {
      font-size: 12px !important;
    }
  }
  .card_right_price_original {
    color: #999;
    text-decoration: line-through;
  }
  .purchased {
    font-size: 12px;
    font-weight: 400;
    color: #bbbdc0;
    margin-top: 10px;
    margin-left: 2px;
  }
  .goods-item__wrapper {
    border-top-left-radius: 10px;
    border-top-right-radius: 10px;
  }
  .item-content {
    border-bottom-left-radius: 10px;
    border-bottom-right-radius: 10px;
  }
  .tabStyle3 {
    display: flex;
    justify-content: space-between;
    align-items: center;
    border-bottom: 1px solid #efefef;
    // padding-left: 5px;
    // padding-right: 7px;
    ul {
      border-bottom: none;
      width: auto;
      flex: 1;
      display: flex;
      justify-content: space-around;
      li {
        border-bottom: none;
        position: relative;
        max-width: 24%;
        &:first-of-type {
          color: red;
          &::after {
            content: "";
            display: block;
            position: absolute;
            width: 90%;
            bottom: -1px;
            left: 50%;
            transform: translateX(-50%);
            height: 2px;
            background: linear-gradient(
              90deg,
              rgba(255, 6, 65, 1),
              rgba(254, 114, 100, 1)
            );
            border-radius: 3px;
          }
        }
        div {
          line-height: 44px;
        }
      }
    }
    .more {
      height: 44px;
      line-height: 44px;
      font-size: 9px;
      background: #fff;
      padding-right: 10px;
    }
  }
  .tabStyle {
    display: flex;
    width: 100%;
    justify-content: space-between;
    align-items: center;
    border-bottom: 1px solid rgba(254, 101, 104, 1);
    .goods {
      display: flex;
      align-items: center;
      justify-content: center;
      .item-goods {
        width: (168 * 318/750 + px);
        height: (78 * 318/750 + px);
        line-height: (78 * 318/750 + px);
        background: #efefef;
        color: #666;
        font-size: (26 * 318/750 + px);
        text-align: center;
        margin-right: (5 * 318/750 + px);
        border-radius: (18 * 318/750 + px) (18 * 318/750 + px) 0px 0px;
        &:first-of-type {
          background: linear-gradient(
            90deg,
            rgba(255, 72, 115, 1),
            rgba(254, 114, 100, 1)
          );
          color: #fff;
        }
      }
    }
    .more {
      font-size: (22 * 318/750 + px);
      color: #ff4e71;
      padding-right: (20 * 318/750 + px);
    }
  }
  // 修改页面
  .listStyle {
    .u-tabs {
      border-radius: (16 * 318/750 + px) (16 * 318/750 + px) 0 0;
    }
    .goods-list {
      padding: 0;
      border-radius: 0 0 (16 * 318/750 + px) (16 * 318/750 + px);
      overflow: hidden;
      .detail-list {
        margin-bottom: 0;
        border-bottom: 1px solid #efefef;
      }
      .goods-item-box {
        padding: (30 * 318/750 + px);
      }
    }
  }
</style>
