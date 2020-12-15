<template>
    <div>
        <div
            slot="group-title"
            v-if="config.title"
            class="group-title"
        >
            <div
                class="custom-title"
                :style="{'background':config.titleBackgroundColor,'color':config.titleColor,'text-align':config.titleAlign}"
            >
        <span
            class="title"
            :style="{'font-size':config.titleFontsize}"
        >{{config.title}}</span>
            </div>
            <!-- 商品简介区域 -->
            <div v-html="config.decorateHtml"></div>
        </div>
        <slot name="goods-list"></slot>
    </div>
</template>
<script>
    export default {
        name: "goodsComponent",
        props: {
            config: {
                type: Object
            }
        }
    }
</script>

<style scoped>
    .group-title>div {
        padding: 10px 0px;
    }
</style>
