<template>
  <div class="agent">
    <div class="agent-top">
      <!-- <router-link to="/five" tag="i" class="el-icon-arrow-left"></router-link> -->
      <p>客服</p>
    </div>
	<div class="content">
		<iframe class="content-in" src="https://szzero.livechatvalue.com/chat/chatClient/chatbox.jsp?companyID=911218&configID=56705&jid=3470350618&s=1"></iframe>
	</div>
  </div>
</template>

<style lang="scss" scoped>
  @import '../../assets/scss/page-five/agency/agent.scss';
	.content {
		height: 100%;
		width: 100%;
		background: #fefefe;
		overflow: hidden;
		display: inline;
	}
	.content-in {
		padding-top: 46px;
		border:none;
		height: calc(100% - 46px);
		height: -o-calc(100% - 46px); /* opera */
		height: -webkit-calc(100% - 46px); /* google, safari */
		height: -moz-calc(100% - 46px); /* firefox */
		width: 100%;
		overflow:hidden;
		display: block;
	}
	.agent {
		height: 100%;
	}
</style>