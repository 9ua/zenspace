<template lang="jade">
.listStyle
  .listStyle-top(v-bind:class='{ blur: show2 }')
    van-icon(name='arrow-left',@click='listStyleToSafety')
    p 下级报表
    .dim(@click='show = ! show')
      | {{timeline}}
      span.el-icon-arrow-down
  .listStyle-content(v-bind:class='{ blur: show2 }')
    .listStyle-content-top
      van-actionsheet.mIcode-go(v-model='show', :actions='actions', cancel-text='取消')
    .row
      .title3 {{nowAccount}}之下级
    .row
      .title 账号
      .title 类型
      .title 报表人数
      .title 盈利
    ul(style='padding:0')
      li.row2(v-for='(item,index) in underLevelReport', :key='index', @click='select(item,$event)')
        .title
          p {{item.account}}
        .title
          p {{item.userTypeName}}
        .title
          p {{item.teamCount}}
        .title
          p {{item.count}}
  van-actionsheet(v-model='show2')
    ul.listStyle-II
      li
        span {{selected.account}}
      li(v-show='this.show3', @click='getUnderLevelReport2()')
        p 查看下级
        van-icon(name='arrow')
      router-link(:to="{path:'/agentReport',query: {id: this.selected.account}}", tag='li')
        p 查看报表
        van-icon(name='arrow')
      li
        .button
          button.button1(@click='show2 =! show2') 确定
</template>
<script>
export default {
  data() {
    return {
      a: "",
      nowAccount: "",
      dateFlag: 0,
      underLevelReport: [],
      timeline: "今天",
      show: false,
      show2: false,
      show3: false,
      usertype: 2,
      highbet: 0,
      rebateratio: 0,
      betlist: [],
      validtime: 0,
      extaddress: "",
      invitelist: "",
      selected: [],
      showFlag: true,
      actions: [
        {
          name: "今天",
          type: 0,
          callback: this.onClick
        },
        {
          name: "昨天",
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
    this.getUnderLevelReport();
  },
  methods: {
    listStyleToSafety(){
      this.$router.push('/agency')
    },
    select(a) {
      this.selected = a;
      this.childCount = a.childCount;
      if (a.childCount > 0) {
        this.show3 = true;
      } else {
        this.show3 = false;
      }
      this.show2 = !this.show2;
    },
    onClick(name) {
      this.timeline = name.name;
      this.dateFlag = name.type;
      this.show = !this.show;
      this.getUnderLevelReport();
    },
    getUnderLevelReport() {
      this.nowAccount = this.$store.state.Globalusername;
      this.$http
        .get(this.$store.state.url + "api/proxy/getUnderLevelReport", {
          params: {
            account: this.$store.state.Globalusername,
            dateFlag: this.dateFlag
          }
        })
        .then(res => {
          this.underLevelReport = res.data.data;
        })
        .catch(error => {
          console.log("获取列表Error");
        });
    },
    getUnderLevelReport2() {
      this.nowAccount = this.selected.account;
      this.$http
        .get(this.$store.state.url + "api/proxy/getUnderLevelReport", {
          params: { account: this.selected.account, dateFlag: this.dateFlag }
        })
        .then(res => {
          this.underLevelReport = res.data.data;
          this.show2 = !this.show2;
        })
        .catch(error => {
          console.log("获取列表Error");
        });
    }
  }
};
</script>
<style lang="scss" scoped>
@import "../../../assets/scss/listStyle.scss";
</style>