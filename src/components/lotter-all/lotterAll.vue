<template lang="jade">
.looterAll
  ul
    router-link(v-for='(item,index) in lotteryListAll', :key='index', tag='li', :to="{path:'/'+item.groupId,query:{id:item.id}}")
      img(:src='"@/assets/img/one/"+item.groupId+".png"', alt='images')
      h5 {{item.name}}
</template>
<script>
export default {
  data() {
    return {
      lotteryListAll: ""
    };
  },
  mounted() {
    this.lotteryAll();
  },
  methods: {
    lotteryAll() {
      this.$http
        .get(this.$store.state.url + "api/lottery/getLotteryList")
        .then(res => {
          this.lotteryListAll = res.data.data.all;
        })
        .catch(error => {
          console.log("getLotteryListNo");
        });
    }
  }
};
</script>

<style lang="scss" scoped>
@import "../../assets/scss/lotter-list/lotterAll.scss";
</style>

