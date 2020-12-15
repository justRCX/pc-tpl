<template>
    <div class="second-kill-wrap">
        <div class="kill-time-line">
            <div class="time-line-item">
                <div class="time-line-content">
                    <div class="time">
                        16:00
                    </div>
                    <div class="text">
                        已开抢
                    </div>
                </div>
            </div>
            <div class="time-line-item active">
                <div class="time-line-content">
                    <div class="time">
                        16:00
                    </div>
                    <div class="text">
                        已开抢
                    </div>
                </div>
            </div>
            <div class="time-line-item">
                <div class="time-line-content">
                    <div class="time">
                        16:00
                    </div>
                    <div class="text">
                        已开抢
                    </div>
                </div>
            </div>
            <div class="time-line-item">
                <div class="time-line-content">
                    <div class="time">
                        16:00
                    </div>
                    <div class="text">
                        已开抢
                    </div>
                </div>
            </div>
        </div>

        <div class="kill-goods-list">
            <div class="goods-item" v-for="item in list">
                <div class="cover-image">
                    <img :src="item.item[0].thumb_image_path" alt="">
                </div>
                <div class="good-info">
                    <div class="title">
                        淳本万束超软毛牙刷 日系小...超细纳米情侣家用家庭装女男士专用
                    </div>
                    <div class="desc">
                        全新升级刷头 更软更好用
                    </div>
                    <div class="stock">
                        仅剩267件
                        <div class="progress"></div>
                    </div>
                    <div class="price-and-btn">
                        <div class="current-pirce">
                            ￥2.77
                        </div>
                        <div class="underline-pirce">
                            ￥59.99
                        </div>
                        <div class="buy-btn">
                            抢购中
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: "SecondKillShow",
        props: ['listType', 'config', 'list'],
        created() {
        },
        watch: {
            'list' () {
                console.log(this.list)
            }
        }
    }
</script>

<style lang="scss" scoped>
  @import "../../util.scss";
  .second-kill-wrap {
      width: to320(710);
      margin: 0 auto;
      .kill-time-line{
          display: flex;
          flex-direction: row;
          justify-content: center;
          align-items: center;
          .time-line-item {
              padding-top: to320(18);
              text-align: center;
              width: to320(176);
              height: to320(90);
              /*border-radius: to320(12);*/
              color: #666666;
              cursor: pointer;
              .time {
                  font-size: to320(28);
              }
              .text {
                  font-size: to320(20);
              }
              &.active {
                  color: #fff;
                  background: #FF1947;
              }
          }
      }
      .kill-goods-list {
          border-radius: 0 0 12upx 12upx;
          background: #FF1947;
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
          .goods-item {
              width: to320(670);
              height: to320(260);
              background: #FFFFFF;
              border-radius: to320(20);
              margin-top: to320(20);
              padding: to320(20);
              display: flex;
              .cover-image {
                  width: to320(220);
                  height: to320(220);
                  border-radius: to320(20);
                  border:1px solid #cccc77;
                  overflow: hidden;
                  flex: none;
                  img {
                      height: 100%;
                      width: 100%;
                  }
              }
              &:last-child {
                  margin-bottom: to320(20);

              }
              .good-info {
                  margin-left: to320(19);
                  .title {
                      width:  to320(371);
                      font-size: to320(28);
                      font-family: Microsoft YaHei;
                      font-weight: 400;
                      color: #333333;
                      white-space: nowrap;
                      overflow: hidden;
                      text-overflow: ellipsis;
                      margin-bottom: to320(26);
                      line-height: 1;
                  }
                  .desc {
                      width: to320(271);
                      margin-bottom: to320(24);
                      line-height: 1;
                      font-size: to320(24);
                      font-family: Microsoft YaHei;
                      font-weight: 400;
                      color: #999999;
                      white-space: nowrap;
                      overflow: hidden;
                      text-overflow: ellipsis;
                  }
                  .stock {
                      font-size: to320(20);
                      font-family: Microsoft YaHei;
                      font-weight: 400;
                      color: #FF1947;
                      width: to320(250);
                      height: to320(40);
                      line-height:to320(40);
                      border: 1px solid #FF1947;
                      border-radius: to320(10);
                      text-align: center;
                      margin-bottom: to320(15);
                      position: relative;
                      .progress {
                          width: 60%;
                          height: 100%;
                          line-height: 100%;
                          position: absolute;
                          background: rgba(254, 76, 86, 0.2);
                          left: 0;
                          top: 0;
                      }
                  }
                  .price-and-btn {
                      display: flex;
                      flex-direction: row;
                      .current-pirce {
                          font-size: to320(36);
                          font-family: Microsoft YaHei;
                          font-weight: bold;
                          color: #FF1947;
                          margin-right: to320(21);
                          line-height: to320(28);
                          align-self: center;
                      }
                      .underline-pirce {
                          line-height: to320(28);
                          font-size: to320(20);
                          font-family: Microsoft YaHei;
                          font-weight: 400;
                          text-decoration: line-through;
                          color: #999999;
                          align-self: center;
                          margin-right: to320(64);
                          margin-top:to320(12)
                      }
                      .buy-btn {
                          width: to320(126);
                          height:  to320(58);
                          line-height: to320(58);
                          background:#FF1947;
                          border-radius: to320(29);
                          font-size: to320(24);
                          font-family: Microsoft YaHei;
                          font-weight: 400;
                          color: #FFFFFF;
                          text-align: center;

                      }
                  }
              }

          }
      }
  }
</style>
