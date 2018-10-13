<template>
  <div class="goods">
    <div class="row goods-wrapper">
      <!-- 分类列表 -->
      <div class="col-xs-3 menu-wrapper" ref="menuScroll">
        <ul>
          <!-- 专场 -->
          <li 
            class="menu-item"
            :class="{'current':currentIndex === 0}"
            @click="selectMenu(0)">
            <p class="text">
              <img class="icon" :src="container.tag_icon" v-if="container.tag_icon">
              {{container.tag_name}}
            </p>
          </li>

          <li
            class="menu-item"
            :class="{'current':currentIndex === index + 1}"
            v-for="(item,index) in goods" :key="index"
             @click="selectMenu(index+1)">
            <p class="text">
              <img class="icon" :src="item.icon" v-if="item.icon">
              {{item.name}}
            </p>
            <i class="num" v-show="calculateCount(item.spus)">
            {{calculateCount(item.spus)}}
            </i>
          </li>
        </ul>
      </div>
      <!-- 商品列表 -->
      <div class="col-xs-9 foods-wrapper" ref="foodScroll">
        <ul>
          <!-- 专场 -->
          <li class="food-list-major food-list-hook">
            <div v-for="(item,index) in container.operation_source_list" :key="index">
               <img :src="item.pic_url">
            </div>
          </li>
          <!-- 具体分类 -->
          <li class="food-list-content food-list-hook" v-for="item in goods" :key="item.name">
            <h3 class="title">{{item.name}}</h3>
            <ul>
              <li class="food-list-item" v-for="food in item.spus" :key="food.id"
              @click="showDetail(food)">
               
                  <img class="food-img" :src="food.picture" alt="">
                  <h3 class="food-name">{{food.name}}</h3>
                  <div class="extra">
                    <span class="food-month-saled">{{food.month_saled_content}}</span>
                    &nbsp;&nbsp;&nbsp;
                    <span class="food-praise">{{food.praise_content}}</span>
                  </div>
                  <div class="price">
                    <span class="food-price">${{food.min_price}}</span>
                    <span class="food-num">/{{food.unit}}</span>
                  </div>
                  <car-count :food="food"></car-count>
              </li>
            </ul>
          </li>
        </ul>
      </div>
    </div>
    <!-- 购物车 -->
    <ShopCar :poiInfo="poiInfo" :selectFoods="selectFoods"></ShopCar>
    <!-- 商品详情 -->
    <product-detail :food="selectFood" ref="foodView"></product-detail>
  </div>
</template>

<script>
import Vue from 'vue'
import BScroll from 'better-scroll'
import ShopCar from '../../components/shopcar/shopCar'
import CarCount from '../../components/carCount/carCount'
import ProductDetail from '../../components/productDetail/productDetail'
export default {
  name: 'goods',
  data () {
    return {
        container:{},
        goods:[],
        poiInfo:{},
        listHeight:[],
        menuScroll:{},
        foodScroll:{},
        scrollY:0,
        selectFood:{},
        count:0
    }
  },
  components:{
    ShopCar,
    CarCount,
    ProductDetail
  },
  created(){
      this.$axios.get('/api/goods')
        .then(res =>{
          if(res.data.code == 0){
                this.container = res.data.data.container_operation_source;
                this.goods = res.data.data.food_spu_tags
                this.poiInfo = res.data.data.poi_info
                // DOM已经更新
                this.$nextTick(() => {
                  // 执行滚动方法
                  this.initScroll()

                  // 计算分类的区间高度
                  this.calculateHeight()
                  // 监听滚动的位置
                  // 根据滚动位置确认下标,与左侧对应
                  // 通过下标实现点击左侧,滚动右侧
                })
            }
        })
  },
  methods:{
    initScroll(){
      this.menuScroll = new BScroll(this.$refs.menuScroll,{
        click:true
      })
      this.foodScroll = new BScroll(this.$refs.foodScroll,{
        probeType:3,
        click:true
      })

      // foodScroll 监听事件
      this.foodScroll.on("scroll",(pos) => {
          //console.log(pos.y)
        this.scrollY = Math.abs(Math.round(pos.y))
          //console.log(this.scrollY)
      })
    },
    calculateHeight(){
      // 获取元素
      let foodlist = this.$refs.foodScroll.getElementsByClassName("food-list-hook")
       //console.log(foodlist)

      let height = 0
      this.listHeight.push(height)

      for(let i = 0; i < foodlist.length; i++){
        let item = foodlist[i]
        // 累加
        height += item.clientHeight
        this.listHeight.push(height)
      }
       //console.log(this.listHeight)
    },
    selectMenu(index){
       //console.log(index)
      let foodlist = this.$refs.foodScroll.getElementsByClassName("food-list-hook")
      let element = foodlist[index]
      // console.log(element)
      // 滚动到对应元素的位置
      this.foodScroll.scrollToElement(element,250)
     },
    calculateCount(spus){
      let count = 0
      spus.forEach((food) => {
        if(food.count > 0){
          count += food.count
        }
      })
      return count
    },
    showDetail(food){
      this.selectFood = food;
      this.$refs.foodView.showView();
    }
  },
  computed:{
    currentIndex(){
      for(let i = 0; i < this.listHeight.length; i++){
        // 获取商品区间的范围
        let height1 = this.listHeight[i]
        let height2 = this.listHeight[i+1]

        // 是否在上述区间中
        if(!height2 || (this.scrollY >= height1 && this.scrollY < height2)){
          // console.log(i)
          return i;
        }
      }
      return 0
    },
    selectFoods(){
      let foods = []
      this.goods.forEach((myfoods) => {
        myfoods.spus.forEach((food) => {
          if(food.count > 0){
            foods.push(food)
          }
        })
      })
      return foods
    }
  }
}
</script>


<style scoped>
*{
  list-style: none;
  margin: 0;
  padding: 0;
}
.goods-wrapper{
  display: flex;
  position: absolute;
  
  top: 190px;
  bottom: 51px;
  width: 100%;
  /* height: 477px; */
  overflow: hidden;

}
.goods .menu-wrapper{
  
  flex:0 0 85px;
  background: #f4f4f4;
}
.goods .menu-wrapper .menu-item{
  /* width: 100%;
  height: 100%; */
  padding: 12px;
  font-weight: bold;
}
.goods .menu-wrapper .menu-item .num{
    position: absolute;
    left:60px;
    top: 50px;
    width:18px;
    height: 18px;
    background: red;
    border-radius: 50%;
    color:#fff;
    text-align: center;
    line-height: 18px;
}
.goods .menu-wrapper .menu-item .icon{
  width: 14px;
  height: 14px;
}
/*foods-wrapper*/
.foods-wrapper{
  
  flex:1;
}
.foods-wrapper .food-list-major{
  padding: 10px;
  width: 100%;
  border-bottom: 1px solid #E4E4E4;
}
.foods-wrapper .food-list-major img{
  display: block;
  border-radius: 5px;
  width: 100%;
  height: 90px;
}
.foods-wrapper .food-list-content{
  padding: 10px;
  width: 100%;
}
.foods-wrapper .food-list-content .title{
  height: 13px;
	font-size: 13px;
	margin-bottom: 12px;
}
.foods-wrapper .food-list-content .food-list-item{
  display: flex;
  position: relative;
  height: 100px;
}
.foods-wrapper .food-list-content .food-list-item .food-img{
  width: 80px;
  height: 80px;
}
.foods-wrapper .food-list-content .food-list-item .food-name{
  position: absolute;
  top:16px;
  left: 80px;
  font-size: 16px;
	line-height: 21px;
  height: 21px;
	color: #333333;
  width: 180px;
  white-space:nowrap; 
  text-overflow:ellipsis;
  overflow: hidden;
}
.foods-wrapper .food-list-content .food-list-item .extra{
  position: absolute;
  top:46px;
  left: 80px;
  font-size: 10px;
	color: #BFBFBF;
}
.foods-wrapper .food-list-content .food-list-item .price{
  position: absolute;
  top:76px;
  left: 80px;
}
.foods-wrapper .food-list-content .food-list-item .price .food-price{
  font-size: 14px;
	color: #fb4e44;
}
.foods-wrapper .food-list-content .food-list-item .food-add{
  position: absolute;
  bottom:6px;
  right: 6px;
  display: inline-block;
  width: 24px;
	height: 24px;
	font-size: 24px;
  background :#ffd161;
  border-radius: 50%;
  text-align: center;
  line-height: 24px;
}
.foods-wrapper .food-list-content .food-list-item .food-count{
  position: absolute;
  bottom:8px;
  right: 40px;
  display: inline-block;
}
.foods-wrapper .food-list-content .food-list-item .food-reduce{
  position: absolute;
  bottom:6px;
  right: 56px;
  display: inline-block;
  width: 24px;
	height: 24px;
	font-size: 24px;
  color: #b4b4b4;
  border-radius: 50%;
  border:2px solid #b4b4b4;
  text-align: center;
  line-height: 18px;
}

.goods .menu-wrapper .menu-item.current{
	background: #fff;
	font-weight: bold;
	margin-top: -1px;
}
.goods .menu-wrapper .menu-item:first-child.current{
	margin-top: 1px;
}
</style>
