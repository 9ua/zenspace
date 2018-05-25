<template>
  <div class="k3">
    <ul>
      <router-link v-for="(item,index) in lotteryListk3" :key="index" tag="li" :to="{path:'/k3',query:{id:item.id}}">
        <img :src='"../../assets/img/one/"+item.image+".png"' alt="images"/>
        <h5>{{item.name}}</h5>
      </router-link>
    </ul>
  </div>
</template>
<script>
export default {
  data(){
    return{
      lotteryListk3:'',
    }
  },
  // mounted(){
  //   this.lotteryk3();
  // },
  activated(){
    this.lotteryk3();
  },
  methods:{
    lotteryk3(){
      this.$http.get(this.$store.state.url+'api/lottery/getLotteryList').then((res) => {
        this.lotteryListk3 = res.data.data.k3;
        console.log(this.lotteryListk3)
      }).catch((error) => {
          console.log("No")
      })
    }
  }
}
</script>
<style lang="scss" scoped>
@import '../../assets/scss/lotter-list/k3.scss';
</style>
