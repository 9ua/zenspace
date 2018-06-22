<template>
	<div class="listStyle">
		<div class="listStyle-top">
			<router-link to="/payway" tag="i" class="el-icon-arrow-left"></router-link>
			<p>微信支付</p>
		</div>
		<div class="listStyle-content">
			<ul class="listStyle-VI">
				<div style="text-align:center;height:auto;">
					<img :src='$store.state.url+this.QRCodeUrl' style="width:40%;height:auto"/>
				</div>
				<li>
					<p>充值金额</p>
					<div>
						<el-input placeholder="请输入充值金额" v-model="chargeamount" :value="chargeamount" clearable>
						</el-input>
					</div>
				</li>
				<li>
					<p>充值人姓名</p>
					<div>
						<el-input placeholder="请输入充值人姓名" v-model="niceName" :value="niceName" clearable>
						</el-input>
					</div>
				</li>
				<li>
					<p>订单号后6位</p>
					<div>
						<el-input placeholder="请输入订单号后6位" v-model="checkCode" :value="checkCode" clearable>
						</el-input>
					</div>
				</li>
				<li>
					<div class="button">
						<button class="button1" @click="show2 = !show2">充值申请</button>
					</div>
				</li>
			<div class="warning" >
        		<p>1、请务必填写正确订单号后6位！</p><br>
        		<p>2、请正确填写姓名和充值金额，以便及时核对。</p><br>
        		<p>3、转账1笔提交1次，请勿重复提交订单。</p><br>
        		<p>4、请务必转账后再提交订单，否则无法及时查到您的款项！</p><br>
     		</div>
			</ul>
		</div>
		<van-actionsheet v-model="show2">
			<ul class="listStyle-II">
				<li>
					<div class="center">
						<p>您所输入的资讯</p>
					</div>
				</li>
				<li>
					<p>充值金额</p>
					<span>{{chargeamount}}</span>
				</li>
				<li>
					<p>充值人姓名</p>
					<span>{{niceName}}</span>
				</li>
				<li>
					<p>订单号后6位</p>
					<span>{{checkCode}}</span>
				</li>
				<li style="text-align:center;background:#fff;">
					<div class="center">
						<p>请确认上列信息正确！</p>
					</div>
				</li>
				<li>
					<div class="button">
						<button class="button2" @click="sendReq()">确定</button>
						<button class="button3" @click="show2 = !show2">取消</button>
					</div>
				</li>
			</ul>
		</van-actionsheet>
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
				<van-popup class="pop2" v-model="show4" :close-on-click-overlay="false">
			<div>
				<ul>
					<div class="title">
						<p>温馨提示！</p>
					</div>
					<div class="cont">
						<p>{{content}}</p>
					</div>
					<div class="but">
						<button @click="goBack()">确定</button>
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
		  timeline:'今天',
		  cardnum:'',
		  bankNameId:'',
		  chargeamount:'',
		  card:'',
		  niceName:'',
		  content:'',
		  checkCode:'',
		  show1:false,
		  show2:false,
		  show3:false,
		  show4:false,

			QRCodeUrl:'',
			receiveAddress:'',
			receiveBankId:'',
			receiveBankName:'',
			receiveCard:'',
			receiveNiceName:'',
	  }
	},
	mounted(){
		this.rechargeEntrance();
    },
	methods :{
		rechargeEntrance() {
			this.$http.get(this.$store.state.url+'api/proxy/rechargeEntrance',{params: { rechargeWay:1 }}).then((res) => {
				this.QRCodeUrl = res.data.data.QRCodeUrl;
				this.receiveAddress = res.data.data.receiveAddress;
				this.receiveBankId = res.data.data.receiveBankId;
				this.receiveBankName = res.data.data.receiveBankName;
				this.receiveCard = res.data.data.receiveCard;
				this.receiveNiceName = res.data.data.receiveNiceName;
			}).catch((error) => {
					console.log("获取列表Error");
			});
		},
		goBack(){
			this.$router.push({path:'/five'});
		},
		sendReq(){
			if (this.checkCode == '') {
				this.content = '订单号不能為空！';
				this.show2 = !this.show2;
				this.show3 = !this.show3;
			} else {
            let config = {headers: {'Content-Type': 'application/x-www-form-urlencoded'},withCredentials:true};
			let formData = new FormData();
            formData.append('rechargeWay',1);
            formData.append('receiveBankId',this.receiveBankId);
            formData.append('chargeamount',this.chargeamount);
            formData.append('niceName',this.niceName);
            formData.append('checkCode',this.checkCode);
            this.$axios.post(this.$store.state.url+'api/proxy/setPayRequest', formData,config).then((res) => {
				if(res.data.code === 1) {
					this.content = "申请完成，资讯可至充值信息页面查询。";
					this.show2 = !this.show2;
					this.show4 = !this.show4;
				} else if ( res.data.code === 0 ) {
					this.content = res.data.data.message;
					this.show2 = !this.show2;
					this.show3 = !this.show3;
				} else {
					this.content = res.data.content;
					this.show2 = !this.show2;
					this.show3 = !this.show3;
				}
			
          }).catch((error) => {
          		console.log("setPayApplicationNo")
          });   
			}
	}
	}
}
</script>

<style lang="scss" scoped>
  @import '../../../assets/scss/listStyle.scss';
  @import '../../../assets/scss/popcorn.scss';
</style>