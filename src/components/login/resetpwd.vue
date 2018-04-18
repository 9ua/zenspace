<template>
  <div class="resetpwd">
    <div class="resetpwd-title">
      <router-link to="/reset" tag="i" class="el-icon-arrow-left"></router-link>
      <p>找回密码</p>
    </div>
    <div class="resetpwd-content">
    	<ul>
    		<router-link to="verifyPwdSafe" tag="li"><span>通过安全密码</span><i class="el-icon-arrow-right"></i></router-link>
    		<router-link to="" tag="li"><span>通过密保问题</span><i class="el-icon-arrow-right"></i></router-link>
    		<router-link to="" tag="li"><span>通过密保邮箱</span><i class="el-icon-arrow-right"></i></router-link>
    	</ul>
    </div>
  </div>
</template>
<script>
	export default{
		
	}
</script>
<style lang="scss" scoped>
  @import "../../assets/scss/login/resetpwd.scss";
</style>