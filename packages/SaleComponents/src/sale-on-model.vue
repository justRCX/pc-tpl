<template>
  <el-dialog
    :title="title[type]+'活动列表'"
    :visible.sync="visible"
    @closed="handleClosed"
    :center="true"
  >
    <div class="modal-header">
      <el-button @click="goAddPage">新建</el-button>
      <el-button @click="refresh">刷新</el-button>
      <el-input
        style="float:right;
                width:200px;"
        placeholder="搜索"
        @keyup.enter.native="refresh"
        v-model="item_keywords"
      >
        <i
          slot="prefix"
          class="el-input__icon el-icon-search"
        ></i>
      </el-input>
    </div>
    <div class="table-ctx">
      <el-table
        v-if="!isSingle"
        v-loading="ajaxing"
        ref="table"
        :data="list"
        tooltip-effect="dark"
        style="width: 100%"
        @selection-change="handleSelectionChange"
        :row-key="getRowKey"
      >
        <el-table-column
          type="selection"
          width="55"
          reserve-selection
        ></el-table-column>
        <el-table-column width="55">
          <template slot-scope="scope">
            <img
              style="width:50px;height:50px;"
              :src="scope.row.item[0]?scope.row.item[0].thumb_image_path:''"
              alt="商品图片"
            />
          </template>
        </el-table-column>
        <el-table-column
          label="标题"
          prop="title"
        ></el-table-column>
        <el-table-column
          label="活动时间"
          width="300"
        >
          <template slot-scope="scope">{{scope.row.create_time}} 至 {{scope.row.end_time}}</template>
        </el-table-column>
        <el-table-column
          prop="_status"
          label="活动状态"
          width="100"
        ></el-table-column>
      </el-table>
      <el-table
        v-if="isSingle"
        v-loading="ajaxing"
        ref="table"
        :data="list"
        tooltip-effect="dark"
        style="width: 100%"
        highlight-current-row
        @selection-change="handleSelectionChange"
        @select="handleSelect"
        @select-all="handleSelectAll"
        :row-key="getRowKeyItemId"
      >
        <el-table-column
          type="selection"
          width="55"
          reserve-selection
        >
        </el-table-column>
        <el-table-column width="55">
          <template slot-scope="scope">
            <img
              style="width:50px;height:50px;"
              :src="scope.row.thumb_image_path"
              alt="商品图片"
            />
          </template>
        </el-table-column>
        <el-table-column
          label="标题"
          prop="item_title"
        ></el-table-column>
        <el-table-column
          prop="create_time"
          label="创建时间"
          width="120"
        ></el-table-column>
      </el-table>
    </div>
    <div>
      <el-pagination
        style="float: right;"
        :small="true"
        class="pull-left"
        @current-change="changeList"
        :current-page="page_info.page"
        :page-size="page_info.page_size"
        layout="total,  prev, pager, next, jumper"
        :total="page_info.total"
      ></el-pagination>
    </div>
    <div
      slot="footer"
      class="modal-footer"
    >
      <el-button @click="handleCancel">取 消</el-button>
      <el-button
        type="primary"
        @click="handleConfirm"
      >确 定</el-button>
    </div>
  </el-dialog>
</template>

<script lang="ts">
  import myDialog from "../../utils/popup";
  // 商品选择弹窗
  // import SaleService from "@/api/marketing/saleComponents";
  let saleOnModel = {
    name: "SaleModel",
    data() {
      return {
        visible: false,
        ajaxing: false,
        item_keywords: "",
        list: [],
        page_info: {
          page: 1,
          total: 0,
          page_size: 10,
        },
        title: {
          33: "秒杀",
          34: "拼团",
          35: "砍价",
          43: "限时折扣",
          40: "限时购",
        },
        toolIds: {
          33: 1,
          34: 3,
          35: 4,
          43: 2,
          40: 0,
        },
        // 默认选中项
        defaultNum: "",
        // 当前选中的list
        choose: [],
        // 回显list
        cacheList: [],
      };
    },
    methods: {
      getRowKey(row) {
        return row.sale_id;
      },
      getRowKeyItemId(row) {
        return row.item_id;
      },
      goAddPage() {
        switch (this.type) {
          case 33:
            window.open("/#/home/marketing/SeckillDetail");
            break;
          case 34:
            window.open("/#/home/marketing/GrouponDetail");
            break;
          case 35:
            window.open("/#/home/marketing/BargainDetail");
            break;
          case 43:
            window.open("/#/home/marketing/Discount");
            break;
          case 40:
            window.open("/#/home/Goods/GoodsManageAdd");
            break;
        }
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
        let self = this;
        // let api;
        let params = {
            page_size: self.page_info.page_size,
            title: self.item_keywords,
            page: self.page_info.page,
            tool_id: self.toolIds[self.type],
            type: "",
          },
          api;
        if (this.type != 40) {
          api = "Marketing/getSaleList";
        } else {
          params.type = "Limited";
          api = "/Item/shelfItemList";
        }
        this.$pcTpl
          .axios({
            url: api,
            method: "post",
            data: params,
          })
          .then((res) => {
            if (res.status === 1) {
              this.ajaxing = false;
              this.list = res.data.data || [];
              this.page_info = res.data.page_info || this.page_info;
              this.$nextTick(() => {
                if (this.choose.length < 0) {
                  return;
                }
                this.list.forEach((row) => {
                  let finexIndex;
                  if (this.type != 40) {
                    finexIndex = this.cacheList.findIndex(
                      (item) => item.sale_id == row.sale_id
                    );
                  } else {
                    finexIndex = this.cacheList.findIndex(
                      (item) => item.item_id == row.item_id
                    );
                    row.shelf_time = this.formData(row.shelf_time);
                    row.shelf_off_time = this.formData(row.shelf_off_time);
                  }
                  if (finexIndex >= 0) {
                    this.$refs.table.toggleRowSelection(row, true);
                  }
                });
              });
            } else {
              this.$message({
                message: res.msg,
                type: "error",
              });
            }
          });
      },
      formData(data) {
        let time = new Date(data),
          y = time.getFullYear(),
          m = time.getMonth() + 1,
          d = time.getDate(),
          h = time.getHours(),
          mm = time.getMinutes(),
          s = time.getSeconds();
        return (
          y +
          "-" +
          this.add(m) +
          "-" +
          this.add(d) +
          " " +
          this.add(h) +
          ":" +
          this.add(mm) +
          ":" +
          this.add(s)
        );
      },
      add(m) {
        return m < 10 ? "0" + m : m;
      },
      changeList(page) {
        this.page_info.page = page;
        this.getList();
      },
      handleSelectionChange(e) {
        this.choose = e;
      },
      handleSelect(selection, row) {
        // 将勾选值去掉的时候 也要去掉cache的勾选值
        let find = selection.find((item) => item.sale_id == row.sale_id);
        if (!find) {
          let cacheIndex = this.cacheList.findIndex(
            (item) => item.sale_id == row.sale_id
          );
          if (cacheIndex >= 0) {
            this.cacheList.splice(cacheIndex, 1);
          }
        }
      },
      handleSelectAll(selection) {
        // 将勾选值去掉的时候 也要去掉cache的勾选值
        let isCurrentPageClear = selection.find((item) =>
          this.list.find((listItem) => item.sale_id == listItem.sale_id)
        );
        if (!isCurrentPageClear) {
          this.list.forEach((row) => {
            let cacheIndex = this.cacheList.findIndex(
              (item) => item.sale_id == row.sale_id
            );
            if (cacheIndex >= 0) {
              this.cacheList.splice(cacheIndex, 1);
            }
          });
        }
      },
      handleConfirm() {
        if (this.choose.length == 0) {
          this.$message.warning("请选择商品");
          return;
        }
        if (this.defaultNum * 1 > 0 && this.choose.length > this.defaultNum) {
          this.$message.error(`当前仅可选择${this.defaultNum}件商品`);
          return;
        }
        this.$emit("sure", this.choose);
      },
      handleClosed() {
        this.$emit("destory");
      },
      handleCancel() {
        this.$emit("cancel");
      },
    },
    mounted() {
      this.getList();
    },
  };
  export default saleOnModel;
  export const saleOnModelInstance = new myDialog(saleOnModel);
  // });
</script>
