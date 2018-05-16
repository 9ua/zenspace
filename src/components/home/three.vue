<template>
  <div class="three">
    <headers></headers>
    <ul v-show="showFlag">
      <li v-for="(actives,index) in activitys" :key="index">
        <img :src="'http://115.144.238.217'+actives.icon" @click="activeR($event,actives,index)"/>
      	<div class="three-box">
      		<p>活动时间：{{actives.beginPrizeTime}}</p>
      		<p>{{actives.status === 0 ? '进行中' : '结束'}}</p>
      	</div>
        <div class="three-content" ref="pppop" v-if="activesremark === index" v-show="activesremarks">
          <p v-html="actives.remark"></p>
        </div>
      </li>
    </ul>
    <promote :promote="selectedFood" ref="promote" @sonclick="haashow"></promote>
    <days :days="selectedFood" ref="days" @sonclick="haashow"></days>
    <happy :happy="selectedFood" ref="happy" @sonclick="haashow"></happy>
    <lucky :lucky="selectedFood" ref="lucky" @sonclick="haashow"></lucky>
  </div>
</template>
<script>
import headers from "../public/header";
import promote from "../page-three/promote";
import days from "../page-three/days";
import happy from "../page-three/happy";
import lucky from "../page-three/lucky";
export default {
  data() {
    return {
      activesremark:0,
      activesremarks:false,
      activitys:'',
      selectedFood: {},
      showFlag: true
    };
  },
  mounted(){
    this.activity();
  },
  methods: {
    activeR(e,actives,index){
      this.activesremark = index;
      this.activesremarks = !this.activesremarks;
    },
    activity(){
      this.$http.get(this.$store.state.url+'api/activity/getList').then((res) => {
        this.activitys = res.data.data;
        if(this.$route.query.num !== ''){
          let num = 0;
          num = this.$route.query.num
          this.activesremark = Number(num);
          this.activesremarks = !this.activesremarks;
          console.log(num,'----',this.$route.query.num)
        }
        if(this.$route.name === 'three'){
          this.activesremarks = !this.activesremarks;
        }else if(this.$route.name !== 'three'){
          this.activesremarks = false;
        }
      }).catch((error) => {
          console.log("No")
      })
    },
    selectFood(threeC, event,index) {
      this.selectedFood = threeC;
      this.showFlag = false;
      switch(index){
        case 0:this.$refs.promote.show();break;
        case 1:this.$refs.days.show();break;
        case 2:this.$refs.happy.show();break;
        case 3:this.$refs.lucky.show();break;
      }
    },
    haashow(isshow) {
      this.showFlag = !isshow.showF;
    }
  },
  components: {
    headers,
    promote,
    days,
    happy,
    lucky
  }
};
</script>
<style lang="scss" scoped>
@import "../../assets/scss/three.scss";
</style>