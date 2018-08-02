<template lang="jade">
.lotterList
  .lotterList-top
    i.iconfont.icon-left(@click='listStyleToSafety')
    p 全部彩种
  .lotterList-nav
    .lotterList-nav-box
      ul
        router-link(:to="'/lotterList/'+navTitles.pathsrc", tag='li', v-for='(navTitles,index) in navTitle', :title='navTitles.name', :key='index')
          img(:src='"@/assets/img/one/"+navTitles.pathsrc+".png"', alt='')
          h5 {{navTitles.name}}
    keep-alive
      router-view
</template>
<script>
export default {
  data() {
    return {
      navTitle: [
        { name: "全部彩种", pathsrc: "lotterAll" },
        { name: "快3", pathsrc: "k3s" },
        { name: "时时彩", pathsrc: "sscs" },
        { name: "快乐彩", pathsrc: "klcs" },
        { name: "11选5", pathsrc: "etfs" }
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
