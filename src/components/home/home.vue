<template lang="jade">
.home
  .home-cneter
    router-view
  .home-footer
    ul(@click='historyNum')
      router-link(v-for='(navs,index) in navbat', :to="'/'+navs.pathbat", tag='li', :key='index')
        i.fa(:class='navs.icon')
        span {{navs.name}}
</template>
<script>
export default {
  data() {
    return {
      five: 2,
      list: 0,
      navbat: [
        {
          icon: "fa-home",
          name: "首页",
          pathbat: "one"
        },
        {
          icon: "fa-pencil-square-o",
          name: "往期开奖",
          pathbat: "second"
        },
        {
          icon: "fa-calendar-check-o",
          name: "活动",
          pathbat: "three"
        },
        {
          icon: "fa-trophy",
          name: "发现",
          pathbat: "four"
        },
        {
          icon: "fa-address-card",
          name: "我的",
          pathbat: this.$store.state.loginStatus ? "five" : "login"
        }
      ]
    };
  },
  methods: {
    historyNum() {
      this.$store.commit("historyNum", this.$route.path);
    }
  }
};
</script>
<style lang='scss'>
@import "../../assets/scss/home.scss";
@import "../../assets/scss/three.scss";
@import "../../assets/scss/four.scss";
</style>
