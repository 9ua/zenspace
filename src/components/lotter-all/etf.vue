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
      this.$axios.get(this.$store.state.url+'api/lottery/getLotteryList').then((res) => {
        this.lotteryListetf = res.data.data.x11x5;
      }).catch((error) => {
          console.log("getLotteryListNo")
      })
    }
  }
}
</script>
<style lang="scss" scoped>
@import '../../assets/scss/lotter-list/etf.scss';
</style>
