<template lang="jade">
#app
  router-view
</template>

<script>
export default {
  name: "App",  
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
  background: #efeef4;
  font-family: "微软雅黑";
}
*,
body,
html,
ul,
ol,
dl {
  padding: 0px;
  margin: 0px;
  list-style: none;
}
p {
  margin: 0;
}
input{
  height: 24px;
  line-height: 24px;
}
.icon-all{
  color: #F24C03;
}
.icon-k3{
  color: #C6312A;
}
.icon-ssc{
  color: #F4A721;
}
.icon-pk10{
  color: #2FBBF2;
}
.icon-xyft{
  color: #2E3192;
}
.icon-x11x5{
  color: #8BD56B;
}
</style>
