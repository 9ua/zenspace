<template>
  <div class="resetway">
    <div class="resetway-title">
      <router-link to="/reset" tag="i" class="el-icon-arrow-left"></router-link>
      <p>找回密码</p>
    </div>
    <div class="resetway-content">
    	<ul>
    		<router-link to="login" tag="li"><span>通过身份识别</span><i class="el-icon-arrow-right"></i></router-link>
    	</ul>
    </div>
  </div>
</template>
<style lang="scss" scoped>
  @import "../../assets/scss/login/resetway.scss";
</style>