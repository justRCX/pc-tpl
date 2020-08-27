<template>
  <div>
    <slot></slot>
    <div class="__flex">
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
  export default {
    name: 'cPager',
    data() {
      return {
      }
    },
    computed: {},
    props: ['total', 'pageSize', 'currentPage'],
    methods: {
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