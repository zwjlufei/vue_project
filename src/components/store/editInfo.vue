<template>
    <div class="editInfo" style="overflow-x: hidden">
        <div class="order-info-wrap">
            <img src="http://cdn.ayi800.com/image/png/vue_order_infoorderinfo.png">
            <div class="order-info font-30 color-444">订单信息</div>
        </div>
        <div class="good-info-wrpa">
            <div class="good-info-content">
                <div class="good-img-wrap">
                    <img :src="good_detail.despic">
                </div>
                <div class="good-info">
                    <div class="good-name">物品名称：{{good_detail.title}}</div>
                    <div class="consume-num">
                        <span class="consume-text font-26 color-444">本次消费：</span>
                        <span class="consume-price font-26 color-fe5">{{good_detail.fen}}福币</span>
                    </div>
                </div>
            </div>
        </div>
        <div class="level"></div>
        <div class="order-info-wrap">
            <img src="http://cdn.ayi800.com/image/png/vue_order_addressaddress.png" class="address-img">
            <div class="order-info font-30 color-444">收货地址</div>
        </div>
        <div class="select-address-wrap" @click="show_city_model">
            <div class="select-address-text color-444 font-28">所在地区</div>
            <div class="select-text-wrap">
                <span class="select-text font-28 color-a5a">{{_address}}</span>
                <span class="arrow-right"></span>
            </div>
        </div>
        <div class="detail-address">
            <textarea name="address" v-model="address_text" class="detail-address-text" placeholder="请填写详细地址" ></textarea>
        </div>
        <div class="level"></div>
        <div class="order-info-wrap">
            <img src="http://cdn.ayi800.com/image/png/vue_order_peoplepeople.png" class="people-img">
            <div class="order-info font-30 color-444">收件人信息</div>
        </div>
        <div class="people-name-wrap">
            <div class="people-title font-28 color-444">收货人</div>
            <div class="people-name">
                <input type="text" class="input-text" placeholder="请输入收货人" v-model="people_name">
            </div>
        </div>
        <div class="people-name-wrap">
            <div class="phone-title font-28 color-444">联系电话</div>
            <div class="phone-num">
                <input type="text" class="input-text" placeholder="请输入联系电话" v-model="phone" maxlength="11">
            </div>
        </div>
        <div class="detail-address">
            <textarea name="address" v-model="remark" class="detail-address-text" placeholder="选填：备注订单内容" ></textarea>
        </div>
        <div class="level"></div>
        <div class="submit-wrap">
            <div class="submit color-fff font-28 bgc-gradual" @click="submit">提交</div>
        </div>
        <div class="picker-model-wrap" v-if="city_model" @touchmove.prevent>
            <div class="picker-model">
                <div class="btn-wrap">
                    <div class="cancel font-28 color-479" @click="hide_city_model">取消</div>
                    <div class="confirm font-28 color-479" @click="select_city">确定</div>
                </div>
                <div>
                    <mt-picker :slots="slots" @change="onValuesChange"></mt-picker>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import { Picker , Toast ,Indicator} from 'mint-ui';
    import {toast,trim,GetToken,timeout,title} from '../common/Tools'
    import city from './city'
    export default {
        name: "edit-info",
        data(){
            return {
                city_model:false,
                slots: [
                    {
                        flex: 1,
                        values: Object.keys(city),
                        className: 'slot1',
                        textAlign: 'right'
                    }, {
                        flex: 1,
                        values: ['直辖区'],
                        textAlign: 'center',
                        className: 'slot2'
                    }, {
                        flex: 1,
                        values: ["东城区", "西城区", "朝阳区", "丰台区", "石景山区", "海淀区", "门头沟区", "房山区", "通州区", "顺义区", "昌平区", "大兴区", "怀柔区", "平谷区", "密云区", "延庆区"],
                        className: 'slot3',
                        textAlign: 'left'
                    }
                ],
                address_prov :'',
                address_city : '',
                address_district : '',
                address_select : '请选择',
                address_text : '',
                people_name : '',
                phone : '',
                remark : '',
                good_detail:{},
                customer:{},
                good_id : '',
                customer_id : ''
            }
        },
        mounted(){
            title('填写信息')
            this.getGoodInfo(this.$route.query.id,this.$route.query.customer_id)
            this.good_id = this.$route.query.id
            this.customer_id = this.$route.query.customer_id
        },
        methods:{
            //订单信息
            getGoodInfo(id,customer_id){
                Indicator.open('加载中...')
                this.$http(`${this.URL}/jmember/exchange?id=${id}&customer_id=${customer_id}`)
                    .then(res=>{
                        Indicator.close()
                        if (res.data.code == 0){
                            this.good_detail = res.data.data
                            this.customer = res.data.data.customer
                        }
                    })
                    .catch(err=>{
                        Indicator.close()
                        console.log(err)
                        timeout(err)
                    })
            },
            //城市滑动更改状态
            onValuesChange(picker, values) {
                if (city[values[0]]){
                    picker.setSlotValues(1,Object.keys(city[values[0]]));
                    picker.setSlotValues(2,city[values[0]][values[1]]);
                    //判断如果最后一个为市 则这个城市是直辖市则填为空 否则正常取值
                    this.address_prov = values[0].charAt(values[0].length-1)=='市'?'':values[0]
                    //判断如果第二个为市辖区或者县区则说明这个城市还是为直辖区，所以将值改变为第一个获取的城市名否则正常取值
                    this.address_city = values[1]=='市辖区' || values[1]=='县'?values[0]:values[1]
                    this.address_district = values[2]
                }
            },
            //显示三级联动
            show_city_model(){
                this.city_model = true
            },
            //隐藏三级联动
            hide_city_model(){
                this.city_model = false
            },
            //点击确定
            select_city(){
                this.city_model = false
                //如果第一次进来不滑动则上边函数会失效 ，则动态改变城市值
                if (this.address_city == '直辖区'){
                    this.address_city = '北京'
                }
                this.address_select = this.address_prov + '-' + this.address_city + '-' + this.address_district
            },
            //提交
            submit(){
                var address_text = trim(this.address_text)
                var phone = trim(this.phone)
                if (this.address_select == '请选择'){
                    toast('请输入所在地区')
                    return
                }
                if (!address_text){
                    toast('请输入详细地址')
                    return
                }
                if (!this.people_name){
                    toast('请输入收货人')
                    return
                }
                if (!(/^1[34578]\d{9}$/.test(phone))){
                    toast('手机号格式错误')
                    return
                }
                GetToken().then(res=>{
                    Indicator.open('加载中...')
                    var c_token = res.name
                    var data = {
                        id : this.good_detail.id,       //商品id
                        num : 1,                        //兑换数量
                        customer_id : this.customer.id, //用户id
                        fullname : this.people_name,    //收货人名字
                        phone : this.phone,             //收货人手机号
                        prov : this.address_prov,       //收货人省级
                        city : this.address_city,       //收货人市级
                        address : `${this.address_district}${this.address_text}`,  //收货人详细地址
                        note : this.remark              //备注
                    }
                    data[c_token] = res.value
                    this.$http({
                        url : `${this.URL}/jmember/exchange`,
                        method:'post',
                        data:this.$qs.stringify(data)
                    })
                        .then(res=>{
                            Indicator.close()
                            console.log(res)
                            //接口成功跳转商品详情页面,传参数,判断是否成功
                            this.$router.push({path:'/storeCommodityDetail',query:{
                                  id : this.good_id,
                                  customer_id : this.customer_id,
                                  msg : res.data.msg,
                                  code : res.data.code,
                                  status : true
                              }})
                        })
                        .catch(err=>{
                            Indicator.close()
                            console.log(err)
                            timeout(err)
                        })
                })

            }
        },
        computed:{
            //如果不选择省级默认会出现横线,动态去除横线
            _address(){
                if (this.address_select != '请选择'){
                    if (this.address_select.slice(0,1) == '-'){
                        this.address_select = this.address_select.split('').slice(1).join('')
                    }
                }
                return this.address_select
            }
        }
    }
</script>

<style scoped lang="less">
    @import '../../assets/css/store';
    .order-info-wrap{
        display: flex;
        padding: .27rem 0 .24rem .36rem;
        align-items: center;
        border-bottom: 1px solid @color-f3f;
        & img{
            width: .3rem;
            height: .3rem;
            margin-right: .17rem;
        }
    }
    .good-img-wrap{

        & img{
            width: 1.44rem;
            height: 1rem;
        }
    }
    .good-info-content{
        display: flex;
        padding: .27rem .36rem .3rem;
    }
    .good-info{
        flex: 1;
        padding-left: .32rem;
    }
    .consume-num{
        margin-top: .1rem;
    }
    .level{
        height: .22rem;
        background-color: @color-f3f;
    }
    .address-img{
        width: .23rem!important;
        height: .31rem!important;
    }
    .select-address-wrap{
        padding: .3rem .36rem ;
        display: flex;
        justify-content: space-between;
        border-bottom:1px solid @color-f3f ;
    }
    .select-address-text{
        margin-right: .1rem;
    }
    .select-text-wrap{
        display: flex;
        align-items: center;
        padding-right: .1rem;
        justify-content: flex-end;
        overflow:hidden;
        text-overflow:ellipsis;
        white-space:nowrap;
        flex: 1;
    }
    .select-text{
        overflow:hidden;
        text-overflow:ellipsis;
        white-space:nowrap;
        flex: 1;
        text-align: right;
    }
    .detail-address-text{
        border: none;
        outline: none;
        height: .8rem;
        width: @max_width;
    }
    textarea::-webkit-input-placeholder {
        color: @color-a5a;
        font-size: @font-28;
    }
    .detail-address{
        box-sizing: border-box;
        padding: .38rem .36rem .36rem;
    }
    .people-img{
        width: .3rem!important;
        height: .3rem!important;
    }
    input{
        width: @max_width;
        border: none;
        outline: none;
        padding-left: .75rem;
        line-height: .5rem;
    }
    input::-webkit-input-placeholder {
        color: @color-a5a;
        font-size: @font-28;
    }
    .people-name,.phone-num{
        flex: 1;
    }
    .people-name-wrap{
        display: flex;
        padding: .34rem .36rem;
        align-items: center;
        border-bottom: 1px solid @color-f3f;
    }
    .submit{
        width: 2.73rem;
        height: .7rem;
        margin: .55rem auto;
        display: flex;
        justify-content: center;
        align-items: center;
        border-radius: .1rem;
    }
    .picker-model-wrap{
        position: fixed;
        top: 0;
        left: 0;
        bottom: 0;
        right: 0;
        background: rgba(0,0,0,.5);
    }
    .picker-model{
        position: absolute;
        bottom: 0;
        left: 0;
        width: @max_width;
        height: 4.8rem;
        background-color: @color-fff;
    }
    .btn-wrap{
        padding: .2rem .17rem;
        display: flex;
        justify-content: space-between;
        border-bottom: 1px solid @color-f3f;
    }

</style>