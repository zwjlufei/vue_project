<!--月嫂秀报名-->
<template>
    <div>
        <div :class="{'dim':maskShow}">
        <div class="container-z">
        <!--头部bannge-->
        <div class="banner-box">
            <div class="banner-rim">
                <img :src="activeInfo.major_url" alt="">
            </div>
        </div>
        <!--活动地点-->
        <div class="contain-wrap">
            <div class="title-box">
                <span class="title-symbol"></span>
                <span>{{activeInfo.active_title}}</span>
            </div>
            <div class="activity-item gray-color-bottom">
                <div class="activity-item-pre">
                    <img src="http://cdn.ayi800.com/vueh5_show/time.png" style="width: 0.28rem;" alt="">
                    <span>时间</span>
                </div>
                <div>{{activeInfo.active_time}}</div>
            </div>
            <div class="activity-item">
                <div class="activity-item-pre">
                    <img src="http://cdn.ayi800.com/vueh5_show/position.png" alt="">
                    <span>地点</span>
                </div>
                <div>{{activeInfo.active_address}}</div>
            </div>
        </div>
        </div>
        <div class="module-wall"></div>
        <!--报名人数-->
        <div class="container-z">
            <div class="contain-wrap">
                <div class="title-box">
                    <span class="title-symbol"></span>
                    <span>已经报名人数({{activeInfo.apply_count+2}}人)</span>
                </div>
                <div class="aplly-show-wrap">
                    <div class="aplly-img-box">
                        <img v-for="item in imgNum" :src="item.picture" alt="">
                    </div>
                    <div class="aplly-more-btn">...</div>
                </div>
            </div>
        </div>
        <div class="module-wall"></div>
        <!--活动简介-->
        <div class="container-z">
            <div class="contain-wrap">
                <div class="title-box">
                    <span class="title-symbol"></span>
                    <span>活动简介</span>
                </div>
                <div class="activity-box">
                    <div v-html="activeInfo.active_describe"></div>
                </div>
            </div>
        </div>

        <div class="aplly-btn" @click="goApply">参与本期报名</div>

        </div>
        <!--遮罩-->
        <div class="mask-box" v-show="maskShow" @touchmove.prevent>
            <div class="mask-box-bg"></div>
            <div v-if="isSuccess" class="mask-model success-wrap">
                <div class="put-success-img">
                    <img src="http://cdn.ayi800.com/vueh5/success_bg.png" alt="">
                </div>
                <div class="success-title">报名成功</div>
                <div class="success-font">等待客户经理和您预约！</div>
                <div class="home-btn" @click="goHome">返回首页</div>
            </div>
            <div v-else class="mask-model">
                <div class="info-item">2018年14期月嫂秀活动</div>
                <div class="info-item">
                    <span class="label-title">手机号</span>
                    <input ref="phone" @blur="testPhone" maxlength="11" type="text" placeholder="请输入手机号">
                    <span v-show="phonelable" class="dot-green"></span>
                </div>
                <div class="info-item">
                    <span class="label-title">姓名</span>
                    <input ref="name" type="text" @blur="testName" maxlength="10" placeholder="请输入姓名">
                    <span v-show="namelable" class="dot-green"></span>
                </div>
                <div class="sub-btn" @click="applyActive">提交</div>
                <div class="close-btn" @click="closeMask">
                    <img src="http://cdn.ayi800.com/vueh5_show/close_btn.png" alt="">
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import {toast,GetToken,user_status,trim} from '../common/Tools'
    import { Indicator } from 'mint-ui';
    export default {
        name: "showApply",
        data(){
            return{
                imgNum:[
                    {picture:'http://cdn.ayi800.com/head/head1.jpg'},
                    {picture:'http://cdn.ayi800.com/head/head2.jpg'}
                ],
                maskShow:false,
                isSuccess:false,
                activeInfo:{},
                openId:{},
                phonelable:false,
                namelable:false
            }
        },
        mounted:function(){
            Indicator.open();
            var id = this.$route.query.id;
            this.openId = this.$route.query.openid;
            this.getActive(id);
        },
        methods:{
            goApply:function () {
                window.scroll(0, 0);
                this.maskShow=true;
            },
            testPhone:function(){
                var mobile = /^(13[0-9]|14[579]|15[0-3,5-9]|16[6]|17[0135678]|18[0-9]|19[89])\d{8}$/;
                var phone = this.$refs.phone.value;
                if(!mobile.test(phone)){
                    toast('手机号格式不正确，请重新输入！');
                    this.phonelable=false;
                    return;
                }else {
                    this.phonelable=true;
                }
            },
            testName:function(){
                if(trim(this.$refs.name.value)){
                    this.namelable=true;
                }else {
                    toast('请输入您的姓名～');
                    this.namelable=false;
                    return;
                }
            },
            applyActive:function(){
                var that = this;
                this.testPhone();
                this.testName();
                var phone = this.$refs.phone.value;
                var name = this.$refs.name.value;
                GetToken().then(res=> {
                    var c_token = res.name
                    var data = {
                        active_id:this.activeInfo.id,
                        openid:this.openId,
                        phone:phone,
                        name:name
                    }
                    data[c_token] = res.value
                    console.log(data)
                    this.$http({
                        url:`${this.URL}/jmember/saveCustomerInfo`,
                        method:'post',
                        data:this.$qs.stringify(data)
                    })
                        .then(res=>{
                            console.log(res)
                            if(res.data.code==0){
                                toast('报名成功～');
                                that.isSuccess=true;
                            }else {
                                toast(res.data.msg);
                            }
                        })
                        .catch(err=>{
                            console.log(err)
                        })
                });
            },
            closeMask:function () {
                this.maskShow=false;
            },
            getActive:function (id) {
                var that = this;
                this.$http(`${this.URL}/jmember/activeApply`,{
                    params:{
                        id:id,
                        openid:this.openId
                    }
                })
                    .then(function (response) {
                        Indicator.close();
                        console.log('555',response)
                        if (response.data.code == 0){
                            that.activeInfo=response.data.data.active_info;
                            if(response.data.data.picture_info){
                                if(response.data.data.picture_info.length>4){
                                    that.imgNum.push(...response.data.data.picture_info.slice(0,4));
                                }else {
                                    that.imgNum.push(...response.data.data.picture_info);
                                }
                            }
                        }
                    })
                    .catch(function (response) {
                        console.log(response);
                    });
            },
            goHome:function () {
                this.$router.push({path:'/show_home'});
                this.maskShow=false;
            }
        }
    }
</script>

<style lang="less">
    .success-wrap{
        .home-btn{
            width: 2.7rem;
            line-height: 0.7rem;
            background: -webkit-linear-gradient(to left,#ec698e, #ff8565);
            background: linear-gradient(to  left,#ec698e, #ff8565);
            color: #ffffff;
            font-size: 0.28rem;
            margin: 0.3rem auto 0;
            border-radius: 0.1rem;

        }
    }
    .dot-green{
        display: inline-block;
        width: 0.06rem;
        height: 0.06rem;
        border-radius: 50%;
        border: 0.02rem solid #c6fac0;
        background: #41ed2f;
    }
    .mask-box-bg{
        width: 100%;
        height: 100%;
        position: absolute;
        left: 0;
        top: 0;
        background: rgba(0,0,0,.4);
        -webkit-filter: blur(5px);
        filter: blur(5px);
        z-index: 999;
    }
    .sub-btn{
        width: 2.7rem;
        line-height: 0.7rem;
        background: -webkit-linear-gradient(to left,#ec698e, #ff8565);
        background: linear-gradient(to left,#ec698e, #ff8565);
        margin: 0.3rem auto 0;
        border-radius: 5px;
        color: #ffffff;
        font-size: 0.28rem;
        text-align: center;
    }
    .close-btn{
        position: absolute;
        right: 0.3rem;
        top: 0.3rem;
        img{
            width: 0.3rem;
            height: 0.3rem;
        }

    }
    .info-item{
        line-height: 0.96rem;
        border-bottom: 1px solid #f3f3f3;
        padding-left: 0.38rem;
        font-size: 0.32rem;
        .label-title{
            display: inline-block;
            width: 1.55rem;
        }
        input[type="text"]{
            outline: none;
            background-color:transparent;
            border-color:transparent;
            -webkit-appearance: none;
            font-size: 0.3rem;
            height: 0.96rem;
            width: 4.5rem;
            &::-webkit-input-placeholder{
                font-size: 0.3rem;
                color: #a5a5a5;
            }
            &:-moz-placeholder{
                font-size: 0.3rem;
                color: #a5a5a5;
            }
            &::-moz-placeholder{
                font-size: 0.3rem;
                color: #a5a5a5;
            }
            &:-ms-input-placeholder{
                font-size: 0.3rem;
                color: #a5a5a5;
            }
        }
    }
    .success-wrap{
        text-align: center;
        font-size: 0.34rem;
        .success-font{
            font-size: 0.3rem;
            color: #a5a5a5;
            margin-top: 0.2rem;
        }

    }
    .mask-model{
        width: 100%;
        height: 4.8rem;
        background: #ffffff;
        position: fixed;
        bottom: 0;
        left: 0;
        padding-top: 0.44rem;
        box-sizing: border-box;
        z-index: 999;
        .put-success-img{
            width: 2rem;
            height: 1.5rem;
            margin: 0 auto 0.3rem;
            img{
                width: 100%;
            }
        }
    }
    .dim{
        -webkit-filter: blur(2px);
        filter: blur(2px);
    }
    .banner-box{
        padding: 0.34rem 0.27rem;
        .banner-rim{
            width: 100%;
            height: 2.86rem;
            border-radius: 5px;
            overflow: hidden;
            img{
                width: 100%;
                height: 100%;
            }
        }
    }
    .contain-wrap{
        padding: 0.34rem 0 0;
        font-size: 0.26rem;
        color: #585858;
        .activity-item{
            display: flex;
            height: 0.76rem;
            line-height: 0.76rem;
            .activity-item-pre{
                width: 2.1rem;
                img{
                    display: inline-block;
                    width: 0.23rem;
                    height: 0.28rem;
                    margin-right: 0.1rem;
                    margin-left: 0.2rem;
                    vertical-align: middle;
                    margin-bottom: 0.1rem;
                }
            }
        }
        .gray-color-bottom{
            border-bottom: 1px solid #e5e5e5;
        }
        /*报名人数*/
        .aplly-show-wrap{
            display: flex;
            flex-direction: row;
            .aplly-img-box{
                display: flex;
                flex-direction: row;
                max-width: 6.3rem;
                overflow: hidden;
                padding: 0.2rem 0;
                padding-left: 0.2rem;
                img{
                    width: 0.77rem;
                    height: 0.77rem;
                    border-radius: 50%;
                    border: 2px solid #ffffff;
                    box-shadow: -3px 0px 12px 5px #f7f7f7;
                    margin-right: 0.2rem;
                }
            }
            .aplly-more-btn{
                width: 0.76rem;
                height: 0.8rem;
                text-align: center;
                line-height: 0.8rem;
                font-size: 0.4rem;
                color: #cccccc;
                margin-top: 0.1rem;
            }
        }
        /*活动简介*/
        .activity-box{
            padding: 0.2rem 0.27rem 2rem;
            p{
                line-height: 0.5rem;
                letter-spacing: 1px;
            }
            img{
                width: 100%;
                height: 3rem;
                margin-top: 0.25rem;
            }
        }
    }
    .aplly-btn{
        width: 5rem;
        /*margin: 5rem auto 0.5rem;*/
        font-size: 0.3rem;
        letter-spacing: 1px;
        color: #ffffff;
        background: -webkit-linear-gradient(to left,#ec698e, #ff8565);
        background: linear-gradient(to left,#ec698e, #ff8565);
        border-radius: 5px;
        text-align: center;
        line-height: 0.83rem;
        position: fixed;
        bottom: 0.3rem;
        left: 50%;
        margin-left: -2.5rem;
    }
</style>