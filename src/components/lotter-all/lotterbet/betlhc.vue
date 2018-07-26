<template>
<div class="betlhc">
  <div class="betlhc-top">
    <van-icon name='arrow-left' @click='listStyleToSafety' />
    <p>六合彩</p>
    <span></span>
  </div>
  <div class="top">
    <p>{{seasonId}}</p>
    <p>{{countDown}}</p>
  </div>
</div>
</template>
<script>
export default {
  data(){
    return{
      list:[],
      seasonId:0,
      today:0,
      countDown:null,
    }
  },
  mounted(){
    this.geteServerTime();
    this.getList();
  },
  methods:{
    listStyleToSafety(){
      this.$router.push("/one")
    },
    geteServerTime(){
      this.$axios.get(this.$store.state.url + "api/lottery/getCurrentSaleTime", {params: { lotteryId:"dfk3" }}).then(res => {
        this.seasonId = res.data.data.seasonId;
        this.today = res.data.data.restSeconds;
        this.setTimeMode();
        this.initSetTimeout();
      })
    },
    //倒计时
    initSetTimeout() {
      this.timer = setInterval(() => {
        this.today = this.today - 1;
        this.setTimeMode();
        if (this.today < 1) {
          clearInterval(this.timer);
          this.timesUp();
        }
      }, 1000);
    },
    //時間到彈窗
    timesUp() {
      this.geteServerTime();
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
    getList(){
      this.$axios.get("../../../../static/k3.json").then(res =>{
        console.log("res:",res)
      })
    },
  }
}
</script>

<style lang="scss" scoped>
@import "../../../assets/scss/lotter-list/lotterbet/betlhc.scss";
</style>