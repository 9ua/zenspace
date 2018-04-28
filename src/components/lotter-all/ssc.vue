<template>
  <div class="ssc">
    <ul>
      <router-link v-for="(item,index) in lotteryListssc" :key="index" tag="li" to="">
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
      lotteryListssc:'',
    }
  },
  mounted(){
    this.lotteryssc();
  },
  methods:{
    lotteryssc(){
      this.$http.get(this.$store.state.url+'api/lottery/getLotteryList').then((res) => {
        this.lotteryListssc = res.data.data.k3;
      }).catch((error) => {
          console.log("No")
      })
    }
  }
}
</script>
<style lang="scss" scoped>
@import '../../assets/scss/lotter-list/ssc.scss'
</style>
