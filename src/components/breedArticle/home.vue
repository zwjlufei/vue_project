<template>
    <div>
        <div :class="{'v-dim':maskShow}">
        <!--头部-->
            <div v-if="hasLogon">
                <div class="user-info-box container-z">
                    <div class="user-info">
                        <div class="img-bg">
                            <img :src="customInfo.header" alt="">
                        </div>
                        <div class="user-info-font">
                            <div class="title">{{customInfo.nickname}}</div>
                            <div v-html="customInfo.tag"></div>
                        </div>
                    </div>
                    <div class="user-sign" @click="signMask">
                        <img v-if="isSign"  src="http://cdn.ayi800.com/vueh5/new_down_sign.png" alt="">
                        <img v-else src="http://cdn.ayi800.com/vueh5/new_on_sign.png" alt="">
                    </div>
                </div>
            </div>
            <!--未登录-->
            <div v-else="hasLogon" :class="[isFixed ? 'fixedBar':'login-bg']" id="fixedBar">
                <div class="user-info-box container-z">
                    <div class="user-info">
                        <div class="login-info-font">
                                注册登录可以获得更多
                                <img src="http://cdn.ayi800.com/vueh5/fuli.png" alt="">
                        </div>
                    </div>
                    <div class="user-sign" @click="goLogin">
                        <div class="login-btn">去登陆</div>
                    </div>
                </div>
            </div>
        <!--banner-->
        <div class="swipers">
            <Banner :banner_list="swiper_list" v-if="banner_show"></Banner>
        </div>
        <div class="container-z">
            <!--icon-->
            <div class="icon-box">
                <div v-for="typeItem in typeList" @click.prevent="changeList(typeItem.name,typeItem.id)" ref="menuItem" >
                    <div class="icon-item-icon">
                        <img :src="typeItem.url" alt="">
                    </div>
                    <div>{{typeItem.name}}</div>
                </div>
            </div>
        </div>
        <div>
            <!--孕期知识-->
            <div class="container-z">
                <div class="title-box mb-30">
                    <span class="title-symbol new-bg"></span>
                    <span>{{articleTitle}}</span>
                </div>
            </div>
            <div>
                <div v-for="listItem in articleList">
                <div class="container-z">
                    <div class="article-list-item" v-for="articleItem in listItem[0]" @click="goDetail(articleItem.article_id)">
                        <div>
                            <div class="article-img-wrap">
                                <img :src="articleItem.banner_url" alt="">
                                <div class="patch"></div>
                            </div>
                        </div>
                        <div class="article-content">
                            <div class="title-box mb-0">{{articleItem.title}}</div>
                            <!--<p>{{articleItem.summary}}</p>-->
                            <div class="article-item-bottom">
                                <div class="look-num">
                                    <img src="http://cdn.ayi800.com/vueh5_show/rely.png" alt="">
                                    <span>{{articleItem.read_count}}</span>
                                </div>
                                <div class="item-bottom-right">
                                    <div class="review-num">
                                        <img src="http://cdn.ayi800.com/vueh5_show/review.png" alt="">
                                        <span>{{articleItem.comment_count}}</span>
                                    </div>
                                    <div class="good-num">
                                        <img src="http://cdn.ayi800.com/vueh5_show/zan.png" alt="">
                                        <span>{{articleItem.like_count}}</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <img class="ad-img" :src='listItem[1].src' alt="" @click="adDetail(listItem[1])">
                </div>
                <div class="more-data-btn">
                    <div @click="loadMore" v-show="!loading">{{moreInfo}}</div>
                    <mt-spinner type="triple-bounce" style="padding: .33rem 0;" v-show="loading"></mt-spinner>
                </div>
            </div>


        </div>
        </div>
        <!--签到遮罩-->
        <div class="mask-box" v-show="maskShow" @touchmove.prevent>
            <div class="mask-box-bg" @click.stop="maskHide"></div>
            <div class="mask-model">
                <div class="sign-day">
                    <span>{{maskData.qddays}}</span><span>&nbsp;&nbsp;</span><span class="v-money">{{maskData.fen}}</span>
                </div>
                <div class="sign-img-wrap">
                    <img :src="maskData.url" alt="">
                </div>
                <p>{{maskData.content}}</p>
                <div class="share-btn" @click="getCard">生成分享卡</div>
                <img class="down-arrow" src="http://cdn.ayi800.com/vueh5_show/arrow.png" alt="">
                <img @click.stop="maskHide" class="close-btn" src="http://cdn.ayi800.com/vueh5_show/close_round.png" alt="">
                <div class="link-close"></div>
            </div>
        </div>
    </div>
</template>

<script>
    import { swiper, swiperSlide } from 'vue-awesome-swiper';
    import {toast,trim,GetToken} from '../common/Tools';
    import Banner from '../common/banner';
    import { Indicator } from 'mint-ui';
    export default {
        name: "home",
        data(){
            return {
                banner_show : false,
                swiper_list : [],
                maskShow:false,
                articleList:[],
                articleTitle:'',
                typeList:[],
                type:'',
                isFixed:false,
                hasLogon:false,
                offsetTop:0,
                marginTop:0,
                isSign:false,
                user_id:{},
                maskData:{},
                moreInfo:'点击加载更多',
                page:0,
                loading:false,
                hasData:true,
                articleWrap:[],
                customInfo:{},
                items:[1,2]
            }
        },
        components: {
            Banner
        },
        mounted:function(){
            Indicator.open();
            var user_id = this.$route.query;
            this.user_id=user_id;
            sessionStorage.setItem('user_id',JSON.stringify(user_id));
            this.getType();
            if(user_id.customer_id){
               this.hasLogon=true
            }else {
                this.hasLogon=false;
                window.addEventListener('scroll', this.handleScroll)
            }
        },
        methods:{
            signMask:function () {
                var that = this;
                var id =  this.user_id.customer_id;
                GetToken().then(res=> {
                    var c_token = res.name
                    var data = {
                        type:1,
                        customer_id:id
                    }
                    data[c_token] = res.value
                    this.$http({
                        url:`${this.URL}/jmember/setfen`,
                        method:'post',
                        data:this.$qs.stringify(data)
                    })
                        .then(res=>{
                            if(res.data.code==1){
                                toast(res.data.msg)
                                that.isSign=true;
                            }else if(res.data.code==0){
                                that.maskShow=true;
                                that.isSign=true;
                                that.maskData=res.data.data;
                            }else {
                                console.log('签到出错啦～')
                            }
                        })
                        .catch(err=>{
                            console.log(err)
                        })
                });
            },
            maskHide:function () {
                this.maskShow=false;
            },
            goLogin:function(){
                window.location.href = `http://test.www.ayi800.com/wechat/bindwxuid/${this.user_id.openid}?origin=memberCenter&v=1.2`
            },
            adDetail:function(item){
                window.location.href=item.href;
            },
            changeList:function(index,type){
                this.articleTitle=index;
                this.page = 0;
                this.hasData=true;
                this.moreInfo='点击加载更多';
                for(var i=0;i<this.articleWrap.length;i++ ){
                    if(index == this.articleWrap[i].name){
                        this.articleList = this.articleWrap[i].article;
                        this.type = this.articleWrap[i].id;
                    }
                }
                this.filterTitle();
            },
            filterTitle:function(){
                for( var j=0;j<this.articleList.length;j++ ){
                    console.log(1)
                    var article = this.articleList[j][0];
                    for (var i=0;i<article.length;i++){
                        if(article[i].title.length>22){
                            article[i].title=article[i].title.substring(0,22)+'...'
                        }
                    }
                }
            },
            handleScroll:function(){
                var scrollTop = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop;
                if (scrollTop >100) {
                    this.isFixed = true;
                    this.marginTop = document.querySelector('#fixedBar').offsetHeight + 'px';
                } else {
                    this.isFixed = false;
                    this.marginTop = 0;
                }
            },
            goDetail:function(id){
                this.$router.push({path:`/article_detail/${id}`})
            },
            loadMore:function(){
                this.page += 1;
                this.loading = true
                var that = this;
                if(this.hasData){
                    this.$http(`${this.URL}/jmember/moreLoad`,{
                        params:{
                            type:this.type,
                            page:this.page
                        }
                    })
                        .then(function (response) {
                            console.log(response)
                            if(response.data.code == 0){
                                that.loading = false;
                                if(response.data.data.length<2 || response.data.data[1][0]<5 ){
                                    that.hasData=false;
                                }
                                that.articleList=[...that.articleList,...response.data.data];
                                that.filterTitle();
                            }else {
                                that.loading = false;
                                that.hasData=false;
                                this.moreInfo='到底啦～'
                                toast(response.data.msg)
                            }
                        })
                        .catch(function (response) {
                            console.log(response);
                        });
                }else {
                    toast("没有更多数据了");
                    this.moreInfo='到底啦～'
                    this.loading = false
                }

            },
            getType:function () {
                var that = this;
                this.$http(`${this.URL}/jmember/articleList`,{
                    params:{
                        openid:this.user_id.openid,
                        customer_id:this.user_id.customer_id
                    }
                })
                    .then(function (response) {
                        console.log('555',response)
                        Indicator.close();
                        if(response.data.code == 0){
                            that.typeList = response.data.data.article_typeid_name;
                            that.articleWrap=response.data.data.article_info_type_all;
                            that.articleTitle = response.data.data.article_info_type_all[0].name;
                            that.articleList = response.data.data.article_info_type_all[0].article;
                            that.type = response.data.data.article_info_type_all[0].id;
                            that.swiper_list=response.data.data.head_url;
                            that.customInfo=response.data.data.birthday_info;
                            that.banner_show=true;
                            if(response.data.data.birthday_info.isqd == 1){
                                that.isSign=true;
                            }else {
                                that.isSign=false;
                            }
                            that.filterTitle();
                        }
                    })
                    .catch(function (response) {
                        console.log(response);
                    });
            },
            getCard:function () {
                this.$router.push({name:'shareCard',params:{content:this.maskData}})
            }
        },
        destroyed:function () {
            window.removeEventListener('scroll', this.handleScroll)
        },
    }
</script>

<style lang="less" scoped>
    .fixedBar {
        position: fixed;
        top: 0;
        z-index: 999;
        width: 100%;
        background: rgba(255,255,255,0.8);
    }
    .new-bg{
        background: -webkit-linear-gradient(to left,#f8df3f, #ffc152)!important;
        background: linear-gradient(to left,#f8df3f, #ffc152)!important;
        box-shadow: none!important;
    }
    a{
        text-decoration: none;
        font-size: 0.24rem;
        color: #585858;
    }
    .login-bg{
        background: url("http://cdn.ayi800.com/vueh5/login_bg.png") no-repeat;
        background-size:100% 100%;
    }
    .more-data-btn{
        text-align: center;
        height: 1rem;
        color: #747474;
        box-shadow: 0px 0px 10px 3px #f7f7f7;
        line-height: 1rem;
    }
    .user-info-box{
        display: flex;
        justify-content: space-between;
        height: 1.2rem;
        align-items: center;
        padding-top: 0.2rem;
        .user-info{
            flex: 1;
            display: flex;
            .login-info-font{
                display: flex;
                align-items: center;
                img{
                    width: 0.55rem;
                    height: 0.28rem;
                }
            }
            .user-info-font{
                margin-top: 0.15rem;
                font-size: 0.24rem;
                color: #585858;
                margin-left: 0.2rem;
                .title{
                    font-size: 0.36rem;
                    color: #333333;
                }
            }
            .img-bg{
                width: 1.1rem;
                height: 1.06rem;
                background: url("http://cdn.ayi800.com/vueh5_show/img_bg.png") no-repeat;
                background-size: 100% 100%;
                position: relative;
                img{
                    width: 0.75rem;
                    height: 0.75rem;
                    border-radius: 50%;
                    border: 2px solid #ffffff;
                    position: absolute;
                    left: 50%;
                    top: 50%;
                    transform: translate(-50%,-50%);
                }
            }
        }
        .user-sign{
            padding-left: 20%;
            img{
                width: 0.7rem;
                height: 0.7rem;
            }
            .login-btn{
                width: 1rem;
                height: 0.45rem;
                background: -webkit-linear-gradient(to left,#f8df3f, #ffc152);
                background: linear-gradient(to left,#f8df3f, #ffc152);
                color: #ffffff;
                line-height: 0.45rem;
                text-align: center;
                font-size: 0.24rem;
                border-radius: 5px;
            }
        }
    }

    /*icon*/
    .icon-box{
        padding: 0 0.35rem;
        display: flex;
        justify-content: space-between;
        margin: 0.54rem 0;
        text-align: center;
        font-size: 0.24rem;
        .icon-item-icon{
            width: 1.1rem;
            height: 1.1rem;
            border-radius: 50%;
            /*background: #adffcc;*/
            /*border: 0.1rem solid #e0ffec;*/
            margin-bottom: 0.08rem;
            img{
                width: 100%;
            }
        }
    }
    /*孕期知识*/
    .article-list-item{
        border-radius: 0.1rem;
        box-shadow: -3px 0px 12px 5px #f7f7f7;
        padding: 0.2rem 0.25rem 0.32rem;
        display: flex;
        margin-bottom:0.4rem ;
        .article-img-wrap{
            width: 2.05rem;
            height: 1.5rem;
            position: relative;
            padding: 0.04rem;
            border-radius:0.1rem;
            background: linear-gradient(225deg, transparent 0.225rem, #ffffff 0);
            margin-right: 0.25rem;
            &::before {
                content: '';
                position: absolute;
                top: 0;
                right: 0;
                width: 0.3rem;
                height: 0.3rem;
                background: #ffffff;
                transform-origin: bottom right;
                border-bottom-left-radius: inherit;
                border-top-right-radius: inherit;
            }
            img{
                width: 100%;
                height: 100%;
                border-radius:0.1rem;
            }
            .patch{
                width: 2rem;
                height: 1.3rem;
                background: #fae7c6;
                position: absolute;
                right: -0.1rem;
                bottom: -0.1rem;
                border-radius: 0.1rem;
                z-index: -1;
            }
        }
        .article-content{
            display: flex;
            flex: 1;
            flex-direction: column;
            justify-content: space-between;
            padding-top: 0.15rem;
            p{
                font-size: 0.22rem;
                color: #747474;
                margin: 0.1rem 0;
                overflow:hidden;
                text-overflow:ellipsis;
                display:-webkit-box;
                -webkit-box-orient:vertical;
                -webkit-line-clamp:2;
            }
            .article-item-bottom{
                display: flex;
                justify-content: space-between;
                font-size: 0.18rem;
                line-height: 0.21rem;
                color: #838383;
                img{
                    display: inline-block;
                }
                .look-num{
                    img{
                        width: 0.27rem;
                        height: 0.21rem;
                    }
                }
                .item-bottom-right{
                    display: flex;
                    .review-num{
                        margin-right: 0.3rem;
                        img{
                            width: 0.26rem;
                            height: 0.21rem;
                        }
                    }
                    .good-num{
                        img{
                            width: 0.22rem;
                            height: 0.21rem;
                        }
                    }
                }
            }
        }

    }
    .ad-img{
        width: 100%;
        height: 2rem;
        margin-bottom: 0.4rem;
    }
    /*遮罩*/
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
    .v-dim{
        -webkit-filter: blur(2px);
        filter: blur(2px);
    }
    .mask-model{
        position: absolute;
        z-index: 1000;
        width: 6rem;
        height: 8.15rem;
        background: #ffffff;
        left: 50%;
        top: 50%;
        transform: translate(-50%,-50%);
        border-radius: 0.1rem;
        text-align: center;
        padding-top: 0.35rem;
        box-sizing: border-box;
        font-size: 0.26rem;
        &::before{
            content: '';
            position: absolute;
            left: 50%;
            transform: translateX(-50%);
            width: 5.6rem;
            height: 0.22rem;
            background: rgba(250,210,0,0.5);
            bottom: -0.22rem;
            border-bottom-left-radius: 0.1rem;
            border-bottom-right-radius: 0.1rem;
        }
        &::after{
            content: '';
            position: absolute;
            left: 50%;
            transform: translateX(-50%);
            width: 5.2rem;
            height: 0.35rem;
            background: rgba(240,230,0,0.2);
            bottom: -0.35rem;
            border-bottom-left-radius: 0.08rem;
            border-bottom-right-radius: 0.08rem;
        }
        .down-arrow{
            width: 0.3rem;
            height: 0.14rem;
            position: absolute;
            left: 50%;
            transform: translateX(-50%);
        }
        .v-money{
            background: linear-gradient(to right, #ffc152, #f8df3f);
            -webkit-background-clip: text;
            color: transparent;
        }
        .sign-day{
            font-size: 0.28rem;
        }
        .sign-img-wrap{
            width: 4.9rem;
            height: 4.35rem;
            /*border: 2px solid #fad248;*/
            margin: 0.45rem auto 0.25rem;
            img{
                width: 100%;
                height: 100%;
            }
        }
        p{
            width: 5.5rem;
            margin: 0 auto 0.3rem;
            text-align: left;
            font-size: 0.26rem;
        }
        .share-btn{
            width: 1.9rem;
            line-height: 0.5rem;
            border-radius: 5px;
            background: -webkit-linear-gradient(to left,#f8df3f, #ffc152);
            background: linear-gradient(to left,#f8df3f, #ffc152);
            color: #ffffff;
            margin: 0 auto 0.15rem;
        }
        .close-btn{
            position: absolute;
            width: 0.32rem;
            height: 0.32rem;
            right: 0.55rem;
            top: -1.02rem;
        }
        .link-close{
            width: 1px;
            height:0.7rem;
            background: #d2d2d2;
            position: absolute;
            right: 0.7rem;
            top: -0.7rem;
        }

    }

    .btn{
        width: 2rem;
        height: 0.5rem;
        font-size: 0.24rem;
        border: 1px solid #888888;
        text-align: center;
        line-height: 0.5rem;
        border-radius: 5px;
        margin-top: 30px;
    }
</style>