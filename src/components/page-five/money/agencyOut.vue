<template lang="jade">
.listStyle
  .listStyle-top
    van-icon(name='arrow-left',@click='listStyleToFive')
    p(v-if='$route.query.id === "1"') 代理普通提现
    p(v-if='$route.query.id === "2"') 代理返点提现
    span
  .listStyle-content
    ul.listStyle-III
      li
        p 最高提现额度 
        | {{moneyDepositMax}}
      li
        p 最低提现额度 
        | {{moneyDepositMin}}
      li
        p 可提现余额 
        | {{myAmount}}
      li
        p 今日余提现次数 
        | {{countMax}}
      li
        p 申请金额
        div
          input(placeholder='请输入提现金额', v-model='amount', value='amount', clearable='')
      li
        p 账号
        div(@click='show1 = ! show1')
          | {{selectBank}}
          span.iconfont.icon-xia
      li
        p 账户安全码
        div
          input(placeholder='请输入安全码', v-model='securityCode', value='securityCode', clearable='')
      li
        .button
          button.button1(@click='sendReq') 提现申请
  van-popup.pop2(v-model='show2', :close-on-click-overlay='false')
    div
      ul
        .title
          p 温馨提示！
        .cont
          p {{content}}
        .but
          button.nodel(@click='show2 = ! show2') 确定
  van-popup.pop2(v-model='show3', :close-on-click-overlay='false')
    div
      ul
        .title
          p 温馨提示！
        .cont
          p {{content}}
        .but
          button.nodel(@click='goBack()') 确定
  van-actionsheet.mIcode-go(v-model='show1', :actions='payway', cancel-text='取消')
</template>
<script>
import md5 from "js-md5";
export default {
  data() {
    return {
      withdrawType: 1,
      timeline: "今天",
      cardnum: "",
      bankUserId: "",
      amount: "",
      show1: false,
      show2: false,
      show3: false,
      show4: false,
      selectBank: "请选择要提现银行",
      bankList: [],
      payway: [],
      withdrawInformation: "",
      securityCode: "",
      moneyDepositMax: "",
      myAmount: "",
      moneyDepositMin: "",
      countMax: "",
      content: "",
      //hotfix-start//
      hotfixbalance:'',
      hotfixretrievableRebate:'',
      //hotfix-end//
    };
  },
      //hotfix-start//
      created() {
        this.getTopUserData();
      },
      //hotfix-end//
  mounted(){
    this.getWithdrawInformation();
  },
  methods: {
    //返回Five页面
    listStyleToFive(){
      this.$router.push("/five");
    },
    //hotfix-start//
    getTopUserData() {
      this.$axios
        .get(this.$store.state.url + "api/userCenter/getTopUserData")
        .then(res => {
          this.hotfixbalance = res.data.data.balance;
          this.hotfixretrievableRebate = res.data.data.retrievableRebate;
        })
        .catch(error => {
          console.log("获取头部个人信息No");
        });
    },
    //hotfix-end//
    getWithdrawInformation() {
      if (this.$store.state.userType === "0") {
        this.withdrawType = 1;
      } else if (this.$store.state.userType === "1") {
        this.withdrawType = 2;
      }
      this.$axios
        .get(this.$store.state.url + "api/proxy/getWithdrawInformation", {
          params: { withdrawType: this.$route.query.id }
        })
        .then(res => {
          this.withdrawInformation = res.data.data;
          this.bankList = res.data.data.bankUserList;
          this.moneyDepositMax = res.data.data.moneyDepositMax;
          //hotfix-start//
          if (this.$route.query.id === 2 ) {
            if (this.hotfixbalance < this.hotfixretrievableRebate) {
              this.myAmount = this.hotfixbalance;
            } else {
              this.myAmount = res.data.data.amount;
            }
          } else {
            this.myAmount = res.data.data.amount;
          }
          //hotfix-end//
          //this.myAmount = res.data.data.amount;
          this.moneyDepositMin = res.data.data.moneyDepositMin;
          this.countMax = res.data.data.countMax;
          for (let i = 0; i < res.data.data.bankUserList.length; i++) {
            this.payway.push({
              name: res.data.data.bankUserList[i].bankTitle,
              id: res.data.data.bankUserList[i].id,
              callback: this.onClick
            });
          }
        })
        .catch(error => {
          console.log("获取列表Error");
        });
    },
    goBack() {
      this.$router.push({ path: "/five" });
    },
    onClick(item) {
      this.selectBank = item.name;
      this.bankUserId = item.id;
      this.show1 = !this.show1;
    },
    sendReq() {
      //hotfix-start//
      if (this.$route.query.id === 2 ) {
          if (this.hotfixbalance < this.hotfixretrievableRebate) {
            this.content = "亲，您的馀额没有这么多啊！";
            this.show2 = true;     
          }
      } else   
      //hotfix-end//
      if (this.amount === "") {
        this.content = "请输入金额!";
        this.show2 = true;
      } else {
        let config = {
          headers: { "Content-Type": "application/x-www-form-urlencoded" },
          withCredentials: true
        };
        let formData = new FormData();
        formData.append("amount", this.amount);
        formData.append("bankUserId", this.bankUserId);
        formData.append("securityCode", md5(this.securityCode));
        formData.append("withdrawType", this.$route.query.id);
        this.$axios
          .post(
            this.$store.state.url + "api/proxy/setWithdraw",
            formData,
            config
          )
          .then(res => {
            if (res.data.code === 1) {
              this.content = res.data.data.message;
              this.show3 = true;
            } else {
              this.content = res.data.data.message;
              this.show2 = true;
            }
          })
          .catch(error => {
            console.log("setWithdrawNo");
          });
      }
    }
  }
};
</script>

<style lang="scss" scoped>
@import "../../../assets/scss/listStyle.scss";
@import "../../../assets/scss/popcorn.scss";
</style>