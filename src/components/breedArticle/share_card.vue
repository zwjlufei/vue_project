<template>
    <div id="cardBox">
        <div class="card-container" id="cardModel" v-if="isShow">
            <div class="card-content-wrap">
                <div class="card-title">我在有福妈妈学习月子知识第{{content.qddays}}天</div>
                <div class="card-img-wrap">
                    <img :src="content.url" alt="">
                </div>
                <div class="card-font-wrap">
                    <div class="card-font-left">
                        <p>{{content.content}}</p>
                        <!--<div class="card-say-author"> — 树上春树</div>-->
                    </div>
                    <div class="card-font-right">
                        <img src="http://cdn.ayi800.com/vueh5/share_code.png" alt="">
                        <div>关注学习</div>
                        <div>月子知识</div>
                    </div>
                </div>
            </div>
        </div>
        <div class="save-btn">长按图片保存本地</div>
        <img id="imgItem" src="" alt="">
    </div>
</template>

<script>
    import html2canvas from '../../assets/js/html2canvas'
    export default {
        name: "shareCard",
        data(){
            return{
                isShow:true,
                content:{}
            }
        },
        beforeMount: function () {
            console.log(this.$route)
            this.content=this.$route.params.content;
            this.content.qddays=this.content.qddays.replace(/[^0-9]/ig,"");
        },
        mounted: function () {
                let that = this;
                let content_html = document.getElementById('cardModel');　　　　//要转化的div
                let width = content_html.offsetWidth;
                let height = content_html.offsetHeight;
                let offsetTop = content_html.offsetTop;
                let canvas = document.createElement("canvas");
                let context = canvas.getContext('2d');
                canvas.width = width*2;
                canvas.height = (height+offsetTop)*2;
                context.scale(2,2);
                var opts = {
                    useCORS:true,
                    scale:2, // 添加的scale 参数
                    canvas:canvas, //自定义 canvas
                    logging: false, //日志开关，发布的时候记得改成false
                    width:width, //dom 原始宽度
                    height:height //dom 原始高度
                };
                html2canvas(content_html,opts).then(function (canvas) {
                    canvas.style.width = width+"px";
                    canvas.style.height = height+"px";
                    canvas.style.position='absolute';
                    canvas.style.left='-9999px';
                    canvas.style.top='0';
                    document.getElementById('cardBox').appendChild(canvas);
                    that.isShow=false;
                    var url = canvas.toDataURL();
                    document.getElementById('imgItem').src=url;
                    document.getElementById('imgItem').style.width = canvas.width / 2+ "px";
                    document.getElementById('imgItem').style.height = canvas.height / 2 + "px";
                });

        },
    }
</script>

<style scoped lang="less">
    #cardBox{
        position: relative;
        background: #fffad3;
    }
    .save-btn{
        width: 5rem;
        line-height: 0.8rem;
        background: -webkit-linear-gradient(to left,#f8df3f, #ffc152);
        background: linear-gradient(to left,#f8df3f, #ffc152);
        color: #ffffff;
        text-align: center;
        position: absolute;
        bottom: 0.5rem;
        left: 50%;
        transform: translateX(-50%);
        z-index: 9999;
    }
    .card-container{
        background: #fffad3;
        height:13.34rem;
        padding-top: 1.5rem;
        box-sizing: border-box;
        .card-content-wrap{
            width: 6.5rem;
            height: 9.5rem;
            margin: 0 auto;
            background: #ffffff;
            padding: 0.44rem 0.4rem 0;
            box-sizing: border-box;
            .card-title{
                text-align: center;
                font-size: 0.36rem;
            }
            .card-img-wrap{
                width: 4.7rem;
                height: 5.6rem;
                /*background: #97c6d6;*/
                margin: 0.2rem auto;
                img{
                    width: 100%;
                    height: 100%;
                }
            }
            .card-font-wrap{
                display: flex;
                justify-content: space-between;
                .card-font-left{
                    padding-right: 0.8rem;
                    margin-top: 0.1rem;
                    font-size: 0.24rem;
                    display: flex;
                    flex-direction: column;
                    justify-content: space-between;
                    p{
                        line-height: 0.4rem;
                    }
                    .card-say-author{
                        text-align: right;
                    }
                }
                .card-font-right{
                    text-align: center;
                    font-size: 0.2rem;
                }
                img{
                    width: 1.4rem;
                    height: 1.4rem;
                }
            }
        }
    }
</style>