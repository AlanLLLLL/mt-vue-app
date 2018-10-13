import Vue from 'vue'
import VueRouter from 'vue-router'
import Goods from '../components/goods/goods.vue'
import Comments from '../components/comments/comments.vue'
import Seller from '../components/seller/seller.vue'
Vue.use(VueRouter)

const router = new VueRouter({
    mode:"history",
    routes:[
        {path:"/",redirect:"/goods"},
        {path:"/goods",component:Goods},
        {path:"/comments",component:Comments},
        {path:"/seller",component:Seller}
    ],
    linkActiveClass:"active"
})

export default router;