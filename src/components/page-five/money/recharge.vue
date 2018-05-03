<template>
  <div class="recharge">
    <div class="agent-top">
      <router-link to="/five" tag="i" class="el-icon-arrow-left"></router-link>
      <p>我要充值</p>
    </div>
		  <ul class="recharge-top">
			<li>
				<p>充值金额</p>
				<div>
				<el-input 
					placeholder="请输入充值金额" 
					v-model="money" 
					:value="money" 
					clearable 
				>
				</el-input>
				</div>
			</li>
			<li>
				<p>账号</p>
				<div class="dim" @click="show = ! show">{{selectBank}}<span class="el-icon-arrow-down"></span></div>
				
			</li>
			<li>
				<p>充值人姓名</p>
				<div>
				<el-input 
					placeholder="请输入充值人姓名" 
					v-model="chargename" 
					:value="chargename" 
					clearable 
				>
				</el-input>
				</div>
			</li>
			<li>
				<p>充值卡号</p>
				<div>
				<el-input 
					placeholder="请输入您的卡号" 
					v-model="cardnum" 
					:value="cardnum" 
					clearable 
				>
				</el-input>
				</div>
			</li>
		</ul>
		<van-actionsheet class="mIcode-go" v-model="show" :actions="payway" cancel-text="取消">
        </van-actionsheet>
  </div>
</template>
<script>
import { setStore, getStore,removeStore } from '../../../config/mutil'
export default {
	data() {
      return {
		  money:'',
		  timeline:'今天',
		  chargename:'',
		  cardnum:'',
		  show:false,
		  selectBank:'請選擇銀行',
		  bankList:[],
		  payway:[],
		  actions: [
        {
          name: '今天',
          Type:1,
          callback: this.onClick,
        },
        {
          name: '昨天',
          Type:2,
          callback: this.onClick,
        //   subname: '描述信息'
        },
        {
          name: '七天',
          Type:3,
          callback: this.onClick,
          loading: false
        },
        ],
	  }
	},
	mounted(){
		this.getBankNameList();
    },
	methods :{
		getBankNameList() {
			this.$http.get(this.$store.state.url+'api/proxy/getBankNameList').then((res) => {
				this.bankList = res.data.data;
				console.log(res.data.data.length);
				for(let i=0;i<res.data.data.length;i++) {
					if(i >= 3){
						this.payway.push({name:res.data.data[i].title,callback: this.onClick});
					};
				};
				console.log(this.payway);
			}).catch((error) => {
					console.log("获取列表Error");
			});
				console.log(this.bankList);
			
		},
		onClick(item){
			this.selectBank = item.name;
			this.show = ! this.show;
			console.log(this.betweenType);
		},
	}
}
</script>

<style lang="scss" scoped>
  @import '../../../assets/scss/page-five/agency/agent.scss';
</style>