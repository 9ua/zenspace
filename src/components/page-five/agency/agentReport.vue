<template lang="jade">
.listStyle
  .listStyle-top
    router-link.el-icon-arrow-left(to='/agency', tag='i')
    p 代理报表
    .dim(@click='show = ! show')
      | {{timeline}}
      span.el-icon-arrow-down
  .listStyle-content
    .listStyle-content-top
      van-actionsheet.mIcode-go(v-model='show', :actions='actions', cancel-text='取消')
    ul.listStyle-check-top
      li
        el-input.input-top(size='medium', placeholder='请输入用户帐号名称', v-model='accountName', :value='accountName', clearable='')
        button(@click='getUserTeam()')
          i.el-icon-arrow-right
    .listStyle-content-list
      ul
        li
          span {{userTeam.actualSaleAmount}}
          span 投注金额
        li
          span {{userTeam.winAmount}}
          span 中奖金额
        li
          span {{userTeam.activityAndSend}}
          span 活动礼金
        li
          span {{userTeam.rebateAmount}}
          span 团队返点
        li
          span {{userTeam.count}}
          span 团队盈利
        li
          span {{userTeam.rechargeAmount}}
          span 充值金额
        li
          span {{userTeam.drawingAmount}}
          span 提现金额
        li
          span {{userTeam.firstRechargeCount}}
          span 首充人数
        li
          span {{userTeam.regTeamCount}}
          span 注册人数
        li
          span {{userTeam.betCount}}
          span 投注人数
        li
          span {{userTeam.teamCount}}
          span 下级人数
        li
          span {{userTeam.teamAmount}}
          span 团队馀额
        li
          span {{userTeam.BettRebate}}
          span 代理返点
        li
          span {{userTeam.wages}}
          span 代理工资
        li
          span {{userTeam.periodicDividends}}
          span 代理分红
</template>
<script>
export default {
  data() {
    return {
      accountName: "",
      dateFlag: 0,
      timeline: "今日",
      show: false,
      show2: false,
      usertype: 2,
      highbet: 0,
      rebateratio: 0,
      userTeam: [],
      validtime: 0,
      extaddress: "",
      invitelist: "",
      selected: [],
      showFlag: true,
      actions: [
        {
          name: "今日",
          type: 0,
          callback: this.onClick
        },
        {
          name: "昨日",
          type: 1,
          callback: this.onClick
        },
        {
          name: "本月",
          type: 2,
          callback: this.onClick,
          loading: false
        },
        {
          name: "上月",
          type: 3,
          callback: this.onClick,
          loading: false
        }
      ]
    };
  },
  mounted() {
    this.serchAccount();
    this.getUserTeam();
  },
  methods: {
    onClick(name) {
      this.timeline = name.name;
      this.dateFlag = name.type;
      this.show = !this.show;
      this.getUserTeam();
    },
    serchAccount() {
      if (!this.$route.query.id) {
      } else {
        this.accountName = this.$route.query.id;
        console.log(this.accountName);
      }
    },
    getUserTeam() {
      if (this.accountName == "") {
        this.$http
          .get(this.$store.state.url + "api/proxy/getUserTeam", {
            params: {
              account: this.$store.state.Globalusername,
              dateFlag: this.dateFlag
            }
          })
          .then(res => {
            this.userTeam = res.data.data;
          })
          .catch(error => {
            console.log("获取列表Error");
          });
      } else if (this.accountName !== "") {
        this.$http
          .get(this.$store.state.url + "api/proxy/getUserTeam", {
            params: { account: this.accountName, dateFlag: this.dateFlag }
          })
          .then(res => {
            this.userTeam = res.data.data;
          })
          .catch(error => {
            console.log("获取列表Error");
          });
      }
    }
  }
};
</script>
<style lang="scss" scoped>
@import "../../../assets/scss/listStyle.scss";
</style>