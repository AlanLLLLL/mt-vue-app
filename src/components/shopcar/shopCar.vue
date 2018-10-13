<template>
  <div class="shopCar">
    <div class="car-wrapper">
        <!-- 购物车为空 -->
        <div class="car-empty" v-show="selectFoods.length ===0">
            <div class="empty-img-wrapper">
                <img src="../../assets/shopCar_off.png" class="empty-img">
            </div>
            <span class="text">另需配送￥6</span>
            <span class="send">起送￥0</span>
        </div>
        <!-- 购物车不为空 -->
        <div class="car-notEmpty" v-show="selectFoods.length >0">
            <div class="notEmpty-img-wrapper" @click="showDetail">
                <img src="../../assets/shopCar_on.png" class="notEmpty-img">
            </div>
            <span class="text">另需配送￥6</span>
            <span class="send">去结算</span>
            <span class="count">{{totalCount}}</span>
            <span class="money">￥{{totalMoney}}</span>
            <div class="car-detail" v-show="flag">
                <span class="top">新用户下单立减18元，首次使用银行卡再减6元</span>
                <div class="title" @click="clearCar">
                    <img style="width:14px;height:14px;" src="../../assets/delete.png" alt="">
                    清空购物车
                </div>
                <ul>
                    <li class="detail-list" v-for="(item,index) in selectFoods" :key="index">
                        <span class="name">{{item.name}}</span>
                        <span class="price">￥{{item.min_price}}</span>
                        <car-count :food="item"></car-count>
                    </li>
                </ul>
            </div>
        </div>
    </div>
    <div class="showBg" v-show="flag" @click="listShow"></div>
  </div>
</template>

<script>
import CarCount from '../carCount/carCount'
export default {
  name: 'shopCar',
  components:{
      CarCount
  },
  props:{
      poiInfo:{
          type:Object,
          default:{}
      },
      selectFoods:{
          type:Array,
          default(){
			return []
		}
      }
  },
  data () {
    return {
        flag:false
    }
  },
  computed:{
    totalCount(){
        let count = 0;
        for(let index in this.selectFoods){
            count += this.selectFoods[index].count;
        }
        return count;
    },
    totalMoney(){
        let money = 0;
        for(let index in this.selectFoods){
            money += this.selectFoods[index].count * this.selectFoods[index].min_price
        }
        return money;
    },
    listShow(){
        if(this.totalCount == 0){
            this.flag = false;
        }
        return this.flag;
    }
  },
  methods:{
      clearCar(){
        this.selectFoods.forEach((food) => {
		    food.count = 0
        })
        this.flag = false;
      },
      showDetail(){
          if(!this.flag){
            this.flag = true;
          }else{
              this.flag = false;
          }
      }
  }
}
</script>


<style scoped>
/* @import url(../../common/css/icon.css); */
.car-wrapper{
    width:100%;
    height: 51px;
}
.car-wrapper .car-empty{
    width: 100%;
    height: 51px;
    background: #514f4f;
	position: fixed;
	left: 0;
	bottom: 0;
	z-index: 99;
}
.car-empty .empty-img-wrapper{
    position: absolute;
    left: 10px;
    bottom:20px;
    width:51px;
    height: 51px;
    background: #666666;
    border-radius: 50%;
    
}
.car-empty .empty-img{
    position: absolute;
    width: 30px;
    height: 30px;
    left: 10px;
    top:10px;
}
.car-empty .text{
    position: absolute;
    left:66px;
    top:16px;
    font-size: 12px;
    color:#BAB9B9;
    font-weight: bold;
}
.car-empty .send{
    position: absolute;
    right:20px;
    top:16px;
    font-size: 14px;
    color:#BAB9B9;
    font-weight: bold;
}
/* 购物车不为空 */
.car-wrapper .car-notEmpty{
    width: 100%;
    height: 51px;
    background: #514f4f;
	position: fixed;
	left: 0;
	bottom: 0;
	z-index: 101;
}
.car-notEmpty .notEmpty-img-wrapper{
    position: absolute;
    left: 10px;
    bottom:20px;
    width:51px;
    height: 51px;
    background: #FFD161;
    border-radius: 50%;
    z-index: 102;
    
}
.car-notEmpty .notEmpty-img{
    position: absolute;
    width: 30px;
    height: 30px;
    left: 10px;
    top:10px;
}
.car-notEmpty .text{
    position: absolute;
    left:66px;
    top:30px;
    font-size: 12px;
    color:#BAB9B9;
    font-weight: bold;
}
.car-notEmpty .send{
    position: absolute;
    right:0;
    top: 0;
    width:110px;
    height: 51px;
    background: #FFD161;
    font-size: 14px;
    color:#2D2B2A;
    font-weight: bold;
    text-align: center;
    line-height: 51px;
}
.car-notEmpty .count{
    position: absolute;
    left:46px;
    top: -20px;
    width:16px;
    height: 16px;
    background: red;
    border-radius: 50%;
    color:#fff;
    text-align: center;
    line-height: 16px;
    z-index: 103;
}
.car-notEmpty .money{
    position: absolute;
    left:66px;
    top: 4px;
    font-size: 18px;
    color:#fff; 
}
.car-notEmpty .car-detail{
    position: absolute;
    bottom:51px;
    width: 100%;
    background: #fff;
    z-index: 100;
}
.car-notEmpty .car-detail .top{
    display: inline-block;
    text-align: center;
    width: 100%;
    height: 30px;
    font-size: 12px;
    line-height: 30px;
    background-color: #FFD161
}
.car-notEmpty .car-detail .title{
    text-align: left;
    padding-left: 10px;
    width: 100%;
    height: 30px;
    font-size: 12px;
    line-height: 30px;
    background: rgb(245, 237, 237);
}
.car-notEmpty .car-detail .detail-list{
    position: relative;
    width: 100%;
    height: 50px;
}
.car-notEmpty .car-detail .detail-list .name{
    display: inline-block;
    width: 180px;
    height: 50px;
    line-height: 50px;
    font-size: 16px;
    padding-left: 10px;
    white-space:nowrap; 
    text-overflow:ellipsis;
    overflow: hidden;
}
.car-notEmpty .car-detail .detail-list .price{
    position: absolute;
    display: inline-block;
    top:16px;
    right: 140px;
    font-size: 16px;
}
.showBg{
    position: fixed;
    top:0;
    width: 100%;
    height: 100%;
    background: rgba(7,17,27,0.6);
    z-index: 10;
}
</style>
