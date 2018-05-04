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
					v-model="chargeamount" 
					:value="chargeamount" 
					clearable 
				>
				</el-input>
				</div>
			</li>
			<li>
				<p>账号</p>
				<div class="dim" @click="show1 = ! show1">{{selectBank}}<span class="el-icon-arrow-down"></span></div>
				
			</li>
			<li>
				<p>充值人姓名</p>
				<div>
				<el-input 
					placeholder="请输入充值人姓名" 
					v-model="niceName" 
					:value="niceName" 
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
					v-model="card" 
					:value="card" 
					clearable 
				>
				</el-input>
				</div>
			</li>
			<li><div class="button1"><button @click="show2 = !show2">充值申请</button></div></li>
		</ul>
			<van-actionsheet class="" v-model="show2">
	            <ul class="recharge-top">
					<li>
						<div class="center"><p>您所输入的资讯</p></div>	
					</li>
					<li>
						<p>充值金额</p><span>{{chargeamount}}</span>
					</li>
					<li>
						<p>账号</p><span>{{selectBank}}</span>
					</li>
					<li>
						<p>充值人姓名</p><span>{{niceName}}</span>
					</li>
					<li>
						<p>充值卡号</p><span>{{card}}</span>
					</li>
					<li>
						<div class="center"><p>请确认上列信息正确</p></div>	
					</li>
					<li><div class="button1"><button @click="sendReq()">确定</button><button @click="show2 = !show2">取消</button></div></li>
				</ul>
	        </van-actionsheet>
            <van-popup v-model="show3" position="bottom">
	            <div class="mIcode-sure">
                    <div class="sure2"><p>{{content}}</p></div>
                    <button class="del" @click="show3 = !show3">確定</button>
                </div>
	        </van-popup>
		<van-actionsheet class="mIcode-go" v-model="show1" :actions="payway" cancel-text="取消">
        </van-actionsheet>
  </div>
</template>
<script>
import { setStore, getStore,removeStore } from '../../../config/mutil'
export default {
	data() {
      return {
		  timeline:'今天',
		  cardnum:'',
		  bankNameId:'',
		  chargeamount:'',
		  card:'',
		  niceName:'',
		  content:'',
		  show1:false,
		  show2:false,
		  show3:false,
		  selectBank:'請選擇銀行',
		  bankList:[],
		  payway:[],
		  
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
						this.payway.push({name:res.data.data[i].title,id:res.data.data[i].id,callback: this.onClick});
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
			this.bankNameId = item.id;
			this.show1 = ! this.show1;
			console.log(this.betweenType);
		},
		sendReq(){
            let config = {headers: {'Content-Type': 'application/x-www-form-urlencoded'},withCredentials:true};
            let formData = new FormData();
            formData.append('bankNameId',this.bankNameId);
            formData.append('chargeamount',this.chargeamount);
            formData.append('niceName',this.niceName);
            formData.append('card',this.card);
            this.$axios.post(this.$store.state.url+'api/proxy/setPayApplication', formData,config).then((res) => {
				console.log(res.code);
				if(res.data.code === 1) {
					console.log(res.data.data.message);
					console.log(res.data.code);
					this.content = res.data.data.message;
					this.show2 = !this.show2;
					this.show3 = !this.show3;
				} else if ( res.data.code === 0 ) {
					console.log(res.data.data.message);
					console.log(res.data.code);
					this.content = res.data.data.message;
					this.show2 = !this.show2;
					this.show3 = !this.show3;
				} else {
					console.log(res.data.content);
					console.log(res.data.code);
					
					this.content = res.data.content;
					this.show2 = !this.show2;
					this.show3 = !this.show3;
				}
			
          }).catch((error) => {
          		console.log("No")
          });   
    }
	}
}
</script>

<style lang="scss" scoped>
  @import '../../../assets/scss/page-five/agency/agent.scss';
</style>