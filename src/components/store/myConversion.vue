<template>
    <div class="myConversion">
        <div class="myConversion-wrap">
            <ul class="myConversion-list">
                <router-link tag="li" :to="{path:'/storeOrderDetail',query:{id:item.id}}" v-for="(item,index) in myconversion" :key="index">
                    <div class="myConversion-item-img">
                        <img :src="item.despic" >
                    </div>
                    <div class="myConversion-item-info">
                        <div class="myConversion-item-name font-32 color-444">{{item.title}}</div>
                        <div class="myConversion-item-time font-26 color-a5a">兑换时间：{{item.created_at}}</div>
                        <div class="myConversion-item-status-box">
                            <div class="myConversion-item-status" :class="item.danstatus_detail=='待发货'?'active-y':'active-r'">{{item.danstatus_detail}}</div>
                            <span class="arrow-right"></span>
                        </div>
                    </div>
                </router-link>
            </ul>
        </div>
    </div>
</template>

<script>
    import {Indicator} from 'mint-ui';
    import {timeout,title} from '../common/Tools'
    export default {
        name: "my-conversion",
        data(){
            return {
                myconversion : []
            }
        },
        mounted(){
            title('订单列表')
            console.log(this.$route)
            this.getMyConversion(this.$route.query.id)
        },
        methods:{
            //订单列表数据
            getMyConversion(id){
                Indicator.open('加载中...')
                this.$http(`${this.URL}/jmember/order?customer_id=${id}`)
                    .then(res=>{
                        Indicator.close()
                        if (res.data.code == 0){
                            console.log(res)
                            this.myconversion = res.data.data
                        }
                    })
                    .catch(err=>{
                        Indicator.close()
                        console.log(err)
                        timeout(err)
                    })
            }
        }
    }
</script>

<style scoped lang="less">
    @import '../../assets/css/store';
    .myConversion-wrap{

        .myConversion-list{

            li{
                border-bottom: 1px solid @color-f3f;
                box-sizing: border-box;
                padding: .26rem .36rem .29rem;
                display: flex;

                .myConversion-item-img{

                    img{
                        width: 1.6rem;
                        height: 1.58rem;
                    }
                }
                .myConversion-item-info{
                    flex: 1;
                    display: flex;
                    padding-left: .24rem;
                    flex-direction: column;
                    justify-content: space-between;
                    .myConversion-item-status-box{
                        display: flex;
                        justify-content: space-between;
                        align-items: center;
                        .myConversion-item-status{
                            width: 1.22rem;
                            height: .43rem;
                            border-radius: .1rem;
                            display: flex;
                            justify-content: center;
                            align-items: center;
                        }
                    }
                }
            }
        }
    }
    .active-y{
        border: 1px solid @color-f8b;
        color: @color-f8b;
    }
    .active-r{
        border: 1px solid @color-fe5;
        color: @color-fe5;
    }
</style>