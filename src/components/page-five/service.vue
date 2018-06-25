<template lang="jade">
.agent
  .agent-top
    router-link.el-icon-arrow-left(to='/five', tag='i')
    p 客服
  .content
    iframe.content-in(src='https://kf1.learnsaas.com/chat/chatClient/chatbox.jsp?companyID=992821&configID=74605&jid=1218814689&s=1')
</template>
<style lang="scss" scoped>
@import "../../assets/scss/page-five/agency/agent.scss";
</style>
<style lang="scss" scoped>
.content {
  height: 100%;
  width: 100%;
  background: #fefefe;
  overflow: hidden;
  display: inline;
}
.content-in {
  padding-top: 46px;
  border: none;
  height: calc(100% - 46px);
  height: -o-calc(100% - 46px); /* opera */
  height: -webkit-calc(100% - 46px); /* google, safari */
  height: -moz-calc(100% - 46px); /* firefox */
  width: 100%;
  overflow: hidden;
  display: block;
}
.agent {
  height: 100%;
}
</style>
