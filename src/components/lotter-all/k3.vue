<template lang="jade">
.k3
  ul
    router-link(v-for='(item,index) in lotteryListk3', :key='index', tag='li', :to="{path:'/k3',query:{id:item.id,name:item.name}}")
      span
        i.iconfont(:class='"icon-"+item.groupId')
      h5 {{item.name}}
</template>
<script>
export default {
  data() {
    return {
      lotteryListk3: JSON.parse(localStorage.getItem("lotteryList")).k3
    };
  },
  mounted() {
    // this.lotteryk3();
  },
  methods: {
    lotteryk3() {
      this.$axios
        .get(this.$store.state.url + "api/lottery/getLotteryList")
        .then(res => {
          this.lotteryListk3 = res.data.data.k3;
          console.log(res.data.data)
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
