<template>
  <div id="app">
    <keep-alive v-if="$route.meta.keepAlive">
      <router-view/>
    </keep-alive>
  </div>
</template>

<script>
export default {
  name: 'App'
}
</script>

<style>
body,html,#app,.login{
  margin: 0;
  padding: 0;
  width: 100%;
  height: 100%;
}
</style>
