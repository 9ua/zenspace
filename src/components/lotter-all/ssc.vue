<template lang="jade">
.ssc
  ul
    router-link(v-for='(item,index) in lotteryListssc', :key='index', tag='li', :to="{path:'/ssc',query:{id:item.id,name:item.name}}")
      img(:src='"@/assets/img/one/"+item.groupId+".png"', alt='images')
      h5 {{item.name}}
</template>
<script>
export default {
  data() {
    return {
      lotteryListssc: JSON.parse(localStorage.getItem("lotteryList")).ssc
    };
  },
  mounted() {
    // this.lotteryssc();
  },
  methods: {
    lotteryssc() {
      this.$axios
        .get(this.$store.state.url + "api/lottery/getLotteryList")
        .then(res => {
          this.lotteryListssc = res.data.data.ssc;
        })
        .catch(error => {
          console.log("getLotteryListNo");
        });
    }
  }
};
</script>
<style lang="scss" scoped>
@import "../../assets/scss/lotter-list/ssc.scss";
</style>
