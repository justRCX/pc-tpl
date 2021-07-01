<template>
  <div>
    <div
      class="search"
      v-if="needSearch"
    >
      <slot name="search"></slot>
      <el-row :style="{paddingLeft:labelWidth+'px',marginTop:0}">
        <div class="__flex">
          <div class="__flex">
            <el-button
              type="primary"
              class="searchBtn"
              size="small"
              @click="hanldeSearch"
            >筛选</el-button>
            <el-button
              type="text"
              @click="handleClear"
            >清空筛选条件</el-button>
            <slot name="btn"> </slot>
          </div>
        </div>
        <div class="__right">
          <slot name="btn-right"></slot>
        </div>
      </el-row>
    </div>
    <slot name="table-before"></slot>
    <slot>
      <el-table
        v-bind="tableAttributes"
        v-loading="tableLoading"
        v-on="$listeners"
        ref="pager-table"
        :data="tableData"
      >
        <el-table-column
          type="selection"
          width="55"
          v-if="selection"
        ></el-table-column>
        <el-table-column
          v-for="(item,index) in tableColumn"
          :key="index"
          v-bind="item.attributes"
          :prop="item.prop"
          :label="item.label"
          :width="item.width"
        >
          <template slot-scope="scope">
            <table-column-render
              v-if="item.__render"
              :__render="item.__render"
              :row="scope.row"
              :index="scope.$index"
              :column="item"
            />
            <div v-else-if="item.slot">
              <slot
                :name="item.prop"
                :row="scope.row"
                :index="scope.$index"
              ></slot>
            </div>
            <span v-else>{{ scope.row[item.prop]  }}</span>
          </template>
        </el-table-column>
      </el-table>
    </slot>
    <div class="__flex __mt-10">
      <div>
        <slot name="left"></slot>
      </div>
      <div>
        <el-pagination
          :total="total"
          layout="total, prev, pager, next,jumper"
          :page-size="pageSize"
          :current-page="currentPage"
          @current-change="handleCurrentChange"
        >
        </el-pagination>
      </div>
    </div>
  </div>
</template>

<script>
  import tableColumnRender from './render'
  export default {
    name: 'cPager',
    data() {
      return {
      }
    },
    computed: {},
    components: { tableColumnRender },
    props: {
      total: {
        type: [Number, String],
        default: 0
      },
      pageSize: {
        type: [Number, String],
        default: 0
      },
      labelWidth: {
        type: [Number, String],
        default: 0
      },
      currentPage: {
        type: [Number, String],
        default: 0
      },
      needSearch: {
        type: Boolean,
        default: true
      },
      tableLoading: {
        type: Boolean,
        default: false
      },
      tableAttributes: {
        type: Object,
        default: () => { }
      },
      tableColumn: {
        type: Array,
        default: () => []
      },
      tableData: {
        type: Array,
        default: () => []
      },
      selection: {
        type: Boolean,
        default: false
      }
    },
    methods: {
      hanldeSearch() {
        this.$emit('search', { page: 1 })
      },
      handleClear() {
        this.$emit('clear', { page: 1 })
      },
      handleCurrentChange(val) {
        this.$emit('pageChange', val)
      }
    }
  }
</script>

<style scoped lang='scss'>
  .__flex {
    display: flex;
    align-items: center;
    justify-content: space-between;
  }
  .__mt-10 {
    margin-top: 10px;
  }
</style>