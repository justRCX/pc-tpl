<template>
  <el-dialog
    width="712px"
    title="我的图片"
    :visible.sync="visible"
    @closed="handleClosed"
  >
    <div class="modal-header">
      <el-button
        type="primary"
        @click="isAdd = true"
        size="small"
      >上传图片</el-button>
      <el-input
        style="float:right;
                width:200px;"
        placeholder="搜索"
        v-model="SearchFilter.name"
        size="small"
      >
        <i
          slot="prefix"
          class="el-input__icon el-icon-search"
        ></i>
      </el-input>
    </div>
    <p
      class="img-tips"
      v-if="tips"
    >{{tips}}</p>
    <div class="img-choose-ctn">
      <div class="sider-bar">
        <ul>
          <li
            :class="{'current': cId === item.image_group_id}"
            v-for="item in categoryList"
            :key="item.image_group_id"
            @click="chooseCategory(item.image_group_id)"
          >{{item.name}}</li>
        </ul>
      </div>
      <div
        class="imgs-ctn"
        v-loading="pageAjaxing"
      >
        <div v-if="imageList.length>0">
          <div
            class="img-item"
            v-for="item in imageList"
            :key="item.id"
            @click="chooseImg(item)"
          >
            <div
              v-show="activeList.includes(item.image_id)"
              class="active"
            >
              <i>{{activeList.indexOf(item.image_id) + 1}}</i>
            </div>
            <img
              :src="item.image_path"
              :alt="item.image_name"
            >
            <span class="img-meta">{{item.image_meta}}</span>
            <p class="img-title">{{item.image_name}}</p>
          </div>
        </div>
        <div
          class='noData'
          v-if="!imageList.length"
        >
          暂无数据，可点击左上角“上传图片”按钮添加
        </div>
      </div>
    </div>
    <div class="page-ctn">
      <el-pagination
        layout="total,  prev, pager, next, jumper"
        :small="true"
        class="pull-left"
        @current-change="changeList"
        :current-page="pageInfo.page"
        :page-size="pageInfo.page_size"
        :total="pageInfo.total"
      >
      </el-pagination>
    </div>
    <span
      slot="footer"
      class=" dialog-btn-center"
    >
      <el-button
        type="primary"
        @click="hanldeSure"
        size="small"
      >确 定</el-button>
    </span>
    <el-dialog
      :visible.sync="isAdd"
      title="上传图片"
      append-to-body
    >
      <el-form
        :model="dialog.upLoadImg"
        label-width="96px"
      >
        <el-form-item label="图片分组：">
          <el-select
            style="width:300px;"
            size="small"
            v-model="dialog.upLoadImg.image_group_id"
            placeholder="请选择分组"
          >
            <el-option
              v-for="item in categoryList"
              :key="item.image_group_id"
              :label="item.name"
              :value="item.image_group_id"
            >
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="网络图片：">
          <el-input
            style="width:300px;margin-right:20px;"
            v-model="dialog.upLoadImg.url"
            size="small"
          ></el-input>
          <el-button
            type="primary"
            size="small"
            @click="extractImg(dialog.upLoadImg)"
          >提取图片</el-button>
        </el-form-item>
        <el-form-item label="本地图片：">
          <span
            class="show-imgBox"
            v-for="(item,index) in dialog.upLoadImg.urlListShow"
            :key="index"
          >
            <i
              class="el-icon-circle-close delete"
              @click="deleteShowImg(index)"
            ></i>
            <img
              @click="showImgDialog(item.raw)"
              :src="common.getUrl(item.raw)"
              alt=""
            >
          </span>
          <el-upload
            ref="upload"
            class="avatar-uploader"
            action=""
            :file-list="dialog.upLoadImg.urlListShow"
            :http-request="saveImg"
            :multiple="true"
            :on-change="changeImgList"
            :auto-upload="false"
            :on-success="fileUploadSuccess"
            :show-file-list="false"
          >
            <i class="el-icon-plus avatar-uploader-icon"></i>
          </el-upload>
        </el-form-item>
      </el-form>
      <span
        slot="footer"
        class=" dialog-btn-center"
      >
        <el-button
          type="primary"
          @click="submitUpload"
        >上传</el-button>
      </span>
    </el-dialog>
  </el-dialog>
</template>

<script>
  import myDialog from "../utils/popup";
  let initMessage = function (res) {
    return {
      message: res.msg || '未知错误',
      type: res.status ? 'success' : 'error'
    }
  }
  const myImgDialogAgent = {
    name: "imageModalAgent",
    data() {
      return {
        isAdd: false,
        visible: false,
        ajaxing: false,
        pageAjaxing: false,
        key: "",
        cId: 0,
        activeList: [],
        chooseList: [],
        SearchFilter: {
          name: ""
        },
        pageInfo: {
          page: 1,
          pageSize: 10,
          total: 0
        },
        categoryList: [],
        imageList: [],
        dialog: {
          upLoadImg: {
            url: null,
            urlListShow: [],
            show: false,
            image_group_id: 0
          }
        },
        picMax: "",
        // 上传数量计数器
        uploadCount: 0,
        tips: ""
      };
    },
    mounted() {
      this.getList();
    },
    methods: {
      handleClosed() {
        this.$emit("destory");
      },
      changeImgList(file, fileList) {
        // 更改上传图片
        let isJPG = file.raw.type === "image/jpeg";
        let isPNG = file.raw.type === "image/png";
        let isLt2M = file.size / 1024 / 1024 < 2;
        if (!isJPG && !isPNG) {
          this.$message.error("上传头像图片只能是 JPG或png 格式!");
        }
        if (!isLt2M) {
          this.$message.error("上传头像图片大小不能超过 2MB!");
        }
        if ((isPNG || isJPG) && isLt2M) {
          this.dialog.upLoadImg.urlListShow = fileList;
        }
      },
      fileUploadSuccess(res, file, fileList) {
        // 每张图片上传成功操作
        // todo对单个文件上传进行操作（加载效果）
        this.uploadCount++;
        if (this.uploadCount === fileList.length) {
          // 全部上传成功
          this.uploadCount = 0;
          this.isAdd = false;
          this.dialog.upLoadImg.show = false;
          this.getImgList();
          this.$message({
            message: "上传图片成功",
            type: "success"
          });
          this.visible = false;
        }
      },
      saveImg(e) {
        // 保存图片
        let formData = new FormData();
        formData.append("image", e.file);
        formData.append(
          "image_group_id",
          this.dialog.upLoadImg.image_group_id.toString()
        );
        formData.append("sid", localStorage.getItem("sid"));
        this.$pcTpl.axios({
          url: '/Item/uploadImage',
          method: 'post',
          headers: {
            'Content-Type': 'multipart/form-data'
          },
          data: formData
        }).then(res => {
          console.log(res)
          this.ajaxing = false;
          this.$message({
            message: res.msg,
            type: res.status ? "success" : "error"
          });
          if (res.status == 1) {
            this.isAdd = false;
            this.dialog.upLoadImg.show = false;
            this.getImgList();
          }
        })
      },
      extractImg(obj) {
        // 提取图片
        let param = {
          sid: localStorage.getItem("sid"),
          image_group_id: obj.image_group_id,
          image_path: obj.url
        };
        this.$pcTpl.axios({
          url: '/Item/drawImage',
          method: 'post',
          data: param
        }).then(res => {
          console.log(res)
          this.$message(initMessage(res));
          if (res.status == 1) {
            this.isAdd = false;
            this.dialog.upLoadImg.show = false;
            this.getImgList();
          }
        });
      },
      deleteShowImg(index) {
        // 删除上传图片
        this.dialog.upLoadImg.urlListShow.splice(index, 1);
      },
      submitUpload() {
        const upload = this.$refs.upload;
        upload.submit();
      },
      getList() {
        const req = {
          sid: localStorage.getItem("sid"),
          act: "igroup"
        };
        this.$pcTpl.axios({
          url: '/Resource/index',
          method: 'post',
          data: req
        }).then(res => {
          if (res.status == 1) {
            this.categoryList = res.data;
            this.chooseCategory(
              this.cId ? this.cId : this.categoryList[0].image_group_id,
              true
            );
          } else {
            this.$message(initMessage(res));
          }
        });
      },
      changeList(page) {
        this.pageInfo.page = page;
        this.getImgList();
      },
      getImgList() {
        if (this.pageAjaxing) {
          return;
        }
        this.pageAjaxing = true;
        const req = {
          sid: localStorage.getItem("sid"),
          act: "image",
          image_group_id: this.cId ? this.cId : 0,
          ...this.pageInfo,
          ...this.SearchFilter
        };
        this.pageAjaxing = true;
        this.$pcTpl.axios({
          url: '/Resource/index',
          method: 'post',
          data: req
        }).then(res => {
          this.pageAjaxing = false;
          if (res.status == 1) {
            this.imageList = res.data.data;
            this.imageList.forEach((item, index) => {
              this.$set(item, "checked", false);
            });
            this.pageInfo = res.data.page_info;
          } else {
            this.$message(initMessage(res));
          }
        }).catch(err => {
          this.pageAjaxing = false;
        });
      },

      chooseCategory(id, force) {
        this.dialog.upLoadImg.image_group_id = id;
        if (id !== this.cId || force) {
          this.cId = id;
          this.getImgList();
        }
      },

      chooseImg(obj) {
        // 单选模式
        if (this.picMax === 1) {
          this.chooseList.splice(0, 1, obj);
          this.activeList.splice(0, 1, obj.image_id);
        } else {
          let index = this.activeList.indexOf(obj.image_id);
          if (index !== -1) {
            this.activeList.splice(index, 1);
            this.chooseList.splice(index, 1);
            // obj.index = '';
            // var _this = this;
            // this.imageList.forEach((item) => {
            //     if (item.index > _this.activeList.length) {
            //         item.index--;
            //     }
            // });
          } else {
            if (this.chooseList.length === this.picMax) {
              this.$message({
                message: `选取图片不能超过${this.picMax}张`,
                type: "error"
              });
            } else {
              this.chooseList.push(obj);
              this.activeList.push(obj.image_id);
              // obj.index = this.activeList.length;
            }
          }
        }
      },
      hanldeSure() {
        this.$emit("sure", this.chooseList);
      }
    }
  };
  export default myImgDialogAgent;
  export const myImgDialogAgentFun = new myDialog(myImgDialogAgent);
</script>

<style lang="scss" scoped>
  .img-tips {
    padding: 10px 0;
    text-align: center;
    color: #f44;
    background-color: #f2f2f2;
  }
  .img-choose-ctn {
    display: flex;
    min-height: 400px;
    width: 100%;
    color: #666;
    .sider-bar {
      height: 100%;
      width: 180px;
      text-align: left;
      background-color: #f2f2f2;
      margin-right: 15px;
      ul {
        list-style: none;
        text-align: left;
        li {
          text-align: left;
          height: 30px;
          font-size: 12px;
          color: #333;
          line-height: 30px;
          padding: 0 10px;
          cursor: pointer;
          .count {
            float: right;
            color: #b2b2b2;
          }
          &.current {
            background-color: #fff;
          }
        }
      }
    }
    .imgs-ctn {
      flex: 1;
      display: flex;
      flex-wrap: wrap;
      .img-item {
        position: relative;
        float: left;
        width: 105px;
        height: 105px;
        margin-right: 10px;
        margin-bottom: 30px;
        cursor: pointer;
        .active {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          border: 2px solid #07d;
          box-sizing: border-box;
          i {
            position: absolute;
            right: 0;
            top: 0;
            color: #fff;
            z-index: 2;
          }
          &::after {
            position: absolute;
            display: block;
            content: " ";
            right: 0;
            top: 0;
            border: 14px solid #07d;
            border-left-color: transparent;
            border-bottom-color: transparent;
            z-index: 1;
          }
        }
        img {
          max-width: 100%;
          max-height: 100%;
        }
        span.img-meta {
          position: absolute;
          width: 105px;
          height: 25px;
          font-size: 12px;
          line-height: 25px;
          color: #fff;
          text-align: center;
          background: rgba(0, 0, 0, 0.2);
          bottom: 0;
          left: 0;
        }
        p.img-title {
          position: absolute;
          bottom: -18px;
          left: 0;
          right: 0;
          margin-top: 5px;
          font-size: 12px;
          padding-bottom: 1px;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        }
        .img-box {
          background: #ccc;
          width: 105px;
          height: 105px;
          background-size: cover;
          background-position: 50% 50%;
        }
      }
    }
  }
</style>
