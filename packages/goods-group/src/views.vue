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
        <good-item
          :config="config"
          :list="list"
          :listType="2"
        ></good-item>
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
        if (index > 0 || this.config.templateId == 2) {
          return "";
        }
        let str = "";
        if (this.config.style === 1) {
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
  .goods-item__wrapper {
    border-top-left-radius: 10px;
    border-top-right-radius: 10px;
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

      .goods-item-box {
        padding: (30 * 318/750 + px);
      }
    }
  }
</style>
