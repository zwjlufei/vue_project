<template>
    <div class="myCoin">
        <div class="my-coin-wrap">
            <div class="my_coin_text font-32 color-fff">我的福币</div>
            <div class="my-coin-num">
                <div class="mt_coin_count font-94 color-fff">{{coin.fen}}</div>
                <img src="http://cdn.ayi800.com/image/png/vue_coincoin.png" class="coin-img">
            </div>
            <div class="earn-coin">
                <router-link tag="div" to="/storeEarnCoin" class="earn-coin-btn">赚取福币</router-link>
            </div>
        </div>
        <div class="integral-record">
            <img src="http://cdn.ayi800.com/image/png/vue_integralintegral.png">
            <div class="record-text font-34 color-444">积分记录</div>
        </div>
        <div class="integral-record-list-wrap">
            <ul class="integral-record-list">
                <li v-for="(item,index) in coin.fenlog" :key="index">
                    <div class="integral-record-content">
                        <div class="integral-record-title font-34 color-444">{{item.note}}</div>
                        <div class="integral-record-time font-26 color-a5a">{{item.created_at}}</div>
                    </div>
                    <div class="integral-record-num font-36 color-444">{{coin_num(item.fen)}}</div>
                </li>
            </ul>
            <div class="load-more" @click="load_more">
                <div class="load-more-text" v-show="!loading">{{loading_text}}</div>
                <mt-spinner type="triple-bounce" style="padding: .33rem 0;" v-show="loading"></mt-spinner>
            </div>
        </div>
    </div>
</template>

<script>
    import { Indicator , Spinner} from 'mint-ui';
    import {timeout,title} from '../common/Tools'
    export default {
        name: "my-coin",
        data(){
            return {
                coin : {},
                loading : false,
                loading_text : '点击加载更多',
                page : 1
            }
        },
        mounted(){
            title('我的福币')
            this.getMycon()
        },
        methods:{
            //我的福币数据
            getMycon(){
                Indicator.open('加载中...')
                this.$http(`${this.URL}/jmember/fen?id=${this.$route.query.id}`)
                    .then(res=>{
                        Indicator.close();
                        if (res.data.code == 0){
                            var data = res.data.data
                            this.coin = data
                        }
                    })
                    .catch(err=>{
                        Indicator.close();
                        console.log(err)
                        timeout(err)
                    })
            },
            //如果是-5格式正常返回 如果是5则添加 '+' 在返回
            coin_num(num){
                var flag = num.slice(0,1)
                if (flag == '-'){
                    return num
                }else{
                    return '+' + num
                }
            },
            //积分记录加载更多
            load_more(){
                if (this.loading_text == '没有更多了'){
                    return
                }
                this.loading = true
                this.$http(`${this.URL}/jmember/fen?id=${this.$route.query.id}&p=${this.page}`)
                    .then(res=>{
                        this.loading = false
                        if (res.data.code == 0){
                            var data = res.data.data.fenlog
                            if (!data){
                                this.loading_text = '没有更多了'
                            }else{
                                if (data.length < 5){
                                    this.loading_text = '没有更多了'
                                }
                                this.coin.fenlog.push(...data)
                                this.page++
                            }
                        }
                    })
                    .catch(err=>{
                        this.loading = false
                        console.log(err)
                        timeout(err)
                    })
            }
        }
    }
</script>

<style scoped lang="less">
    @import '../../assets/css/store';
    .my-coin-wrap{
        position: relative;
        width: @max_width;
        height: 3.2rem;
        background: url("http://cdn.ayi800.com/image/png/vue_coin_bgcbg.png") no-repeat;
        background-size: 100%;
    }
    .my_coin_text{
        padding-top: .7rem;
        text-align: center;
    }
    .coin-img{
        width: .6rem;
        height: .67rem;
    }
    .my-coin-num{
        display: flex;
        justify-content: center;
        align-items: center;
        margin-top: .2rem;
    }
    .mt_coin_count{
        margin-right: .17rem;
    }
    .earn-coin{
        position: absolute;
        top: .28rem;
        right: .24rem;
        background-color: #fe7072;
    }
    .earn-coin-btn{
        width: 1.42rem;
        height: .5rem;
        border: 1px solid @color-fff;
        display: flex;
        align-items: center;
        justify-content: center;
        color: @color-fff;
        border-radius: .1rem;
    }
    .integral-record{
        display: flex;
        box-sizing: border-box;
        padding-left: .36rem;
        height: 1.2rem;
        align-items: center;
        border-bottom: 1px solid @color-f3f;
        img{
            width: .36rem;
            height: .36rem;
            margin-right: .15rem;
        }
        .record-text{
            font-weight: 900;
        }
    }
    .integral-record-list-wrap{
        .integral-record-list{
            li{
                border-bottom: 1px solid @color-f3f;
                box-sizing: border-box;
                display: flex;
                justify-content: space-between;
                align-items: center;
                padding: .3rem .58rem;
            }
        }
    }
    .integral-record-content{

    }
    .integral-record-title{
        font-weight: 500;
    }
    .integral-record-time{
        margin-top: .24rem;
    }
    .integral-record-num{
        font-weight: 400;
    }
    .load-more-text{
        padding: .3rem 0;
        text-align: center;
        font-size: @font-24;
        color: @color-a5a;
    }
    .load-more{
        display: flex;
        justify-content: center;
    }
</style>
