<template>
    <div class="index">
        <div class="banner-wrap">
            <!--<mt-swipe :auto="4000" style="height: 3.2rem" :showIndicators="false" :defaultIndex="defaultIndex" @change="handleChange">-->
                <!--<mt-swipe-item v-for="(item,index) in swiper_list" :key="index">-->
                    <!--<img :src="item.src" class="swiper-img">-->
                <!--</mt-swipe-item>-->
            <!--</mt-swipe>-->
            <!--<div class="indicator">-->
                <!--<ul class="indicator-list">-->
                    <!--<li :class="index==defaultIndex?'active-indicator':''" v-for="(item,index) in swiper_list"></li>-->
                <!--</ul>-->
            <!--</div>-->
            <Banner :banner_list="swiper_list" v-if="banner_show"></Banner>
        </div>
        <div class="server-wrap">
            <ul class="server-list">
                <li v-for="(item,index) in server_list" :key="index" @click="goServices(item.path)">
                    <img :src="item.img" >
                    <p class="server-title font-24 color-444">{{item.title}}</p>
                </li>
            </ul>
        </div>
        <div class="commodity-wrap">
            <Commodity title="会员专享" type="1"></Commodity>
            <div class="commodity-content">
                <ul class="commodity-list">
                    <li @click="go_goodDetail(item.id)" v-for="(item,index) in commodity_list" :key="index" :style="index==0?'margin-left: .36rem':''">
                        <img :src="item.despic">
                        <p class="commodity-name font-28 color-444" style=" white-space:nowrap; ">{{item.title}}</p>
                        <p class="commodity-price font-24 color-fe5">{{item.fen}}福币</p>
                    </li>
                </ul>
            </div>
        </div>
        <div class="commodity-wrap">
            <Commodity title="儿童乐园" type="2"></Commodity>
            <div class="commodity-content">
                <ul class="commodity-list">
                    <li @click="go_goodDetail(item.id)" v-for="(item,index) in children" :key="index" :style="index==0?'margin-left: .36rem':''">
                        <img :src="item.despic">
                        <p class="commodity-name font-28 color-444"  style=" white-space:nowrap; ">{{item.title}}</p>
                        <p class="commodity-price font-24 color-fe5">{{item.fen}}福币</p>
                    </li>
                </ul>
            </div>
        </div>
        <div class="commodity-wrap">
            <Commodity title="妈妈专区"></Commodity>
            <div class="mom-prefecture">
                <ul class="mom-prefecture-list">
                    <li @click="go_goodDetail(item.id)" v-for="(item,index) in mother" :key="index">
                        <div class="mom-prefecture-img-wrap">
                            <img :src="item.despic">
                        </div>
                        <div class="mom-prefecture-commodity-info">
                            <p class="mom-prefecture-commodity-name font-30 color-444">{{item.title}}</p>
                            <p class="mom-prefecture-commodity-price font-26 color-fe5">{{item.fen}}福币</p>
                            <p class="mom-prefecture-bazaar-price font-26 color-a5a">市场参考价：{{item.retail_price}}元</p>
                        </div>
                    </li>
                </ul>
            </div>
        </div>
        <div class="more-btn-wrap">
            <div class="more-btn font-24 color-a5a" @click="more_goods">{{more_goods_text}}</div>
        </div>
        <div class="my-order">
            <div class="my-order-btn" @click="go_Myorder">
                <img src="http://cdn.ayi800.com/image/png/vue_my_orderorder.png" class="order-img">
            </div>
        </div>
    </div>
</template>

<script>
    import { Swipe, SwipeItem , Indicator ,MessageBox} from 'mint-ui';
    import Banner from '../common/banner'
    import Commodity from './commodityTitle'
    import {user_status,timeout,title} from '../common/Tools'
    export default {
        data(){
            return {
                defaultIndex : 0,
                swiper_list : [],
                banner_show : false,
                server_list:[
                    {
                        img:'http://cdn.ayi800.com/image/png/vue_server_1%E6%88%91%E7%9A%84%E7%A6%8F%E5%B8%81.png',
                        title : '我的福币',
                        path:'/storeMyCoin'
                    },
                    {
                        img:'http://cdn.ayi800.com/image/png/vue_server_2%E8%B5%9A%E5%8F%96%E7%A6%8F%E5%B8%81.png',
                        title : '赚取福币',
                        path:'/storeEarnCoin'
                    },
                    {
                        img:'http://cdn.ayi800.com/image/png/vue_server_3%E5%85%91%E6%8D%A2%E8%A7%84%E5%88%99.png',
                        title : '兑换规则',
                        path:'/storeConversionRule'
                    },
                ],
                commodity_list:[],
                children:[],
                mother:[],
                more_goods_text : '查看更多商品',
                page : 1
            }
        },
        mounted(){
            title('首页')
            //获取跳转携带过来的openid和customer_id
            var user_id = this.$route.query
            console.log(user_id)
            //存入openid和customer_id
            sessionStorage.setItem('user_id',JSON.stringify(user_id))
            this.getIndexData()
        },
        methods:{
            //获取首页banner、会员、儿童、妈妈专区
            getIndexData(){
                Indicator.open('加载中...')
                this.$http(`${this.URL}/jmember/shop`)
                    .then((res)=>{
                        Indicator.close();
                        if (res.data.code == 0){
                            console.log(res.data.data)
                            var data = res.data.data
                            this.swiper_list = data.banner
                            this.commodity_list = data.member
                            this.children = data.happy
                            this.mother = data.mama
                            this.banner_show = true
                        }
                    })
                    .catch(err=>{
                        Indicator.close();
                        console.log(err)
                        timeout(err)
                    })
            },
            //跳转订单详情
            go_Myorder(){
                //判断是否有customer_id如果没有就跳转注册页面
                user_status()
                    .then(res=>{
                        this.$router.push({path : '/storeMyConversion' , query:{id:res.customer_id}})
                    })
                    .catch(openid=>{
                        window.location.href = `http://test.www.ayi800.com/wechat/bindwxuid/${openid}?origin=memberCenter&v=1.2`
                    })
            },
            //跳转三个功能页面
            goServices(path){
                //判断如果没有customer_id跳转注册页，有的话就正常跳转
                if (path == '/storeMyCoin'){
                    user_status(path)
                        .then(res=>{
                            this.$router.push({path:path,query:{id:res.customer_id}})
                        })
                        .catch(openid=>{
                            window.location.href = `http://test.www.ayi800.com/wechat/bindwxuid/${openid}?origin=memberCenter&v=1.2`
                        })
                }else {
                    this.$router.push({path : path})
                }
            },
            //跳转商品详情页    id:商品id customer_id:用户id没有就带空
            go_goodDetail(id){
                var user_id = JSON.parse(sessionStorage.getItem('user_id'))
                var customer_id = user_id.customer_id?user_id.customer_id:''
                this.$router.push({path : '/storeCommodityDetail' ,query:{id,customer_id}})
            },
            //妈妈专区加载更多
            more_goods(){
                //防止已经没有数据了 再次发送请求
                if (this.more_goods_text == '没有更多了'){
                    return
                }
                Indicator.open('加载中...')
                this.$http(`${this.URL}/jmember/shopmore?class=3&p=${this.page}`)
                    .then(res=>{
                        Indicator.close()
                        if (res.data.code == 0){
                            console.log(res)
                            //如果没有数据则返回null 更改text状态
                            if (!res.data.data){
                                this.more_goods_text = '没有更多了'
                            }else{
                                //每次返回十条数据，如果数据返回小于十条，说明下一次请求则为null
                                if (res.data.data.length < 10){
                                    this.more_goods_text = '没有更多了'
                                }
                                this.mother.push(...res.data.data)
                                this.page++
                            }

                        }
                    })
                    .catch(err=>{
                        Indicator.close()
                        console.log(err)
                        timeout(err)
                    })

            },
            //更改swiper指示器为swiper的index
            handleChange(e){
                this.defaultIndex = e
            }
        },
        components:{
            Commodity,
            Banner
        }
    }
</script>

<style scoped lang="less">
    @import '../../assets/css/store.less';
    .index{
        padding-bottom:.3rem;
    }
    .mint-msgbox-cancel{
        border-right: 1px solid #ddd!important;
    }
    .banner-wrap{
        width: @max_width;
        box-sizing: border-box;
        margin-top: .4rem;
    }
    .swiper-img{
        width: @max_width;
        height: @max_height;
    }
    .indicator-list{
        display: flex;
        justify-content: center;
        margin-top: .28rem;
        li{
            width: 0.16rem;
            height: 0.16rem;
            border-radius: 50%;
            background-color: #e1e1e1;
            margin-right: .22rem;
            transition: .5s all linear;
        }
        .active-indicator{
            width: .38rem;
            height: .16rem;
            background:linear-gradient(to right,#fe4854,#ff6d2c);
            border-radius: .3rem;
        }
    }
    .server-wrap{
        box-sizing: border-box;
        padding: 0 .36rem;
    }
    .server-list{
        display: flex;

        li{
            padding: .35rem 0 .28rem;
            width: 33.333%;
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: space-between;
            .server-title{
                margin-top: .23rem;
            }
            img{
                width: .6rem;
            }
        }
    }
    .commodity-wrap{
        border-top: 1px solid #f3f3f3;
    }
    .commodity-list{
        overflow-x: scroll;
        margin: .34rem 0 .29rem;
        display: inline-flex;
        li{
            text-align: center;
            padding: .2rem .17rem .24rem;
            box-shadow: 0 0 .2rem rgba(0,0,0,.1);
            margin-top: .1rem;
            margin-bottom: .1rem;
            margin-right: .4rem;
            border-radius: .1rem;
            img{
                width: 1.96rem;
                height: 1.44rem;
            }
            .commodity-name{
                margin: .26rem 0 .14rem;
            }
        }
    }
    .commodity-content{
        overflow: auto;
        -webkit-overflow-scrolling:touch;
    }
    ::-webkit-scrollbar {
        display: none;
    }
    .mom-prefecture-list{
        padding: 0 .36rem;
        li{
            display: flex;
            margin-top: .34rem;
            box-shadow: 0 0 .2rem rgba(0,0,0,.1);
            padding: .2rem 0;
            .mom-prefecture-img-wrap{

                img{
                    width: 2.5rem;
                    height: 1.5rem;
                    margin-left: .2rem;
                }
            }
            .mom-prefecture-commodity-info{
                flex: 1;
                padding-left: .67rem;
                display: flex;
                flex-direction: column;
                justify-content: space-around;
            }
        }
    }
    .more-btn-wrap{
        box-sizing: border-box;
        padding: 0 .36rem;
    }
    .more-btn{
        height: .8rem;
        display: flex;
        justify-content: center;
        align-items: center;
        border: 1px solid @color-a5a;
        margin-top: .35rem;
        margin-bottom: .48rem;
    }
    .order-img{
        width: .95rem;
        height: .95rem;
    }
    .my-order{
        position: fixed;
        right: .35rem;
        bottom: 1.4rem;
    }
</style>