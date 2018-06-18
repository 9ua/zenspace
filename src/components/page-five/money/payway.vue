<template>
	<div class="listStyle">
		<div class="listStyle-top">
			<router-link to="/five" tag="i" class="el-icon-arrow-left"></router-link>
			<p>充值方式</p>
		</div>
		<div class="listStyle-content">
			<ul class="listStyle-I">
				<router-link :to="payw.alino" tag="li" v-for="(payw,index) in paywaylist" :key="index" v-if="payw.opentype === 0">
				<div class="mInvite-left">
					<i class="fa fa-credit-card" style="padding-right:10px"></i>
					<p>
					 {{payw.alias}}<br>
					<span style="font-size:12px;color:#bbb">{{payw.content}}</span>
					</p>
				</div>
				<i class="el-icon-arrow-right"></i>
				</router-link>
			</ul>
		</div>

		
		<van-popup class="pop2" v-model="show3" :close-on-click-overlay="false">
			<div>
				<ul>
					<div class="title">
						<p>温馨提示！</p>
					</div>
					<div class="cont">
						<p>{{content}}</p>
					</div>
					<div class="but">
						<button @click="show3 = ! show3">确定</button>
					</div>
				</ul>
			</div>
		</van-popup>

	</div>
</template>
<script>
import { setStore, getStore,removeStore } from '../../../config/mutil'
export default {
	data() {
      return {
		  content:'',
		  show3:false,
		  paywaylist:'',
	
	  }
	},
	mounted(){
		this.getRechargeWayList();
    },
	methods :{
		getRechargeWayList() {
			this.$http.get(this.$store.state.url+'/api/proxy/getRechargeWayList').then((res) => {
				console.log(res.data.data)
				this.paywaylist = res.data.data;
			}).catch((error) => {
					console.log("获取列表Error");
			});
		},

		onCancel(){
			this.show1 = ! this.show1;
		},

	}
}
</script>

<style lang="scss" scoped>
  @import '../../../assets/scss/listStyle.scss';
  @import '../../../assets/scss/popcorn.scss';
</style>