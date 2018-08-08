<template lang="jade">
.bet
  betTop(:lotteryId='lotteryId',@changeLotteryId='changeLotteryId',@iscreat='iscreat')
  lookMore
  .bet-content
    div
      betContentTop(:lotteryId='lotteryId',@tolooksucc='tolooksucc',ref='betContentTop',@iscreat='iscreat')
      betContentTopPop
      betContentFoot(:lotteryId='lotteryId',ref='betContentFoot')
  betGoshow(@iscreat='iscreat')
  betFooter(@iscreat='iscreat')
  bets(ref='pop')
</template>
<script>
import bets from "../../page-five/money/bets.vue";
import betTop from "./components/betTop.vue";
import betContentTop from "./components/betContentTop.vue";
import lookMore from "./components/lookMore.vue";
import betContentTopPop from "./components/betContentTopPop.vue";
import betContentFoot from "./components/betContentFoot.vue";
import betFooter from "./components/betFooter.vue";
import betGoshow from "./components/betGoshow.vue";
import betsuccess from "./components/betsuccess.vue";
export default {
  components: {
    bets, //投注记录
    betTop, //顶部彩种切换
    betContentTop, //开奖结果，倒计时
    betContentTopPop, //10期开奖结果
    lookMore, //20期开奖结果
    betContentFoot, //选号区域
    betFooter, //确认投注，输入金额
    betsuccess, //投注成功弹出框
    betGoshow //确认投注弹出框
  },
  data() {
    return {
      lotteryId: "cqssc" //配置彩种信息
    };
  },
  destroyed() {
    this.iscreat();
  },
  mounted() {
    let _this = this;
    document.addEventListener("visibilitychange", function() {
      if (document.hidden === false) {
        _this.geteServerTime();
      }
    });
    if (!this.$route.meta.isBack) {
      _this.geteServerTime();
    }
    this.$route.meta.isBack = false;
  },

  methods: {
    //调用子页面清空方法
    iscreat() {
      if (this.$refs.betContentFoot) {
        this.$refs.betContentFoot.iscreat();
      }
    },
    //通过子页面回传的lotteryId更改页面显示的彩种信息
    changeLotteryId(value) {
      this.lotteryId = value;
      this.geteServerTime(); //获取彩種當前獎期時間
      this.iscreat();
    },
    //调用子页面//获取彩種當前獎期時間
    geteServerTime() {
      if (this.$refs.betContentTop) {
        this.$refs.betContentTop.geteServerTime();
      }
    },
    tolooksucc() {
      this.$store.state.betContentTopPopFlag = false;
      this.$refs.pop.banckto();
      this.$refs.pop.getTradeList();
    }
  },
  // 保留三个小数,不四舍五入
  filters: {
    keepTwoNum(value) {
      value = parseInt(value * 100) / 100;
      return value;
    }
  }
};
</script>
<style lang="scss" scoped>
@import "../../../assets/scss/lotter-list/lotterbet/betsyx5.scss";
@import "../../../assets/scss/popcorn.scss";
</style>