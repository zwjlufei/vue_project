<template>
    <div class="earnCoin">
        <ul class="earn-coin-list">
            <li v-for="(item,index) in earn_coin_list" :key="index">
                <img :src="item.src">
            </li>
        </ul>
    </div>
</template>

<script>
    import {Indicator} from 'mint-ui';
    import {timeout,title} from '../common/Tools'
    export default {
        data(){
            return {
                earn_coin_list:[]
            }
        },
        mounted(){
            title('赚取福币')
            this.getEarnCoin()
        },
        methods:{
            //赚取福币
            getEarnCoin(){
                Indicator.open('加载中...')
                this.$http(`${this.URL}/jmember/morefen`)
                    .then(res=>{
                        Indicator.close();
                        if (res.data.code == 0){
                            console.log(res)
                            this.earn_coin_list = res.data.data
                        }
                    })
                    .catch(err=>{
                        Indicator.close();
                        console.log(err)
                        timeout(err)
                    })
            }
        }
    }
</script>

<style scoped lang="less">
    @import '../../assets/css/store';
    .earnCoin{
        padding-bottom: .5rem;
    }
    .earn-coin-list{
        padding: 0 .38rem;
        box-sizing: border-box;

        li{
            margin-top: .5rem;

            img{
                width: @max_width;
            }
        }
    }
</style>