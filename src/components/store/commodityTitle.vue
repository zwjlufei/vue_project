<template>
    <div class="commodity">
        <div class="commodity-left">
            <div class="vertical"></div>
            <div class="commodity-title font-34 color-444">{{title}}</div>
        </div>
        <!--如果title传过来的值是妈妈专区则隐藏查看更多-->
        <div class="commodity-right" v-if="title=='妈妈专区'?false:true">
            <router-link tag="div" :to="{path:'storeCommodityList', query:{type:type}}">
                <span class="look-more font-24 color-a5a">查看更多</span>
                <span class="arrow-right"></span>
            </router-link>
        </div>
    </div>
</template>

<script>
    export default {
        name: "commodity-title",
        props:['title','type']
    }
</script>

<style scoped lang="less">
    @import "../../assets/css/store";
    .commodity{
        box-sizing: border-box;
        padding: 0 .36rem;
        display: flex;
        justify-content: space-between;
        margin-top: .56rem;
        align-items: center;
    }
    .vertical{
        width: .10rem;
        height: .34rem;
        background: linear-gradient(to right,#fe4854,#ff6d2c);
        border-radius: .10rem;
        margin-bottom: .01rem;
    }
    .commodity-title{
        font-family: @font-f;
        font-weight: 600;
        margin-left: .26rem;
    }
    .commodity-left{
        display: flex;
        align-items: center;
    }
    .arrow-right{
        display: inline-block;
        border-top: 1px solid @color-a5a;
        border-right: 1px solid @color-a5a;
        width: .15rem;
        height: .15rem;
        transform: rotate(45deg);
    }
</style>