<template>
  <div class="appNav">
    <div class="nav-wrapper container-fluid">
        <div class="row nav-row">
            <div class="col-xs-4 common order">
                <router-link class="nav-item" to="/goods">
                    点菜
                    <i class="line"></i>
                </router-link>
            </div>
            <div class="col-xs-4 common comment">
                <router-link class="nav-item" to="/comments">
                    评价
                    <i class="line"></i>
                </router-link>
            </div>
            <div class="col-xs-4 common seller">
                <router-link class="nav-item" to="/seller">
                    商家
                    <i class="line"></i>
                </router-link> 
            </div>
        </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'appNav',
  data () {
    return {
     
    }
  }
}
</script>


<style scoped>
.appNav{
    text-align: center;
    font-size: 16px;
    width: 100%;
    height: 40px;
    border-bottom:1px solid #e4e4e4;
}
.nav-item{
    position: relative;
    text-decoration: none;
    color: #666666;
    line-height: 40px;
}
.common .active{
    color: #ffbb22;
}
.common .active .line{
    position: absolute;
    left: 22%;
    top: 27px;
    width: 20px;
    border:1px solid #ffbb22;
}
</style>
