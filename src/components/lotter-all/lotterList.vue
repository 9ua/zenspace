<template lang="jade">
.lotterList
  .lotterList-top
    i.iconfont.icon-left(@click='listStyleToSafety')
    p 全部彩种
  .lotterList-nav
    .lotterList-nav-box
      ul
        router-link(:to="'/lotterList/'+navTitles.pathsrc", tag='li', v-for='(navTitles,index) in navTitle', :title='navTitles.name', :key='index')
          span
            i.iconfont(:class='navTitles.icon')
          h5 {{navTitles.name}}
    keep-alive
      router-view
</template>
<script>
export default {
  data() {
    return {
      navTitle: [
        { name: "全部彩种", pathsrc: "lotterAll",icon:"icon-all" },
        { name: "快3", pathsrc: "k3s",icon:"icon-k3" },
        { name: "时时彩", pathsrc: "sscs",icon:"icon-ssc" },
        { name: "快乐彩", pathsrc: "klcs",icon:"icon-pk10" },
        { name: "11选5", pathsrc: "etfs",icon:"icon-x11x5" }
      ]
    };
  },
  methods:{
    listStyleToSafety(){
      this.$router.push('/one')
    },
  }
};
</script>
<style lang="scss" scoped>
@import "../../assets/scss/lotter-list/lotterList.scss";
</style>
