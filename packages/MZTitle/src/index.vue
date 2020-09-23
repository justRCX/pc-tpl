<template>
  <div class="mz-title">
    <title-show :config="config"></title-show>
    <el-card
      header="标题"
      class="edit-area"
      v-if="belongIndex === currentIndex"
    >
      <el-form
        style="text-align:left;"
        label-width="120px"
      >
        <el-form-item label="标题:">
          <el-input
            placeholder="点击编辑标题"
            v-model="config.title"
          ></el-input>
        </el-form-item>
        <el-form-item label="标题模版:">
          <el-radio-group v-model="config.templateId">
            <el-radio
              v-for="(item,index) in templateIds"
              :key="index"
              :label="item.label"
            >{{item.name}}</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item
          label="显示位置:"
          v-if="config.templateId ==1 || config.templateId ==2"
        >
          <el-radio
            v-model="config.align"
            label="left"
          >居左</el-radio>
          <el-radio
            v-model="config.align"
            label="center"
          >居中</el-radio>
          <el-radio
            v-model="config.align"
            label="right"
          >局右</el-radio>
        </el-form-item>
        <template v-if="config.templateId === 1">
          <el-form-item label="副标题:">
            <el-input v-model="config.subTitle"></el-input>
          </el-form-item>
          <el-form-item label="背景颜色:">
            <el-color-picker v-model="config.backgroundColor"></el-color-picker>
          </el-form-item>
          <div
            class="edit-box multi-line"
            v-show="config.hasNav"
          >
            <i
              class="el-icon-close close-btn"
              @click="handleDeleteNav"
            ></i>
            <div class="edit-item">
              <span class="edit-label">导航名称:</span>
              <el-input
                v-model="config.nav.name"
                style="width: 200px;"
                size="small"
              ></el-input>
            </div>
            <div class="edit-item">
              <span class="edit-label">链接:</span>
              <page-link-select
                :ref="'pageLinkSelect'"
                :selectValue="config.nav"
                @linkSelected="linkSelected"
              ></page-link-select>
            </div>
          </div>
          <div
            class="edit-box multi-line"
            v-if="!config.hasNav"
          >
            <div
              class="edit-item"
              @click="addNav"
            >
              <div
                class="edit-label"
                style="color:#38f"
              >
                <i class="iconfont icon-add1"></i>
              </div>
              <span class="active-span">添加一个文本导航</span>
            </div>
          </div>
        </template>
        <template v-if="config.templateId === 2">
          <el-form-item label="日期:">
            <el-date-picker
              v-model="config.wx.date"
              value-format="yyyy-MM-dd"
              type="date"
              format="yyyy-MM-dd"
              placeholder="选择日期"
            ></el-date-picker>
          </el-form-item>
          <el-form-item label="作者:">
            <el-input v-model="config.wx.author"></el-input>
          </el-form-item>
          <el-form-item label="链接标题:">
            <el-input v-model="config.wx.urlName"></el-input>
          </el-form-item>
          <el-form-item label="链接地址:">
            <div>
              <!-- 其他链接 -->
              <div class="edit-item">
                <page-link-select
                  :ref="'wxPageLinkSelect'"
                  :selectValue="config.wx"
                  @linkSelected="linkSelected"
                ></page-link-select>
              </div>
            </div>
          </el-form-item>
        </template>
        <template v-if="config.templateId === 3">
          <el-form-item label="副标题:">
            <el-input
              placeholder="点击编辑副标题"
              v-model="config.subTitle"
            ></el-input>
          </el-form-item>
          <el-form-item label="按钮文案:">
            <el-input
              placeholder="点击编辑按钮文案"
              v-model="config.personality.btnTitle"
            ></el-input>
          </el-form-item>
          <el-form-item label="logo显示:">
            <div class="img-box">
              <p
                class="change-img"
                @click="showChangeImgeModal"
                v-if="!config.personality.img"
              >添加logo</p>
              <i
                class="el-icon-close close-btn"
                @click="deleteImg"
                v-if="config.personality.img"
              ></i>
              <img
                :src="config.personality.img"
                alt="图片地址"
                v-if="config.personality.img"
              />
            </div>
            <P class="tips">推荐尺寸24*29</P>
          </el-form-item>
          <div class="line">
            <el-form-item label="标题颜色:">
              <el-color-picker v-model="config.personality.titleColor3"></el-color-picker>
            </el-form-item>
            <el-form-item label="标题加粗">
              <el-checkbox v-model="config.personality.blod">加粗</el-checkbox>
            </el-form-item>
            <el-form-item label="背景颜色:">
              <div class="line">
                <el-color-picker v-model="config.personality.backgroundColorLeft"></el-color-picker>
                &nbsp;-&nbsp;
                <el-color-picker v-model="config.personality.backgroundColorRight">
                </el-color-picker>
              </div>
            </el-form-item>
          </div>
          <div class="line">
            <el-form-item label="按钮文字:">
              <el-color-picker v-model="config.personality.wordColor3"></el-color-picker>
            </el-form-item>
            <el-form-item label="按钮背景:">
              <el-form-item label="标题颜色:">
                <el-color-picker v-model="config.personality.titleColor3"></el-color-picker>
              </el-form-item>
            </el-form-item>
          </div>
          <el-form-item label="左右间距:">
            <el-slider
              v-model="config.personality.lrMargin"
              :max="30"
              show-input
            ></el-slider>
          </el-form-item>
          <el-form-item label="链接地址:">
            <div>
              <div class="edit-item">
                <page-link-select
                  ref="moreUrl"
                  :selectValue="config.personality"
                  @linkSelected="data => linkSelected(data)"
                ></page-link-select>
              </div>
            </div>
          </el-form-item>
        </template>
        <template v-if="config.templateId === 4 || config.templateId === 5">
          <div class="line">
            <el-form-item label="背景颜色:">
              <el-color-picker
                v-model="config.backgroundColor"
                show-alpha
              ></el-color-picker>
            </el-form-item>
            <el-form-item label="标题颜色:">
              <el-color-picker v-model="config.slide.titleColor"></el-color-picker>
            </el-form-item>
            <el-form-item label="滑动标题颜色:">
              <el-color-picker v-model="config.slide.slideTitleColor"></el-color-picker>
            </el-form-item>
          </div>
          <el-form-item label="左右间距:">
            <el-slider
              v-model="config.slide.lrPadding"
              :max="30"
              show-input
            ></el-slider>
          </el-form-item>
          <el-form-item
            label="左右空白:"
            v-if="config.templateId === 4"
          >
            <el-slider
              v-model="config.lrBlank"
              :max="50"
              show-input
            ></el-slider>
          </el-form-item>
          <div
            class="edit-box"
            v-for="(item, index) in config.navList"
            :key="index"
          >
            <i
              class="el-icon-close close-btn"
              @click="handleDeleteNav4(index)"
            ></i>
            <div
              class="img-edit-ctn"
              @click="showChangeImgeModal(index)"
            >
              <img
                :src="item.image_path"
                alt="暂无图片"
              />
              <div class="func-bar">{{item.image_path ? '更换图片':'添加图片'}}</div>
            </div>
            <div class="form-content">
              <el-form label-width="80px">
                <div class="line">
                  <el-form-item label="标题：">
                    <el-input
                      style="width:200px;"
                      size="small"
                      v-model="item.name"
                    ></el-input>
                  </el-form-item>
                </div>
                <el-form-item label="链接：">
                  <page-link-select
                    :ref="'pageLinkSelect'+index"
                    :selectValue="item"
                    @linkSelected="(e)=>{linkSelected4(e,index)}"
                  ></page-link-select>
                </el-form-item>
              </el-form>
            </div>
          </div>
          <div class="edit-box multi-line">
            <div
              class="edit-item"
              @click="addNavList"
              style="text-align:center"
            >
              <div
                class="edit-label"
                style="color:#38f;width:auto"
              >
                <i class="iconfont icon-add1"></i>
              </div>
              <span class="active-span">添加一个副标题</span>
            </div>
            <div style="text-align:center;width:100%">建议尺寸：17*15像素</div>
          </div>
        </template>
      </el-form>
    </el-card>
    <!-- <image-modal
      :visible.sync="visible"
      @confirm="imageChoose"
      :pic-max="1"
    ></image-modal> -->
  </div>
</template>

<script>
  // import Vue from "vue";
  // import PageLinkSelect from "@/components/PageLinkSelect/PageLinkSelect.vue";
  // import ImageModal from "@/components/ImageModal/Index.vue";
  import titleShow from "./titleShow.vue";
  export default {
    name: "MzTitle",
    data() {
      return {
        // visible: false,
        index: "",
        templateIds: [
          { label: 1, name: "样式1" },
          { label: 2, name: "样式2" },
          { label: 3, name: "样式3" },
          { label: 4, name: "样式4" },
          { label: 5, name: "样式5" },
        ],
        config: {
          templateId: 1,
          lrBlank: 0,
          title: "",
          subTitile: "",
          align: "left",
          backgroundColor: "#f9f9f9",
          hasNav: false,
          nav: {
            name: "",
            urlType: "",
            urlTitle: "",
            origin_id: "",
            choose: "",
            HttpType: 1,
          },
          wx: {
            date: "",
            author: "",
            type: 1,
            urlName: "",
            url: "",
            urlType: "",
            urlTitle: "",
            origin_id: "",
            choose: null,
            HttpType: 1,
          },
          personality: {
            lrMargin: 10,
            img:
              "http://img.wkdao.com/image/65/2019/12/16/919c9397410108da44e1368dffd5b7c6.png",
            btnTitle: "",
            titleColor3: "#fff",
            backgroundColorLeft: "#FF4873",
            backgroundColorRight: "#FE7264",
            wordColor3: "#FF4E71",
            backgroundColorBtn: "#fff",
            name: "",
            urlType: "",
            urlTitle: "",
            origin_id: "",
            choose: "",
            HttpType: 1,
            blod: false,
          },
          navList: [],
          slide: {
            lrPadding: 0,
            titleColor: "#000",
            slideTitleColor: "#999",
          },
        },
      };
    },
    props: ["belongIndex", "currentIndex", "content"],
    methods: {
      addNav() {
        this.config.hasNav = true;
      },
      deleteNav() {
        this.config.hasNav = false;
        this.config.nav = {
          name: "",
          urlType: "",
          urlTitle: "",
          origin_id: "",
          choose: "",
          HttpType: 1,
        };
      },
      // handleWxDropDownClick(type) {
      //   if (this.config.wx.urlName && this.config.wx.urlName != "") {
      //     switch (type) {
      //       case 1:
      //         this.GoodsModal.visible = true;
      //         break;
      //       case 2:
      //         this.GoodsGroupModal.visible = true;
      //         break;
      //       case 6:
      //         this.urlModal.visible = true;
      //         this.urlModal.url = this.config.wx.urlTitle || "";
      //         this.urlModal.HttpType = this.config.wx.HttpType;
      //         break;
      //       default:
      //         this.config.wx.urlType = type;
      //         this.config.wx.urlTitle = "";
      //     }
      //   } else {
      //     this.$message({
      //       message: "请先填写链接标题",
      //       type: "warning",
      //     });
      //   }
      // },
      // 删除导航------------------------------滑动标题 特意加的
      handleDeleteNav4(index) {
        this.config.navList.splice(index, 1);
      },
      linkSelected4(data, index) {
        this.$set(
          this.config.navList,
          index,
          Object.assign({}, this.config.navList[index], data)
        );
      },
      showChangeImgeModal(index) {
        this.$pcTpl.imgChoose.popup().then((img) => {
          if (img.length > 0) {
            if (this.config.templateId == 4 || this.config.templateId == 5) {
              this.config.navList[index] = img[0];
              return;
            }
            this.config.personality.img = img[0].image_path;
          }
        });
      },
      addNavList() {
        this.config.navList.push({
          name: "",
          title: "",
          type: 0,
          urlTitle: "",
          choose: {},
          urlType: "",
          image_path: "",
          HttpType: 1,
        });
      },
      // --------------------------------------------------------------
      linkSelected(data) {
        let target =
          this.config.templateId === 1
            ? "nav"
            : this.config.templateId === 2
              ? "wx"
              : "personality";
        this.config[target].urlType = data.urlType;
        this.config[target].urlTitle = data.urlTitle;
        this.config[target].choose = data.choose;
        this.config[target].origin_id = data.origin_id || "";
        this.config[target].HttpType = data.HttpType || 1;
      },
      // 移除选择
      removeUrl() {
        let target = this.config.templateId === 1 ? "nav" : "wx";
        this.config[target].urlType = "";
        this.config[target].urlTitle = "";
        this.config[target].origin_id = "";
        this.config[target].choose = null;
        this.config[target].HttpType = 1;
      },
      handleDeleteNav() {
        this.config.hasNav = false;
        this.removeUrl();
      },
      init(n) {
        if (n) {
          this.config = Object.assign(
            {
              templateId: 1,
              lrBlank: 0,
              title: "",
              subTitile: "",
              align: "left",
              backgroundColor: "#f9f9f9",
              hasNav: false,
              nav: {
                name: "",
                urlType: "",
                urlTitle: "",
                origin_id: "",
                choose: "",
                HttpType: 1,
              },
              wx: {
                date: "",
                author: "",
                type: 1,
                urlName: "",
                url: "",
                urlType: "",
                urlTitle: "",
                origin_id: "",
                choose: null,
                HttpType: 1,
              },
              personality: {
                lrMargin: 10,
                img:
                  "http://img.wkdao.com/image/65/2019/12/16/919c9397410108da44e1368dffd5b7c6.png",
                btnTitle: "",
                titleColor3: "#fff",
                backgroundColorLeft: "#FF4873",
                backgroundColorRight: "#FE7264",
                wordColor3: "#FF4E71",
                backgroundColorBtn: "#fff",
                name: "",
                urlType: "",
                urlTitle: "",
                origin_id: "",
                choose: "",
                HttpType: 1,
              },
              navList: [],
              slide: {
                lrPadding: 0,
                titleColor: "#000",
                slideTitleColor: "#999",
              },
            },
            n
          );
        } else {
          this.config = {
            templateId: 1,
            lrBlank: 0,
            title: "",
            subTitile: "",
            align: "left",
            backgroundColor: "#f9f9f9",
            hasNav: false,
            nav: {
              name: "",
              urlType: "",
              urlTitle: "",
              origin_id: "",
              choose: "",
              HttpType: 1,
            },
            wx: {
              date: "",
              author: "",
              type: 1,
              urlName: "",
              url: "",
              urlType: "",
              urlTitle: "",
              origin_id: "",
              choose: null,
              HttpType: 1,
            },
            personality: {
              lrMargin: 10,
              img:
                "http://img.wkdao.com/image/65/2019/12/16/919c9397410108da44e1368dffd5b7c6.png",
              btnTitle: "",
              titleColor3: "#fff",
              backgroundColorLeft: "#FF4873",
              backgroundColorRight: "#FE7264",
              wordColor3: "#FF4E71",
              backgroundColorBtn: "#fff",
              name: "",
              urlType: "",
              urlTitle: "",
              origin_id: "",
              choose: "",
              HttpType: 1,
            },
            navList: [],
            slide: {
              lrPadding: 0,
              titleColor: "#000",
              slideTitleColor: "#999",
            },
          };
        }
      },
      showImgModal(index) {
        this.visible = true;
      },
      // imageChoose(imgArray) {
      //   if (this.config.templateId == 4 || this.config.templateId == 5) {
      //     // this.visible = false;
      //     this.config.navList[this.index] = imgArray[0];
      //     return;
      //   }
      //   this.config.personality.img = imgArray[0].image_path;
      //   this.visible = false;
      // },
      deleteImg() {
        this.config.personality.img = null;
      },
    },
    components: {
      // "page-link-select": PageLinkSelect,
      // "image-modal": ImageModal,
      titleShow,
    },
    watch: {
      content(n) {
        this.init(n);
      },
      currentIndex: function (n) {
        if (n === -1) {
          this.$emit("update:content", this.config);
        }
      },
    },
    created() {
      this.init(this.content);
    },
  };
</script>
<style scoped lang="scss">
  .el-dilaog >>> .el-select .el-input {
    width: 130px;
  }
  .el-dilaog >>> .input-with-select .el-input-group__prepend {
    background-color: #fff;
  }
  .nomargin {
    margin: 0px !important;
  }
  .img-box {
    margin-right: 10px;
    position: relative;
    width: 75px;
    img {
      width: 75px;
      height: 75px;
    }
    .change-img {
      color: #409eff;
      cursor: pointer;
    }
  }
  .line {
    display: flex;
  }
  .tips {
    color: #666;
  }
</style>