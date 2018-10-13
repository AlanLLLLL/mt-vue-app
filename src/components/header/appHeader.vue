<template>
  <div class="appHeader">
    <div class="appHeader-con container">
      <!-- 顶部通栏 -->
      <div class="header-top">
          <div class="row">
              <div class="col-xs-1 back">
              &lt;
              </div>
              <div class="col-xs-7">
                <form class="form-group">
                  <!-- <span class="glyphicon glyphicon-search input-group-glyphicon"></span> -->
                  <input style="border-radius:5px;" type="text" class="form-control" placeholder="搜索店内商品">
                </form>
              </div>
              <div class="col-xs-2 piece-together">拼单</div>
              <div class="col-xs-2 circle">ooo</div>
          </div>
      </div>
      <!-- 主题内容 -->
      <div class="header-topic">
        <div class="row">
          <div class="col-xs-10">
            <img src="../../assets/headerBg.jpg" style="width:50px;height:50px;border-radius:5px;">
            <span style="font-size:16px;font-weight:bold;display:inline-block;position:relative;left:10px;top:6px;">肯德基宅急送（乐山金杯店）</span>
          </div>
          <div class="col-xs-2">
            <img src="../../assets/star.png" style="width:26px;height:26px;">
            收藏
          </div>
        </div>
      </div>
      <!-- 公告内容 -->
      <div class="header-notice">
        <div class="row">
          <div class="col-xs-11">
            <img src="../../assets/firstOrder.png" style="height:16px;width:16px;">
            <span style="font-size:13px;">新用户下单立减18元,首次使用银行卡最高再减6元</span>
          </div>
          <div class="col-xs-1">
            <button style="border:0;background:none;font-family:'宋体';font-weight:bold;margin-left:-20px;" @click="openNotice">&gt;</button>
          </div>
        </div>
      </div>
      <!-- 公告详情 -->
      <transition name="notice-detail">
        <div class="notice-detail" v-show="isShow">
        <div class="detail-wrapper">
          <img class="detail-logo" src="../../assets/headerBg.jpg" alt="">
          <div class="detail-title">肯德基宅急送（乐山金杯店）</div>
          <div class="detail-star">
            <img src="../../assets/star_on.png" alt="">
            <img src="../../assets/star_on.png" alt="">
            <img src="../../assets/star_on.png" alt="">
            <img src="../../assets/star_on.png" alt="">
            <img src="../../assets/star_half.png" alt="">
            <span style="position:relative;top:2px;">4.6</span>
          </div>
          <div class="detail-send">起送￥10 &nbsp;| &nbsp;配送￥6&nbsp; | &nbsp;30分钟</div>
          <div class="detail-send-time">配送时间:10:30-14:00,16:30-20:00,22:00-00:00</div>
          <div style="width:90%;border-top:2px solid #bababc;margin:20px auto;"></div>
          <div class="detail-bottom">
            <img src="../../assets/firstOrder.png" style="height:16px;width:16px;">
            <span style="font-size:13px;">新用户下单立减18元,首次使用银行卡最高再减6元</span>
          </div>
          <div class="detail-close">
          <span class="closeBtn" @click="closeNotice">X</span>
        </div>
        </div>
      </div>
      </transition>

    </div>
    <div class="notice-bg" v-show="isShow"></div>
  </div>
</template>

<script>
export default {
  name: 'appHeader',
  data () {
    return {
      isShow:false
    }
  },
  methods:{
    openNotice(){
      this.isShow = true;
    },
    closeNotice(){
      this.isShow = false;
    }
  }
}
</script>


<style scoped>
/* .appHeader{
  
} */

.appHeader-con{
  background-image: url("../../assets/bg1.jpeg");
  background-size: 100% 100%;
  width: 100%;
  height: 150px;
  color:#fff;
}
.header-top{
  
  margin-top:20px;
}
.back{
  font-size: 24px;
  font-family: "宋体";
  color:#fff;
  font-weight: bold;
}
.piece-together{
  color: #fff;
  font-weight: bold;
  border:1px solid #fff;
  line-height: 32px;
}
.circle{
  color: #fff;
  line-height: 32px;
  font-size: 10px;
}
.header-topic{
  height: 50px;
}

.header-notice{
  margin-top:8px;
}

/* 公告详情 */
/* .notice-detail{
   transition: 2s all;
} */
.notice-bg{
  position: absolute;
  top:0;
  width: 100%;
  height: 100%;
  background: rgba(98, 98, 98, 0.8);
  z-index: 998;
}
.notice-detail{
 
  position: relative;
  top:-90px;
  z-index: 999;
  background-image: url("../../assets/detailBg.png");
  background-size:100% 100% ;
  width: 100%;
  height: 500px;
  border-radius:10px;
  text-align: center;
}
.notice-detail .detail-logo{
  width: 56px;
  height:56px;
  border-radius: 5px;
  margin-top:40px;
}
.notice-detail .detail-title{
  font-size: 16px;
  margin-top: 14px;
}
.notice-detail .detail-star img{
  width:  12px;
  height: 12px;
}
.notice-detail .detail-send{
  font-size: 12px;
  margin-top:3px;
  color: #bababc;
}
.notice-detail .detail-send-time{
  margin-top:10px;
  color: #bababc;
}
.notice-detail .detail-close{
  position: absolute;
  top:520px;
  left: 50%;
  transform: translateX(-20px)
}
.notice-detail .detail-close .closeBtn{
  width: 40px;
  height: 40px;
  line-height: 40px;
  border-radius: 50%;
  font-size: 14px;
  color: white;
  text-align: center;
  display: inline-block;
  background: rgba(118, 118, 118, 0.7);
  border: 1px solid rgba(140, 140, 140, 0.9);
}

/* 动画效果 */
.notice-detail-enter-active,
.notice-detail-leave-active {
  transition: 2s all;
}

.notice-detail-enter,
.notice-detail-leave-to {
  opacity: 0;
}

.notice-detail-enter-to,
.notice-detail-leave {
  opacity: 1;
}
</style>
