<template>
  <div
    class="opera flexBetween"
    :class="size"
  >
    <div class="sub flexCenter">
      <i class="iconfont icon-sub"></i>
    </div>
    <div class="num">3</div>
    <div class="add">
      <i class="iconfont icon-add1"></i>
    </div>
  </div>
</template>

<script>
  export default {
    props: ['size'],
    name: 'plus',
  }
</script>

<style scoped lang='scss'>
  @import "../../util.scss";
  .opera {
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: to320(66 * 2);
    line-height: to320(46);
    height: to320(46);
    color: #333333;
    font-size: to320(28);
  }
  .sub {
    height: to320(46);
    line-height: to320(46);
    width: to320(46);
    text-align: center;
    color: #fff;
    border-radius: 50%;
    display: block;
    border: 1px #ff1947 solid;
    font-size: to320(24);
    color: #ff1947;
  }
  .add {
    background: #ff1947;
    height: to320(46);
    line-height: to320(46);
    width: to320(46);
    text-align: center;
    color: #fff;
    border-radius: 50%;
    display: block;
  }
  .large {
    &.opera {
      width: 90px;
      height: auto;
    }
    .num {
      font-size: 14px;
    }
    .add,
    .sub {
      width: 28px;
      height: 28px;
      line-height: 28px;
    }
  }
</style>