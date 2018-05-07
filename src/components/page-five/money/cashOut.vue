<template>
  <div class="recharge">
    <div class="agent-top">
      <router-link to="/five" tag="i" class="el-icon-arrow-left"></router-link>
      <p>我要提现</p>
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
						<p>应打入金额</p><span>{{chargeamount}}</span><br>
						<p>收款人姓名</p><span>{{receiveNickName}}</span>
						<p>收款银行</p><span>{{receiveBankName}}</span>
						<p>收款卡号</p><span>{{receiveCard}}</span>
						<p>收款银行地址</p><span>{{receiveAddress}}</span><br><br>
						<p>識別碼</p><span>{{checkCode}}</span>
					<li>
						<p>！重要：打款时请务必于打款备注栏输入识别码</p>
					</li>
					<li>
						<p>此画面资讯可至 "查询订单" 页面查询。</p>
					</li>
					<li><div class="button1"><button @click="goBack()">确定</button></div></li>
				</ul>
	        </van-actionsheet>
		<van-actionsheet class="mIcode-go" v-model="show1" :actions="payway" cancel-text="取消">
        </van-actionsheet>
  </div>
</template>
<script>
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
		  checkCode:'',
		  receiveNickName:'',
		  receiveBankName:'',
		  receiveCard:'',
		  receiveAddress:'',
		  show1:false,
		  show2:false,
		  show3:false,
		  show4:false,
		  selectBank:'請選擇要提现銀行',
		  bankList:[],
		  payway:[],
		  withdrawInformation:'',
	  }
	},
	created(){
		this.getWithdrawInformation();
    },
	methods :{
		getWithdrawInformation() {
			this.$http.get(this.$store.state.url+'api/proxy/getWithdrawInformation').then((res) => {
				this.withdrawInformation = res.data.data;
				this.payway = res.data.data.bankUserList;
				console.log(this.withdrawInformation);
				console.log(this.payway);
			}).catch((error) => {
					console.log("获取列表Error");
			});
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
				console.log(res);
				if(res.data.code === 1) {
					console.log(res.data.data.receiveAddress);
					this.receiveAddress = res.data.data.receiveAddress;
					console.log(res.data.data.receiveNickName);
					this.receiveNickName = res.data.data.receiveNickName;
					console.log(res.data.data.receiveCard);
					this.receiveCard = res.data.data.receiveCard;
					console.log(res.data.data.receiveBankName);
					this.receiveBankName = res.data.data.receiveBankName;
					this.checkCode = res.data.data.checkCode;
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