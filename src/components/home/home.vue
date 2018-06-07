<template>
  <div class="home">
    <iscroll-view class="scroll-view">
      <div class="home-cneter">
        <router-view></router-view>
      </div>
    </iscroll-view>
    <div class="home-footer">
      <ul>
        <router-link v-for="(navs,index) in navbat" :to="'/'+navs.pathbat" tag="li" :key="index">
          <i class="fa" :class="navs.icon"></i>
          <span>{{navs.name}}</span>
        </router-link>
      </ul>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
    	five:2,
      navbat: [
        {
        	icon:'fa-home',
          name: '首页',
          pathbat: 'one'
        },
        {
        	icon:'fa-calendar-check-o',
          name: '活动',
          pathbat: 'three'
        },
        {
        	icon:'fa-trophy',
          name: '发现',
          pathbat: 'four'
        },
        {
        	icon:'fa-address-card',
          name: '我的',
          pathbat: this.$store.state.loginStatus ? 'five' : 'login'
        }
      ]
    }
  },
  
}
</script>
<style lang='scss'>
@import '../../assets/scss/home.scss';
@import '../../assets/scss/three.scss';
@import '../../assets/scss/four.scss';
</style>
