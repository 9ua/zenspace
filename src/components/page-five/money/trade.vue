<template>
  <div class="agent">
    <div class="agent-top">
      <router-link to="/five" tag="i" class="el-icon-arrow-left"></router-link>
      <p>交易记录</p>
      <div class="dim" @click="show = ! show">{{timeline}} <span class="el-icon-arrow-down"></span></div>
    </div>
    
    <div class="agent-content">
      <div class="agent-content-top">
        <van-actionsheet class="mIcode-go" v-model="show" :actions="actions" cancel-text="取消">
        </van-actionsheet>
      </div>
	  <van-tabs v-model="active">
  		<van-tab class="typeo" v-for="item in pagelist" :title="item.name">
   			 <!-- 内容 {{ item.name }} -->
  		</van-tab>
	  </van-tabs>
    </div>
  </div>
</template>
<script>
export default {
  data(){
    return {
		active: 2,
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
		pagelist:[
			{
				name:'所有类型'
			},
			{
				name:'提现记录'
			},
			{
				name:'充值记录'
			}
		],
        actions: [
        {
          name: '今天',
          callback: this.onClick,
        },
        {
          name: '昨天',
          callback: this.onClick,
        //   subname: '描述信息'
        },
        {
          name: '七天',
          callback: this.onClick,
          loading: false
        },
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