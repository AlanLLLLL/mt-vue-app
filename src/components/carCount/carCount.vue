<template>
  <div class="carCount">
    <span class="food-add" @click.stop.prevent="increaseCount">+</span>
    <span class="food-count" v-show="food.count>0">{{food.count}}</span>
    <span class="food-reduce" @click.stop.prevent="reduceCount" v-show="food.count>0">-</span>
  </div>
</template>

<script>
import Vue from 'vue'
export default {
  name: 'carCount',
  data () {
    return {
     
    }
  },
  props:{
    food:{
        type:Object
    }
  },
  methods:{
    increaseCount(){
      if(!this.food.count){
          Vue.set(this.food,"count",1)
        }else{
          this.food.count++
        }
        // console.log(food)
      //  console.log(this.count)
    },
    reduceCount(){
      this.food.count --;
    }
  }
}
</script>


<style scoped>
.food-add{
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
.food-count{
  position: absolute;
  bottom:8px;
  right: 40px;
  display: inline-block;
}
.food-reduce{
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
</style>
