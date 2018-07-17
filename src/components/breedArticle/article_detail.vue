<template>
    <div class="container-z">
        <div>
        <div id="article-content">
            <div class="title">{{mainArticle.title}}</div>
            <div v-html="mainArticle.content"></div>
        </div>
        <div class="review-btn-wrap">
            <div :class="{'review-active':isSupport==1,'review-btn':true}" @click="goComment('1')">
                <img src="http://cdn.ayi800.com/vueh5/zanyixia.png" alt="">
            </div>
            <!--<div :class="{'review-active':isSupport==2,'review-btn':true}" @click="goComment('2')">-->
                <!--<img src="http://cdn.ayi800.com/vueh5/caiyixia.png" alt="">-->
            <!--</div>-->
            <div class="share-wrap" @click="show_share_model(0)">
                <img src="http://cdn.ayi800.com/image/png/share-iconshare.png">
                <div class="share-hint" v-show="share_model">
                    <img src="http://cdn.ayi800.com/image/png/share-icon2share1.png" class="share-img">
                    <div class="share-text">
                        <span class="share-friends">分享朋友圈可获得</span>
                        <span class="share-coin">3福币</span>
                    </div>
                </div>
            </div>
        </div>
        <!--相关阅读-->
        <div class="title-box mb-0">
            <span class="title-symbol"></span>
            <span>相关阅读</span>
        </div>
        <div class="link-read-wrap">
            <div class="link-read-item" v-for="linkItem in linkArticle" @click="goDetail(linkItem.article_id)">
                <div>
                    <div class="article-img-wrap">
                        <img :src="linkItem.banner_url" alt="">
                    </div>
                </div>
                <div class="article-content-wrap">
                    <div class="title-box mb-0">{{linkItem.title}}</div>
                    <!--<p>{{linkItem.summary}}</p>-->
                    <div class="article-item-bottom">
                        <div class="look-num">
                            <img src="http://cdn.ayi800.com/vueh5_show/rely.png" alt="">
                            <span>{{linkItem.read_count}}</span>
                        </div>
                        <div class="item-bottom-right">
                            <span class="dot-round dot-green mb-5"></span>
                            <span>{{linkItem.author}}</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <!--用户评价-->
            <div class="title-box mb-0">
                <span class="title-symbol"></span>
                <span>用户评价({{commentNum}})</span>
            </div>
        <div v-if="commentNum == 0? false:true">
        <div class="link-read-wrap">
                <div class="link-read-item" v-for="(commentItem,index) in commentWrap">
                    <div class="img-wrap">
                        <img :src="commentItem.picture" alt="">
                    </div>
                    <div class="article-content-wrap">
                        <div class="title-box mb-0">
                            <div>{{commentItem.nickname}}</div>
                        </div>
                        <p>{{commentItem.content}}</p>
                        <div class="article-item-bottom">
                            <div class="look-num">
                                <span class="dot-round dot-yellow"></span>
                                <span>{{commentItem.comment_status}}</span>
                            </div>
                        </div>
                    </div>
                    <div class="floor-box">{{commentNum-index}}楼</div>
                </div>
            </div>
        </div>
        <!--暂无评价-->
        <div v-else="commentNum == 0? false:true" class="no-review-wrap">
            暂无评价，快来抢沙发吧！
        </div>
        <div style="height: 1rem"></div>
        </div>
        <div class="send-review-wrap">
            <textarea maxlength="120" @focus="changeReview" type="text" placeholder="写评论..." ref="comment"></textarea>
            <div class="send-btn" @click="goComment('')">发送</div>
        </div>
        <!--分享遮罩提示-->
        <div v-show="share_model" class="share-model-wrap" @touchmove.prevent @click="show_share_model(1)">

        </div>
    </div>
</template>

<script>
    import {toast,GetToken,user_status} from '../common/Tools'
    import { Indicator } from 'mint-ui';
    export default {
        name: "articleDetail",
        data(){
            return{
                items:[1,2,3],
                hasReview:true,
                mainArticle:'',
                likeNum:0,
                disliakNum:0,
                linkArticle:[],
                commentWrap:[],
                commentNum:0,
                articleId:'',
                user_id:{},
                isSupport:0,
                count:0,
                share_model : false
            }
        },
        mounted:function(){
            Indicator.open();
            var id = this.$route.params.id;
            this.articleId=id;
             var user_id = JSON.parse(sessionStorage.getItem('user_id' || []))
            this.getActicleData(id,user_id);

        },
        methods:{
            //分享遮罩显示与隐藏
            show_share_model(num){
                num?this.share_model=false:this.share_model=true
            },
            changeReview:function () {
                setTimeout(function(){
                    document.body.scrollTop = document.body.scrollHeight;
                },300);
            },
            goComment:function(type){
                if(type == 1 || type == 2){
                    this.count+=1;
                }
                user_status()
                    .then(res=>{
                        this.user_id = res;
                        var content = this.$refs.comment.value;
                        if(this.count<2 || !type){
                            GetToken().then(res=> {
                                var c_token = res.name
                                var data = {
                                    type:type,
                                    article_id:this.articleId,
                                    customer_id:this.user_id.customer_id,
                                    openid:this.user_id.openid,
                                    content:content
                                }
                                data[c_token] = res.value
                                this.$http({
                                    url:`${this.URL}/jmember/saveLikeComment`,
                                    method:'post',
                                    data:this.$qs.stringify(data)
                                })
                                    .then(res=>{
                                        console.log(res)
                                        if(res.data.code == 0){
                                            toast(res.data.msg);
                                            if(type!=0){
                                                console.log("点赞按钮");
                                                this.isSupport=type;
                                            }else {
                                                // window.location.reload();
                                                this.hasReview=true;
                                                this.commentNum+=1;
                                                this.commentWrap.unshift(res.data.data);
                                                this.$refs.comment.value='';
                                            }
                                        }
                                    })
                                    .catch(err=>{
                                        console.log(err)
                                    })
                            });
                        }
                    })
                    .catch(openid=>{
                        window.location.href = `http://test.www.ayi800.com/wechat/bindwxuid/${openid}?origin=memberCenter&v=1.2`
                    })

            },
            goDetail:function(id){
                this.$router.replace({path:`/article_detail/${id}`});
                window.scroll(0, 0);
            },
            getActicleData:function (id,user_id) {
                var that = this;
                this.$http(`${this.URL}/jmember/articleShow`,{
                    params:{
                        article_id:id,
                        openid:user_id.openid,
                        customer_id:user_id.customer_id
                    }
                })
                    .then(function (response) {
                        console.log('555',response)
                        Indicator.close();
                        if(response.data.code == 0){
                            that.mainArticle = response.data.data.article_info[0];
                            that.linkArticle=response.data.data.article_relevant;
                            that.commentWrap=response.data.data.article_comments;
                            that.commentNum=response.data.data.comment_total;
                            that.isSupport=response.data.data.article_info[0].status;
                        }else {
                            toast('出错啦～')
                        }
                    })
                    .catch(function (response) {
                        console.log(response);
                    });
            }
        },
        watch: {
            '$route': function (route) {
                var id = this.$route.params.id;
                this.articleId=id;
                this.getActicleData(id);
            }
        }
    }
</script>

<style lang="less">
    .share-model-wrap{
        position:fixed;
        top: 0;
        right: 0;
        bottom: 0;
        left: 0;
        background: rgba(0,0,0,.5);
        z-index: 2;
    }
    .share-img{
        position: absolute;
        z-index: 3;
        bottom: .25rem;
        left: -.7rem;
    }

    .share-text{
        position: absolute;
        z-index: 4;
        white-space:nowrap;
        bottom: .7rem;
        left: 0;
        span{
            font-size: .28rem;
        }
        .share-friends{
            color: #fff;
        }
        .share-coin{
            color: #ffc051;
        }
    }
    .send-review-wrap{
        width: 100%;
        position: fixed;
        bottom: 0;
        left: 0;
        height: 1rem;
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 0 0.2rem;
        box-sizing: border-box;
        background: #ffffff;
        box-shadow: -3px 0px 12px 5px #f7f7f7;
        z-index:1;
        .send-btn{
            width: 0.97rem;
            height:0.6rem;
            line-height: 0.56rem;
            background: -webkit-linear-gradient(to left,#f8df3f, #ffc152);
            background: linear-gradient(to left,#f8df3f, #ffc152);
            text-align: center;
            color: #ffffff;
            font-size: 0.28rem;
            border-radius: 5px;
        }
        textarea{
            outline: none;
            border: 1px solid #eaeaea;
            width: 5.8rem;
            height: 0.5rem;
            background: #fafafa;
            border-radius: 5px;
            line-height: 0.5rem;
            &::-webkit-input-placeholder{
                line-height: 0.5rem;
            }
            &:-moz-placeholder{
                line-height: 0.5rem;
            }
            &::-moz-placeholder{
                line-height: 0.5rem;
            }
            &:-ms-input-placeholder{
                line-height: 0.5rem;
            }
        }
    }
    #article-content{
        padding: 0.47rem 0.5rem 0;
        .title{
            font-size: 0.34rem;
            font-weight: 500;
            margin-bottom: 0.5rem;
        }
        p{
            font-size: 0.26rem;
            color: #585858;
            line-height: 0.5rem;
        }
        img{
            width: 100%;
            height: auto;
        }
    }
    .dot-green{
        border: 0.02rem solid #c6fac0;
        background: #41ed2f;
    }
    .dot-yellow{
        border: 0.02rem solid #ffecca;
        background: #ffc051;
    }
    .no-review-wrap{
        text-align: center;
        padding: 1.5rem 0;
        font-size: 0.22rem;
        color: #585858;
    }
    .review-btn-wrap{
        display: flex;
        padding: 1.27rem 2.5rem 1.07rem;
        justify-content: space-between;
        .review-btn{
            width: .58rem;
            height: .58rem;
            background: #cccccc;
            position: relative;
            border-radius: 50%;
            img{
                width: 0.3rem;
                height: 0.3rem;
                position: absolute;
                left: 50%;
                top: 50%;
                transform: translate(-50%,-50%);
            }
        }
        .review-active{
            background: -webkit-linear-gradient(to top,#f8df3f, #ffc152);
            background: linear-gradient(to top,#f8df3f, #ffc152);
            box-shadow: 0 0 .1rem .01rem #f5db40;
        }
        .share-wrap{
            position: relative;
            width: .58rem;
            height: .58rem;
            background: -webkit-linear-gradient(to top,#f8df3f, #ffc152);
            background: linear-gradient(to top,#f8df3f, #ffc152);
            border-radius: 50%;
            display: flex;
            justify-content: center;
            align-items: center;
            box-shadow: 0 0 .1rem .01rem #f5db40;
            img{
                width: .5rem;
                height: .47rem;
            }
        }
    }
    /*相关阅读*/
    .link-read-wrap{
        padding: 0 0.08rem;
        margin-bottom: 0.3rem;
        .link-read-item{
            border-bottom: 1px solid #e5e5e5;
            display: flex;
            justify-content: space-between;
            padding: 0.48rem 0 0.25rem;
            .floor-box{
                width: 1rem;
                height: 0.4rem;
                border-radius: 0.05rem;
                line-height: 0.4rem;
                text-align: center;
                color: #585858;
                font-size: 0.18rem;
            }
            .img-wrap{
                margin-right: 0.4rem;
                padding: .2rem 0;
                img{
                    width: 0.75rem;
                    height: 0.75rem;
                    border-radius: 50%;
                    border: 0.02rem solid #ffea44;
                }
            }
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
            }
            .article-content-wrap{
                display: flex;
                flex: 1;
                flex-direction: column;
                justify-content: space-between;
                p{
                    font-size: 0.26rem;
                    color: #343434;
                    margin: 0.1rem 0 .37rem;
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
                    color: #cfcfcf;
                    img{
                        display: inline-block;
                    }
                    .look-num{
                        img{
                            width: 0.23rem;
                            height: 0.18rem;
                        }
                    }
                    .item-bottom-right{
                        .mb-5{
                            margin-bottom: 0.03rem;
                        }
                    }
                }
            }
        }
        .link-read-item:last-child{
            border-bottom: none;
        }
    }
</style>