<template>
  <div class="img-container g-flex">
    <draggable
      v-model="imgList"
      @end="changeIndex"
      class="g-flex flex-width"
      :options="{draggable:'.img-box'}"
    >
      <transition-group class="box-group-flex">
        <div
          class="img-box __mr-10"
          v-for="(item,index) in imgList"
          :key="index+Math.random()"
          v-show="item"
        >
          <img
            :src="item"
            class="avatar"
          >
          <i
            class="el-icon-circle-close delete"
            v-if="!disabled"
            @click.stop="removeImg(index)"
          ></i>
        </div>
        <div
          v-if="!disabled"
          class="__choose-img"
          @click="getImg"
          v-show="imgList.length<number || !number"
          :key="Math.random()"
        >
          <i class="el-icon-plus avatar-uploader-icon"></i>
        </div>
      </transition-group>
    </draggable>
  </div>
</template>

<script>
  import draggable from "vuedraggable";
  export default {
    name: 'CImg',
    model: {
      prop: 'imageUrl',
      event: "changeImg"
    },
    components: {
      draggable
    },
    props: {
      imageUrl: {
        type: [String, Array]
      },
      number: {
        type: [Number, String],
        default: ''
      },
      disabled: {
        type: Boolean,
        default: false
      }
    },
    computed: {

    },
    watch: {
      imageUrl(v) {
        let imgList = this.number == 1 ? (((typeof this.imageUrl).toLocaleLowerCase() == 'string' && this.imageUrl) ? [this.imageUrl] : []) : this.imageUrl
        this.imgList = imgList;
      }
    },
    data() {
      return {
        imgList: this.number == 1 ? (((typeof this.imageUrl).toLocaleLowerCase() == 'string' && this.imageUrl) ? [this.imageUrl] : []) : this.imageUrl
      }
    },
    methods: {
      removeImg(index) {
        this.imgList.splice(index, 1)
        if (this.number == 1) {
          this.$emit('changeImg', this.imgList.toString())
        } else {
          this.$emit('changeImg', this.imgList)
        }
      },
      changeIndex(e) {
        if (this.disabled) return
        this.$emit('changeImg', this.imgList)
      },
      getImg() {
        if (this.number.length > 0 && this.imgList.length >= this.number) {
          return
        }
        this.$pcTpl.imgChoose.popup({
          picMax: this.number
        }).then((img) => {
          if (img.length > 0) {
            let imgList = img.map(item => item.image_path).filter(hasImg => hasImg)
            this.imgList = [...this.imgList, ...imgList];
            if (this.number > 1 || !this.number) {
              this.$emit('changeImg', this.imgList)
            } else {
              this.$emit('changeImg', this.imgList.toString())
            }
          }
        })
      }
    }
  }
</script>

<style scoped lang='scss'>
  .__choose-img {
    width: 80px;
    height: 80px;
    line-height: 80px;
    border: 1px dashed #ccc;
    text-align: center;
    position: relative;
    margin-top: 10px;
    cursor: pointer;
  }
  .img-container img {
    width: 100%;
    height: 100%;
  }
  .img-box {
    position: relative;
    width: 80px;
    height: 80px;
    margin-top: 10px;
  }
  .delete {
    position: absolute;
    top: -5px;
    right: -5px;
    font-size: 16px;
    background-color: #bbb;
    color: #fff;
    border-radius: 50%;
  }
  .__mr-10 {
    margin-right: 10px;
  }
  .flex-width {
    width: 100%;
  }
  .box-group-flex {
    display: flex;
    flex-wrap: wrap;
  }
</style>