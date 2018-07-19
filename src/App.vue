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
  font-family: "微软雅黑";
}
p {
  margin: 0;
}
.el-loading-spinner i,.el-loading-spinner .el-loading-text{
  color: #fff;
  font-size: 20px;
}
</style>
