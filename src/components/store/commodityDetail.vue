<template>
    <div class="commodityDetail">
        <div class="commodityDetail-info-wrap">
            <div class="commodityDetail-info">
                <div class="commodityDetail-info-img-content">
                    <img :src="good_detail.despic">
                </div>
                <div class="commodityDetail-info-content">
                    <div class="commodityDetail-name font-32 color-444">{{good_detail.title}}</div>
                    <div class="commodityDetail-price">
                        <span class="commodityDetail-price-num font-32 color-fe5">{{good_detail.fen}}</span>
                        <span class="commodityDetail-price-text font-24 color-fe5">福币</span>
                    </div>
                    <div class='conversion'>
                        <div class="reference-price font-26 color-a5a" >参考价：{{good_detail.retail_price}}元</div>
                        <div class="conversion-num color-fe5 font-24"  style=" white-space:nowrap; ">已兑{{good_detail.sale}}件</div>
                    </div>
                </div>
            </div>
        </div>
        <div class="commodity-detail-title">
            <span class="level"></span>
            <span class="title font-20 color-ccc">商品详情</span>
            <span class="level"></span>
        </div>
        <div class="commodity-detail-img-list">
            <div v-html="good_detail.content"></div>
        </div>
        <div class="conversion-btn-wrap">
            <div class="conversion-btn font-30" @click="show_conversion_model">兑换商品</div>
        </div>
        <div class="conversion-model-wrap" v-if="show_order_info" @touchmove.prevent>
                <div class="conversion-model-content" v-show="conversion_model">
                    <div class="conversion-model-header">
                        <div class="vertical"></div>
                        <div class="order-info-text font-34 color-444">订单信息</div>
                        <div class="close-medel" @click="close_model">
                            <img src="http://cdn.ayi800.com/image/png/vue_close_model%E5%8F%89@2x.png">
                        </div>
                    </div>
                    <div class="order-info-content">
                        <div class="conversion-good font-30 color-444">兑换商品：{{good_detail.title}}</div>
                        <div class="my-coin font-30 color-444">我的福币： {{customer.fen}}福币</div>
                        <div class="consume-coin">
                            <span class="consume-coin-text font-30 color-444">本次消费：</span>
                            <span class="consume-coin-num font-30 color-fe5">{{good_detail.fen}}福币</span>
                        </div>
                    </div>
                    <div class="conversion-button-wrap">
                        <div class="conversion-button" @click="conversion">兑换</div>
                    </div>
                </div>
            <div class="conversion-model-content" v-show="conversion_success">
                <div class="conversion-status-wrap">
                    <div class="conversion-status font-30 color-444">兑换成功</div>
                    <div class="close-medel" @click="close_conversion_success">
                        <img src="http://cdn.ayi800.com/image/png/vue_close_model%E5%8F%89@2x.png">
                    </div>
                </div>
                <div class="conversion-status-img">
                    <img src="http://cdn.ayi800.com/image/png/vue_successsuccess.png">
                </div>
                <div class="myorder-wrap">
                    <div @click="goMyorder" class="mtorder-btn">我的订单</div>
                </div>
                <div class="order-success-text font-24 color-a5a">等待发货，可以去我的订单中查看订单进度</div>
            </div>
            <div class="conversion-model-content" v-show="conversion_faild">
                <div class="conversion-status-wrap">
                    <div class="conversion-status font-30 color-444"> {{msg}}</div>
                    <div class="close-medel" @click="close_conversion_faild">
                        <img src="http://cdn.ayi800.com/image/png/vue_close_model%E5%8F%89@2x.png">
                    </div>
                </div>
                <div class="conversion-status-img">
                    <img src="http://cdn.ayi800.com/image/png/vue_faildfaild.png">
                </div>
                <div class="myorder-wrap">
                    <router-link tag="div" to="/storeEarnCoin" class="mtorder-btn">积分策略</router-link>
                </div>
                <div class="order-success-text font-24 color-a5a">去查看积分获取策略</div>
            </div>
        </div>
    </div>
</template>

<script>
    import {Indicator} from 'mint-ui';
    import {user_status,timeout,title} from "../common/Tools";
    export default {
        name: "commodity-detail",
        data(){
            return {
                show_order_info:false,
                conversion_model :false,
                conversion_success : false,
                conversion_faild : false,
                good_detail:{},
                customer : {},
                msg : ''
            }
        },
        mounted(){
            title('商品详情')
            this.getGoodsDetail(this.$route.query.id,this.$route.query.customer_id)
            //如果正常进入详情页是没有status值的  如果有status值说明是从兑换页面跳转过来的  则判断是兑换成功还是失败
            if (this.$route.query.status){
                //失败
                if (this.$route.query.code != 0){
                    this.show_order_info = true
                    this.conversion_faild = true
                    this.msg = this.$route.query.msg
                }else {
                    //成功
                    this.show_order_info = true
                    this.conversion_success = true
                }
            }
        },
        methods:{
            //获取详情页数据
            getGoodsDetail(id,customer_id){
                Indicator.open('加载中...')
                this.$http(`${this.URL}/jmember/detail?id=${id}&customer_id=${customer_id}`)
                    .then(res=>{
                        Indicator.close()
                        if (res.data.code == 0){
                            this.good_detail = res.data.data
                            this.customer = res.data.data.customer
                        }
                    })
                    .catch(err=>{
                        Indicator.close()
                        console.log(err)
                        timeout(err)
                    })
            },
            //点击兑换要先判断有没有customer_id 没有则让用户去注册
            show_conversion_model(){
                user_status()
                    .then(res=>{
                        this.show_order_info = true
                        this.conversion_model = true
                    })
                    .catch(openid=>{
                        window.location.href = `http://test.www.ayi800.com/wechat/bindwxuid/${openid}?origin=memberCenter&v=1.2`
                    })
            },
            //关闭订单信息弹层
            close_model(){
                this.show_order_info = false
                this.conversion_model = false
            },
            //关闭兑换成功弹层
            close_conversion_success(){
                this.show_order_info = false
                this.conversion_success = false
            },
            //关闭兑换失败弹层
            close_conversion_faild(){
                this.show_order_info = false
                this.conversion_faild = false
            },
            //跳转填写信息页面
            conversion(){
                if (this.customer.fen < this.good_detail.fen){
                    this.show_order_info = true
                    this.conversion_faild = true
                    this.msg = '积分不足'
                }else{
                    this.$router.push({path:'/storeEditInfo',query:{id:this.good_detail.id,customer_id:this.customer.id}})
                }
            },
            //跳转我的订单页面
            goMyorder(){
                this.$router.push({
                    path : '/storeMyConversion',
                    query : {id:this.$route.query.customer_id}
                })
            }
        }
    }
</script>
<style lang="less">
    .commodity-detail-img-list {
        img{
            width: 100%;
        }
        p{
            text-indent:2em
        }
    }
</style>
<style scoped lang="less">
    @import '../../assets/css/store';
    //v-enter 过度开始状态
    //v-enter-active 过度变化的过程
    //v-leave 过度离开的状态
    //v-leave-active 过度离开的过程
    .commodity-detail-img-list{
        padding:.36rem;
    }
    .order-info-text{
        font-weight: 900;
    }
    .commodityDetail{
        padding-bottom: 1.3rem;
    }
    .commodityDetail-info{
        display: flex;
        box-sizing: border-box;
        padding: .3rem .36rem .37rem;
        .commodityDetail-info-img-content{
            img{
                width: 2.44rem;
                height: 1.75rem;
            }
        }
        .commodityDetail-info-content{
            flex: 1;
            padding-left: .56rem;
            display: flex;
            flex-direction: column;
            justify-content: space-between;
        }
    }
    .commodityDetail-price{
        margin-bottom: .3rem;
    }
    .conversion{
        display: flex;
        justify-content: space-between;
    }
    .reference-price{
        text-decoration:line-through;
    }
    .conversion-num{
        padding: 0 .1rem;
        height: .37rem;
        border: 1px solid @color-fe5;
        border-radius: .1rem;
        display: flex;
        justify-content: center;
        align-items: center;
    }
    .commodity-detail-title{
        width: @max_width;
        height: .45rem;
        background-color: @color-f3f;
        display: flex;
        justify-content: center;
        align-items: center;
    }
    .level{
        display: inline-block;
        width: .4rem;
        height: 1px;
        background-color: @color-ccc;
    }
    .title{
        margin: 0 .1rem;
    }
    .conversion-btn-wrap{
        width: @max_width;
        position: fixed;
        left: 0;
        bottom: 0;
    }
    .conversion-btn{
        height: 1rem;
        background: linear-gradient(to right,#fe4854,#ff6d2c);
        color: @color-fff;
        display: flex;
        align-items: center;
        justify-content: center;
    }
    .conversion-model-wrap{
        position: fixed;
        top: 0;
        left: 0;
        bottom: 0;
        right: 0;
        width: @max_width;
        height: @max_height;
        background: rgba(0,0,0,.5);
    }
    .conversion-model-content{
        position: absolute;
        width: @max_width;
        height: 6.95rem;
        background-color: @color-fff;
        bottom: 0;
        left: 0;
    }
    .conversion-model-header{
        position: relative;
        border-bottom: 1px solid @color-f3f;
        display: flex;
        align-items: center;
        padding-top: .85rem;
        padding-left: .36rem;
        padding-bottom: .1rem;
    }
    .vertical{
        width: .10rem;
        height: .34rem;
        background: linear-gradient(to right,#fe4854,#ff6d2c);
        border-radius: .10rem;
        margin-bottom: .01rem;
        margin-right: .26rem;
    }
    .close-medel{
        position: absolute;
        top: .26rem;
        right: .37rem;
        img{
            width: .32rem;
            height: .32rem;
        }
    }
    .conversion-good{
        margin-top: .75rem;
    }
    .my-coin{
        margin: .67rem 0;
    }
    .order-info-content{
        padding-left: .36rem;
    }
    .conversion-button-wrap{
        margin-top: .85rem;
    }
    .conversion-button{
        width: 6.76rem;
        height: .7rem;
        background: linear-gradient(to right,#fe4854,#ff6d2c);
        border-radius: .1rem;
        display: flex;
        justify-content: center;
        align-items: center;
        margin: 0 auto;
        color: @color-fff;
        font-size: @font-30;
    }
    .conversion-status-wrap{
        position: relative;
    }
    .conversion-status{
        padding: .89rem 0 .73rem;
        text-align: center;
    }
    .conversion-status-img {
        display: flex;
        justify-content: center;
        & img{
            width: 3.67rem;
            height: 2.56rem;
        }
    }
    .myorder-wrap{
        display: flex;
        justify-content: center;
        margin-top: .4rem;
        & .mtorder-btn{
            width: 2.7rem;
            height: .7rem;
            background: linear-gradient(to right,#fe4854,#ff6d2c);
            display: flex;
            justify-content: center;
            align-items: center;
            color: @color-fff;
            font-size: @font-28;
            border-radius: .1rem;
        }
    }
    .order-success-text{
        text-align: center;
        font-size: @font-24;
        color: @color-a5a;
        margin-top: .24rem;
    }
</style>