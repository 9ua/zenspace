<template lang="jade">
#app
  router-view(v-if='isRouterAlive')
</template>

<script>
export default {
  name: "App", 
  data () {
   return {
     isRouterAlive: true
   }
  }, 
  methods: {
    reload () {
      // this.isRouterAlive = false;
      // this.$nextTick(() => (this.isRouterAlive = true));
      console.log("hello!");
    }   
  }
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
  font-family: "微软雅黑","PingFang SC";
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

</style>
