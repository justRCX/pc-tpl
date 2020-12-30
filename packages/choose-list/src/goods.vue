<template>
  <el-dialog
    :title="title"
    @closed="handleClosed"
    :visible.sync="visible"
    width="60%"
  >
    <div class="btns">
      <el-button
        @click="routerTo('GoodsManageAdd')"
        v-if="api.indexOf('receiveItemListWithSku')<0"
      >新建</el-button>
      <el-button
        @click="routerTo('GoodsManage')"
        v-if="api.indexOf('receiveItemListWithSku')<0"
      >草稿管理</el-button>
      <el-button
        @click="refresh"
        v-if="api.indexOf('receiveItemListWithSku')<0"
      >刷新</el-button>
      <el-input
        placeholder="搜索"
        style="float:right;width:200px;"
        v-model="form.item_keywords"
      >
        <el-button
          slot="append"
          icon="el-icon-search"
          @click="refresh"
        ></el-button>
      </el-input>
    </div>
    <el-tabs
      v-model="activeName"
      @tab-click="handleClick"
      v-if="$pcTpl.from"
    >
      <el-tab-pane
        label="商品"
        name=""
      >商品</el-tab-pane>
      <el-tab-pane
        label="门店"
        name="Store"
      >门店</el-tab-pane>
    </el-tabs>
    <div class="list-wapper">
      <div
        v-for="(item,index) in list"
        :key="index"
        class="list-item"
        :class="{'list-item--checked': item.checked}"
      >
        <el-checkbox
          v-model="item.checked"
          :disabled="chooseList.length>=defaultNum && !item.checked && defaultNum>0 || item.disabled || item.sale_status == 3"
          @change="handleSelect($event,item)"
        >
          <div class="list-item-content">
            <img
              :src="item.thumb_image_path"
              style="width:50px;height:50px"
              class="list-item-content__img"
            />
            <div class="list-item-content-word">
              <p class="g-ellipsis-2">{{item.item_title}}</p>
              <p>价格：<span class="__color">{{item.current_price}}</span></p>
            </div>
          </div>
        </el-checkbox>
      </div>
    </div>
    <div
      v-if="list.length==0"
      class="full-wapper"
    >
      暂无数据
    </div>
    <div
      slot="footer"
      class="dialog-footer"
    >
      <el-pagination
        :small="true"
        class="pull-left"
        @current-change="changeList"
        :current-page="page_info.page"
        :page-size="page_info.page_size"
        layout="total,  prev, pager, next, jumper"
        :total="page_info.total"
      >
      </el-pagination>
      <div>
        <el-button @click="handleCancel">取 消</el-button>
        <el-button
          type="primary"
          @click="handleConfirm"
        >确 定</el-button>
      </div>
    </div>
  </el-dialog>
</template>

<script>
  import myDialog from '../../utils/popup'

  let goodsOnShelves = {
    name: 'goodsOnShelves',
    components: {},
    filters: {},
    directives: {},
    mixins: [],
    model: [],

    data() {
      return {
        title: '选择商品',
        activeName: '',
        visible: false,
        list: [],
        ajaxing: false,
        page_info: {
          total: 0,
          page: 1,
          page_size: 5
        },
        form: {
          item_keywords: '',
        },
        // 要发送给后台的额外数据
        sendOtherData: {
        },
        // 默认选中项
        defaultNum: '',
        // 当前选中的list
        chooseList: [],
        // 回显list
        cacheList: [],
        // 禁选list[id1,id2,id3....]
        disableList: [],
        // 接口
        api: '/Item/shelfItemList'
      }
    },
    methods: {
      handleClick() {
        this.page_info.page = 1;
        this.getList();
      },
      refresh() {
        this.page_info.page = 1;
        this.getList();
      },
      getList() {
        if (this.ajaxing) {
          return;
        }
        this.ajaxing = true;
        this.$pcTpl.axios({
          url: this.api,
          method: 'post',
          data: {
            page_size: this.page_info.page_size,
            page: this.page_info.page,
            item_keywords: this.form.item_keywords,
            type: this.activeName,
            ...this.sendOtherData,
          }
        }).then(res => {
          let list = res.data.data
          this.list = list;
          this.page_info = res.data.page_info;
          this.$nextTick(() => {
            this.list.forEach(row => {
              this.$set(row, 'checked', false)
              let finexIndex = this.chooseList.findIndex(item => item.item_id == row.item_id)
              if (finexIndex >= 0) {
                row.checked = true;
              }
              let disableIndex = this.disableList.findIndex(item => item == row.item_id)
              if (disableIndex >= 0) {
                this.$set(row, 'disabled', true)
              }
            })
            this.ajaxing = false;
          })
        }).catch(err => {
          this.ajaxing = false;
        });
      },
      changeList(page) {
        this.page_info.page = page;
        this.getList();
      },
      handleSelect($event, row) {
        if ($event) {
          this.chooseList.push(row)
        } else {
          let finexIndex = this.chooseList.findIndex(item => item.item_id == row.item_id)
          this.chooseList.splice(finexIndex, 1)
        }
      },
      handleConfirm() {
        if (this.chooseList.length == 0) {
          this.$message.warning('请选择商品')
          return
        }
        if (this.defaultNum * 1 > 0 && this.chooseList.length > this.defaultNum) {
          this.$message.error(`当前仅可选择${this.defaultNum}件商品`)
          return
        }
        // 去重
        let endList = this.chooseList;
        let endIds = endList.map(item => item.item_id);
        let idsList = Array.from(new Set(endIds))
        let lists = idsList.map(id => {
          return endList.find(item => item.item_id == id)
        }).filter(item => item)
        this.$emit('sure', lists)
      },
      handleClosed() {
        this.$emit('destory')
      },
      handleCancel() {
        this.$emit('cancel')
      },
      routerTo(url) {
        this.$router.push({ name: url })
      }
    },
    mounted() {
      this.chooseList = JSON.parse(JSON.stringify(this.cacheList));
      this.getList();
    },
  }
  export default goodsOnShelves;
  export const goodsOnShelvesInstance = new myDialog(goodsOnShelves)

</script>

<style scoped lang='scss'>
  .btns {
    padding: 0 5px 10px;
  }
  .__color {
    color: #ff5e52;
  }
  .dialog-footer {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  .list-wapper {
    display: flex;
    flex-wrap: wrap;
    .list-item {
      cursor: pointer;
      box-sizing: border-box;
      padding: 20px 10px;
      margin: 0 5px 10px;
      width: calc(calc(100% / 3) - 10px);
      height: 100px;
      overflow: hidden;
      border: 1px solid #eee;
      position: relative;
      display: flex;
      align-items: center;
      &--checked {
        background-color: rgba(144, 147, 153, 0.1);
      }
      &-content {
        display: flex;
        justify-content: space-between;
        font-size: 14px;
        padding-left: 10px;
        width: 200px;
        &__img {
          width: 60px;
          height: 60px;
        }
        &-word {
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          padding-left: 10px;
          width: 140px;
        }
      }
    }
  }
  .full-wapper {
    height: 70px;
    text-align: center;
    line-height: 70px;
    border: 1px solid #eee;
  }
  /deep/.el-checkbox {
    display: flex;
    align-items: center;
  }
</style>