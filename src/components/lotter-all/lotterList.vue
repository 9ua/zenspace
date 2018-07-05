<template lang="jade">
.lotterList
  .lotterList-top
    router-link.el-icon-arrow-left(to='/one', tag='i')
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
        { name: "11选5", pathsrc: "x11x5" }
      ]
    };
  }
};
</script>
<style lang="scss" scoped>
@import "../../assets/scss/lotter-list/lotterList.scss";
</style>
