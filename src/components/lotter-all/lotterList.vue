<template>
<div class="lotterList">
    <div class="lotterList-top">
      <router-link to="/one" tag="i" class="el-icon-arrow-left"></router-link>
      <p>全部彩种</p>
    </div>
    <div class="lotterList-nav">
      <div class="lotterList-nav-box">
        <ul>
          <router-link :to="'/lotterList/'+navTitles.pathsrc" tag="li" v-for="(navTitles,index) in navTitle" :title="navTitles.name" :key="index">
          <img :src='"@/assets/img/one/"+navTitles.pathsrc+".png"' alt="">
          <h5>{{navTitles.name}}</h5>
          </router-link>
        </ul>
      </div>
      <keep-alive v-if="$route.meta.keepAlive">
        <router-view></router-view>
      </keep-alive>
       <router-view v-if="!$route.meta.keepAlive"></router-view>
    </div>
</div>  
</template>
<script>
  export default{
    data() {
      return{
        navTitle:[
          {name:'全部彩种',pathsrc:'lotterAll'},
          {name:'快3',pathsrc:'k3s'},
          {name:'时时彩',pathsrc:'sscs'},
          {name:'快乐彩',pathsrc:'klcs'},
          {name:'11选5',pathsrc:'etfs'},
        ]
      }
    }
  }
</script>
<style lang="scss" scoped>
@import '../../assets/scss/lotter-list/lotterList.scss';
</style>
