<template>
	<div class="one">
		<headers></headers>
		<div class="one-center">
			<van-swipe :autoplay="2200" :show-indicators="false">
				<van-swipe-item v-for="(item,index) in bannerList" :key="index">
					<img :src='$store.state.url+item.img' />
				</van-swipe-item>
			</van-swipe>
			<div class="add">
				<van-notice-bar :speed="20" left-icon="https://img.yzcdn.cn/public_files/2017/8/10/6af5b7168eed548100d9041f07b7c616.png">
					{{title}}
				</van-notice-bar>
			</div>

			<ul>
				<router-link v-for="(item,index) in lotteryList" :key="index" tag="li" v-if="item.groupId" :to="{path:'/'+item.groupId,query:{id:item.id}}">
					<img :src='"@/assets/img/one/"+item.image+".png"' alt="images" />
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
				titlelist:[],
				title:'【欢迎光临】 欢迎来到宏發彩票，您的支持是我们最大的源动力。',
      };
		},
    mounted(){
    	this.getLotterlist();
		},
    methods:{
    	getLotterlist(){

				this.$http.get(this.$store.state.url+'api/index/getIndexInfo').then((res) => {
							this.title = '';
							this.lotteryList = res.data.data.hotLotterys;
							this.bannerList = res.data.data.banners;
							for (let i = 0 ; i < res.data.data.noticeList.length; i++) {
								this.title = this.title +"   "+ res.data.data.noticeList[i].title;
							}
				}).catch((error) => {
					console.log("获取广告No")
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
