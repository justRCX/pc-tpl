<template>
  <el-dialog
    title="预览"
    @closed="handleClosed"
    :visible.sync="visible"
    width="500px"
  >
    <img
      :src="src"
      alt=""
    >
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

  let preview = {
    name: 'cPreview',
    data() {
      return {
        src: '',
        visible: false,
      }
    },
    methods: {
      handleConfirm() {
        this.$emit('sure')
      },
      handleClosed() {
        this.$emit('destory')
      },
      handleCancel() {
        this.$emit('cancel')
      },

    },
    mounted() {
    },
  }
  export default preview;
  export const imgPreview = new myDialog(preview)

</script>

<style scoped lang='scss'>
  img {
    width: 100%;
    display: block;
    margin: 0 auto;
  }
</style>