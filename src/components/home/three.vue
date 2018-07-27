<template lang="jade">
.three
  headers
  ul(v-show='showFlag')
    li(v-for='(actives,index) in activitys', :key='index')
      img(:src='"https://mtxflower.com/"+actives.icon', @click='activeR($event,actives,index)')
      .three-box
        p 活动时间：{{actives.beginPrizeTime}}
        p {{actives.status === 0 ? '进行中' : '结束'}}
      .three-content(v-if='activesremark === index', v-show='activesremarks')
        div
          p(v-html='actives.remark')
</template>
<script>
import headers from "../public/header";
export default {
  data() {
    return {
      loading:true,
      activesremark:0,
      activesremarks:false,
      activitys:'',
      selectedFood: {},
      showFlag: true,
      cacheTime: 1800000,
    };
  },
  mounted(){
    this.activity();
  },
  methods: {
    activeR(e,actives,index){
      this.activesremark = index;
      this.activesremarks = !this.activesremarks;
      this.$pop.show({title:'温馨提示',content:'恭喜您，投注成功！',content1:'',content2:'',number:2});
    },
    activity(){
      var now = new Date().getTime();
      if (localStorage.getItem("getList") !== null) {
        var setupTime = localStorage.getItem("date_getList");
        if (null == setupTime || now - setupTime > this.cacheTime) {
          localStorage.removeItem("getList");
          localStorage.removeItem("date_getList");
          this.$axios.get(this.$store.state.url+'api/activity/getList').then((res) => {
            localStorage.setItem("getList", JSON.stringify(res.data.data));
            localStorage.setItem("date_getList", now);
            this.activitys = res.data.data;
          }).catch((error) => {
              console.log("getListNo")
          })
        } else {
          this.activitys = JSON.parse(localStorage.getItem("getList"));
        }
      } else {
          this.$axios.get(this.$store.state.url+'api/activity/getList').then((res) => {
            localStorage.setItem("getList", JSON.stringify(res.data.data));
            localStorage.setItem("date_getList", now);
            this.activitys = res.data.data;
          }).catch((error) => {
              console.log("getListNo")
          })
      }
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