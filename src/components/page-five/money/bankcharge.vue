<template>
	<div class="listStyle">
		<div class="listStyle-top">
			<router-link to="/payway" tag="i" class="el-icon-arrow-left"></router-link>
			<p>银行转账充值</p>
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
					<p>账号</p>
					<div @click="show1 = ! show1">{{selectBank}}
						<i class="el-icon-arrow-down"></i>
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
						<p>申请完成，请依据以下资讯打款</p>
					</div>
				</li>
				<div class="cards">
					<ul>
						<li>
							<p>应打入金额</p>
							<span>{{chargeamount}}</span>
						</li>
						<li>
							<p>收款人姓名</p>
							<span>{{receiveNickName}}</span>
						</li>
						<li>
							<p>收款银行</p>
							<span>{{receiveBankName}}</span>
						</li>
						<li>
							<p>收款卡号</p>
							<span>{{receiveCard}}</span>
						</li>
						<li>
							<p>收款银行地址</p>
							<span>{{receiveAddress}}</span>
						</li>
						<li>
							<p>！识别码</p>
							<span>{{checkCode}}</span>
						</li>
						<li>
							<p>打款时请务必于打款备注栏输入识别码</p>
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

		<van-popup v-model="show1" position="bottom" :overlay="true" >
			<van-picker show-toolbar title="请选择银行" :columns="payway2" @cancel="onCancel"  @confirm="onConfirm" />
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
		  receiveNickName:'',
		  receiveBankName:'',
		  receiveCard:'',
		  receiveAddress:'',
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
		this.getBankNameList();
    },
	methods :{
		getBankNameList() {
			this.$http.get(this.$store.state.url+'api/proxy/getBankNameList').then((res) => {
				this.bankList = res.data.data;
				for(let i=0;i<res.data.data.length;i++) {
						this.payway.push({name:res.data.data[i].title,id:res.data.data[i].id});
						this.payway2.push(res.data.data[i].title);
				};
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
		},
		onConfirm(item , index){
			console.log(item,index,this.payway[index].id);
			this.bankNameId = this.payway[index].id;
			this.selectBank = this.payway[index].name;
			this.show1 = ! this.show1;
		},
		onCancel(){
			this.show1 = ! this.show1;
		},
		sendReq(){
            let config = {headers: {'Content-Type': 'application/x-www-form-urlencoded'},withCredentials:true};
            let formData = new FormData();
            formData.append('bankNameId',this.bankNameId);
            formData.append('chargeamount',this.chargeamount);
            formData.append('niceName',this.niceName);
            this.$axios.post(this.$store.state.url+'api/proxy/setPayApplication', formData,config).then((res) => {
				if(res.data.code === 1) {
					this.receiveAddress = res.data.data.receiveAddress;
					this.receiveNickName = res.data.data.receiveNickName;
					this.receiveCard = res.data.data.receiveCard;
					this.receiveBankName = res.data.data.receiveBankName;
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