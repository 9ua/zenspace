<template>
  <div class="head-top">
    <div class="pop-top">
      <!--<router-link class="el-icon-arrow-left" to="/one" tag="i" v-show="routerUrl === 'five'"></router-link>-->
      <p v-for="(contents,index) in content" :key="index">{{contents.show === routerUrl ? contents.title : ''}} </p>
      <router-link class="dim" to="service" tag="li">客服</router-link>
      
      <!--<router-link to="/one" tag="span" v-show="routerUrl === 'five'">客服</router-link>-->
    </div>
  </div>
</template>
<script>
  export default {
    data() {
      return {
        content: [{
          title: '首页',
          show: 'one',
          check:false,
        }, {
          title: 'UU直播',
          show: 'second',
          check:false,
        }, {
          title: '活动中心',
          show: 'three',
          check:false,
        }, {
          title: '我的',
          show: 'five',
          check:true,
        }, ],
        routerUrl:this.$route.name
      }
    },
  }
</script>
<style lang="scss" scoped>
.dim {
    color: #333;
    font-size: 16px;
    position: absolute;
    right: 16px;
    // padding: 12px;
    & span {
        padding: 12px;
    }
}
  .head-top {
    height: 46px;
    width: 100%;
   	background: linear-gradient(to right, #f75f5b , #fead50);
    position: fixed;
    top: 0px;
    z-index: 11;
    & .pop-top {
    	height: 46px;
      width: 100%;
      display: flex;
      justify-content: center;
      align-items: center;
      font-size: 20px;
      color: #fff;
      position: relative;
      & i {
        position: absolute;
        left: 16px;
      }
      & span{
        position: absolute;
        right: 12px;
      }
    }
  }
</style>