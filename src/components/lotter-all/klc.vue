<template>
  <div class="klc">
    <ul>
      <router-link v-for="(item,index) in lotteryListklc" :key="index" tag="li" :to="{path:'/pk10',query:{id:item.id}}">
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
      lotteryListklc:'',
    }
  },
  mounted(){
    this.lotteryklc();
  },
  methods:{
    lotteryklc(){
      this.$http.get(this.$store.state.url+'api/lottery/getLotteryList').then((res) => {
        this.lotteryListklc = res.data.data.pk10;
      }).catch((error) => {
          console.log("No")
      })
    }
  }
}
</script>
<style lang="scss" scoped>
@import '../../assets/scss/lotter-list/klc.scss'
</style>
