<template>
  <div class="three">
    <headers></headers>
    <ul v-show="showFlag">
      <li v-for="(actives,index) in activitys" :key="index">
        <img :src="'https://mtxflower.com/'+actives.icon" @click="activeR($event,actives,index)" />
        <div class="three-box">
          <p>活动时间：{{actives.beginPrizeTime}}</p>
          <p>{{actives.status === 0 ? '进行中' : '结束'}}</p>
        </div>
        <div class="three-content" ref="pppop" v-if="activesremark === index" v-show="activesremarks">
          <div>
            <p v-html="actives.remark"></p>
          </div>
        </div>
      </li>
    </ul>
  </div>
</template>
<script>
import headers from "../public/header";
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
      }).catch((error) => {
          console.log("getListNo")
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
    headers
  }
};
</script>
<style lang="scss" scoped>
@import "../../assets/scss/three.scss";
</style>