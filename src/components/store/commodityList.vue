<template>
    <div class="commodityList">
        <div class="commodity-list-wrap">
            <ul class="commodity-list">
                <li @click="go_goodDetail(item.id)"  v-for="(item,index) in commodity_list" :key="index">
                    <div class="commodity-img-wrap">
                        <img :src="item.despic">
                    </div>
                    <div class="commodity-info">
                        <p class="commodity-name font-32 color-444">{{item.title}}</p>
                        <div class="need-coin color-fe5 font-26">
                            {{item.fen}}福币
                        </div>
                        <div class="price-wrap">
                            <p class="reference-price color-a5a font-26">市场参考价: {{item.retail_price}}元</p>
                            <span class ="arrow-right"></span>
                        </div>
                    </div>
                </li>
            </ul>
            <div class="load-more" @click="load_more" v-show="load_wrap">
                <div class="load-more-text" v-show="!loading">{{loading_text}}</div>
                <mt-spinner type="triple-bounce" style="padding: .33rem 0;" v-show="loading"></mt-spinner>
            </div>
        </div>
    </div>
</template>

<script>
    import {Indicator} from 'mint-ui';
    import {timeout,title} from '../common/Tools'
    export default {
        name: "commodity-list",
        data(){
            return {
                commodity_list : [],
                loading_text : '点击加载更多',
                loading : false,
                page : 1,
                load_wrap : false
            }
        },
        mounted(){
            title('商品列表')
            this.getMoreGoods(this.$route.query.type)
        },
        methods:{
            //获取商品列表页数据  根据传过来的type类型不同 请求数据不同   1:会员专享 2:儿童专区
            getMoreGoods(num){
                Indicator.open('加载中...')
                this.$http(`${this.URL}/jmember/shopmore?class=${num}`)
                    .then(res=>{
                        Indicator.close()
                        if (res.data.code == 0){
                            this.commodity_list = res.data.data
                            this.load_wrap = true
                        }

                    })
                    .catch(err=>{
                        Indicator.close()
                        console.log(err)
                        timeout(err)
                    })
            },
            //跳转商品详情页
            go_goodDetail(id){
                var user_id = JSON.parse(sessionStorage.getItem('user_id',JSON.stringify(user_id)))
                var customer_id = user_id.customer_id?user_id.customer_id:''
                this.$router.push({
                    path : '/storeCommodityDetail',
                    query : {id,customer_id}
                })
            },
            //加载更多
            load_more(){
                if (this.loading_text == '没有更多了'){
                    return
                }
                this.loading = true
                this.$http(`${this.URL}/jmember/shopmore?class=${this.$route.query.type}&p=${this.page}`)
                    .then(res=>{
                        this.loading = false
                        if (res.data.code == 0){
                            if (!res.data.data){
                                this.loading_text = '没有更多了'
                            }else{
                                if (res.data.data.length < 10){
                                    this.loading_text = '没有更多了'
                                }
                                this.commodity_list.push(...res.data.data)
                                this.page++
                            }
                        }
                    })
                    .catch(err=>{
                        this.loading = false
                        console.log(err)
                        timeout(err)
                    })
            },
        }
    }
</script>

<style scoped lang="less">
    @import '../../assets/css/store';
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
    .commodity-list-wrap{
        .commodity-list{
            li{
                box-sizing: border-box;
                padding: .25rem .36rem .35rem;
                display: flex;
                border-bottom:1px solid @color-f3f ;
                .commodity-img-wrap{
                    img{
                        width: 2.42rem;
                        height: 2.12rem;
                    }
                }
                .commodity-info{
                    position: relative;
                    flex: 1;
                    display: flex;
                    flex-direction: column;
                    justify-content: space-between;
                    box-sizing: border-box;
                    padding-left: .55rem;
                    .need-coin{
                        position: absolute;
                        width: 2.36rem;
                        height: .42rem;
                        border: 1px solid @color-fe5;
                        display: flex;
                        justify-content: center;
                        align-items: center;
                        bottom: .53rem;
                        left: .55rem;
                        border-radius: .05rem;
                    }
                    .price-wrap{
                        display: flex;
                        justify-content: space-between;
                        align-items: center;
                        .arrow-right{
                            display: inline-block;
                            border-top: 1px solid @color-a5a;
                            border-right: 1px solid @color-a5a;
                            width: .15rem;
                            height: .15rem;
                            transform: rotate(45deg);
                        }
                    }
                }
            }
        }
    }
</style>