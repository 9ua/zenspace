<template lang="jade">
.agency
  .agency-top
    van-icon(name="arrow-left",@click='tofive')
    p 代理中心
    span
  .agency-content
    .agency-content-top
      img(src='@/assets/img/five/agent.png')
    ul
      router-link(to='/agentIntro', tag='li')
        p 代理说明
        van-icon(name="arrow")
      router-link(to='/agentReport', tag='li')
        p 代理报表
        van-icon(name="arrow")
      router-link(to='/lowerReport', tag='li')
        p 下级报表
        van-icon(name="arrow")
      router-link(to='/manageInvite', tag='li')
        p 下级开户
        van-icon(name="arrow")
      router-link(to='/agentMember', tag='li')
        p 会员管理
        van-icon(name="arrow")
      router-link(to='/agentBetRecord', tag='li')
        p 投注明细
        van-icon(name="arrow")
      router-link(to='/agentBillRecord', tag='li')
        p 交易明细
        van-icon(name="arrow")
</template>
<script>
export default {
  methods:{
    tofive(){
      this.$router.push('/five');
    }
  }
}
</script>
<style lang="scss" scoped>
@import "../../assets/scss/page-five/agency.scss";
</style>