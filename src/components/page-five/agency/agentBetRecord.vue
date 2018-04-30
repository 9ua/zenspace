<template>
  <div class="agent">
    <div class="agent-top">
      <router-link to="/agency" tag="i" class="el-icon-arrow-left"></router-link>
      <p>投注明細</p>
    </div>
    <div class="agent-content">
      
      <div class="agent-content-top">
          <el-tabs v-model="activeName" @tab-click="handleClick">
            <el-tab-pane label="全部" name="first"></el-tab-pane>
            <el-tab-pane label="已中奖" name="second"></el-tab-pane>
            <el-tab-pane label="未中奖" name="third"></el-tab-pane>
            <el-tab-pane label="等待开奖" name="fourth"></el-tab-pane>
          </el-tabs>
      </div>
      <ul>
        <li><span>nathantest</span> <p>2018-04-25 19:58:25</p> </li>
        <li>456</li>
        <li>789</li>
      </ul>
    </div>
    
  </div>
</template>
<script>
   export default {
    data() {
      return {
        activeName: 'first',
      }
    },
    methods: {
      handleClick(tab, event) {
        console.log(tab, event);
      }
    }
  }
</script>
<style lang="scss" scoped>
  @import '../../../assets/scss/page-five/agency/agent.scss';
</style>