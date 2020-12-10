<template>
  <el-form
    label-width="120px"
    style="text-align:left;"
  >
    <slot></slot>
    <el-form-item label="列表样式： ">
      <el-radio
        v-for="item in listTypes"
        :key="item.key"
        v-model="config.listType"
        :label="item.key"
      >{{item.name}}</el-radio>
    </el-form-item>
    <div class="badge-wrap">
      <el-form-item label="商品角标： ">
        <el-radio
          v-for="item in badgeList"
          :key="item.key"
          v-model="config.badge_id"
          :label="item.key"
          @change="onchange_getBadgeImg(item)"
        >{{item.name}}</el-radio>
        <div v-if="config.badge_id == 5">
          <c-img
            v-model="config.badge_path"
            :number="1"
          ></c-img>
          建议上传宽度104px的png图片，高度等比例缩放
        </div>
      </el-form-item>
    </div>
    <el-form-item label="加购物车样式： ">
      <el-radio
        v-for="item in cartList"
        :key="item.key"
        v-model="config.cart"
        :label="item.key"
      >{{item.name}}</el-radio>
    </el-form-item>
    <el-form-item label="快捷进入分类： ">
      <el-radio
        v-for="item in booleanOption"
        :key="item.key"
        v-model="config.isShowCate"
        :label="item.key"
      >{{item.name}}</el-radio>
    </el-form-item>
    <el-form-item v-if="config.listType == 1" label="购买记录： " >
      <el-radio
        v-for="item in booleanOption"
        :key="item.key"
        v-model="config.isShowBuyHis"
        :label="item.key"
      >{{item.name}}</el-radio>
    </el-form-item>
  </el-form>
</template>

<script>
  import CImg from '../../img-upload/c-img'

  export default {
    name: 'edit-panel',
    props: ['config'],
    model: {
      prop: 'config',
      event: 'change'
    },
    data() {
      return {
        booleanOption: [
          {
            key: 1,
            name: '显示'
          },
          {
            key: 0,
            name: '隐藏'
          },
        ],

        cartList: [
          {
            key: 1,
            name: '购物车图标',
            image_path: ''
          },
          {
            key: 2,
            name: '加号'
          },
        ],
        badgeList: [
          {
            key: 0,
            name: '无',
            image_path: ''
          },
          {
            key: 1,
            name: '新品',
            image_path: 'https://img.qianhuituan.cn/uploads/images/202006/29/FBytqwCIMbjv0QUCmdBdhw2BlTNoKWkNFaJgVwKm.png'
          },
          {
            key: 2,
            name: '热卖',
            image_path: 'https://img.qianhuituan.cn/uploads/images/202006/29/Wo5VRQd3oyk69owjeOlslkKwoq1MJhwXYlnaoZJ9.png'
          },
          {
            key: 3,
            name: 'NEW',
            image_path: 'https://img.qianhuituan.cn/uploads/images/202006/29/tVLDvUsNw1B5wo7J15wmoTjsYPXkK4ikCFavhynv.png'
          },
          {
            key: 4,
            name: 'HOT',
            image_path: 'https://img.qianhuituan.cn/uploads/images/202006/29/tVLDvUsNw1B5wo7J15wmoTjsYPXkK4ikCFavhynv.png'
          },
          {
            key: 5,
            name: '自定义上传',
            image_path: ''
          },
        ],
        listTypes: [
          {
            key: 1,
            name: '详细列表'
          },
          {
            key: 2,
            name: '大图'
          },
          {
            key: 3,
            name: '一行两个'
          },
          {
            key: 4,
            name: '一行三个'
          },
          {
            key: 5,
            name: '横向滑动'
          },
        ],
      }
    },
    methods: {
      onchange_getBadgeImg($item) {
        this.config.badge_path = $item.image_path;
      },
    },
  }
</script>

<style scoped lang='scss'>
</style>
