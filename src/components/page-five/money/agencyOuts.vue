<template lang="jade">
.listStyle
  .listStyle-top
    router-link.el-icon-arrow-left(to='/five', tag='i')
    p 代理提现
    span
  .listStyle-content
    ul.listStyle-I
      router-link(to='agencyOut?id=1', tag='li',@click="getWithdrawFlag")
        .mInvite-left
          i.fa.fa-credit-card(style='padding-right:10px')
          p 普通提现
        i.el-icon-arrow-right
      // router-link(to='agencyOut?id=2', tag='li',@click="getAgentWithdrawFlag")
      li(@click="getAgentWithdrawFlag")
        .mInvite-left
          i.fa.fa-credit-card(style='padding-right:10px')
          p 返点提现
        i.el-icon-arrow-right
  van-popup.pop2(v-model='show3', :close-on-click-overlay='false')
    div
      ul
        .title
          p 温馨提示！
        .cont
          p {{content}}
        .but
          button(@click='show3 = ! show3') 确定
</template>
<script>
export default {
  data() {
    return {
      content: "",
      show3: false
    };
  },
  methods: {
    //判断是否允许当前用户进行提款
    getWithdrawFlag() {
      this.$http
        .get(this.$store.state.url + "/api/proxy/getWithdrawFlag")
        .then(res => {
          if (res.data.code === 1) {
            this.$router.push("/agencyOut?id=1");
          }
        })
        .catch(error => {
          console.log("获取列表Error");
        });
    },
    //判断是否允许当前代理用户进行返点提款
    getAgentWithdrawFlag() {
      this.$http
        .get(this.$store.state.url + "/api/proxy/getAgentWithdrawFlag")
        .then(res => {
          
          if (res.data.code === 1) {
            this.$router.push("/agencyOut?id=2");
          }else{
            this.$message(res.data.data.message)
          }
        })
        .catch(error => {
          console.log("获取列表Error");
        });
    },
    onCancel() {
      this.show1 = !this.show1;
    }
  }
};
</script>

<style lang="scss" scoped>
@import "../../../assets/scss/listStyle.scss";
@import "../../../assets/scss/popcorn.scss";
</style>