<template>
  <div class="recharge">
    <div class="agent-top">
      <router-link to="/five" tag="i" class="el-icon-arrow-left"></router-link>
      <p>充值信息</p>
    </div>
        
             <ul class="recharge-top">
                <li v-for="(item,index) in rechargeList" :key="index" @click="select(item,$event)">
                    <div class="mInvite-left">
                        <p>金额 <b>{{item.amount}}</b> 
                        <span>{{item.bankName}}</span><br>
                        <a>产生日期{{item.createTime}}</a> 
                        </p>
                    </div>
                    <div class="mInvite-right">
                        <p>
                        <span>({{item.statusName}})</span>
                        </p>
                    </div>
                    <i class="el-icon-arrow-down"></i>
                    
                    
                    
                </li>
             </ul>
        
            
            
            
            <van-actionsheet class="" v-model="show2">
	            <ul class="recharge-top2">
                    <li>
                        <p>订单时间</p><span>{{this.createTime}}</span>
                    </li>
					<li>
						<p>订单编号</p><span>{{this.id}}</span>
					</li>
					<li>
						<p>目前处理状况</p><span>{{this.statusName}}</span>
					</li>
					<li>
						<p>申请充值金额</p><span>{{this.amount}}</span>
					</li>
                    <div class="cards" v-if="this.status == '0'">
                        <li >
						<p>收款人姓名</p><span>{{this.receiveNickName}}</span>
                        </li>
                        <li>
                            <p>收款银行</p><span>{{this.receiveBankName}}</span>
                        </li>
                        <li >
                            <p>收款卡号</p><span>{{this.receiveCard}}</span>
                        </li>
                        <li>
                            <p>收款银行地址</p><span>{{this.receiveAddress}}</span>
                        </li>
                        <li>
                            <p>识别码</p><span>{{this.checkCode}}</span>
                        </li>
                        <li>
						<p>打款时请务必于打款备注栏输入识别码</p>
					    </li>
                    </div>
                    
					<li><div class="button1"><button @click="show2=!show2">确定</button></div></li>
				</ul>
	        </van-actionsheet>
  </div>
</template>
<script>
import { setStore, getStore,removeStore } from '../../../config/mutil'
export default {
	data() {
      return {
          show2:false,
          id:'',
          status:'',
		  statusName:'',
		  amount:'',
		  receiveNickName:'',
		  receiveBankName:'',
		  receiveCard:'',
		  createTime:'',
          receiveAddress:'',
          rechargeList:[],
          checkCode:'',
	  }
	},
	mounted(){
		this.getRechargeList();
    },
	methods :{
        select(a) {
            this.id = a.id;
            this.status=a.status;
		    this.statusName = a.statusName;
            this.amount = a.amount;
            this.receiveNickName = a.receiveNickName;
            this.receiveBankName = a.receiveBankName;
            this.receiveCard = a.receiveCard;
            this.createTime = a.createTime;
            this.receiveAddress = a.receiveAddress;
            this.checkCode = a.checkCode;
            this.show2 = !this.show2;
            this.selected = a;
        },
		getRechargeList() {
			this.$http.get(this.$store.state.url+'api/proxy/getRechargeList',{params:{start:0,limit:100}}).then((res) => {
                this.rechargeList = res.data.data;

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