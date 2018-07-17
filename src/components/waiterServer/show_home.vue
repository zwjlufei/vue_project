<template>
    <div>
        <!--banner-->
        <div class="banner-wrap">
            <Banner :banner_list="swiper_list" v-if="banner_show"></Banner>
        </div>
        <!--六维服务-->
        <div>
            <div class="container-z new-container-gap">
                <div class="title-box mb-0">
                    <span class="title-symbol"></span>
                    <span>产妇六维服务</span>
                </div>
            </div>
            <swiper :options="swiperOption" class="my-swiper server-item-wrap six-server-wrap">
                <swiper-slide v-for="(sixItem,index) in sixServer" :key="index">
                    <img :src="sixItem.img" alt="">
                    <div class="server-title">{{sixItem.title}}</div>
                    <p>{{sixItem.first_content}}</p>
                    <p>{{sixItem.second_content}}</p>
                    <p>{{sixItem.third_content}}</p>
                </swiper-slide>
            </swiper>
        </div>
        <div class="module-wall"></div>
        <!--四维服务-->
        <div>
            <div class="container-z new-container-gap">
                <div class="title-box mb-0">
                    <span class="title-symbol"></span>
                    <span>幼儿四维服务</span>
                </div>
            </div>
            <swiper :options="swiperOption" class="my-swiper server-item-wrap four-server-wrap">
                <swiper-slide v-for="(fourItem,index) in fourServer" :key="index">
                    <img :src="fourItem.img" alt="">
                    <div class="server-title">{{fourItem.title}}</div>
                    <p>{{fourItem.first_content}}</p>
                    <p>{{fourItem.second_content}}</p>
                    <p>{{fourItem.third_content}}</p>
                </swiper-slide>
            </swiper>
        </div>
        <div class="module-wall"></div>
        <!--月嫂一天的工作-->
        <div>
            <div class="container-z new-container-gap">
                <div class="title-box mb-0">
                    <span class="title-symbol"></span>
                    <span>月嫂一天工作</span>
                </div>
            </div>
            <swiper :options="swiperOption" class="my-swiper day-work-wrap">
                <swiper-slide v-for="(workItem,index) in workData" :key="index">
                    <div>
                        <img src="http://cdn.ayi800.com/waple_sem/timer.png" alt="">
                        <span>{{workItem.time}}</span>
                    </div>
                    <p>{{workItem.first_content}}</p>
                    <p>{{workItem.second_content}}</p>
                    <p>{{workItem.third_content}}</p>
                    <p>{{workItem.fourth_content}}</p>
                </swiper-slide>
            </swiper>
        </div>
        <div class="module-wall"></div>
        <!--服务保障-->
        <div class="container-z new-container-gap">
            <div class="title-box mb-0">
                <span class="title-symbol"></span>
                <span>服务保障</span>
            </div>
            <div class="server-safe-wrap">
                <div class="server-safe-item" v-for="(safeItem,index) in safeServer" :key="index">
                    <img :src="safeItem.img" alt="">
                    <div>
                        <div class="safe-title">{{safeItem.title}}</div>
                        <div>{{safeItem.content}}</div>
                    </div>
                </div>
            </div>
        </div>
        <div class="module-wall"></div>
        <!--价格明细-->
        <div class="container-z new-container-gap">
            <div class="title-box mb-0">
                <span class="title-symbol"></span>
                <span>价格明细</span>
            </div>
            <div class="price-detail-wrap">
                <img src="http://cdn.ayi800.com/vueh5_server/peice_detail.png" alt="">
                <p style="margin-top: 0.2rem;font-size: 0.2rem">*温馨提示：产妇身体（除乳房外）各项技能恢复正常需42天，为了更
                    好的恢复，建议请42天月嫂服务哦！</p>
            </div>

        </div>
        <div class="module-wall"></div>
        <!--福宠套餐-->
        <div>
            <div class="container-z new-container-gap">
                <div class="title-box mb-0">
                    <span class="title-symbol"></span>
                    <span>福宠套餐</span>
                </div>
            </div>
            <swiper :options="swiperOption" class="my-swiper fu-meal-wrap">
                <swiper-slide v-for="(mealItem,index) in mealData" :key="index">
                   <div class="mead-titles">{{mealItem.title}}</div>
                    <ul>
                        <li v-for="item in mealItem.content">
                            <div class="meal-item-left">{{item.name}}</div>
                            <div>{{item.price}}</div>
                        </li>
                    </ul>
                    <div class="price-btn">仅需{{mealItem.new_price}}元</div>
                    <div class="old-price">原价{{mealItem.old_price}}元</div>
                </swiper-slide>
            </swiper>
        </div>
        <div class="module-wall"></div>
        <!--服务流程-->
        <div class="container-z new-container-gap">
            <div class="title-box mb-0">
                <span class="title-symbol"></span>
                <span>服务流程</span>
            </div>
            <div class="server-flow-wrap">
                <div>
                    <img src="http://cdn.ayi800.com/image/png/wx_waple_service_flow1%E7%94%B5%E8%AF%9D@2x.png" alt="">
                    <div>电话沟通</div>
                </div>
                <div class="server-flow-arr"></div>
                <div>
                    <img src="http://cdn.ayi800.com/image/png/wx_waple_service_flow2%E8%81%94%E7%B3%BB%E4%BA%BA@2x.png" alt="">
                    <div>面试服务员</div>
                </div>
                <div class="server-flow-arr"></div>
                <div>
                    <img src="http://cdn.ayi800.com/ERP_%E5%90%88%E5%90%8C%E5%8F%B7@2x.png" alt="">
                    <div>签订合同</div>
                </div>
                <div class="server-flow-arr"></div>
                <div>
                    <img src="http://cdn.ayi800.com/image/png/wx_waple_service_flow4%E4%B8%8A%E9%97%A8%E6%9C%8D%E5%8A%A1-%E7%BA%BF@2x.png" alt="">
                    <div>上门服务</div>
                </div>
                <div class="server-flow-arr"></div>
                <div>
                    <img src="http://cdn.ayi800.com/image/png/wx_waple_service_flow3%E5%A5%BD%E8%AF%84@2x.png" alt="">
                    <div>服务完成</div>
                </div>
            </div>
        </div>
        <div class="module-wall"></div>
        <!--关于我们-->
        <div class="container-z new-container-gap">
            <div class="title-box mb-0">
                <span class="title-symbol"></span>
                <span>关于我们</span>
            </div>
            <div class="about-our-wrap">
                <img src="http://cdn.ayi800.com/vueh5_server/our.png" alt="">
                <p>有福妈妈是中国最大、最专业的提供母婴护理服务公司，成立于2012年，总部位于北京。致力于为中国的妈妈们提供最标准最专业的母婴护理服务，现已成为40000多个家庭的育儿伙伴。好评率达95%以上，有福妈妈希望通过不断改进的流程把控体系，源源不断地为妈妈们输送最优质的母婴护理专业服务，让妈妈们更快更好地找到专业母婴护理师，同时享受更优质的服务，不再为坐月子、宝宝的孕育问题担忧，真正的享受到福气。</p>
            </div>
        </div>
        <div class="module-wall"></div>
        <!--价格明细-->
        <div class="container-z new-container-gap">
            <div class="about-our-wrap address-wrap">
            <p>服务电话：4006-625-800 </p>
            <p>北京地址：北京市朝阳区东三环北路甲2号京信大厦24层</p>
            <p>深圳地址：深圳市罗湖区东门南路3005号寸金大厦701G</p>
            <p>广州地址：广州市天河区广汕二路600号天河软件园柯木塱园区6栋101</p>
            </div>
        </div>
        <div style="height: 1.1rem"></div>
        <!--吸底-->
        <div class="consult-btn-wrap">
            <div class="online-consult-wrap" @click="goConsult">
                <img src="http://cdn.ayi800.com/vueh5_server/mag_lable.png" alt="">
                <span>在线咨询</span>
            </div>
            <div class="phone-consult-wrap" @click="callPhone">
                <img src="http://cdn.ayi800.com/vueh5_server/phone.png" alt="">
                <span>400-662-5800</span>
            </div>
        </div>
    </div>
</template>

<script>
    import { swiper, swiperSlide } from 'vue-awesome-swiper';
    import { Indicator } from 'mint-ui';
    import Banner from '../common/banner';
    export default {
        name: "showHome",
        data(){
            return{
                defaultIndex : 0,
                swiper_list:[],
                banner_show : false,
                swiperOption: {
                    slidesPerView: 'auto',
                    spaceBetween: 23
                },
                sixServer:[
                    {img:'http://cdn.ayi800.com/waple_sem/zhuanyehuli6_1.png',title:'专业护理',first_content:'子宫恢复观察',second_content:'恶露排净观察',third_content:'乳房护理观察'},
                    {img:'http://cdn.ayi800.com/waple_sem/shenghuohuli6_2.png',title:'生活护理',first_content:'月子餐制作',second_content:'室内环境清洁',third_content:'床品衣物清洁'},
                    {img:'http://cdn.ayi800.com/waple_sem/xinlihuli6_3.png',title:'心理护理',first_content:'抑郁症观察',second_content:'生活计划安排',third_content:'谈话情绪舒缓'},
                    {img:'http://cdn.ayi800.com/waple_sem/jibingyufang.png',title:'疾病预防',first_content:'产褥热预防',second_content:'乳腺炎预防',third_content:'产褥期预防'},
                    {img:'http://cdn.ayi800.com/waple_sem/chanhouhuifu6_5.png',title:'产后恢复',first_content:'恢复情况观察',second_content:'产后体操恢复',third_content:'肩颈四肢按摩'},
                    {img:'http://cdn.ayi800.com/waple_sem/daijiapeixun.png',title:'带教培训',first_content:'喂奶姿势指导',second_content:'亲子互动指导',third_content:'传授护理技巧'}
                ],
                fourServer:[
                    {img:'http://cdn.ayi800.com/waple_sem/shenghuozhaoliao4_1.png',title:'生活照料',first_content:'每日哺乳记录',second_content:'喂奶拍嗝处理',third_content:'三浴抚触剪指甲'},
                    {img:'http://cdn.ayi800.com/waple_sem/jibingyufang.png',title:'疾病预防',first_content:'宝宝黄疸观察',second_content:'脐炎预防护理',third_content:'红臀湿疹预防'},
                    {img:'http://cdn.ayi800.com/waple_sem/jiangkanghuli4_3.png',title:'健康护理',first_content:'发育脐臀护理',second_content:'房间温湿调节',third_content:'用品衣物消毒'},
                    {img:'http://cdn.ayi800.com/waple_sem/daijiapeixun.png',title:'带教培训',first_content:'感知语言训练',second_content:'社会行为培养',third_content:'安抚睡眠养成'}
                ],
                workData:[
                    {time:'6:00-7:00',first_content:'月嫂起床洗漱，准备早餐',second_content:'清理宝宝卫生、测体温、喂奶、拍嗝',third_content:'与宝宝亲子互动',fourth_content:'收拾厨房用具、产妇用具'},
                    {time:'8:00-10:00',first_content:'产妇恶露观察，伤口观察，清理消毒',second_content:'产妇恢复情况，做轻微形体恢复训练',third_content:'清理宝宝卫生、喂奶、拍嗝、脐带消毒',fourth_content:'给产妇准备一次加餐'},
                    {time:'10:00-12:00',first_content:'给宝宝做早教',second_content:'整理产妇和宝宝用具',third_content:'清洗衣物',fourth_content:'准备午餐'},
                    {time:'12:00-13:00',first_content:'清理宝宝卫生、喂奶、拍嗝',second_content:'给宝宝做早教',third_content:'给看黑白点卡，促进宝宝的发育',fourth_content:'哄宝宝午睡'},
                    {time:'13:00-15:00',first_content:'清理宝宝卫生，喂奶、拍嗝',second_content:'产妇加餐、给宝宝做早教',third_content:'产妇恶露观察，乳房观察',fourth_content:'伤口消毒，乳房护理等'},
                    {time:'16:30-20:00',first_content:'准备晚餐',second_content:'换尿布、清洗、喂奶，拍嗝',third_content:'收拾厨房及用具，打扫卫生',fourth_content:'给宝宝洗澡、做抚触、按摩、做脐带消毒'}
                ],
                safeServer:[
                    {img:"http://cdn.ayi800.com/image/png/wx_waple_service_item1icon1@2x.png",title:'严格筛选，质量把关',content:'月嫂和育儿嫂除三证齐全外，还需体检和背景 调查，通过率仅为30%'},
                    {img:"http://cdn.ayi800.com/image/png/wx_waple_service_item2icon2@2x.png",title:'价格透明，无中介费',content:'合格的服务应该有合理的价格，价格标准透明， 没有任何中间费用'},
                    {img:"http://cdn.ayi800.com/image/png/wx_waple_service_item3icon3@2x.png",title:'三大保障，全程护航',content:'试工、保险，更首创保证金制度多重手段保障 您的权益不受侵害！'},
                    {img:"http://cdn.ayi800.com/image/png/wx_waple_service_item4icon4@2x.png",title:'智能督导，确保无虞',content:'独创智能管控系统，全程监督，全程保证上户 品质和突发问题处理。'}
                ],
                mealData:[
                    {
                        title:'42天呵护套餐',
                        content:[
                            {name:'42天护理服务',price:'20677天'},
                            {name:'中医体质调养',price:'19999元'},
                            {name:'全程营养指导',price:'300元'},
                            {name:'2次母乳指导',price:'698元x2次'},
                            {name:'42天护理服务',price:'698元x3次'}
                        ],
                        new_price:24800,
                        old_price:16665
                    },
                    {
                        title:'26天呵护套餐',
                        content:[
                            {name:'42天护理服务',price:'20677天'},
                            {name:'中医体质调养',price:'19999元'},
                            {name:'全程营养指导',price:'300元'},
                            {name:'2次母乳指导',price:'698元x2次'},
                            {name:'42天护理服务',price:'698元x3次'}
                        ],
                        new_price:24800,
                        old_price:36665
                    },
                    {
                        title:'42天呵护套餐',
                        content:[
                            {name:'42天护理服务',price:'20677天'},
                            {name:'中医体质调养',price:'19999元'},
                            {name:'全程营养指导',price:'300元'},
                            {name:'2次母乳指导',price:'698元x2次'},
                            {name:'42天护理服务',price:'698元x3次'}
                        ],
                        new_price:24800,
                        old_price:26665
                    },
                    {
                        title:'42天呵护套餐',
                        content:[
                            {name:'42天护理服务',price:'20677天'},
                            {name:'中医体质调养',price:'19999元'},
                            {name:'全程营养指导',price:'300元'},
                            {name:'2次母乳指导',price:'698元x2次'},
                            {name:'42天护理服务',price:'698元x3次'}
                        ],
                        new_price:24800,
                        old_price:26665
                    }
                ]
            }
        },
        components: {
            Banner
        },
        mounted:function(){
            Indicator.open();
            var user_id = this.$route.query;
            sessionStorage.setItem('user_id',JSON.stringify(user_id));
            this.getBanner();
        },
        methods:{
            handleChange(e){
                this.defaultIndex = e
            },
            goConsult:function () {
                window.location.href="http://p.qiao.baidu.com/cps/chat?siteId=11726176&userId=5452435";
            },
            callPhone:function () {
                window.location.href="tel:4006625800";
            },
            getBanner:function () {
                var that = this;
                this.$http(`${this.URL}/jmember/serviceIntro`)
                    .then(function (response) {
                        Indicator.close();
                        if(response.data.code == 0){
                            that.banner_show = true;
                            that.swiper_list = response.data.data;
                        }
                    })
                    .catch(function (response) {
                        console.log(response);
                    });
            }
        },
        computed: {

        }
    }
</script>

<style lang="less" scoped>
    .new-container-gap{
        padding: 0.5rem 0.24rem 0;
    }
    /*benner*/
    .banner-wrap{
        width: 100%;
        box-sizing: border-box;
        padding-top: 0.26rem;
    }
    .swiper-img{
        width: 100%;
        height:100%;
        border-radius: 0.1rem;
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
    /*六维服务／四维服务*/
    .server-item-wrap{
        padding: 0.3rem 0.55rem;
        .swiper-slide {
            box-shadow: -3px 0px 12px 5px #f7f7f7;
            text-align: center;
            padding-top: 0.25rem;
            border-radius: 0.1rem;
            img{
                width: 1.4rem;
                border-radius: 50%;
                margin: 0 auto;
            }
            .server-title{
                font-size: 0.3rem;
                color: #ff8081;
                margin-bottom: 0.15rem;
            }
            p{
                font-size: 0.24rem;
            }
        }
    }
    .six-server-wrap{
        .swiper-slide {
            width: 2.3rem;
            height: 3.2rem;
        }
    }
    .four-server-wrap{
        .swiper-slide {
            width: 2.3rem;
            height: 3.2rem;
        }
    }
    /*一天工作*/
    .day-work-wrap{
        padding: 0.3rem 0.55rem;
        .swiper-slide{
            width: 5.85rem;
            height: 2.6rem;
            border-radius: 0.1rem;
            box-shadow: -3px 0px 12px 5px #f7f7f7;
            background: -webkit-linear-gradient(to left,#ec698e, #ff8565);
            background: linear-gradient(to left,#ec698e, #ff8565);
            padding-top: 0.25rem;
            padding-left: 0.2rem;
            color: #ffffff;
            box-sizing: border-box;
            div{
                font-size: 0.3rem;
                margin-bottom: 0.2rem;
                display: flex;
                img{
                    width: 0.35rem;
                    height: 0.35rem;
                    margin-right: 0.15rem;
                }
            }
            p{
                font-size: 0.24rem;
                padding-left: 0.5rem;
                line-height: 0.35rem;
            }
        }
    }
    /*服务保障*/
    .server-safe-wrap{
        padding:0 0.3rem 0.3rem;
        .server-safe-item{
            display: flex;
            justify-content: space-between;
            align-items: center;
            font-size: 0.24rem;
            color: #7f7f7f;
            padding: 0.3rem 0.3rem 0.22rem 0.1rem;
            border-bottom: 1px solid #e5e5e5;
            .safe-title{
                font-size: 0.3rem;
                color: #333333;
            }
            img{
                width: 1.3rem;
                margin-right: 0.5rem;
            }
        }
        .server-safe-item:last-child{
            border-bottom: none;
        }
    }
    /*价格明细*/
    .price-detail-wrap{
        padding:0.4rem 0.3rem;
        img{
            width: 100%;
        }
        p{
            font-size: 0.24rem;
            color: #313131;
            margin-top: 0.35rem;
            line-height: 0.4rem;
        }
    }
    .about-our-wrap{
        padding:0.4rem 0.3rem;
        img{
            width: 100%;
        }
        p{
            font-size: 0.26rem;
            color: #313131;
            margin-top: 0.35rem;
            line-height: 0.43rem;
        }
    }
    .address-wrap{
        p{
            margin-top: 0;
        }
    }
    /*福宠套餐*/
    .fu-meal-wrap{
        padding: 0.3rem 0.55rem;
        .swiper-slide {
            width: 4.15rem;
            height: 5rem;
            box-shadow: -3px 0px 12px 5px #f7f7f7;
            border-radius: 0.1rem;
            padding: 0.3rem 0.2rem 0 0.3rem;
            box-sizing: border-box;
            .mead-titles{
                text-align: center;
                width: 3.3rem;
                border-bottom: 1px solid #ff8081;
                margin: 0 auto;
                padding-bottom: 0.2rem;
            }
            ul{
                padding: 0.3rem 0 0.2rem;
                li{
                    display: flex;
                    padding-left: 0.25rem;
                    line-height: 0.5rem;
                    position: relative;
                    color: #313131;
                    font-size: 0.24rem;
                    &::before{
                        content:"";
                        width: 0.1rem;
                        height: 0.1rem;
                        display: inline-block;
                        border-radius: 50%;
                        background: -webkit-linear-gradient(to left,#ec698e, #ff8565);
                        background: linear-gradient(to ,#ec698e, #ff8565);
                        position: absolute;
                        left: 0;
                        top: 50%;
                        transform: translateY(-50%);
                    }
                    .meal-item-left{
                        width: 2rem;
                    }
                }

            }
            .price-btn{
                width: 2.75rem;
                line-height: 0.45rem;
                border: 1px solid #f5777a;
                border-radius: 0.1rem;
                text-align: center;
                color: #ff8081;
                font-size: 0.28rem;
                margin: 0 auto 0.1rem;
            }
            .old-price{
                text-align: center;
                color: #7f7f7f;
                font-size: 0.26rem;
                position: relative;
                &::before{
                    content: "";
                    display: inline-block;
                    width: 2rem;
                    height: 1px;
                    background: #7f7f7f;
                    position: absolute;
                    left: 50%;
                    top: 50%;
                    transform: translate(-50%,-50%);
                }
            }
        }
    }
    /*服务流程*/
    .server-flow-wrap{
        padding: 0.3rem 0;
        display: flex;
        text-align: center;
        font-size: 0.22rem;
        justify-content: space-around;
        img{
            width: 0.47rem;
            height: 0.5rem;
            margin: 0 auto 0.1rem;
        }
        .server-flow-arr{
            width: 0.25rem;
            height: 0.15rem;
            background: url("http://cdn.ayi800.com/image/png/wx_waple_service_arrow1%E6%9C%88%E5%AB%82%E6%9C%8D%E5%8A%A1_03.png") no-repeat;
            background-size: 100%;
            margin-top: 0.18rem;
        }
    }
    /*吸底*/
    .consult-btn-wrap{
        position: fixed;
        bottom: 0;
        left: 0;
        width: 100%;
        height: 1.1rem;
        z-index: 999;
        display: flex;
        box-shadow: -3px 0px 12px 5px #f7f7f7;
        .online-consult-wrap{
            width: 2.95rem;
            background: #ffffff;
            display: flex;
            align-items: center;
            padding-left: 0.55rem;
            color: #6f6f6f;
            img{
                width: 0.47rem;
                height: 0.41rem;
                margin-right: 0.33rem;
            }
        }
        .phone-consult-wrap{
            flex: 1;
            display: flex;
            align-items: center;
            padding-left: 0.55rem;
            background: -webkit-linear-gradient(to left,#ec698e, #ff8565);
            background: linear-gradient(to left,#ec698e, #ff8565);
            color: #ffffff;
            img{
                width: 0.42rem;
                height: 0.37rem;
                margin-right: 0.5rem;
            }
        }
    }
</style>