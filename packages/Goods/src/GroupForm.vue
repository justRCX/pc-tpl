<template>
  <el-dialog
    title="商品分组"
    :visible.sync="visibleInside"
    :center="true"
    append-to-body
    :modal-append-to-body="false"
  >
    <div class="modal-header">
      <el-button @click="routeGo('home/Goods/GoodsGroup')">分组管理</el-button>
      <el-button @click="refresh">刷新</el-button>
      <el-input
        style="float:right;
                width:200px;"
        placeholder="搜索"
        @keyup.enter.native="search"
        v-model="item_keywords"
      >
        <i
          slot="prefix"
          class="el-input__icon el-icon-search"
        ></i>
      </el-input>
    </div>
    <div>
      <div v-loading="ajaxing">
        <div class='dialogHeader'>
          <div class="dialogHeader_name">分组名称</div>
          <div class="dialogHeader_name">分组类型</div>
          <div class="dialogHeader_num">商品数量</div>
          <div class="dialogHeader_time">创建时间</div>
        </div>
        <el-radio-group
          v-model="chooseIndex"
          style="width:100%"
          @change="handleChange"
        >
          <el-radio
            v-for="(item,index) in list"
            :key="index"
            :label="index"
            style="width:100%;border-top:1px solid #E5E5E5;padding:20px 0;margin-left: 0;display: flex;align-items: center;"
          >
            <span style="width: 100%;display: flex;">
              <span class="dialogHeader_name">{{item.group_title}}</span>
              <span class="dialogHeader_name">{{item._group_type}}</span>
              <span class="dialogHeader_num">{{item.item_count}}</span>
              <span class="dialogHeader_time">{{item.create_time}}</span>
            </span>
          </el-radio>
        </el-radio-group>
      </div>
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
      <el-button @click="visibleInside = false">取 消</el-button>
      <el-button
        type="primary"
        @click="confirm"
      >确 定</el-button>
    </div>
  </el-dialog>
</template>

<script>
  // 商品分组选择弹窗
  import Vue from "vue";
  export default {
    name: "goodsAddForm",
    data() {
      return {
        visibleInside: false,
        ajaxing: false,
        item_keywords: "",
        list: [],
        page_info: {
          page: 1,
          total: 0,
          page_size: 10
        },
        choose: [],
        chooseIndex: ""
      };
    },
    methods: {
      routeGo(url) {
        let routeData = this.$router.resolve({
          name: "GoodsGroup"
        });
        window.open(routeData.href, "_blank");
      },
      refresh() {
        this.item_keywords = "";
        this.search();
      },
      search() {
        this.chooseIndex = "";
        this.page_info.page = 1;
        this.getList();
      },
      getList() {
        if (this.ajaxing) {
          return;
        }
        this.ajaxing = true;
        let params = {
          act: "group",
          group_type: this.type == 1 ? "" : "-1",
          status: 1,
          page_size: this.page_info.page_size,
          group_title: this.item_keywords,
          page: this.page_info.page
        }
        if (this.$pcTpl.from) {
          params = {
            sid: localStorage.getItem("sid"),
            status: 1,
            group_type: "-1",
            page_size: this.page_info.page_size,
            group_title: this.item_keywords,
            page: this.page_info.page
          }
        }
        this.$pcTpl.axios({
          url: this.$pcTpl.from ? '/Group/index' : '/Item/index',
          method: 'post',
          data: params
        }).then(res => {
          this.ajaxing = false;
          this.list = res.data.data;
          this.page_info = res.data.page_info;
        });
      },
      changeList(page) {
        this.chooseIndex = "";
        this.page_info.page = page;
        this.getList();
      },
      // handleChange(currentRow) {
      //   this.choose = currentRow;
      // },
      handleChange(data) {
        this.choose = this.list[this.chooseIndex];
      },
      confirm() {
        if (this.choose.length == 0) {
          this.$message.warning("请选择分组");
        } else {
          this.visibleInside = false;
          this.$emit("confirm", this.choose);
        }
      }
    },
    props: ["visible", "type"],
    watch: {
      visibleInside: function (val) {
        if (this.visible !== val) {
          this.$emit("update:visible", val);
        }
      },
      visible: function (val) {
        this.visibleInside = val;
        if (val) {
          this.getList();
        }
      }
    }
  };
</script>
<style lang="scss" scoped>
  .dialogHeader {
    display: flex !important;
  }
  .dialogHeader_name,
  .dialogHeader_num,
  .dialogHeader_time {
    width: 30%;
    margin: 0 10px;
    display: flex;
    align-items: center;
  }
  .dialogHeader_name {
    box-sizing: border-box;
    white-space: normal;
    word-break: break-all;
    line-height: 23px;
  }
  .el-radio-group {
    /deep/ .el-radio__label {
      width: 100% !important;
      display: flex;
      align-items: center;
    }
  }
</style>
