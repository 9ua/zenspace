<template lang="jade">
#app
  router-view
</template>

<script>
export default {
  name: "App"
};
</script>

<style>
body,
html,
#app,
.login {
  margin: 0;
  padding: 0;
  width: 100%;
  height: 100%;
}
p {
  margin: 0;
}
.van-popup{
  position: inherit !important;
    background-color: rgba(0, 0, 0, 0.1);
    -webkit-transform: translate3d(0,0,0) !important;
    -moz-transform: translate3d(0,0,0) !important;
    -ms-transform: translate3d(0,0,0) !important;
    -o-transform: translate3d(0,0,0) !important;
    transform: translate3d(0,0,0) !important;
    -webkit-transition: .2s ease-out !important;
    -moz-transition: .2s ease-out !important;
    -ms-transform: .2s ease-out !important;
    -o-transition: .2s ease-out !important;
    transition: .2s ease-out !important;
    
}
</style>
