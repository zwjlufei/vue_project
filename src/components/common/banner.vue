<template>
    <div class="swiper-wrap">
        <div class="swiper">
            <swiper :options="mySwiper">
                <swiper-slide v-for="(item, index) in banner_list" :key="index">
                    <img :src="item.src" @click="adDetail(item)">
                </swiper-slide>
            </swiper>
            <div id="swiper-pot" class="swiper-pagination" slot="pagination"></div>
        </div>
    </div>
</template>

<script>
    import { swiper, swiperSlide } from 'vue-awesome-swiper';
    export default {
        name: "banner",
        props:['banner_list'],
        data(){
            return {
                mySwiper: {
                    // 如果自行设计了插件，那么插件的一些配置相关参数，也应该出现在这个对象中，如下debugger
                    debugger: true,
                    loop: true,
                    loopedSlides: 3,
                    loopFillGroupWithBlank: true,
                    autoplay: {
                       delay: 3000,
                       stopOnLastSlide: false,
                       disableOnInteraction: true,
                     },
                    slidesPerView: "auto",//设置slider容器能够同时显示的slides数量(carousel模式)。可以设置为数字（可为小数，小数不可loop），或者 'auto'则自动根据slides的宽度来设定数量。loop模式下如果设置为'auto'还需要设置另外一个参数loopedSlides。
                    centeredSlides: true,//设定为true时，活动块会居中，而不是默认状态下的居左。
                    pagination: {
                        el: '.swiper-pagination',
                        type: 'bullets',
                        clickable: true,
                        bulletClass: 'my-bullet',
                        bulletActiveClass: 'my-bullet-active'
                    }
                },
            }
        },
        mounted(){
            console.log(this.banner_list)
        },
        methods:{
            adDetail(item){
                window.location.href=item.href;
            }
        },
        components: {
            swiper,
            swiperSlide
        }
    }
</script>

<style lang="less">
    .swiper{
        margin-top: 0.2rem;
        position: relative;
        #swiper-pot{
            position: absolute;
            left: 50%;
            transform: translateX(-50%);
            margin-top: 0.04rem;
            span.my-bullet{
                display: inline-block;
                width: 4px;
                height: 4px;
                margin: 3px;
                border-radius: 50%;
                background-color: #a5a5a5;
            }
            span.my-bullet-active{
                /*background: -webkit-linear-gradient(left, #ffc152,#f8df3f);*/
                /*background: linear-gradient(left, #ffc152,#f8df3f);*/
                background-color: #a5a5a5;
                width: 8px;
                border-radius: 4px;
            }
        }
        .swiper-container {
            width: 100%;
            height: 3.15rem;
            padding: 0.1rem 0;
        }
        .swiper-slide{
            width:86%;
            height:3.15rem;
        }
        .swiper-slide-active img {
            box-shadow: 0px 0px 10px 3px #f7f7f7;
        }
        .swiper-slide img{
            width: 93%;
            height:90%;
            display: block;
            margin: 0 auto;
            margin-top: 3%;
            transition: all 1s ease 0s;
            border-radius: 0.1rem;
        }
        .swiper-slide-active img{
            width:100%;
            height:100%;
            margin:0;
        }
    }


</style>