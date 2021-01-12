<template>
  <div
    class="limit-discount"
    :style="{background:config.bgColor || '#fff'}"
  >
    <div
      class="header"
      v-if="config.isShowHead"
    >
      <img
        v-if="config.isShowHeadIco"
        :src="config.isDefHeadIco == 1 ?  config.defIconUrl : config.headIconUrl"
        class="header-img"
      >
      <div
        class="header-title"
        v-if="config.isShowHeadName"
      >{{config.headName}}</div>
      <div
        class="header-time"
        v-if="config.isShowCD"
      >
        <div class="header-time-num">11</div>
        <div class="header-time-item">:</div>
        <div class="header-time-num">42</div>
        <div class="header-time-item">:</div>
        <div class="header-time-num">11</div>
      </div>
      <div
        class="header-more"
        v-if="config.isShowMore"
      >{{config.moreText}}</div>
    </div>
    <goods-item
      :listType="config.listType"
      :config="config"
      :list="list"
    ></goods-item>
  </div>
</template>

<script>
  import goodsItem from '../../good-style/Item'
  export default {
    name: "SaleShow",
    props: ["config"],
    data() {
      return {
        nowDate: new Date().getTime(),
      };
    },
    components: { goodsItem },
    filters: {

    },
    computed: {
      list() {
        let array = new Array(5).fill(1);
        return array.map(item => {
          let itemC = {
            item_id: 1,
            thumb_image_path: 'http://img.wkdao.com/image/65/2020/08/03/0aac7e6e9aaaeb10863cd82e67a771e0.png',
            current_price: "0.00",
            selling_point: "",
            item_title: "标题"
          }
          return itemC
        })
      }

    },
    methods: {

    }
  };
</script>

<style lang="scss" scoped>
  @import "../../util.scss";
  .limit-discount {
    background: #fff;
  }
  .header {
    display: flex;
    align-items: center;
    padding: 0 to320(20);
    height: to320(60);
    &-img {
      width: to320(5);
      height: to320(28);
      margin-right: to320(12);
      margin-top: to320(12);
    }
    &-title {
      min-width: to320(130);
      height: to320(28);
      font-size: to320(28);
      font-weight: bold;
      color: #333333;
      margin-right: to320(20);
    }
    &-more {
      width: to320(47);
      font-size: to320(24);
      font-weight: 400;
      color: #666666;
      flex: 1;
      min-width: to320(60);
      text-align: right;
    }
    &-time {
      display: flex;
      padding: to320(20) 0 to320(6) 0;
      &-num {
        min-width: to320(34);
        height: to320(34);
        line-height: to320(34);
        background: #333333;
        border-radius: to320(6);
        padding: 0 to320(4);
        color: #fff;
      }
      &-item {
        width: to320(16);
        text-align: center;
        font-size: to320(24);
        font-weight: 400;
        color: #333333;
      }
    }
  }
</style>
