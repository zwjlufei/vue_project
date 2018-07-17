<template>
    <div class="orderDetail">
        <div class="orderdetail-info">
            <div class="orderdetail-info-wrap">
                <div class="orderdetail-info-img-wrap">
                    <img :src="order_detail.despic">
                </div>
                <div class="orderdetail-info-content">
                    <div class="order-status font-26 color-fe5" :class="order_detail.danstatus_detail=='待发货'?'active_y':'active_r'">{{order_detail.danstatus_detail}}</div>
                    <div class="goods-name font-26 color-444">物品名称：{{order_detail.title}}</div>
                    <div class="order-serial font-26 color-a5a">订单编号：{{order_detail.serial}}</div>
                </div>
            </div>
        </div>
        <div class="segmentation-box"></div>
        <div class="JD-ecard-wrap" v-if="order_detail.obj2==1">
            <div class="JD-card-info font-30 color-444">券码信息：</div>
            <div class="JD-card-type font-26 color-444">券码类型：京东E卡</div>
            <div class="JD-password">
                <div class="password font-26 color-444">券码卡密：{{order_detail.jdcard}}</div>
                <div class="copy font-26 color-fe5">复制</div>
            </div>
        </div>
        <div class="distribution-info-wrap" v-if="order_detail.obj2==0">
            <div class="distribution-info">
                <div class="distribution-info-title font-30 color-444">配送信息：</div>
                <div class="distribution-address font-26 color-444">{{order_detail.address}}</div>
                <div class="distribution-info-people">联系人：{{order_detail.fullname}} {{order_detail.phone}}</div>
            </div>
            <div class="distribution-info">
                <div class="distribution-info-title font-30 color-444">物流信息：</div>
                <div v-if="!order_detail.danstatus_detail=='待发货'">
                    <div class="distribution-address font-26 color-444">物流公司：{{order_detail.wltype_detail}}</div>
                    <div class="distribution-info-people">
                        <div class="distribution-number font-26 color-444">快递单号：{{order_detail.dan}}</div>
                        <div class="copy font-26 color-fe5">复制</div>
                    </div>
                </div>
                <div v-if="order_detail.danstatus_detail=='待发货'" class="not-distribution color-a5a">暂无发货，耐心等待</div>
            </div>
        </div>
    </div>
</template>

<script>
    import {Indicator} from 'mint-ui';
    import {timeout,title} from '../common/Tools'
    export default {
        name: "order-detail",
        data(){
            return {
                order_detail:{}
            }
        },
        mounted(){
            title('订单详情')
            this.getOrderDetail(this.$route.query.id)
        },
        methods:{
            //订单详情数据
            getOrderDetail(id){
                Indicator.open('加载中...')
                this.$http(`${this.URL}/jmember/ordetail?id=${id}`)
                    .then(res=>{
                        Indicator.close()
                        if (res.data.code == 0){
                            console.log(res)
                            this.order_detail = res.data.data
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
    .orderdetail-info-wrap{
        display: flex;
    }
    .orderdetail-info{
        padding: .27rem .36rem .32rem;
    }
    .orderdetail-info-img-wrap{
        display: flex;
        img{
            width: 1.02rem;
            height: 1.02rem;
        }
    }
    .orderdetail-info-content{
        position: relative;
        flex: 1;
        display: flex;
        flex-direction: column;
        padding-left: .28rem;
        justify-content: space-around;
    }
    .order-status{
        position: absolute;
        top: 0;
        right: 0;
    }
    .segmentation-box{
        width: @max_width;
        height: .2rem;
        background-color: @color-f3f;
    }
    .JD-ecard-wrap{
        box-sizing: border-box;
        padding: 0 .36rem;
        border-bottom: 1px solid @color-f3f;
        padding-bottom: .38rem;
    }
    .JD-card-info{
        font-weight: 900;
        padding: .25rem 0;
    }
    .JD-password{
        display: flex;
        align-items: center;
    }
    .password{
        margin-top: .1rem;
    }
    .copy{
        margin-left: .48rem;
        margin-top: .1rem;
    }
    .distribution-info-title{
        font-weight: 900;
        padding: .25rem 0;
    }
    .distribution-info-people{
        display: flex;
        align-items: center;
        margin-top: .1rem;
    }
    .distribution-number{
        margin-top: .1rem;
    }
    .distribution-info{
        padding: 0 .36rem .39rem;
        border-bottom: 1px solid @color-f3f;
    }
    .active_y{
        color: @color-f8b;
    }
    .active_r{
        color: @color-fe5;
    }
</style>