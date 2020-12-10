<template>
    <div class="goods-tuan">
        <good-item
            :config="config"
            :list="config.goods"
            :listType="config.listType"
            :group="false"
        ></good-item>
        <el-card
            v-if="belongIndex === currentIndex"
            class="edit-area"
            header="商品"
        >
            <edit-panel :config='config'>
                <div class="goods-origin-wrap">
                    <el-form-item
                        label="商品来源： "
                    >
                        <el-radio-group
                            v-model="config.source"
                        >
                            <el-radio :label="1">商品</el-radio>
                            <el-radio :label="2">商品分组</el-radio>
                        </el-radio-group>
                    </el-form-item>
                    <!--                    复制黏贴过来的-->
                    <div
                        class="edit-box"
                        v-show="config.source === 1"
                    >
                        <div class="edit-label">商品:</div>
                        <div class="">
                            <draggable
                                :options="{draggable:'.item'}"
                                class="wrapper goods_flex"
                                v-model="config.goods"
                            >
                                <!--                                <transition-group>-->
                                <div
                                    :key="index+Math.random()+Math.random()"
                                    class="flexs item"
                                    v-for="(obj, index) in config.goods"
                                >
                                    <div class="card-img">
                                        <i
                                            @click="onClick_deleteGood(index)"
                                            class="el-icon-close close-btn"
                                        ></i>
                                        <img
                                            :src="obj.thumb_image_path"
                                            alt="商品图片"
                                            style="width:100%;height:100%;"
                                        />
                                    </div>
                                </div>
                                <div
                                    :key="1234"
                                    @click="onClick_showGoodsPop"
                                    class="card-add"
                                    sortable
                                >
                                    <i
                                        class="iconfont icon-add1"
                                        style="color:#409EFF"
                                    ></i>
                                </div>
                                <!--                                </transition-group>-->
                            </draggable>
                        </div>
                    </div>
                    <div
                        class="edit-box multi-line"
                        v-show="config.source === 2"
                    >
                        <div class="edit-item">
                            <div class="edit-label">商品分组:</div>
                            <el-tag
                                @close="removeGoodsGroup"
                                closable
                                size="medium"
                                v-show="config.goodsGroupId !== ''"
                            >
                                <span>商品标签|</span>
                                <span>{{config.goodsGroupName}}</span>
                            </el-tag>
                            <span
                                @click="onClick_showGoodsGroupPop(1)"
                                class="active-span"
                                v-show="config.goodsGroupId === ''"
                            >从商品分组中选择</span>
                        </div>
                        <div class="edit-item">
                            <div class="edit-label">显示数量:</div>
                            <el-input
                                @input="onChange_showCount"
                                max="10"
                                size="small"
                                style="width:80px"
                                type="number"
                                v-model="config.showCount"
                            ></el-input>
                            <span class="grey-span">最多显示10</span>
                        </div>
                    </div>
                </div>
            </edit-panel>
        </el-card>
<!--        商品分组弹窗组件-->
        <goods-group-form
            :visible.sync="goodsGroupForm.visible"
            :type="type"
            @confirm="handleGoodsGroupAddConfirm"
        ></goods-group-form>
    </div>
</template>

<script>
    import draggable from "vuedraggable";
    import GoodsGroupForm from "./GroupForm.vue";
    import GoodItem from "../../good-style/Item.vue";
    import EditPanel from '../../good-style/component/edit-panel.vue';

    const originGroups = [
        {
            group_id: "1",
            group_title: "分组1"
        },
        {
            group_id: "2",
            group_title: "分组2"
        }
    ];
    export default {
        name: "goodsEdit",
        data() {
            return {
                type: 1,
                // 传进去的参数
                config: {
                    isGroup: 0,  //是不是商品分组
                    listType: 1,  //商品样式
                    cart: 1, //加购物车样式
                    badge_id: 0, //角标
                    badge_path: '', //选中的角标路径
                    customBadge: '', //自定义角标
                    isShowCate: 1, //是否展示快捷进入分类
                    isShowBuyHis: 1, //是否显示购买记录
                    showCount: 6,
                    goods: [], //商品列表
                    goodsGroupId: "",
                    goodsGroupName: "",
                    // 分组参数
                    goodsGroups: [],
                    source: 1,
                },
                goodsForm: {
                    visible: false
                },
                goodsGroupForm: {
                    visible: false,
                    index: "" // 缓存商品分组修改index
                },
                // 分组
                groups: originGroups.slice(),
                goodsList: [{"item_id":5150,"item_type":1,"item_title":"快递商品","selling_point":"","thumb_image_path":"https://cbu01.alicdn.com/img/ibank/2020/053/860/17218068350_609132103.jpg","current_price":"12.00","num":79,"create_time":"2020-05-26 17:34:34","shelf_time":"2020-11-27 10:45:45","shelf_off_time":"","_item_type":"实物商品"},{"item_id":5130,"item_type":1,"item_title":"3333","selling_point":"","thumb_image_path":"http://5b0988e595225.cdn.sohucs.com/q_70,c_zoom,w_640/images/20180829/5c52764eeb0246ec8887e669374fc16e.jpeg","current_price":"11.00","num":78,"create_time":"2020-05-23 10:17:36","shelf_time":"2020-10-14 21:09:29","shelf_off_time":"","_item_type":"实物商品"},{"item_id":5126,"item_type":1,"item_title":"平邮商品","selling_point":"","thumb_image_path":"http://5b0988e595225.cdn.sohucs.com/q_70,c_zoom,w_640/images/20180829/5c52764eeb0246ec8887e669374fc16e.jpeg","current_price":"90.00","num":1396,"create_time":"2020-05-20 10:35:18","shelf_time":"2020-12-05 16:42:57","shelf_off_time":"","_item_type":"实物商品"},{"item_id":7035,"item_type":1,"item_title":"贡献值测试（勿删）","selling_point":"","thumb_image_path":"http://img.wkdao.com/image/65/2020/12/03/94456288f8844e4abd7f67b1eef3540f.png","current_price":"200.00","num":93,"create_time":"2020-12-09 10:09:06","shelf_time":"2020-12-09 13:23:54","shelf_off_time":"","_item_type":"实物商品"},{"item_id":7034,"item_type":1,"item_title":"贡献值测试（倪克松专用）","selling_point":"43124313","thumb_image_path":"http://img.alicdn.com/imgextra/i1/595412874/O1CN01Qwle3X1X6Kr4HCqCs_!!595412874.jpg","current_price":"100.00","num":1243,"create_time":"2020-12-08 16:10:22","shelf_time":"2020-12-09 11:19:53","shelf_off_time":"","_item_type":"实物商品"},{"item_id":7033,"item_type":1,"item_title":"供应商商品","selling_point":"","thumb_image_path":"http://img.wkdao.com/image/65/2020/11/13/8b51f92a808a8174e20bfca51fa98da5.jpg","current_price":"60.00","num":137,"create_time":"2020-12-04 10:28:00","shelf_time":"2020-12-08 14:24:18","shelf_off_time":"","_item_type":"实物商品"},{"item_id":7028,"item_type":4,"item_title":"酒店测试","selling_point":"","thumb_image_path":"http://img.wkdao.com/image/65/2020/11/03/904da7ac885fc2344e2f0683bfbd9b42.png","current_price":"100.00","num":900,"create_time":"2020-11-21 10:11:59","shelf_time":"2020-12-07 15:05:07","shelf_off_time":"","_item_type":"酒店商品"},{"item_id":7012,"item_type":1,"item_title":"湛江特产食神牌水晶凤爪冰公主子6包实惠装180g零食送泡沫箱包邮","selling_point":"我是卖点我是卖点我是卖点我是卖点我是卖点","thumb_image_path":"https://img.alicdn.com/imgextra/i4/2372362463/O1CN01S8d9uD1U4652AB2tI_!!2372362463.jpg","current_price":"39.80","num":75550,"create_time":"2020-11-15 15:54:29","shelf_time":"2020-12-09 11:43:53","shelf_off_time":"","_item_type":"实物商品"}][{"item_id":5150,"item_type":1,"item_title":"快递商品","selling_point":"","thumb_image_path":"https://cbu01.alicdn.com/img/ibank/2020/053/860/17218068350_609132103.jpg","current_price":"12.00","num":79,"create_time":"2020-05-26 17:34:34","shelf_time":"2020-11-27 10:45:45","shelf_off_time":"","_item_type":"实物商品"},{"item_id":5130,"item_type":1,"item_title":"3333","selling_point":"","thumb_image_path":"http://5b0988e595225.cdn.sohucs.com/q_70,c_zoom,w_640/images/20180829/5c52764eeb0246ec8887e669374fc16e.jpeg","current_price":"11.00","num":78,"create_time":"2020-05-23 10:17:36","shelf_time":"2020-10-14 21:09:29","shelf_off_time":"","_item_type":"实物商品"},{"item_id":5126,"item_type":1,"item_title":"平邮商品","selling_point":"","thumb_image_path":"http://5b0988e595225.cdn.sohucs.com/q_70,c_zoom,w_640/images/20180829/5c52764eeb0246ec8887e669374fc16e.jpeg","current_price":"90.00","num":1396,"create_time":"2020-05-20 10:35:18","shelf_time":"2020-12-05 16:42:57","shelf_off_time":"","_item_type":"实物商品"},{"item_id":7035,"item_type":1,"item_title":"贡献值测试（勿删）","selling_point":"","thumb_image_path":"http://img.wkdao.com/image/65/2020/12/03/94456288f8844e4abd7f67b1eef3540f.png","current_price":"200.00","num":93,"create_time":"2020-12-09 10:09:06","shelf_time":"2020-12-09 13:23:54","shelf_off_time":"","_item_type":"实物商品"},{"item_id":7034,"item_type":1,"item_title":"贡献值测试（倪克松专用）","selling_point":"43124313","thumb_image_path":"http://img.alicdn.com/imgextra/i1/595412874/O1CN01Qwle3X1X6Kr4HCqCs_!!595412874.jpg","current_price":"100.00","num":1243,"create_time":"2020-12-08 16:10:22","shelf_time":"2020-12-09 11:19:53","shelf_off_time":"","_item_type":"实物商品"},{"item_id":7033,"item_type":1,"item_title":"供应商商品","selling_point":"","thumb_image_path":"http://img.wkdao.com/image/65/2020/11/13/8b51f92a808a8174e20bfca51fa98da5.jpg","current_price":"60.00","num":137,"create_time":"2020-12-04 10:28:00","shelf_time":"2020-12-08 14:24:18","shelf_off_time":"","_item_type":"实物商品"},{"item_id":7028,"item_type":4,"item_title":"酒店测试","selling_point":"","thumb_image_path":"http://img.wkdao.com/image/65/2020/11/03/904da7ac885fc2344e2f0683bfbd9b42.png","current_price":"100.00","num":900,"create_time":"2020-11-21 10:11:59","shelf_time":"2020-12-07 15:05:07","shelf_off_time":"","_item_type":"酒店商品"},{"item_id":7012,"item_type":1,"item_title":"湛江特产食神牌水晶凤爪冰公主子6包实惠装180g零食送泡沫箱包邮","selling_point":"我是卖点我是卖点我是卖点我是卖点我是卖点","thumb_image_path":"https://img.alicdn.com/imgextra/i4/2372362463/O1CN01S8d9uD1U4652AB2tI_!!2372362463.jpg","current_price":"39.80","num":75550,"create_time":"2020-11-15 15:54:29","shelf_time":"2020-12-09 11:43:53","shelf_off_time":"","_item_type":"实物商品"}],
                booleanOption:  [
                    {
                        key: 1,
                        name: '显示'
                    },
                    {
                        key: 0,
                        name: '隐藏'
                    },
                ],
                cartList: [
                    {
                        key: 1,
                        name: '购物车图标',
                        image_path: ''
                    },
                    {
                        key: 2,
                        name: '加号'
                    },
                ],
                badgeList: [
                    {
                        key: 0,
                        name: '无',
                        image_path:''
                    },
                    {
                        key: 1,
                        name: '新品',
                        image_path: 'https://img.qianhuituan.cn/uploads/images/202006/29/FBytqwCIMbjv0QUCmdBdhw2BlTNoKWkNFaJgVwKm.png'
                    },
                    {
                        key: 2,
                        name: '热卖',
                        image_path: 'https://img.qianhuituan.cn/uploads/images/202006/29/Wo5VRQd3oyk69owjeOlslkKwoq1MJhwXYlnaoZJ9.png'
                    },
                    {
                        key: 3,
                        name: 'NEW',
                        image_path: 'https://img.qianhuituan.cn/uploads/images/202006/29/tVLDvUsNw1B5wo7J15wmoTjsYPXkK4ikCFavhynv.png'
                    },
                    {
                        key: 4,
                        name: 'HOT',
                        image_path: 'https://img.qianhuituan.cn/uploads/images/202006/29/tVLDvUsNw1B5wo7J15wmoTjsYPXkK4ikCFavhynv.png'
                    },
                    {
                        key: 5,
                        name: '自定义上传',
                        image_path:''
                    },
                ],
                listTypes: [
                    {
                        key: 1,
                        name: '详细列表'
                    },
                    {
                        key: 2,
                        name: '大图'
                    },
                    {
                        key: 3,
                        name: '一行两个'
                    },
                    {
                        key: 4,
                        name: '一行三个'
                    },
                ],
                group_good_list:[]
            }
        },
        props: ["belongIndex", "currentIndex", "isGroup", "content"],
        components: {
            "good-item": GoodItem,
            draggable: draggable,
            "goods-group-form": GoodsGroupForm,
            'edit-panel': EditPanel
        },

        watch: {
            content(n) {
                trace(n, 'content')
                this.init(n);
            },
            currentIndex: function (n) {
                if (n === -1) {
                    this.$emit("update:content", this.config);
                }
            },
            'config.showCount'() {
                this.config.goods = this.group_good_list.slice(0, this.config.showCount);
            }
        },
        created() {
            trace(this.content, 'created')
            this.init(this.content);
        },
        methods: {
            init($data) {
                // this.config = __merge(this.config,n, true)
                __merge(this.config, $data, true)
            },
            onClick_deleteGood($index) {
                this.config.goods.splice($index, 1);
            },
            onClick_showGoodsGroupPop($type) {
                this.type = $type;
                this.goodsGroupForm.visible = true;
            },
            handleGoodsGroupAddConfirm(groups) {
                this.config.goodsGroupId = groups.group_id;
                this.config.goodsGroupName = groups.group_title;
                this.$pcTpl.axios({
                    url: '/Item/itemListWithGroup',
                    method: 'get',
                    params: {
                        group_id: groups.group_id,
                    }
                }).then(res => {
                    if (res.status == 1) {
                        this.group_good_list = __merge([], res.data);
                        this.config.goods = this.group_good_list.slice(0, this.config.showCount);
                    }
                });
            },
            removeGoodsGroup() {
                this.config.goodsGroupId = "";
                this.config.goodsGroupName = "";
                this.config.goods = [];
                this.group_good_list = [];
            },
            onClick_showGoodsPop() {
                let selectList = JSON.parse(JSON.stringify(this.config.goods));
                this.$pcTpl.goodsOnShelvesInstance
                    .popup({
                        cacheList: selectList || []
                    })
                    .then(goods => {
                        this.config.goods = [...goods];
                    })
                    .catch(() => { });
            },
            onchange_getBadgeImg($item) {
                this.config.badge_path = $item.image_path;
            },
            onChange_chooseImg($imges) {
                this.config.badge_path = $image;
            },
            onChange_showCount($val) {
                if ($val > 10) {
                    this.config.showCount = 10;
                }
            }
        }
    }
</script>

<style lang="scss" scoped>
    .edit-box .goods_flex {
        display: flex;
        flex-wrap: wrap;
    .wrapper {

        span {
            max-width: 400px;
            display: flex;
            flex-wrap: wrap;
        }

    }
    .flexs {
        display: flex;
    }

    }
  .goods-tuan {
    min-height: 100px;
  }
</style>
