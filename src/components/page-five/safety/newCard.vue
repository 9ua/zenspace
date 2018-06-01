<template>
	<div class="listStyle">
		<div class="listStyle-top">
			<router-link to="/getCards" tag="i" class="el-icon-arrow-left"></router-link>
			<p>绑定银行卡</p>
		</div>
		<div class="listStyle-content">
			<ul class="listStyle-III">
				<li>
					<p>选择银行</p>
					<div @click="show1 = ! show1">{{selectBank}}
						<i class="el-icon-arrow-down"></i>
					</div>
				</li>
				<li>
					<p>开户地址</p>
					<div>
						<el-input placeholder="请输入开户地址" v-model="address" :value="address" clearable>
						</el-input>
					</div>
				</li>
				<li>
					<p>开户人姓名</p>
					<div>
						<el-input placeholder="请输入银行卡的姓名" v-model="niceName" :value="niceName" clearable>
						</el-input>
					</div>
				</li>
				<li>
					<p>银行卡号</p>
					<div>
						<el-input placeholder="请输入银行卡号" v-model="card" :value="card" clearable>
						</el-input>
					</div>
				</li>
				<li>
					<p>确认卡号</p>
					<div>
						<el-input placeholder="请确认银行卡号" v-model="card2" :value="card2" clearable>
						</el-input>
					</div>
				</li>
				<li>
					<p>安全密码</p>
					<div>
						<el-input placeholder="请输入安全密码" v-model="securityCode" :value="securityCode" clearable>
						</el-input>
					</div>
				</li>
				<li>
					<div class="button">
						<button class="button1" @click="sendReq()">确定</button>
					</div>
				</li>
			</ul>
		</div>
		<van-popup class="pop2" v-model="show2" :close-on-click-overlay="false">
			<div>
				<ul>
					<div class="title">
						<p>温馨提示！</p>
					</div>
					<div class="cont">
						<p>{{content}}</p>
					</div>
					<div class="but">
						<button class="nodel" @click="show2 = ! show2">确定</button>
					</div>
				</ul>
			</div>
		</van-popup>
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
						<button class="nodel" @click="goBack()">确定</button>
					</div>
				</ul>
			</div>
		</van-popup>
		<van-actionsheet class="mIcode-go" v-model="show1" :actions="payway" cancel-text="取消">
		</van-actionsheet>
	</div>
</template>
<script>
import md5 from 'js-md5';
import { setStore, getStore,removeStore } from '../../../config/mutil'
export default {
	data() {
      return {
          bankNameId:'',
          card:'',
          card2:'',
          address:'',
          niceName:'',
          securityCode:'',
					show1:false,
					show2:false,
					show3:false,
					selectBank:'请选择银行',
					bankList:[],
          payway:[],
          content:'',
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
					if(i >= 3){
						this.payway.push({name:res.data.data[i].title,id:res.data.data[i].id,callback: this.onClick});
					};
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
		sendReq(){
            let config = {headers: {'Content-Type': 'application/x-www-form-urlencoded'},withCredentials:true};
            let formData = new FormData();
            formData.append('id','');
            formData.append('bankNameId',this.bankNameId);
            formData.append('card',this.card);
            formData.append('card2',this.card2);
            formData.append('address',this.address);
            formData.append('niceName',this.niceName);
            formData.append('securityCode',md5(this.securityCode));            
            this.$axios.post(this.$store.state.url+'api/proxy/setBankUser', formData,config).then((res) => {
                if (res.data.code === 1){
                    this.content = res.data.data.message;
                    this.show3 = true;
                } else {
                    this.content = res.data.data.message;
                    this.show2 = true;
                }
          }).catch((error) => {
          		console.log("setBankUserNo")
          });   
            }
	}
}
</script>

<style lang="scss" scoped>
  @import '../../../assets/scss/listStyle.scss';
  @import '../../../assets/scss/popcorn.scss';
</style>