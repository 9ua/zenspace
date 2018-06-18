<template>
	<div class="listStyle">
		<div class="listStyle-top">
			<router-link to="/payway" tag="i" class="el-icon-arrow-left"></router-link>
			<p>微信支付</p>
		</div>
		<div class="listStyle-content">
			<ul class="listStyle-III">
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
					<div class="button">
						<button class="button1" @click="show2 = !show2">充值申请</button>
					</div>
				</li>
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
					<p>账号</p>
					<span>{{selectBank}}</span>
				</li>
				<li>
					<p>充值人姓名</p>
					<span>{{niceName}}</span>
				</li>
				<li>
					<div class="center">
						<p>请确认上列信息正确</p>
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
		<van-actionsheet class="" v-model="show4">
			<ul class="listStyle-II">
				<li>
					<div class="center">
						<p>申请完成，请依据以下资讯完成微信支付</p>
					</div>
				</li>
				<div class="cards">
					<ul>
						<li>
							<p>应打入金额</p>
							<span>{{chargeamount}}</span>
						</li>
						<img :src='$store.state.url+this.QRCodeUrl' style="width:100%;height:auto"/>
						<li>
							<p>！识别码</p>
							<span>{{checkCode}}</span>
						</li>
						<li>
							<p>微信支付时请务必于备注栏输入识别码</p>
						</li>
					</ul>
				</div>
				<li>
					<p>此画面资讯可至 "充值信息" 页面查询。</p>
				</li>
				<li>
					<div class="button">
						<button class="button1" @click="goBack()">确定</button>
					</div>
				</li>
			</ul>
		</van-actionsheet>
		<!-- <van-actionsheet style="" class="mIcode-go" v-model="show1" :actions="payway" title="请选择银行">
		</van-actionsheet> -->

	
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
		  receiveNickName:'',
		  receiveBankName:'',
		  receiveCard:'',
		  receiveAddress:'',
		  QRCodeUrl:'',
		  show1:false,
		  show2:false,
		  show3:false,
		  show4:false,
		  selectBank:'请选择银行',
		  bankList:[],
		  payway:[],
		  payway2:[],
	  }
	},
	mounted(){
	
    },
	methods :{
		goBack(){
			this.$router.push({path:'/five'});
		},
		onClick(item){
			this.selectBank = item.name;
			this.bankNameId = item.id;
			this.show1 = ! this.show1;
		},
	
		onCancel(){
			this.show1 = ! this.show1;
		},
		sendReq(){
            let config = {headers: {'Content-Type': 'application/x-www-form-urlencoded'},withCredentials:true};
            let formData = new FormData();
            formData.append('bankNameId','47');
            formData.append('chargeamount',this.chargeamount);
            formData.append('niceName',this.niceName);
            this.$axios.post(this.$store.state.url+'api/proxy/setPayApplication', formData,config).then((res) => {
				if(res.data.code === 1) {
					this.QRCodeUrl = res.data.data.QRCodeUrl;
					this.checkCode = res.data.data.checkCode;
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
</script>

<style lang="scss" scoped>
  @import '../../../assets/scss/listStyle.scss';
  @import '../../../assets/scss/popcorn.scss';
</style>