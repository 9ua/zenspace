<template lang="jade">
.listStyle
  .listStyle-top
    van-icon(name='arrow-left',@click='listStyleToFive')
    p 充值方式
    span
  .listStyle-content
    ul.listStyle-I
      router-link(:to="payw.alino+'charge'", tag='li', v-for='(payw,index) in paywaylist', :key='index', v-if='payw.opentype === 0')
        .mInvite-left(style='width:76%')
          i.fa.fa-credit-card(style='padding-right:10px')
          p
            | {{payw.alias}}
            br
            span(style='font-size:12px;color:#bbb') {{payw.content}}
        van-icon(name='arrow')
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
import { setStore, getStore, removeStore } from "../../../config/mutil";
export default {
  data() {
    return {
      content: "",
      receiveAddress: "",
      show3: false,
      paywaylist: ""
    };
  },
  mounted() {
    this.getRechargeWayList();
  },
  methods: {
    //返回Five页面
    listStyleToFive(){
      this.$router.push("/five");
    },
    getRechargeWayList() {
      this.$http
        .get(this.$store.state.url + "/api/proxy/getRechargeWayList")
        .then(res => {
          this.paywaylist = res.data.data;
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