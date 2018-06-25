<template lang="jade">
.k3
  ul
    router-link(v-for='(item,index) in lotteryListk3', :key='index', tag='li', :to="{path:'/k3',query:{id:item.id}}")
      img(:src='"@/assets/img/one/"+item.groupId+".png"', alt='images')
      h5 {{item.name}}
</template>
<script>
export default {
  data() {
    return {
      lotteryListk3: ""
    };
  },
  mounted() {
    this.lotteryk3();
  },
  methods: {
    lotteryk3() {
      this.$http
        .get(this.$store.state.url + "api/lottery/getLotteryList")
        .then(res => {
          this.lotteryListk3 = res.data.data.k3;
        })
        .catch(error => {
          console.log("getLotteryListNo");
        });
    }
  }
};
</script>
<style lang="scss" scoped>
@import "../../assets/scss/lotter-list/k3.scss";
</style>
