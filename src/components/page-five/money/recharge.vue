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
						<div class="center"><p>请确认上列信息正确</p></div>	
					</li>
					<li><div class="button1"><button @click="sendReq()">确定</button><button @click="show2 = !show2">取消</button></div></li>
				</ul>
	        </van-actionsheet>
            <van-popup v-model="show3">
	            <div class="button1">
                    <div ><p>{{content}}</p><button class="del" @click="show3 = !show3">確定</button></div>
                </div>
	        </van-popup>
			<van-actionsheet class="" v-model="show4">
	            <ul class="recharge-top">
					<li>
						<div class="center"><p>申请完成，请依据以下资讯打款</p></div>	
					</li>
					<li>
						<p>应打入金额</p><span>{{chargeamount}}</span>
					</li>
					<li>
						<p>收款人姓名</p><span>{{receiveNickName}}</span>
					</li>
					<li>
						<p>收款银行</p><span>{{receiveBankName}}</span>
					</li>
					<li>
						<p>收款卡号</p><span>{{receiveCard}}</span>
					</li>
					<li>
						<p>收款银行地址</p><span>{{receiveAddress}}</span>
					</li>
					<li>
						<p>(建议将此画面截图方便打款)</p>
					</li>
					<li><div class="button1"><button @click="goBack()">确定</button></div></li>
				</ul>
	        </van-actionsheet>
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
		  receiveNickName:'',
		  receiveBankName:'',
		  receiveCard:'',
		  receiveAddress:'',
		  show1:false,
		  show2:false,
		  show3:false,
		  show4:false,
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
		goBack(){
			this.$router.push({path:'/five'});
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
            this.$axios.post(this.$store.state.url+'api/proxy/setPayApplication', formData,config).then((res) => {
				console.log(res.code);
				if(res.data.code === 1) {
					console.log(res.data.data.receiveAddress);
					this.receiveAddress = res.data.data.receiveAddress;
					console.log(res.data.data.receiveNickName);
					this.receiveNickName = res.data.data.receiveNickName;
					console.log(res.data.data.receiveCard);
					this.receiveCard = res.data.data.receiveCard;
					console.log(res.data.data.receiveBankName);
					this.receiveBankName = res.data.data.receiveBankName;
					this.show2 = !this.show2;
					this.show4 = !this.show4;
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