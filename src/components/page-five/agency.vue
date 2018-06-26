<template lang="jade">
.agency
  .agency-top
    router-link.el-icon-arrow-left(to='/five', tag='i')
    p 代理中心
    span
  .agency-content
    .agency-content-top
      img(src='@/assets/img/five/agent.png')
    ul
      router-link(to='/agentIntro', tag='li')
        p 代理说明
        i.el-icon-arrow-right
      router-link(to='/agentReport', tag='li')
        p 代理报表
        i.el-icon-arrow-right
      router-link(to='/lowerReport', tag='li')
        p 下级报表
        i.el-icon-arrow-right
      router-link(to='/manageInvite', tag='li')
        p 下级开户
        i.el-icon-arrow-right
      router-link(to='/agentMember', tag='li')
        p 会员管理
        i.el-icon-arrow-right
      router-link(to='/agentBetRecord', tag='li')
        p 投注明细
        i.el-icon-arrow-right
      router-link(to='/agentBillRecord', tag='li')
        p 交易明细
        i.el-icon-arrow-right
</template>
<script>
</script>
<style lang="scss" scoped>
@import "../../assets/scss/page-five/agency.scss";
</style>