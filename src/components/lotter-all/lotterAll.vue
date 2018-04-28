<template>
  <div class="looterAll">
    <ul>
      <router-link v-for="(item,index) in lotteryListAll" :key="index" tag="li" :to="'/'+item.id">
        <img src="../../assets/img/one/zhssc.png" alt="images"/>
        <!-- 没有图片，先注释 -->
        <!-- :src='"../../assets/img/one/"+item.image+".png"' -->
        <h5>{{item.name}}</h5>
      </router-link>
    </ul>
  </div>
</template>
<script>
export default {
  data(){
    return{
      lotteryListAll:'',
    }
  },
  mounted(){
    this.lotteryAll();
  },
  methods:{
    lotteryAll(){
      this.$http.get(this.$store.state.url+'api/lottery/getLotteryList').then((res) => {
        this.lotteryListAll = res.data.data.all;
      }).catch((error) => {
          console.log("No")
      })
    }
  }
}
</script>

<style lang="scss" scoped>
@import '../../assets/scss/lotter-list/lotterAll.scss'
</style>

