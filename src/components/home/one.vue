<template>
  <div class="one">
  	<!-- <headers></headers> -->
    <van-swipe :autoplay="2200" :show-indicators="false">
		  <van-swipe-item v-for="(item,index) in bannerList" :key="index">
		  	<img :src='$store.state.url+item.img'/>
		  </van-swipe-item>
		</van-swipe>
    <div class="add">
    	<van-notice-bar text="足协杯战线连续第2年上演广州德比战，上赛季半决赛上恒大以两回合5-3的总比分淘汰富力。" left-icon="https://img.yzcdn.cn/public_files/2017/8/10/6af5b7168eed548100d9041f07b7c616.png" />
    </div>
    <div class="one-center">
    	<ul>
    		<router-link v-for="(item,index) in lotteryList" :key="index" tag="li" v-if="item.groupId" :to="'/'+item.groupId">
    			<img :src='"../../assets/img/one/"+item.image+".png"' alt="images"/>
    			<h5>{{item.name}}</h5>
    		</router-link>
        <router-link class="lotter-list" to="/lotterList" tag="li">
          <i class="el-icon-circle-plus"></i>
          <h5>更多彩种</h5>
        </router-link>
    	</ul>
    </div>
  </div>
</template>
<script>
	import headers from '../public/header'
  export default {
    data() {
      return {
      	lotteryList:[],
      	bannerList:[],
      	getimgurl:'',
      };
    },
    mounted(){
    	this.getLotterlist();
    },
    methods:{
    	getLotterlist(){
	      this.$http.get(this.$store.state.url+'api/index/getIndexInfo').then((res) => {
	      	this.lotteryList = res.data.data.hotLotterys;
	      	this.bannerList = res.data.data.banners;
          // console.log(res)
	      }).catch((error) => {
	      		console.log("No")
	      })
    	}
    },
    components:{
    	headers
    }
  };
</script>
<style lang="scss">
@import '../../assets/scss/one.scss';
</style>