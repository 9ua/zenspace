<template lang="jade">
.ssc
  ul
    router-link(v-for='(item,index) in lotteryListssc', :key='index', tag='li', :to="{path:'/ssc',query:{id:item.id}}")
      img(:src='"@/assets/img/one/"+item.groupId+".png"', alt='images')
      h5 {{item.name}}
</template>
<script>
export default {
  data() {
    return {
      lotteryListssc: ""
    };
  },
  mounted() {
    this.lotteryssc();
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
