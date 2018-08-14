<template lang="jade">
.etf
  p 敬请期待......
</template>
<script>
export default {
  data(){
    return{
      lotteryListetf:'',
    }
  },
  mounted(){
    this.lotteryetf();
  },
  methods:{
    lotteryetf(){
      if(JSON.parse(localStorage.getItem("lotteryListetf")) !== null){
        this.lotteryListetf = JSON.parse(localStorage.getItem("lotteryListetf"));
      }else {
        this.$axios.get(this.$store.state.url + "api/lottery/getLotteryList",{params:{type:"x11x5"}}).then(res => {
          localStorage.setItem("lotteryListetf",JSON.stringify(res.data.data));
          this.lotteryListetf = res.data.data;
        })
        .catch(error => {
          console.log("getLotteryListNo");
        });
      }
    }
  }
}
</script>
<style lang="scss" scoped>
@import '../../assets/scss/lotter-list/etf.scss';
</style>
