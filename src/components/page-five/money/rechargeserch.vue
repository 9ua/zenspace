<template>
  <div class="recharge">
    <div class="agent-top">
      <router-link to="/five" tag="i" class="el-icon-arrow-left"></router-link>
      <p>充值信息</p>
    </div>
		        <ul class="recharge-top">
					<li>
						<div class="center"><p>申请完成，请依据以下资讯打款</p></div>	
					</li>
					<li>
						<p>訂單編號</p><span>{{this.id}}</span>
					</li>
					<li>
						<p>目前處理狀況</p><span>{{this.statusName}}</span>
					</li>
					<li>
						<p>申請充值金額</p><span>{{this.amount}}</span>
					</li>
					<li>
						<p>收款人姓名</p><span>{{this.receiveNickName}}</span>
					</li>
					<li>
						<p>收款银行</p><span>{{this.receiveBankName}}</span>
					</li>
                    <li>
						<p>收款卡號</p><span>{{this.receiveCard}}</span>
					</li>
                    <li>
						<p>收款银行地址</p><span>{{this.receiveAddress}}</span>
					</li>
                    <li>
						<p>訂單時間</p><span>{{this.createTime}}</span>
					</li>
					<li>
						<p>(建议将此画面截图方便打款)</p>
					</li>
				</ul>
  </div>
</template>
<script>
import { setStore, getStore,removeStore } from '../../../config/mutil'
export default {
	data() {
      return {
		  id:'',
		  statusName:'',
		  amount:'',
		  receiveNickName:'',
		  receiveBankName:'',
		  receiveCard:'',
		  createTime:'',
		  receiveAddress:'',

	  }
	},
	mounted(){
		this.getRechargeList();
    },
	methods :{
		getRechargeList() {
			this.$http.get(this.$store.state.url+'api/proxy/getRechargeList',{params:{start:0,limit:30}}).then((res) => {
				console.log(res.data.data[0].amount);
				this.id = res.data.data[0].id;
		        this.statusName = res.data.data[0].statusName;
                this.amount = res.data.data[0].amount;
                this.receiveNickName = res.data.data[0].receiveNickName;
                this.receiveBankName = res.data.data[0].receiveBankName;
                this.receiveCard = res.data.data[0].receiveCard;
                this.createTime = res.data.data[0].createTime;
                this.receiveAddress = res.data.data[0].receiveAddress;
			}).catch((error) => {
					console.log("获取列表Error");
			});
				console.log(this.bankList);
		},
	}
}
</script>

<style lang="scss" scoped>
  @import '../../../assets/scss/page-five/agency/agent.scss';
</style>