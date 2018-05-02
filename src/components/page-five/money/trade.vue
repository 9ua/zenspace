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
	  <van-tabs v-model="accountChangeType" @click="print">
  		<van-tab class="typeo" v-for="(item,index) in pagelist" :key="index" :title="item.name">
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
		    active: 1,
        timeline:'今日',
        show:false,
        betweenType:1,
        accountChangeType:100,
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
            name:'所有类型',
            Type:100,
            callback: this.print,
          },
          {
            name:'提现记录',
            Type:1,
            callback: this.print,
          },
          {
            name:'充值记录',
            Type:2,
            callback: this.print,
          }
        ],
        actions: [
        {
          name: '今天',
          Type:1,
          callback: this.onClick,
        },
        {
          name: '昨天',
          Type:2,
          callback: this.onClick,
        //   subname: '描述信息'
        },
        {
          name: '七天',
          Type:3,
          callback: this.onClick,
          loading: false
        },
        ],
        
        
    }
  },
  methods: {
    onClick(item){
      this.timeline = item.name;
      this.betweenType = item.Type;
      this.show = ! this.show;
      console.log(this.betweenType);
      this.getTradeList();
    },
    print(index,title){
      this.accountChangeType = this.pagelist[index].Type;
      console.log(this.pagelist[index].Type);
      this.getTradeList();
    },
    getTradeList(){
        this.$http.get(this.$store.state.url+'api/proxy/getTradeList',{params:{account:this.$store.state.Globalusername,include:3,accountChangeType:this.accountChangeType,betweenType:this.betweenType,}}).then((res) => {
            console.log(res);
            // this.highbet = res.data.data.rebateRatio;
            // for(let i = res.data.data.rebateRatio*10; i >= 0 ; i = i - 1 ){this.betlist.push(i/10)};
            //     console.log(this.betlist)
            //     return this.betlist;
            //         console.log(res.data.data.rebateRatio);
			}).catch((error) => {
                console.log(error);
                    console.log("获取彩種ratio ERROR");
		});
    },
  },
};
</script>
<style lang="scss" scoped>
  @import '../../../assets/scss/page-five/agency/agent.scss';
</style>