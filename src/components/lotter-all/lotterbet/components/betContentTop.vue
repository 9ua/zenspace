<template lang='jade'>
.bet-content-top
  .content-left(@click='changeBetContentTopPop')
    p {{lastSeasonId !== '' ? lastSeasonId.slice(4)*1 : lastSeasonIds}}期开奖号码
    div(v-if='shownum === false')
      p {{n1}}
      p {{n2}}
      p {{n3}}
      p {{n4}}
      p {{n5}}
      i.iconfont(:class="betContentTopPopFlag ? 'icon-up' : 'icon-down'")
    .contnet-left-num(v-if='shownum === true && isGetItem === true')
      .num
        .span
          transition(name='down-up-translate-fade')
            div {{i}}
        .span
          transition(name='down-up-translate-fade')
            div {{j}}
        .span
          transition(name='down-up-translate-fade')
            div {{k}}
        .span
          transition(name='down-up-translate-fade')
            div {{l}}
        .span
          transition(name='down-up-translate-fade')
            div {{h}}
      i.iconfont(:class="betContentTopPopFlag ? 'icon-up' : 'icon-down'")
  .content-right(@click='$emit("tolooksucc")')
    div
      p.seasonId {{seasonId !== '' ? seasonId : Number(lastSeasonIds)+1}}期投注截止
      .time
        p {{countDown !== '' ? countDown : "00:00:00"}}
    i.iconfont.icon-sanjiaoleft
</template>
<script>
export default {
  props: {
    lotteryId: {
      type: String,
      default: "cqssc"
    }
  },
  computed: {
    betContentTopPopFlag() {
      return this.$store.state.betContentTopPopFlag;
    },
    seasonId() {
      return (
        this.$store.state.seasonId2
          .substring(4)
          .split("-")
          .join("") * 1
      );
    },
    seasonId2() {
      return this.$store.state.seasonId2;
    }
  },
  data() {
    return {
      isGetItem: false,
      startyet: false,
      shownum: false,
      lastSeasonId: "",
      lastSeasonIds: "",
      countDown: "",
      interval: null, //动画
      getPastOpenB: "", //获取过去开奖号码第一个
      today: "",
      timer: "",
      timer2: "",
      n1: 1,
      n2: 1,
      n3: 1,
      n4: 1,
      n5: 1,
      i: 0, //动画
      j: 0,
      k: 0,
      l: 0,
      h: 0
    };
  },
  created() {
    this.noGetItem();
  },
  destroyed() {
    this.endCount();
  },
  mounted() {
    this.getPastOp();
  },
  methods: {
    changeBetContentTopPop() {
      this.$store.state.betContentTopPopFlag = !this.$store.state
        .betContentTopPopFlag;
      this.$store.state.showRight = false;
    },
    endCount() {
      clearInterval(this.timer);
      clearTimeout(this.timer2);
    },
    //没打接口前
    noGetItem() {
      if (this.startyet == false) {
        this.start();
        this.initSetTimeout();
        this.isGetItem = true;

        let myDate = new Date();
        let getMonth = myDate.getMonth() + 1;
        let getDate = myDate.getDate();
        let getHours = myDate.getHours() * 60;
        let getMinutes = myDate.getMinutes();
        let getHM = getHours + getMinutes;
        if (getHM < 1000) {
          getHM = "0" + getHM;
        }
        this.lastSeasonIds = getMonth + getDate.toString() + getHM;
      } else {
        this.end();
        this.isGetItem = false;
      }
    },
    //倒计时
    initSetTimeout(today) {
      this.timer = setInterval(() => {
        this.today = this.today - 1;
        this.setTimeMode();
        if (this.today < 1) {
          clearInterval(this.timer);
          this.timesUp();
        }
        if (
          this.getPastOpenB[0].seasonId !== this.lastSeasonId &&
          this.today === 47
        ) {
          this.getPastOp();
        } else if (
          this.getPastOpenB[0].seasonId !== this.lastSeasonId &&
          this.today === 46
        ) {
          this.getPastOp();
        } else if (
          this.getPastOpenB[0].seasonId !== this.lastSeasonId &&
          this.today === 45
        ) {
          this.getPastOp();
        }
      }, 1000);
    },
    //時間格式轉換
    setTimeMode() {
      var hours = Math.floor((this.today % (1 * 60 * 60 * 24)) / (1 * 60 * 60));
      var minutes = Math.floor((this.today % (1 * 60 * 60)) / (1 * 60));
      var seconds = Math.floor((this.today % (1 * 60)) / 1);
      if (hours < 10) {
        hours = "0" + hours;
      }
      if (minutes < 10) {
        minutes = "0" + minutes;
      }
      if (seconds < 10) {
        seconds = "0" + seconds;
      }
      this.countDown = hours + ":" + minutes + ":" + seconds;
    },
    //筛子动画
    start() {
      var _this = this;
      this.startyet = true;
      this.interval = setInterval(function() {
        _this.i = Math.floor(Math.random() * 9 + 1);
        _this.j = Math.floor(Math.random() * 9 + 1);
        _this.k = Math.floor(Math.random() * 9 + 1);
        _this.l = Math.floor(Math.random() * 9 + 1);
        _this.h = Math.floor(Math.random() * 9 + 1);
      }, 39);
    },
    end() {
      var _this = this;
      clearInterval(_this.interval);
    },
    //获取彩種當前獎期時間
    geteServerTime() {
      clearInterval(this.timer);
      clearTimeout(this.timer2);
      this.$axios
        .get(this.$store.state.url + "api/lottery/getCurrentSaleTime", {
          params: { lotteryId: this.$route.query.id }
        })
        .then(res => {
          if (res.data.code === 1) {
            this.$store.state.seasonId2 = res.data.data.seasonId;
            this.lastSeasonId = res.data.data.lastSeasonId;
            this.today = res.data.data.restSeconds;
            this.setTimeMode();
            this.getPastOp(); //获取过去开奖号码10个
            this.initSetTimeout();
          }
        })
        .catch(error => {
          console.log("获取彩種當前獎期時間No");
        });
    },
    //获取过去开奖号码10个
    getPastOp() {
      if (this.startyet == false) {
        this.start();
      }
      this.shownum = true;
      this.$axios
        .get(this.$store.state.url + "api/lottery/getPastOpen", {
          params: { lotteryId: this.$route.query.id, count: 20 }
        })
        .then(res => {
          this.getPastOpens = res.data.data;
          this.getPastOpenB = res.data.data;
          this.n1 = this.getPastOpens[0].n1;
          this.n2 = this.getPastOpens[0].n2;
          this.n3 = this.getPastOpens[0].n3;
          this.n4 = this.getPastOpens[0].n4;
          this.n5 = this.getPastOpens[0].n5;
          if (Number(res.data.data[0].seasonId) !== Number(this.lastSeasonId)) {
            this.reGetPastOp();
          } else {
            clearTimeout(this.timer2);
            this.end();
            this.startyet = false;
            this.shownum = false;
          }
        })
        .catch(error => {
          console.log("获取过去开奖号码No");
        });
    },
    //時間到彈窗
    timesUp() {
      this.$pop.show({
        title: "温馨提示",
        content: "",
        content1: String(this.seasonId * 1),
        content2: String(Number(this.seasonId + 1)),
        number: 3
      });
      this.geteServerTime();
    },
    reGetPastOp() {
      clearTimeout(this.timer2);
      this.timer2 = setTimeout(() => {
        this.getPastOp();
      }, 12000);
    }
  }
};
</script>
<style lang="scss" scoped>
@import "../../../../assets/scss/lotter-list/lotterbet/components/betContentTop.scss";
</style>