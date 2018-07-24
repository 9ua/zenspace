<template lang="jade">
.mymsg
  .mymsg-top
    router-link.el-icon-arrow-left(to='/agency', tag='i')
    ul
      router-link(v-for='(navs,index) in nav', :to="'/manageInvite/'+navs.pathurl", tag='li', :key='index') {{navs.name}}
    span
  .mymsg-content
    router-view
</template>
<script>
export default {
  data() {
    return {
      nav: [
        {
          name: "下级开户",
          pathurl: "mInvite"
        },
        {
          name: "邀请码",
          pathurl: "mIcode"
        }
      ],
      radio: 0
    };
  },
  methods:{
    toNavs(index){
      if(index === 0){
        this.$router.push("mInvite?type=2")
      }else{
        this.$router.push("mInvite?type=1")
      }
    }
  }
};
</script>
<style lang="scss" scoped>
@import "../../../assets/scss/page-five/mymsg.scss";
</style>