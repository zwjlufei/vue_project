<template>
    <div class="conversionRule">
        <div class="conversionRule-banner-wrap">
            <img src="http://cdn.ayi800.com/image/png/vue_coin_bannercoin_banner.png">
        </div>
        <div class="conversionRule-list-wrap">
            <ul class="conversionRule-list">
                <li class="font-28 color-444" v-for="(item,index) in conversionRule_list" :key="index">{{index+1}}.{{item.text}}</li>
            </ul>
        </div>
    </div>
</template>
<script>
    import {title} from '../common/Tools'
    export default {
        name: "conversion-rule",
        data(){
            return {
                conversionRule_list : [
                    {text:'福币可以在积分商城兑换实物或者虚拟物品'},
                    {text:'福币可以在积分商城兑换商品物品'},
                    {text:'福币可以在积分商城兑换商品物品'},
                    {text:'福币可以在积分商城兑换商品物品'},
                    {text:'福币可以在积分商城兑换商品物品'},
                    {text:'福币可以在积分商城兑换商品物品，福币可以在积分商场兑换'}
                ]
            }
        },
        mounted(){
            title('积分规则')
        }
    }
</script>

<style scoped lang="less">
    @import '../../assets/css/store';
    .conversionRule-banner-wrap{
        margin-top: .3rem;
        box-sizing: border-box;
        padding: 0 .36rem;

        img{
            width: @max_width;
        }
    }
    .conversionRule-list-wrap{
        box-sizing: border-box;
        padding: 0 .36rem;

        .conversionRule-list{
            padding-bottom:.35rem;
            li{
                border: 1px solid @color-fe5;
                border-radius: .1rem;
                padding: .3rem .28rem;
                margin-top: .35rem;
            }
        }
    }
</style>