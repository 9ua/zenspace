<template>
  <div class="safety">
    <div class="safety-top">
      <router-link to="/five" tag="i" class="el-icon-arrow-left"></router-link>
      <p>安全中心</p>
    </div>
    <div class="safety-content">
      <div class="safety-content-top">
        <p class="title">———— 您的账号安全级别为极低 ————</p>
        <div>
					<el-rate v-model="value5" disabled show-score text-color="#ff9900" score-template=""></el-rate>
        	<!-- <i class="el-icon-star-on active"></i>
        	<i class="el-icon-star-on active"></i>
        	<i class="el-icon-star-on active"></i>
        	<i class="el-icon-star-on active"></i>
        	<i class="el-icon-star-on"></i> -->
        </div>
        <p class="time">上次登陆：2018-04-07  14:14:14</p>
        <p class="land"><span>香港</span> | <span>不是我登陆？</span></p>
      </div>
      <ul>
      	<router-link to="verifyPwd" tag="li">
      		<p>修改登陆密码</p>
      		<div>
      			<p>修改</p>
      			<i class="el-icon-arrow-right"></i>
      		</div>
      	</router-link>
      	<router-link :to="securityCoe === 0 ? 'setSafePwd' : 'verifySafePwd'" tag="li">
      		<p>{{securityCoe === 0 ? '设置安全密码' : '已设置安全密码'}}</p>
      		<div>
      			<p>{{securityCoe === 0 ? '设置' : '修改'}}</p>
      			<i class="el-icon-arrow-right"></i>
      		</div>
      	</router-link>
      	<router-link :to="mobile === 0 ? 'detail/setmobile' : 'safeMobile'" tag="li">
      		<p>{{mobile === 0 ? '设置密保手机' : '已设置密保手机'}}</p>
      		<div>
      			<p>{{mobile === 0 ? '设置' : '修改'}}</p>
      			<i class="el-icon-arrow-right"></i>
      		</div>
      	</router-link>
      	<router-link :to="question === 0 ? 'setQuestion' : 'safeQuestion'" tag="li">
      		<p>{{question === 0 ? '设置密保问题' : '已设置密保问题'}}</p>
      		<div>
      			<p>{{question === 0 ? '设置' : '修改'}}</p>
      			<i class="el-icon-arrow-right"></i>
      		</div>
      	</router-link>
      	<router-link :to="email === 0 ? 'detail/setemail' : 'safeEmail'" tag="li">
      		<p>{{email === 0 ? '设置密保邮箱' : '已设置密保邮箱'}}</p>
      		<div>
      			<p>{{email === 0 ? '设置' : '修改'}}</p>
      			<i class="el-icon-arrow-right"></i>
      		</div>
      	</router-link>
      	<router-link to="getCards" tag="li">
      		<p>银行卡管理</p>
      		<div>
      			<p>设置</p>
      			<i class="el-icon-arrow-right"></i>
      		</div>
      	</router-link>
      </ul>
      <div class="logout" @click="logout">
      	<p>退出登陆</p>
      	<i class="el-icon-arrow-right"></i>
      </div>
    </div>
  </div>
</template>
<script>
import { setStore, getStore, removeStore } from '../../config/mutil'
  export default {
    data() {
      return {
				value5:1,
				password:1,//密码
				securityCoe:0,//安全码
				mobile:0,//密保手机
				question:0,//密保问题
				email:0,//密保邮箱
			}
		},
		mounted(){
			this.getSecurityCenterStatus();
		},
    methods:{
			//取安全中心状态
			getSecurityCenterStatus(){
				this.$axios.get(this.$store.state.url+'api/userCenter/getSecurityCenterStatus').then((res) => {
					console.log(res);
					this.password = res.data.data.password;
					this.securityCoe = res.data.data.securityCoe;
					this.mobile = res.data.data.mobile;
					this.question = res.data.data.question;
					this.email = res.data.data.email;
					if(this.securityCoe === 1){
						this.value5 += 1
					} 
					if(this.mobile === 1){
						this.value5 += 1
					} 
					if(this.question === 1){
						this.value5 += 1
					} 
					if(this.email === 1){
						this.value5 += 1
					}
				}).catch((error) => {
						console.log("取安全中心状态No")
				})
				
			},
			//退出
    	logout(){
				this.$axios.get(this.$store.state.url+'api/user/logout').then((res) => {
				this.$store.state.loginStatus = false;
    		this.$store.state.Globalusername = "";
				this.$store.state.Globalpassword = "";
				this.$store.state.JSESSIONICookie = '';
				removeStore('loginSta');
				removeStore('JSESSIONICookie');
    		this.$router.push('/one');
				}).catch((error) =>{
					console.log(error)
				})
    	}
    }
  }
</script>
<style lang="scss" scoped>
  @import '../../assets/scss/page-five/safety.scss';
</style>