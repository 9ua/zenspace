<template lang='jade'>
.betcBox(v-show='betGoshow')
  ul.betc
    li 投注确认
    li
      p
        span {{listname}}快3 ：
        | {{seasonId}}期
      p
        span 投注金额：
        b {{money*zhu}}元
      p
        span 投注内容：
        span.popcon {{con}}
    li
      button(@click='betCancel') 取消
      button(@click='betGo') 确定
</template>
<script>
export default {
  computed: {
    betGoshow() {
      return this.$store.state.betGoshow;
    },
    listname() {
      return this.$store.state.listname;
    },
    zhu() {
      return this.$store.state.zhu;
    },
    con() {
      return this.$store.state.con;
    },
    seasonId() {
      return (
        this.$store.state.seasonId2
          .substring(4)
          .split("-")
          .join("") * 1
      );
    },
    money() {
      return this.$store.state.money;
    }
  },
  methods: {
    betCancel() {
      this.$store.state.betGoshow = !this.$store.state.betGoshow;
    },
    //投注
    betGo() {
      this.$store.state.betGoshow = false;
      this.$store.state.betnot = false;
      let config = {
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        withCredentials: true
      };
      let formData = new FormData();
      formData.append("order[0].content", this.con);
      formData.append("order[0].betCount", this.zhu);
      formData.append("order[0].price", this.money);
      formData.append("order[0].unit", 1);
      formData.append("order[0].playId", this.$store.state.playBonusId);
      formData.append("count", this.zhu);
      formData.append("traceOrders[0].price", this.money);
      formData.append("traceOrders[0].seasonId", this.$store.state.seasonId2);
      formData.append("bounsType", 0);
      formData.append("traceWinStop", 0);
      formData.append("isTrace", 0);
      formData.append("lotteryId", this.$route.query.id);
      formData.append("amount", this.money * this.zhu);
      this.$emit("iscreat");
      this.$axios
        .post(this.$store.state.url + "api/lottery/bet", formData, config)
        .then(res => {
          if (res.data.message === "success") {
            this.$pop.show({
              title: "温馨提示",
              content: "恭喜您，投注成功！",
              content1: "",
              content2: "",
              number: 1
            });
            this.$store.state.betnot = true;
            setTimeout(() => {
              this.$store.state.betsuccess = !this.$store.state.betsuccess;
            }, 600);
          } else {
            this.$store.state.betnot = true;
            if (res.data.status === 501) {
              this.$pop.show({
                title: "发生错误",
                content: res.data.content,
                content1: "",
                content2: "",
                number: 1
              });
            }
          }
        })
        .catch(error => {
          this.$pop.show({
            title: "温馨提示",
            content: "投注失败,请检查您的网络！",
            content1: "",
            content2: "",
            number: 1
          });
          this.$store.state.betnot = true;
        });
    }
  }
};
</script>

<style lang="scss" scoped>
@import "../../../../assets/scss/lotter-list/lotterbet/components/betcBox.scss";
</style>