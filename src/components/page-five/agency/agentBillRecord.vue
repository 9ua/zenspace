<template>
  <div class="agent">
    <div class="agent-top">
      <router-link to="/agency" tag="i" class="el-icon-arrow-left"></router-link>
      <p>交易明細</p>
    </div>
    <div class="agent-content">
      
      <div class="agent-content-top">
          <el-tabs v-model="activeName" @tab-click="handleClick">
            <el-tab-pane tag="tab" label="所有类型" name="first"></el-tab-pane>
            <el-tab-pane label="提现记录" name="second"></el-tab-pane>
            <el-tab-pane label="充值记录" name="third"></el-tab-pane>
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