<template lang="jade">
.home
  .home-cneter
    router-view
  .home-footer
    ul(@click='historyNum')
      router-link(v-for='(navs,index) in navbat', :to="'/'+navs.pathbat", tag='li', :key='index')
        i.iconfont(:class='navs.icon')
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
          icon: "icon-home",
          name: "首页",
          pathbat: "one"
        },
        {
          icon: "icon-date",
          name: "往期开奖",
          pathbat: "second"
        },
        {
          icon: "icon-campaign",
          name: "活动",
          pathbat: "three"
        },
        {
          icon: "icon-trophy",
          name: "发现",
          pathbat: "four"
        },
        {
          icon: "icon-vcard",
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
