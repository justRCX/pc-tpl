<template>
  <el-dialog
    :title="title"
    @closed="handleClosed"
    :visible.sync="visible"
  >
    <div class="modal-header">
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
        style="float:right;
                width:200px;"
        v-model="item_keywords"
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
    <el-table
      :data="list"
      v-loading="ajaxing"
      @selection-change="handleSelectionChange"
      @select="handleSelect"
      @select-all="handleSelectAll"
      ref="table"
      row-key="item_id"
    >
      <el-table-column
        type="selection"
        width="55"
        reserve-selection
      >
      </el-table-column>
      <el-table-column label="标题">
        <template slot-scope="scope">
          <div class="goods-info-box">
            <img
              :src="scope.row.thumb_image_path"
              style="width:50px;height:50px"
            />
            <span class="goods-name">{{scope.row.item_title}}
            </span>
          </div>
        </template>
      </el-table-column>
      <el-table-column
        prop="create_time"
        label="创建时间"
        v-if="list[0] && list[0].create_time"
      ></el-table-column>
    </el-table>
    <el-pagination
      style="float: right;"
      :small="true"
      class="pull-left"
      @current-change="changeList"
      :current-page="page_info.page"
      :page-size="page_info.page_size"
      layout="total,  prev, pager, next, jumper"
      :total="page_info.total"
    >
    </el-pagination>
    <div
      slot="footer"
      class="dialog-footer"
    >
      <el-button @click="handleCancel">取 消</el-button>
      <el-button
        type="primary"
        @click="handleConfirm"
      >确 定</el-button>

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
        title: '已上架商品',
        activeName: '',
        visible: false,
        list: [],
        ajaxing: false,
        page_info: {
          total: 0,
          page: 1,
          page_size: 5
        },
        item_keywords: '',
        // 要发送给后台的额外数据
        sendOtherData: {
        },
        // 默认选中项
        defaultNum: '',
        // 当前选中的list
        chooseList: [],
        // 回显list
        cacheList: [],
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
            item_keywords: this.item_keywords,
            type: this.activeName,
            ...this.sendOtherData,
          }
        }).then(res => {
          let list = res.data.data
          this.ajaxing = false;
          this.list = list;
          this.page_info = res.data.page_info;
          this.$nextTick(() => {
            this.list.forEach(row => {
              let finexIndex = this.cacheList.findIndex(item => item.item_id == row.item_id)
              if (finexIndex >= 0) {
                this.$refs.table.toggleRowSelection(row, true)
              }
            })
          })
        }).catch(err => {
          this.ajaxing = false;
        });
      },
      changeList(page) {
        this.page_info.page = page;
        this.getList();
      },
      handleSelect(selection, row) {
        // 将勾选值去掉的时候 也要去掉cache的勾选值
        let find = selection.findIndex(item => item.item_id == row.item_id);
        if (find < 0) {
          let cacheIndex = this.cacheList.findIndex(item => item.item_id == row.item_id)
          if (cacheIndex >= 0) {
            this.cacheList.splice(cacheIndex, 1)
          }
        }
      },
      handleSelectAll(selection) {
        // 将勾选值去掉的时候 也要去掉cache的勾选值
        let isCurrentPageClear = selection.find(item => this.list.find(listItem => item.item_id == listItem.item_id))
        if (!isCurrentPageClear) {
          this.list.forEach(row => {
            let cacheIndex = this.cacheList.findIndex(item => item.item_id == row.item_id)
            if (cacheIndex >= 0) {
              this.cacheList.splice(cacheIndex, 1)
            }
          })
        }
      },
      handleSelectionChange(e) {
        this.chooseList = e;
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
        let endList = [...this.chooseList, ...this.cacheList];
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
      this.getList()
    },
  }
  export default goodsOnShelves;
  export const goodsOnShelvesInstance = new myDialog(goodsOnShelves)

</script>

<style scoped lang='scss'>
  .goods-info-box {
    display: flex;
    align-items: center;
    justify-items: center;
    img {
      float: none;
    }
  }
  .goods-name {
    color: #38f;
    text-indent: 10px;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
</style>