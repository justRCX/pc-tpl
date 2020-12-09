<template>
  <div class="opera flexBetween">
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
    name: 'xxx',
    components: {},
    filters: {},
    directives: {},
    mixins: [],
    model: [],
    data() {
      return {
      }
    },
    computed: {},
    props: {},
    watch: {},
    beforeRouteEnter(to, from, next) { },
    beforeRouteUpdate(to, from, next) { },
    beforeRouteLeave(to, from, next) { },
    beforeCreate() { },
    created() { },
    beforeMount() { },
    mounted() { },
    beforeUpdate() { },
    updated() { },
    beforeDestroy() { },
    destroyed() { },
    activated() { },
    deactivated() { },
    errorCaptured() { },
    methods: {}
  }
</script>

<style scoped lang='scss'>
  .opera {
    display: flex;
    justify-content: space-between;
    width: 66px;
    line-height: 23px;
    height: 23px;
    color: #333333;
    font-size: 14px;
  }
  .sub {
    height: 23px;
    line-height: 23px;
    width: 23px;
    text-align: center;
    color: #fff;
    border-radius: 50%;
    display: block;
    border: 1px #ff1947 solid;
    font-size: 12px;
    color: #ff1947;
  }
  .add {
    background: #ff1947;
    height: 23px;
    line-height: 23px;
    width: 23px;
    text-align: center;
    color: #fff;
    border-radius: 50%;
    display: block;
  }
</style>