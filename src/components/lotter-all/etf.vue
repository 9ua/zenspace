<template>
  <div class="etf">
    <ul>
      <router-link v-for="(item,index) in lotteryListetf" :key="index" tag="li" :to="{path:'/x11x5',query:{id:item.id}}">
        <img :src='"@/assets/img/one/"+item.image+".png"' alt="images"/>
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
  // mounted(){
  //   this.lotteryetf();
  // },
  activated(){
    this.lotteryetf();
  },

  methods:{
    lotteryetf(){
      this.$http.get(this.$store.state.url+'api/lottery/getLotteryList').then((res) => {
        this.lotteryListetf = res.data.data.x11x5;
      }).catch((error) => {
          console.log("No")
      })
    }
  }
}
</script>
<style lang="scss" scoped>
@import '../../assets/scss/lotter-list/etf.scss';
</style>
