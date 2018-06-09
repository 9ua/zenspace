<template>
  <div class="three">
    <headers></headers>
      <section class="ac-container">
				<div v-for="(actives,index) in activitys" :key="index">
					<input :id="index" name="accordion-1" type="radio">
					<label :for="index"><img :src="'https://mtxflower.com/'+actives.icon" @click="activeR($event,actives,index)" /><br>
          <p>活动时间：{{actives.beginPrizeTime}}</p><p>{{actives.status === 0 ? '进行中' : '结束'}}</p>
          </label>
					<article class="ac-large">
            <p v-html="actives.remark"></p>
					</article>
				</div>
			</section>
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
    headers,
    promote,
    days,
    happy,
    lucky
  }
};
</script>
<style lang="scss" scoped>
// @import "../../assets/scss/three.scss";
</style>
<style>
.ac-container {
    margin: 50px auto 30px;
    text-align: left;
    width: 100%;
}
.ac-container label {
    background: -moz-linear-gradient(center top , #FFFFFF 1%, #EAEAEA 100%) repeat scroll 0 0 transparent;
    box-shadow: 0 0 0 1px rgba(155, 155, 155, 0.3), 1px 0 0 0 rgba(255, 255, 255, 0.9) inset, 0 2px 2px rgba(0, 0, 0, 0.1);
    color: #777777;
    cursor: pointer;
    background: rgb(255, 171, 171);
    display: block;
    font-size: 12px;
    text-align: center;
    height: auto;
    padding: 5px 20px;
    position: relative;
    z-index: 2;
}
.ac-container label:hover {
    background: none repeat scroll 0 0 rgb(255, 171, 171);
}
.ac-container input:checked + label, .ac-container input:checked + label:hover {
    background: none repeat scroll 0 0 rgb(255, 90, 90);
    box-shadow: 0 0 0 1px rgba(155, 155, 155, 0.3), 0 2px 2px rgba(0, 0, 0, 0.1);
    color: #fff;
    height: auto;
}
.ac-container label:hover:after, .ac-container input:checked + label:hover:after {
    /* background: url("../images/arrow_down.png") no-repeat scroll center center transparent; */
    content: "";
    height: auto;
    position: absolute;
    right: 13px;
    top: 7px;
    width: 24px;
}
.ac-container input:checked + label:hover:after {
    /* background-image: url("../images/arrow_up.png"); */
}
.ac-container input {
    display: none;
}
.ac-container article {
    -moz-transition: height 0.3s ease-in-out 0s, box-shadow 0.6s linear 0s;
    background: none repeat scroll 0 0 rgba(255, 255, 255, 0.5);
    height: 0;
    margin-top: -1px;
    overflow: hidden;
    position: relative;
    z-index: 10;
}
.ac-container article p {
    color: #777777;
    font-size: 14px;
    padding: 5px 10px;
    text-shadow: 1px 1px 1px rgba(255, 255, 255, 0.8);
}
.ac-container input:checked ~ article {
    -moz-transition: height 0.5s ease-in-out 0s, box-shadow 0.1s linear 0s;
    box-shadow: 0 0 0 1px rgba(155, 155, 155, 0.3);
}
.ac-container input:checked ~ article.ac-small {
    height: 140px;
}
.ac-container input:checked ~ article.ac-medium {
    height: 180px;
}
.ac-container input:checked ~ article.ac-large {
    height: auto;
    overflow: auto;
    background: #fff;
}
</style>