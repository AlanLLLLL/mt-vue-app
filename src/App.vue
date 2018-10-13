<template>
  <div id="app">
    <app-header></app-header>
    <app-nav></app-nav>
    <router-view></router-view>
  </div>
</template>

<script>
import AppHeader from './components/header/appHeader'
import AppNav from './components/nav/appNav'
export default {
  name: 'App',
  components: {
    AppHeader,
    AppNav
  },
  created(){
    this.$axios.get("/api/goods")
      .then(res => {
        console.log(res);
      })
  }
}
</script>

<style>
*{
  margin:0;
  padding:0;
}
#app,body{
  width: 100%;
  height: 100%;
}
</style>
