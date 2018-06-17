<template>
  <div class="head-top">
    <div class="pop-top">
      <!--<router-link class="el-icon-arrow-left" to="/one" tag="i" v-show="routerUrl === 'five'"></router-link>-->
      <p v-for="(contents,index) in content" :key="index">{{contents.show === routerUrl ? contents.title : ''}} </p>
      <img v-show="routerUrl === 'one'" src="@/assets/img/one/logo.png" />
      <router-link v-show="routerUrl === 'five'" class="dim" to="service" tag="li">客服</router-link>
      <a :href="os" v-show="routerUrl === 'one'" target="_top"><b>APP</b><b class="el-icon-download"></b></a>
    </div>
  </div>
</template>
<script>
  export default {
    data() {
      return {
        os:'',
        content: [{
          // title: '首页',
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
    created(){
      this.checkOs();
    },
    methods:{
      checkOs(){
				  	var userAgent = navigator.userAgent;
						if (/Android/i.test(userAgent)) {
							//是否為Android
              this.os ='/app/hongfayule.apk';
						} else if (/iPhone|iPad/i.test(userAgent)) {
							//是否為iPhone或iPad
              this.os = 'http://www.pgyer.com/mjn2';
						} else if (/Windows/i.test(userAgent)) {
							//使否是用電腦觀看
              this.os ='/app/hongfayule.apk';
						}

						//判斷瀏覽器
						if (/Chrome/i.test(userAgent)) {
							//是否為Chrome
						} else if (/Firefox/i.test(userAgent)) {
							//是否為Chrome
						}
      }
    }
  }
</script>
<style lang="scss" scoped>
.dim {
    border: solid 1px #fff;
    border-radius: 5px;
    color: #fff;
    font-size: 16px;
    position: absolute;
    right: 16px;
    padding: 3px 8px 6px;
    & span {
        padding: 3px;
    }
}
  .head-top {
    height: 50px;
    width: 100%;
   	background:  rgb(175,58,49);
    position: fixed;
    top: 0px;
    z-index: 11;
    & .pop-top {
    	height: 50px;
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
      & a{
      	display: flex;
      	justify-content: space-between;
      	align-items: center;
        position: absolute;
        right: 16px;
        font-size: 20px;
        width: 60px;
        color: #FFFFFF;
        & b:nth-child(2){
        	font-size: 26px;
        }
      }
    }
  }
</style>
