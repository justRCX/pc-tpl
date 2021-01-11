<template>
  <div>
    <Tpl1
      v-if="tplId==2"
      :uid="uid"
      :title="title"
      v-bind="$attrs"
    ></Tpl1>
    <Tpl2
      :uid="uid"
      :title="title"
      v-if="tplId==3"
      v-bind="$attrs"
    ></Tpl2>
    <Tpl3
      :uid="uid"
      :title="title"
      v-if="tplId==1"
      v-bind="$attrs"
    ></Tpl3>
    <Tpl4
      :uid="uid"
      :title="title"
      v-if="tplId==4"
      v-bind="$attrs"
    ></Tpl4>
  </div>
</template>
<script>
  import Tpl1 from './components/Tpl1.vue'
  import Tpl2 from './components/Tpl2.vue'
  import Tpl3 from './components/Tpl3.vue'
  import Tpl4 from './components/Tpl4.vue'
  export default {
    name: "CScreen",
    data() {
      return {
        tplId: "",
        title: "",  //标题
        uid: ""    //店铺id
      }
    },
    mounted() {
      this.setHtmlFontSize()
      this.tplId = this.$route.query.tplId;
      this.title = this.$route.query.title.length > 0 ? this.$route.query.title : '标题';
      this.uid = this.$route.query.uid;
      this.init()
    },
    components: {
      Tpl1,
      Tpl2,
      Tpl3,
      Tpl4
    },
    beforeDestroy() {
      window.removeEventListener('resize', this.setHtmlFontSize)
    },
    methods: {
      init() {
        window.addEventListener('resize', this.setHtmlFontSize)
      },
      setHtmlFontSize() {
        // 960是设计稿的宽度，当大于960时采用960宽度，比例也是除以9.6
        let deviceWidth = document.documentElement.clientWidth < 960 ? 960 : document.documentElement.clientWidth
        document.getElementsByTagName('html')[0].style.cssText = 'font-size:' + deviceWidth / 9.6 + 'px !important'
      }
    }
  }
</script>

<style>
</style>
