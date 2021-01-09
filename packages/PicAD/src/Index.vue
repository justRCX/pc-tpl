<template>
  <div class="pic-add">
    <el-row>
      <div class="pic-show">
        <div
          class="img-ctn-default"
          v-if="config.temp9RightImg.length == 0 && imgList.length === 0 "
        >
          <p class="primary-title">点击编辑图片广告</p>
          <p class="sub-title">点击编辑图片广告</p>
        </div>
        <pic-show
          :img-list="imgList"
          :type="config.templateId"
          :config="config"
          :margin="config.margin"
          :isShowTips="config.isShowTips"
          :count="config.count"
          :size="config.size"
          :backgroundColor="config.backgroundColor"
          :bgImg="config.bgImg"
          :temp9RightImg="config.temp9RightImg"
        ></pic-show>
      </div>
      <el-card
        header="图片广告"
        class="edit-area"
        v-if="belongIndex === currentIndex"
      >
        <el-form
          style="text-align:left;"
          label-width="120px"
        >
          <el-form-item label="选择模版:">
            <div
              class="img-preview"
              :class="{'active': config.templateId === 1}"
              @click="chooseItem(1)"
            >
              <div class="img-ctn">
                <img
                  src="http://img.wkdao.com/image/65/2020/08/03/ccfecf0c9e27a28790d64d6eeef9a7a6.png"
                  alt
                />
              </div>
              <div class="title">轮播海报</div>
            </div>
            <div
              class="img-preview"
              :class="{'active': config.templateId === 8}"
              @click="chooseItem(8)"
            >
              <div class="img-ctn">
                <img
                  src="http://img.wkdao.com/image/65/2020/08/03/fa57f945a77bc345c6b1e65d8eec7989.jpg"
                  alt=""
                />
              </div>
              <div class="title">3D轮播</div>
            </div>
            <div
              class="img-preview"
              :class="{'active': config.templateId === 2}"
              @click="chooseItem(2)"
            >
              <div class="img-ctn">
                <img
                  src="http://img.wkdao.com/image/65/2020/08/03/81c67c5265030343135e25837380a029.png"
                  alt
                />
              </div>
              <div class="title">一行一个</div>
            </div>
            <div
              class="img-preview"
              :class="{'active': config.templateId === 3}"
              @click="chooseItem(3)"
            >
              <div class="img-ctn">
                <img
                  src="http://img.wkdao.com/image/65/2020/08/03/f579e90b416989ab2bfde99c88fed4a6.png"
                  alt
                />
              </div>
              <div class="title">横向滑动（大）</div>
            </div>
            <div
              class="img-preview"
              :class="{'active': config.templateId === 4}"
              @click="chooseItem(4)"
            >
              <div class="img-ctn">
                <img
                  src="http://img.wkdao.com/image/65/2020/08/03/72a686cebc0de1b72ef21473eb95a58d.png"
                  alt
                />
              </div>
              <div class="title">横向滑动（中）</div>
            </div>
            <div
              class="img-preview"
              :class="{'active': config.templateId === 6}"
              @click="chooseItem(6)"
            >
              <div class="img-ctn">
                <img
                  src="http://img.wkdao.com/image/65/2020/08/03/af2a366d58979fc41f22b57bdc39ac4f.png"
                  alt
                />
              </div>
              <div class="title">横向滑动（小）</div>
            </div>
            <div
              class="img-preview"
              :class="{'active': config.templateId === 10}"
              @click="chooseItem(10)"
            >
              <div class="img-ctn">
                <img
                  src="http://img.wkdao.com/image/65/2020/08/03/af2a366d58979fc41f22b57bdc39ac4f.png"
                  alt
                />
              </div>
              <div class="title">横向滑动（较大）</div>
            </div>
            <div
              class="img-preview"
              :class="{'active': config.templateId === 5}"
              @click="chooseItem(5)"
            >
              <div class="img-ctn">
                <img
                  src="http://img.wkdao.com/image/65/2020/08/03/626646eb851a1868f3f45cbfa0383f91.png"
                  alt
                />
              </div>
              <div class="title">横向滑动(导航)</div>
            </div>
            <div
              class="img-preview"
              :class="{'active': config.templateId === 7}"
              @click="chooseItem(7)"
            >
              <div class="img-ctn">
                <img
                  src="http://img.wkdao.com/image/65/2020/08/03/66f4fd43b532e20cd3f958b16f6af822.png"
                  alt
                />
              </div>
              <div class="title">绘制热区</div>
            </div>
            <!-- <el-radio v-for="item in configs.templates" :key="item.key" v-model="config.templateId" :label="item.key">{{item.name}}</el-radio> -->
          </el-form-item>
          <el-form-item
            label="是否显示提示:"
            v-show="[3,4,6,10].includes(config.templateId)"
          >
            <el-radio-group v-model="config.isShowTips">
              <el-radio :label="1">是</el-radio>
              <el-radio :label="0">否</el-radio>
            </el-radio-group>
          </el-form-item>
          <el-form-item
            label="是否顶部对齐:"
            v-show="config.templateId == 8"
          >
            <el-radio-group v-model="config.isTop">

              <el-radio :label="1">是</el-radio>
              <el-radio :label="0">否</el-radio>
            </el-radio-group>
          </el-form-item>
          <el-form-item
            label="不展示阴影:"
            v-show="config.templateId == 8"
          >
            <el-radio-group v-model="config.boxShadow">
              <el-radio :label="0">是</el-radio>
              <el-radio :label="1">否</el-radio>
            </el-radio-group>
          </el-form-item>
          <el-form-item
            label="图片大小:"
            v-show="config.templateId == 8"
          >
            <el-slider
              v-model="config.imageWidth"
              :max="500"
              show-input
            ></el-slider>
          </el-form-item>
          <el-form-item
            label="图片间隔:"
            v-show="config.templateId !== 1&&config.templateId !== 8 || config.temp9RightImg.length>0"
          >
            <el-slider
              v-model="config.margin"
              :max="20"
              show-input
            ></el-slider>
          </el-form-item>
          <el-form-item
            label="左右留白:"
            v-show="config.templateId==1||config.templateId==2 ||  config.templateId==7 || config.templateId==8 ||config.templateId==10"
          >
            <el-slider
              v-model="config.lrmargin"
              :max="50"
              show-input
            ></el-slider>
          </el-form-item>
          <el-form-item label="上偏移:">
            <el-slider
              v-model="config.TopLine"
              :max="80"
              show-input
            ></el-slider>
          </el-form-item>
          <el-form-item
            label="一行显示:"
            v-show="config.templateId === 1 &&  config.temp9RightImg.length == 0"
          >
            <el-slider
              v-model="config.lineNum"
              :min="1"
              :max="10"
              show-input
            ></el-slider>
            <span>张图片</span>
          </el-form-item>
          <el-form-item label="背景色:">
            <el-color-picker v-model="config.backgroundColor"></el-color-picker>
          </el-form-item>
          <el-form-item label="背景图片:">
            <c-img
              v-model="config.bgImg"
              :number="1"
            ></c-img>
          </el-form-item>
          <el-form-item
            label="角标显示:"
            v-show="config.templateId === 1"
          >
            <el-radio
              v-model="config.dotSHow"
              :label="0"
            >不显示</el-radio>
            <el-radio
              v-model="config.dotSHow"
              :label="1"
            >图片内</el-radio>
            <el-radio
              v-model="config.dotSHow"
              :label="2"
            >图片外</el-radio>
          </el-form-item>
          <div v-if="config.dotSHow && config.templateId === 1">
            <div class="line">
              <el-form-item
                label="角标颜色:"
                v-show="config.templateId==1"
              >
                <el-color-picker v-model="config.dotColor"></el-color-picker>
              </el-form-item>
              <el-form-item label="角标粗细:">
                <el-radio
                  v-model="config.dotWeight"
                  :label="400"
                >400</el-radio>
                <el-radio
                  v-model="config.dotWeight"
                  :label="700"
                >700</el-radio>
              </el-form-item>
            </div>
            <div class="line">
              <el-form-item
                label="角标大小:"
                class="line-item"
              >
                <el-slider
                  v-model="config.dotSize"
                  :max="80"
                ></el-slider>
              </el-form-item>
              <el-form-item
                label="垂直位置:"
                class="line-item"
              >
                <el-slider
                  v-model="config.dotLocation"
                  :max="100"
                ></el-slider>
              </el-form-item>
            </div>
          </div>
          <!-- <el-form-item label="图片比例:" v-show="config.templateId !== 1 && config.templateId !== 2 && config.templateId !== 3">
            <el-radio v-model="config.size" :label="1">固定高度</el-radio>
            <el-radio v-model="config.size" :label="2">自适应高度</el-radio>
          </el-form-item>-->
          <div style="position:relative;padding-top:20px;">
            <div
              class="edit-box hot-area-result"
              v-for="(item, index) in imgList"
              :key="index"
              v-dragging="{ item: item, list: imgList, group: 'item'}"
              v-show="config.templateId === 7"
            >
              <i
                class="el-icon-close close-btn"
                @click="handleDeleteImage(index)"
              ></i>
              <div
                class="img-box"
                @click="openHotEditBox(index)"
              >
                <img
                  :src="item.image_path"
                  alt="图片"
                />
                <div
                  v-if="!item.hotAreaList"
                  class="hot-area-item"
                >
                  双击设置
                  <br />关联链接
                </div>
                <div
                  v-for="(hotAreaItem,areaIndex) in item.hotAreaList"
                  :key="areaIndex"
                  class="hot-area-item"
                  :style="{transform: 'rotate('+ hotAreaItem.rotate +'deg)',
                  left:hotAreaItem.left*526/750+'px',
                  top:hotAreaItem.top*526/750+'px',
                  width:hotAreaItem.width*526/750+'px',
                  height:hotAreaItem.height*526/750+'px',
                  'border-radius':hotAreaItem.shape==2?'50%':0}"
                >{{hotAreaItem.selet_name}}</div>
              </div>
              <div
                class="func-bar"
                @click="showChangeImgeModal(item)"
              >更换图片</div>
            </div>

            <span class="label">轮播图</span>
            <div
              class="edit-box"
              v-for="(item, index) in imgList"
              :key="item.id"
              v-dragging="{ item: item, list: imgList, group: 'item'}"
              v-show="config.templateId !== 7"
            >
              <i
                class="el-icon-close close-btn"
                @click="handleDeleteImage(index)"
              ></i>
              <div
                class="img-edit-ctn"
                @click="showChangeImgeModal(item)"
              >
                <img
                  :src="item.image_path"
                  alt="图片"
                />
                <div class="func-bar">更换图片</div>
              </div>
              <div class="form-content">
                <el-form label-width="80px">
                  <el-form-item label="标题：">
                    <el-input
                      style="width:200px;"
                      size="small"
                      v-model="item.title"
                    ></el-input>
                  </el-form-item>
                  <el-form-item label="链接：">
                    <page-link-select
                      :ref="'pageLinkSelect'+index"
                      :selectValue="item"
                      @linkSelected="(e)=>{linkSelected(e,index)}"
                    ></page-link-select>
                  </el-form-item>
                </el-form>
              </div>
            </div>

            <div
              class="edit-box multi-line"
              @click="showImageModal"
            >
              <div class="edit-item center">
                <div
                  class="edit-label"
                  style="color:#38f;width:inherit"
                >
                  <i class="iconfont icon-add1"></i>
                </div>
                <span class="active-span">添加一个背景图</span>
                <p
                  class="sub-title"
                  v-show="config.templateId == 1"
                >建议尺寸 750x350 像素</p>
                <p
                  class="sub-title"
                  v-show="config.templateId == 2"
                >建议宽度 750 像素</p>
                <p
                  class="sub-title"
                  v-show="config.templateId == 3"
                >建议宽度 670 像素</p>
                <p
                  class="sub-title"
                  v-show="config.templateId == 4"
                >建议宽度 305 像素</p>
                <p
                  class="sub-title"
                  v-show="config.templateId == 5"
                >建议宽度 142 像素</p>
                <p
                  class="sub-title"
                  v-show="config.templateId == 6"
                >建议宽度 215 像素</p>
                <p
                  class="sub-title"
                  v-show="config.templateId == 7"
                >建议宽度 750 像素</p>
                <p
                  class="sub-title"
                  v-show="config.templateId == 8"
                >建议宽度 315*200 像素（建议上传5/7张）</p>
              </div>
            </div>
            <span
              class="label"
              v-show="config.templateId == 1 "
            >右侧图</span>
            <div
              class="edit-box"
              v-for="(item, index) in config.temp9RightImg"
              :key="item.id"
              v-show="config.templateId == 1"
            >
              <i
                class="el-icon-close close-btn"
                @click="handleDeleteImage(index,'temp9R')"
              ></i>
              <div
                class="img-edit-ctn"
                @click="showChangeImgeModal(item)"
              >
                <img
                  :src="item.image_path"
                  alt="图片"
                />
                <div class="func-bar">更换图片</div>
              </div>
              <!--              <div class="form-content">-->
              <!--                <el-form label-width="80px">-->
              <!--                  <el-form-item label="标题：">-->
              <!--                    <el-input style="width:200px;" size="small" v-model="item.title"></el-input>-->
              <!--                  </el-form-item>-->
              <!--                  <el-form-item label="链接：">-->
              <!--                    <page-link-select-->
              <!--                            :ref="'pageLinkSelect'+index"-->
              <!--                            :selectValue="item"-->
              <!--                            @linkSelected="(e)=>{linkSelected(e,index)}"-->
              <!--                    ></page-link-select>-->
              <!--                  </el-form-item>-->
              <!--                </el-form>-->
              <!--              </div>-->
            </div>
          </div>
          <div
            class="edit-box multi-line"
            v-show="config.templateId == 1 && config.temp9RightImg.length == 0"
            @click="showImageModal('temp9-right')"
          >
            <div class="edit-item center">
              <div
                class="edit-label"
                style="color:#38f;width:inherit"
              >
                <i class="iconfont icon-add1"></i>
              </div>
              <span class="active-span">添加一个右图</span>
              <p class="sub-title">建议尺寸 100*250 像素</p>
            </div>
          </div>
        </el-form>
      </el-card>
    </el-row>
    <hot-area-img
      :visible.sync="hotAreaConfig.visible"
      @confirm="hotAreaChangeConfirm"
      :imgItem="activeImgItem"
    ></hot-area-img>
  </div>
</template>

<script>
  import configs from "./config";
  import PicShow from "./PicShow.vue";
  import CImg from "../../img-upload/c-img.vue";

  export default {
    name: "picAD",
    data() {
      return {
        config: {
          templateId: 1,
          isTop: 0,
          boxShadow: 0,
          fillStyle: 1,
          margin: 1,
          count: 4,
          lineNum: 1,
          imageWidth: 320,
          isShowTips: 0,
          list: [],
          bgImg: "",
          size: 1,
          dotSHow: 0,
          lrmargin: 0,
          TopLine: 0,
          backgroundColor: "#fff",
          dotColor: "#fff",
          dotWeight: 400,
          dotSize: 35,
          dotLocation: 50,
          temp9RightImg: []
        },
        activeHotAreaIndex: 0,
        activeImgItem: {},
        configs: configs,
        imgList: [],
        imageModalConfig: {
          visible: false
        },
        imageModalConfig2: {
          visible: false
        },
        hotAreaConfig: {
          visible: false
        },
        imgChooseFrom: "",
        temp9RightImg: []
      };
    },
    props: ["belongIndex", "currentIndex", "content"],
    methods: {
      chooseItem(type) {
        this.config.templateId = type;
      },
      showImageModal($from) {
        this.imgChooseFrom = $from || "";
        this.$pcTpl.imgChoose.popup().then(img => {
          if (img.length > 0) {
            this.imageChooseConfirm(img);
          }
        });
      },
      imageChooseConfirm(obj) {
        if (this.imgChooseFrom == "temp9-right") {
          this.config.temp9RightImg.push(obj[0]);
          this.imgChooseFrom = "";
          return;
        }
        this.imgList = this.imgList.concat(obj);
      },
      linkSelected(data, index) {
        this.$set(
          this.imgList,
          index,
          Object.assign({}, this.imgList[index], data)
        );
      },
      // 删除图片
      handleDeleteImage(index, $from) {
        if ($from && $from == "temp9R") {
          this.config.temp9RightImg = [];
          return;
        }
        this.imgList.splice(index, 1);
      },
      showChangeImgeModal(obj) {
        this.target = obj;
        this.$pcTpl.imgChoose
          .popup({
            picMax: 1
          })
          .then(img => {
            if (img.length > 0) {
              this.imageChangeConfirm(img);
            }
          });
      },
      imageChangeConfirm(img) {
        this.target = Object.assign(this.target, img[0]);
      },
      init(n) {
        if (n) {
          this.config = Object.assign(
            {
              templateId: 1,
              fillStyle: 1,
              margin: 1,
              lineNum: 1,
              list: [],
              size: 1,
              dotSHow: 0,
              isShowTips: 0,
              isTop: 0,
              boxShadow: 0,
              // lrmargin:0,
              TopLine: 0,
              backgroundColor: "#fff",
              imageWidth: 320,
              dotColor: "#fff",
              dotWeight: 400,
              bgImg: "",
              dotSize: 35,
              dotLocation: 50,
              temp9RightImg: []
            },
            n
          );
          this.imgList = n.list.slice();
        } else {
          this.config = {
            templateId: 1,
            fillStyle: 1,
            margin: 1,
            lineNum: 1,
            list: [],
            size: 1,
            bgImg: "",
            isTop: 0,
            imageWidth: 320,
            boxShadow: 0,
            isShowTips: 0,
            dotSHow: 0,
            // lrmargin:0,
            TopLine: 0,
            backgroundColor: "#fff",
            dotWeight: 400,
            dotSize: 35,
            dotLocation: 50,
            dotColor: "#fff",
            temp9RightImg: []
          };
          this.imgList = [];
        }
      },
      openHotEditBox(index) {
        this.activeHotAreaIndex = index;
        this.activeImgItem = this.imgList[index];
        this.hotAreaConfig.visible = true;
      },
      hotAreaChangeConfirm(data) {
        this.hotAreaConfig.visible = false;
        this.$set(
          this.imgList,
          this.activeHotAreaIndex,
          Object.assign({}, this.imgList[this.activeHotAreaIndex], data)
        );
      }
    },
    components: {
      "pic-show": PicShow,
      CImg
    },
    watch: {
      content(n) {
        this.init(n);
      },
      currentIndex: function (n) {
        if (n === -1) {
          this.config.list = this.imgList;
          this.$emit("update:content", this.config);
        }
      }
    },
    created() {
      this.init(this.content);
    }
  };
</script>

<style lang="scss" scoped>
  // .el-dilaog >>> .el-select .el-input {
  //     width: 130px;
  //   }
  // .el-dilaog >>> .input-with-select .el-input-group__prepend {
  //     background-color: #fff;
  // }
  .hot-area-result {
    position: relative;
    width: 528px;
    padding: 0;
    overflow: hidden;
    .hot-area-item {
      position: absolute;
      user-select: auto;
      touch-action: none;
      width: 87.0152px;
      height: 87.0152px;
      display: inline-block;
      top: 0px;
      left: 0px;
      transform: translate(7.56654px, 7.56654px);
      max-width: 9.0072e15px;
      max-height: 9.0072e15px;
      min-width: 32px;
      min-height: 20px;
      box-sizing: border-box;
      border: 1px solid #38f;
      background: rgba(51, 136, 255, 0.5);
      color: #fff;
      display: flex;
      align-items: center;
      justify-content: center;
    }

    img {
      width: 100%;
    }

    .func-bar {
      position: absolute;
      bottom: 0;
      left: 0;
      width: 100%;
      height: 20px;
      line-height: 20px;
      font-size: 12px;
      color: #fff;
      background: rgba(0, 0, 0, 0.5);
      cursor: pointer;
      text-align: center;
    }
  }
  .label {
    vertical-align: middle;
    font-size: 14px;
    color: #606266;
    line-height: 40px;
    padding: 0 12px 0 0;
    -webkit-box-sizing: border-box;
    box-sizing: border-box;
  }
  .line {
    display: flex;
    .line-item {
      flex: 1;
    }
  }
  .img-box {
    width: 100%;
  }
</style>
