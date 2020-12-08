<template>
  <el-dialog
    title="选择优惠券"
    :visible.sync="visible"
    @closed="handleClosed"
    size="small"
    lock-scroll
    width="800px"
  >
    <div>
      <el-row
        justify="space-between"
        type="flex"
        v-if="!$pcTpl.from"
      >
        <el-col
          :span="8"
          class="m-btn-box"
        >
          <router-link to="/home/marketing/coupon">
            <el-button
              type="primary"
              size="small"
            >优惠券管理</el-button>
          </router-link>
        </el-col>
      </el-row>
      <el-table
        sortable
        border
        stripe
        ref="multipleTable"
        v-loading="ajaxing"
        :data="packCouponList"
        size="small"
        :highlight-current-row="false"
        header-row-class-name="table-header"
        @selection-change="handleSelectionChange"
        empty-text="暂无数据"
        style="width: 100%"
      >
        <el-table-column
          type="selection"
          width="55"
        ></el-table-column>
        <el-table-column
          prop="title"
          label="优惠券名称"
          width="110"
        >
          <template slot-scope="scope">
            <p v-html="scope.row.title"></p>
          </template>
        </el-table-column>
        <el-table-column
          prop="scope_type"
          label="适用商品"
        >
          <template slot-scope="scope">
            <p v-html="scope.row.scope_type"></p>
          </template>
        </el-table-column>
        <el-table-column
          prop="quota"
          label="领取限制"
        >
          <template slot-scope="scope">
            <p v-html="scope.row.quota">不限张数</p>
          </template>
        </el-table-column>
        <el-table-column
          prop="description"
          label="使用说明"
        >
          <template slot-scope="scope">
            <span v-html="scope.row.description"></span>
          </template>
        </el-table-column>
        <el-table-column
          prop="surplus_count"
          label="剩余数量"
        >
          <template slot-scope="scope">
            <span v-html="scope.row.surplus_count"></span>
          </template>
        </el-table-column>
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
    </div>
    <div
      slot="footer"
      class="dialog-btn-center"
    >
      <el-button @click="handleClose">取 消</el-button>
      <el-button
        type="primary"
        @click="handleSure"
      >确 认</el-button>
    </div>
  </el-dialog>
</template>
<script>
  import myDialog from '../../utils/popup';

  const couponListChoose = {
    name: "couponListChoose",
    data() {
      return {
        visible: false,
        // 当前选中的条数
        multipleSelection: [],
        packCouponList: [],
        cacheList: [],// 回显的数据
        ajaxing: false,
        page_info: {
          total: 0,
          page: 1,
          page_size: 5
        },
      };
    },
    mounted() {
      this.getList()
    },
    methods: {
      handleClosed() {
        this.$emit('destory')
      },
      handleClose() {
        this.$emit('cancel')
      },
      handleSelectionChange(val) {
        this.multipleSelection = val;
      },
      changeList(page) {
        this.page_info.page = page;
        this.getList();
      },
      // 加载列表
      getList(coupon) {
        this.$pcTpl.axios({
          url: '/Marketing/couponList',
          method: 'post'
        }).then(res => {
          if (res.status === 1) {
            this.packCouponList = res.data;
            this.$nextTick(() => {
              this.packCouponList.forEach(row => {
                let finexIndex = this.cacheList.findIndex(item => item.coupon_id == row.coupon_id)
                if (finexIndex >= 0) {
                  this.$refs.multipleTable.toggleRowSelection(row, true)
                }
              })
            })
          } else {
            this.$message({
              message: res.msg,
              type: "error"
            });
          }
        });
      },
      handleSure() {
        this.$emit("sure", this.multipleSelection);
      },
    }
  };
  export default couponListChoose
  export const couponPop = new myDialog(couponListChoose);
</script>
<style lang="scss" scoped>
  .refresh-btn {
    color: #155bd4;
    cursor: pointer;
    padding-left: 10px;
    font-size: 14px;
  }
</style>