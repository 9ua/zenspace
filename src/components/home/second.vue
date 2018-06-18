<template>
  <div class="second">
    <headers></headers>
    <div class="second-conter">
      <ul class="secondBox">
        <li v-for="(all,index) in getPastOpens" :key="index">
          <div class="title">
            <h2>{{all.name}}</h2>
            <p>
              <span>第
                <i>{{all.seasonId}}</i>期</span>
              <span>00:00:00</span>
            </p>
          </div>
          <div class="conter" :class="all.groupName" v-if="all.groupName === 'k3'">
            <span><img :src='"../../assets/img/one/n"+all.n1+".png"' alt="" /></span>
            <span><img :src='"../../assets/img/one/n"+all.n2+".png"' alt="" /></span>
            <span><img :src='"../../assets/img/one/n"+all.n3+".png"' alt="" /></span>
          </div>
          <div class="conter" :class="all.groupName" v-if="all.groupName === 'ssc'">
            <span>{{all.n1}}</span>
            <span>{{all.n2}}</span>
            <span>{{all.n3}}</span>
            <span>{{all.n4}}</span>
            <span>{{all.n5}}</span>
          </div>
          <div class="conter" :class="all.groupName" v-if="all.groupName === 'pk10'">
            <span>{{all.n1}}</span>
            <span>{{all.n2}}</span>
            <span>{{all.n3}}</span>
            <span>{{all.n4}}</span>
            <span>{{all.n5}}</span>
            <span>{{all.n6}}</span>
            <span>{{all.n7}}</span>
            <span>{{all.n8}}</span>
            <span>{{all.n9}}</span>
            <span>{{all.n10}}</span>
          </div>
          <div class="btn">
            <router-link :to="{path:'/second/past',query:{id:all.id,name:all.name,group:all.groupName}}" tag="button">往期开奖</router-link>
            <button @click="looksucc($event,all)">立即投注</button>
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>
<script>
import headers from "../public/header";
export default {
  data() {
    return {
      lotteryAll: null,
      getPastOpens: "",
      today:"",
      times:[],
      countDown: "",
    };
  },
  mounted() {
    this.getPastOp();
  },
  watch: {
    //监听路由变化后
    $route(to, from, next) {
      // console.log(to.fullPath,"-----------");
      // console.log("to:",to);
    }
  },
  methods: {
    //立即投注
    looksucc(e, all) {
      this.$router.push({ path: all.groupName, query: { id: all.lotteryId } });
      this.betsuccess = !this.betsuccess;
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
    //获取全部彩种
    getPastOp() {
      this.$http
        .get(this.$store.state.url + "api/lottery/getPastOpen", {
          params: { lotteryId: -1 }
        })
        .then(res => {
          this.getPastOpens = res.data.data;
          for(let i=0;i<this.getPastOpens.length;i++){
            this.times[i] = this.getPastOpens[i].restSeconds;
          }
          console.log(this.times);
        })
        .catch(error => {});
    }
  },
  components: {
    headers
  }
};
</script>
<style lang="scss" scoped>
@import "../../assets/scss/second.scss";
</style>

