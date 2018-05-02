<template>
  <div class="agent">
    <div class="agent-top">
      <router-link to="/agency" tag="i" class="el-icon-arrow-left"></router-link>
      <p>代理报表</p>
      <div class="dim" @click="show = ! show">{{timeline}} <span class="el-icon-arrow-down"></span></div>
    </div>
    <div class="agent-content">
      <div class="agent-content-top">
        <van-actionsheet class="mIcode-go" v-model="show" :actions="actions" cancel-text="取消">
        </van-actionsheet>
      </div>

      <div class="agent-content-list">
        <ul>
          <li>
            <span>12.00</span>
            <span>投注金额</span>
          </li>
          <li>
            <span>12.00</span>
            <span>中奖金额</span>
          </li>
          <li>
            <span>12.00</span>
            <span>活动礼金</span>
          </li>
          <li>
            <span>12.00</span>
            <span>团队返点</span>
          </li>
          <li>
            <span>12.00</span>
            <span>团队盈利</span>
          </li>
          <li>
            <span>12.00</span>
            <span>充值金额</span>
          </li>
          <li>
            <span>12.00</span>
            <span>提现金额</span>
          </li>
          <li>
            <span>12.00</span>
            <span>首充人数</span>
          </li>
          <li>
            <span>12.00</span>
            <span>注册人数</span>
          </li>
          <li>
            <span>12.00</span>
            <span>投注人数</span>
          </li>
          <li>
            <span>12.00</span>
            <span>下级人数</span>
          </li>
          <li>
            <span>12.00</span>
            <span>团队馀额</span>
          </li>
          <li>
            <span>12.00</span>
            <span>代理返点</span>
          </li>
          <li>
            <span>12.00</span>
            <span>代理工资</span>
          </li>
          <li>
            <span>12.00</span>
            <span>代理分红</span>
          </li>
        </ul>
      </div>
    </div>
    
  </div>
</template>
<script>
export default {
  data(){
    return {
        timeline:'今日',
        show:false,
        show2:false,
        usertype:2,
        highbet:0,
        rebateratio:0,
        betlist:[],
        validtime:0,
        extaddress:'',
        invitelist:'',
        selected:[],
        showFlag: true,
        actions: [
        {
          name: '今日',
          callback: this.onClick,
        },
        {
          name: '昨日',
          callback: this.onClick,
          subname: '描述信息'
        },
        {
          name: '本月',
          callback: this.onClick,
          loading: false
        },
        {
          name: '上月',
          callback: this.onClick,
          loading: false
        }
        ],
        
        
    }
  },
  methods: {
    onClick(name){
      this.timeline = name.name;
      this.show = ! this.show;
    },
  },
};
</script>
<style lang="scss" scoped>
  @import '../../../assets/scss/page-five/agency/agent.scss';
</style>