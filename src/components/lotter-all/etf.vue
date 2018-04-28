<template>
  <div class="etf">
    <ul>
      <router-link v-for="(item,index) in lotteryListetf" :key="index" tag="li" to="">
        <img src="../../assets/img/one/zhssc.png" alt="images"/>
        <h5>{{item.name}}</h5>
      </router-link>
    </ul>
  </div>
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
      this.$http.get(this.$store.state.url+'api/lottery/getLotteryList').then((res) => {
        // this.lotteryListetf = res.data.data.11x5;
      }).catch((error) => {
          console.log("No")
      })
    }
  }
}
</script>
<style lang="scss" scoped>
@import '../../assets/scss/lotter-list/etf.scss'
</style>
