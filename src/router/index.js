import Vue from 'vue'
import Router from 'vue-router'
import ShowApply from '../components/waiterServer/show_aplly'
import Home from '../components/breedArticle/home'
import ShareCard from '../components/breedArticle/share_card'
import ArticleDetail from '../components/breedArticle/article_detail'
import storeIndex from '../components/store/storeIndex'
import myCoin from '../components/store/myCoin'
import earnCion from '../components/store/earnCoin'
import conversionRule from '../components/store/conversionRule'
import commodityList from '../components/store/commodityList'
import myConversion from '../components/store/myConversion'
import commodityDetail from '../components/store/commodityDetail'
import orderDetail from '../components/store/orderDetail'
import editInfo from '../components/store/editInfo'
import ShowHome from '../components/waiterServer/show_home'
Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
        path: '/show_apply',
        name: 'showApply',
        component: ShowApply
    },
    {
        path: '/introduce_home',
        name: 'home',
        component: Home
    },
      {
          path: '/share_card',
          name: 'shareCard',
          component: ShareCard
      },
      {
          path: '/show_home',
          name: 'showHome',
          component: ShowHome
      },
      {
          path: '/article_detail/:id',
          name: 'articleDetail',
          component: ArticleDetail
      },
      {
        path : '/storeIndex',
        component : storeIndex
      },
      {
          path : '/storeMyCoin',
          component : myCoin
      },
      {
          path : '/storeEarnCoin',
          component : earnCion
      },
      {
          path : '/storeConversionRule',
          component : conversionRule,
          meta: {
              keepAlive: false // 不需要缓存
          }
      },
      {
          path : '/storeCommodityList',
          component : commodityList
      },
      {
          path : '/storeMyConversion',
          component : myConversion
      },
      {
          path : '/storeCommodityDetail',
          component : commodityDetail
      },
      {
          path : '/storeOrderDetail',
          component : orderDetail
      },
      {
          path : '/storeEditInfo',
          component : editInfo
      }
  ]
})
