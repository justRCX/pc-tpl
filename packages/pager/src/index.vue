<template>
  <div>
    <div
      class="search"
      v-if="needSearch"
    >
      <slot name="search"></slot>
      <el-row :style="{paddingLeft:labelWidth+'px',marginTop:0}">
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
      </el-row>
    </div>
    <slot>
      <el-table
        v-bind="tableAttributes"
        v-loading="tableLoading"
        @select="emitSelectEvent"
        @select-all="emitSelectAllEvent"
        @select-change="emitSelectChangeEvent"
        @sort-change="emitSortChangeEvent"
        ref="pager-table"
      >
      </el-table>
    </slot>
    <div class="__flex">
      <div>
        <slot name="left"></slot>
      </div>
      <div>
        <el-pagination
          layout="prev, pager, next"
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
  export default {
    name: 'CPager',
    data() {
      return {
      }
    },
    computed: {},
    props: {
      total: {
        type: [Number, String],
        default: 0
      },
      pageSize: {
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
      }
    },
    methods: {
      emitSortChangeEvent(param) {
        this.$emit('sort-change', param)
      },
      emitSelectAllEvent(selection) {
        this.$emit('select-all', selection)
      },
      emitSelectChangeEvent(selection) {
        this.$emit('select-change', selection)
      },
      emitSelectEvent(selection, row) {
        this.$emit('select', selection, row)
      },
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
    margin-top: 10px;
  }
</style>