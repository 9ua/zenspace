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
    position: absolute;
    background-color: #fff;
    top: 50%;
    left: 50%;
    -webkit-transform: translate3d(-50%,-50%,0);
    -moz-transform: translate3d(-50%,-50%,0);
    -ms-transform: translate3d(-50%,-50%,0);
    -o-transform: translate3d(-50%,-50%,0);
    transform: translate3d(-50%,-50%,0);
    -webkit-transition: .2s ease-out;
    -moz-transition: .2s ease-out;
    -ms-transform: .2s ease-out;
    -o-transition: .2s ease-out;
    transition: .2s ease-out;
    
}
</style>
