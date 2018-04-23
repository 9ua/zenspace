<template>
  <div class="happy" v-show="isshow.showPage">
    <div class="three-title">
      <i class="el-icon-arrow-left" @click="hide"></i>
      <p>{{happy.title}}</p>
    </div>
    <div class="happy-box">
      <div v-for="(item,index) in getLotterlist" :key="index">
        <div>{{item.remark}}</div>
      </div>
    </div>
  </div>
</template>
<script>
import threeTitle from './three-title'
export default {
  data() {
    return {
      isshow: {
        showPage: false,
        getLotterlist:'',
      }
    };
  },
  props: {
    happy: {
      type: Object
    }
  },
  mounted(){
    this.getLotterlist();
  },
  methods: {
    getLotterlist(){
	      this.$http.get('api/activity/getList').then((res) => {
          console.log(res.data.data[0]);
	      }).catch((error) => {
	      		console.log("No")
	      })
    	},
    show() {
      this.isshow.showPage = true;
    },
    hide() {
      this.isshow.showPage = false;
      this.$emit("sonclick", this.isshow);
    }
  },
  components:{
    threeTitle
  }
}
</script>
<style lang="scss" scoped>
@import '../../assets/scss/page-three/happy.scss';
</style>