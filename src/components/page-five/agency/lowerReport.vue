<template>
  <div class="agent">
    <div class="agent-top">
      <router-link to="/agency" tag="i" class="el-icon-arrow-left"></router-link>
      <p>下级报表</p>
      <div class="dim" @click="show = ! show">{{timeline}} <span class="el-icon-arrow-down"></span></div>
    </div>
    
    <div class="agent-content">
      <div class="agent-content-top">
        <van-actionsheet class="mIcode-go" v-model="show" :actions="actions" cancel-text="取消">
        </van-actionsheet>
      </div>
      <div class="row">
        <div class="title">账号</div>
        <div class="title">类型</div>
        <div class="title">报表人数</div>
        <div class="title">盈利</div>
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